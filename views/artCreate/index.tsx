import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
  Steps,
  Typography,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { uploadFile } from "../../utils/file";
import { RequiredAttribute } from "../../shared/RequiredAttribute";
import { MetaplexOverlay } from "../../models/metaplex/MetaplexModal";
import { getLast } from "../../utils/utils";
import { mintNFT } from "./calls";
import { toast } from "react-toastify";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import useWindowDimensions from "../../utils/layout";
import withAuth from "../../hoc/with-auth";
import withNftCreator from "../../hoc/with-nft-creation";
import {
  Creator,
  IMetadataExtension,
  MetadataCategory,
  MetadataFile,
  StringPublicKey,
} from "../../types/blockchain";
import axios from "axios";
import { useCustomConnection } from "../../hooks/useConnection";
import { useGoodTokenPrice } from "../../hooks/useGoodPrice";
import { Loader } from "../../shared/Loader/Loader";
import ModalPopUp from "../../components/Modals/ModalPopUp/Model";
import {
  getUserDetails,
  updateUserDetails,
} from "../../utils/services/actions";
import { convertToFormData } from "../../utils/convert-to-form-data";
import { IUserDetails } from "../../interfaces/user";
import { QuantityPicker } from "react-qty-picker";
import { TProjectWalletAddresses } from "../../interfaces/project";
import {
  fetchWalletAddressesOfProject,
  getOpenAiImages,
  ISaveNftRes,
  SaveNftToDB,
  updateNftStatus,
} from "../../utils/services/actions/nft";
import { sendDonation } from "../../utils/rpc/balance";
import { Mint, List, Send } from "./EtherCall";
import useMetaWallet from "../../hooks/useMetaWallet";
import { RootStateOrAny, useSelector } from "react-redux";
const { Step } = Steps;
const { Dragger } = Upload;
const { Text } = Typography;

export const ArtCreateView = () => {
  const connection = useCustomConnection();
  const wallet = useWallet();
  const { state } = useLocation<string>();
  const [alertMessage, setAlertMessage] = useState<string>();
  const { project_id, step_param }: { project_id: string; step_param: string } =
    useParams();
  const history = useHistory();
  const { width } = useWindowDimensions();
  const [nftCreateProgress, setNFTcreateProgress] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [stepsVisible, setStepsVisible] = useState<boolean>(true);
  const [isMinting, setMinting] = useState<boolean>(false);
  const [nft] = useState<any>(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [filesMerchant, setMerchantFiles] = useState<File[]>([]);

  const [isCollection, setIsCollection] = useState<boolean>(false);
  const { defaultAccount, connectwalletHandler } = useMetaWallet();
  const [attributes, setAttributes] = useState<IMetadataExtension>({
    name: "",
    symbol: `${project_id},${state || "N/A"}`,
    collection: "",
    description: "",
    external_url: "",
    image: "",
    merchantizedImages: [],
    animation_url: undefined,
    attributes: undefined,
    seller_fee_basis_points: 0,
    creators: [
      {
        ...new Creator({
          address: wallet?.publicKey?.toString?.() as string,
          verified: true,
          share: 100,
        }),
      },
    ],
    properties: {
      files: [],
      category: MetadataCategory.Image,
    },
  });

  const gotoStep = useCallback(
    (_step: number) => {
      // if (!defaultAccount) {
      //   toast.error(`Please connect your wallet first`, {
      //     toastId: "validation",
      //   });
      //   return;
      // }

      if (
        +step === 2 &&
        _step > +step &&
        (!attributes.name || !attributes.price)
      ) {
        toast.error(`Please fill all required fields denoted by *`, {
          toastId: "validation",
        });
        return;
      }
      setStep(_step);
      history.push(`/art/create/${project_id}/${_step.toString()}`);
      if (_step === 0) setStepsVisible(true);
    },
    [history, step_param, attributes.name, attributes.price, wallet.connected]
  );

  useEffect(() => {
    if (!step_param) {
      gotoStep(0);
      setNFTcreateProgress(0);
    }
  }, [step_param, files]);

  useEffect(() => {
    setAttributes((prev) => ({
      ...prev,
      creators: [
        {
          ...new Creator({
            address: wallet?.publicKey?.toString?.() as string,
            verified: true,
            share: 100,
          }),
        },
      ],
    }));
  }, [wallet.publicKey]);

  useEffect(() => {
    setAttributes({
      ...{
        name: "",
        symbol: `${project_id},${state || "N/A"}`,
        collection: "",
        description: "",
        external_url: "",
        image: "",
        merchantizedImages: [],
        animation_url: undefined,
        attributes: [
          {
            trait_type: "",
            value: "",
          },
        ],
        seller_fee_basis_points: 0,
        creators: [],
        properties: {
          files: [],
          category: MetadataCategory.Image,
        },
      },
    });
  }, []);

  // store files
  const mint = async () => {
    let attributeArray: any = [];
    if (attributes?.attributes) {
      attributeArray = attributes.attributes;
    }

    if (state) {
      attributeArray.push({
        trait_type: "project_name",
        value: state,
      });
    }

    const metadata = {
      ...attributes,
      name: attributes.name,
      symbol: attributes.symbol || `${project_id},${state ?? "N/A"}`,
      creators: attributes.creators,
      collection: attributes.collection,
      description: attributes.description,
      sellerFeeBasisPoints: attributes.seller_fee_basis_points,
      image: attributes.image,
      animation_url: attributes.animation_url,
      attributes: [
        ...attributeArray,
        { trait_type: "project_id", value: project_id },
      ],
      external_url: attributes.external_url,
      properties: {
        files: attributes.properties.files,
        category: attributes.properties?.category,
      },
    };

    setStepsVisible(false);
    setMinting(true);

    try {
      setNFTcreateProgress(1);
      setNFTcreateProgress(2);

      console.log(metadata, files, "imagessssss");

      const resp = (await SaveNftToDB(
        convertToFormData({
          title: metadata.name,
          price: metadata.price,
          campaign_id: project_id,
          created_by: defaultAccount,
          image: metadata?.properties?.files
            ? metadata?.properties?.files?.[1]
            : files[0],
          reward_title: attributes?.attributes?.[0]?.trait_type,
          redeem_limit: attributes?.attributes?.[0]?.value,
          images: filesMerchant,
          save_to_db: true,
        })
      )) as unknown as ISaveNftRes;

      const nftId = await Mint(resp.message);

      const wallets = (await fetchWalletAddressesOfProject(
        project_id || 147
      )) as unknown as { wallet_addresses: TProjectWalletAddresses };

      if (nftId) {
        const respList = await List(
          wallets?.wallet_addresses?.charity_admin_wallet_address,
          wallets?.wallet_addresses?.charity_cordinator_wallet_address,
          "0x4983f3D38522d7614F064cB1081D53d9395BdD6b", //static
          nftId,
          attributes.price
        );

        if (respList) await updateNftStatus({ mint_id: nftId, id: resp.id });
      }

      setAlertMessage("");
    } catch (e: any) {
      setAlertMessage(e.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <>
      <Row className={"creator-base-page"}>
        {stepsVisible && (
          <Col span={24} md={4}>
            <Steps
              progressDot
              direction={width < 768 ? "horizontal" : "vertical"}
              current={step}
              style={{
                width: "fit-content",
                margin: "0 auto 30px auto",
                overflowX: "auto",
                maxWidth: "100%",
              }}
            >
              <Step title="Upload" />
              <Step title="Info" />
              <Step title="Launch" />
            </Steps>
          </Col>
        )}
        <Col span={24} {...(stepsVisible ? { md: 20 } : { md: 24 })}>
          {step === 0 && (
            <UploadStep
              attributes={attributes}
              setAttributes={setAttributes}
              files={files}
              setFiles={setFiles}
              setMerchantFiles={setMerchantFiles}
              filesMerchant={filesMerchant}
              confirm={() => gotoStep(1)}
            />
          )}

          {step === 1 && (
            <InfoStep
              attributes={attributes}
              files={files}
              isCollection={isCollection}
              setIsCollection={setIsCollection}
              setAttributes={setAttributes}
              confirm={() => gotoStep(2)}
              filesMerchant={filesMerchant}
            />
          )}
          {step === 2 && (
            <LaunchStep
              attributes={attributes}
              files={files}
              confirm={async () => {
                gotoStep(3);
                await mint();
                gotoStep(4);
              }}
              filesMerchant={filesMerchant}
            />
          )}
          {step === 3 && (
            <WaitingStep
              mint={mint}
              minting={isMinting}
              step={nftCreateProgress}
              confirm={() => gotoStep(4)}
            />
          )}
          {0 < step && step < 3 && (
            <div style={{ margin: "auto", width: "fit-content" }}>
              <Button onClick={() => gotoStep(step - 1)}>Back</Button>
            </div>
          )}
        </Col>
      </Row>
      <MetaplexOverlay visible={step === 4}>
        <Congrats nft={nft} alert={alertMessage} project_id={project_id} />
      </MetaplexOverlay>
    </>
  );
};

const CategoryStep = (props: {
  confirm: (category: MetadataCategory) => void;
}) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Row
        className="call-to-action"
        style={{ gap: "10px", marginBottom: "10px" }}
      >
        <h2 style={{ color: "#1e1e1e" }}>Create a new item</h2>
      </Row>
      <Row justify={width < 768 ? "center" : "start"}>
        <Col
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <Row>
            <Button
              className="type-btn"
              size="large"
              onClick={() => props.confirm(MetadataCategory.Image)}
              style={{ width: "300px" }}
            >
              <div>
                <div>Image</div>
                <div className="type-btn-description">JPG, PNG, GIF</div>
              </div>
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const UploadStep = (props: {
  attributes: IMetadataExtension;
  setAttributes: (attr: IMetadataExtension) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  filesMerchant: File[];
  setMerchantFiles: (filesMerchant: File[]) => void;
  confirm: () => void;
}) => {
  const [coverFile, setCoverFile] = useState<File | undefined>(
    props.files?.[0]
  );
  const [coverFileM, setCoverFileM] = useState<File[]>(props.filesMerchant);
  const { project_id: id } = useParams<{ project_id: string }>();
  const [mainFile, setMainFile] = useState<File | undefined>(props.files?.[1]);
  const [customURL, setCustomURL] = useState<string>("");
  const [customURLErr, setCustomURLErr] = useState<string>("");
  const disableContinue = !(
    (coverFile && coverFileM.length) ||
    (!customURLErr && !!customURL)
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState<number>(0);
  const [coverArtError, setCoverArtError] = useState<string>();
  const [selectedImg, setImgSelected] = useState();
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [value, setValue] = useState<number>(1);
  const [charityAdminAddress, setCharityAdminAddress] = useState<string>("");
  const walletAddress = useSelector(
    (state: RootStateOrAny) => state.wallet.defaultAccount
  );
  const { goodPriceForOneCredit } = useGoodTokenPrice();
  useEffect(() => {
    props.setAttributes({
      ...props.attributes,
      properties: {
        ...props.attributes.properties,
        files: [],
      },
    });
  }, []);

  const { category } = props.attributes.properties;

  const urlPlaceholder = `http://example.com/path/to/${
    category === MetadataCategory.Image ? "image" : "file"
  }`;

  const imageuploadfunction = async () => {
    if (!limit) {
      return;
    }
    if (coverFile) {
      setLoading(true);
      const data = new FormData();
      data.append("image", coverFile, coverFile.name);

      const Access_token = localStorage.getItem("access_token");

      var myHeaders = new Headers();
      myHeaders.append("token", Access_token?.toString() ?? "");

      let res = await fetch(
        `https://staging.commitgood.com/api/v1/open_ai_images`,
        {
          method: "post",
          body: data,
          headers: myHeaders,
        }
      );
      const resData = await res.json();
      if (resData) {
        updateLimit();

        setResults(resData?.data);
        setLoading(false);
      }
    }
    if (query != "" && limit > 0) {
      setLoading(true);
      getOpenAiImages(query)
        .then((res) => {
          updateLimit();
          setResults(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const handleImageClick = (item, i) => {
    setCustomURL(item?.url);
    setImgSelected(i);
  };

  const updateLimit = async (isAddLimit = false) => {
    if (!charityAdminAddress) {
      return toast.info("Please ask charity to add wallet address");
    }
    if (isAddLimit) {
      if (!value) return;
      if (!walletAddress) return toast.info("please conneect your wallet");
      const tokenPrice = value * goodPriceForOneCredit;

      await Send(walletAddress, tokenPrice.toString());
      await updateUserDetails(
        convertToFormData({
          limit: limit + value,
        }),
        false
      );
      setLimit(limit + value);
      setValue(0);
      setModalShow(false);
      return;
    }
    if (limit > 0) {
      updateUserDetails(
        convertToFormData({
          limit: limit - 1,
        }),
        false
      ).then(() => {
        setLimit((prev) => prev - 1);
      });
    }
  };
  const uploadMsg = (category: MetadataCategory) => {
    switch (category) {
      case MetadataCategory.Audio:
        return "Upload your additional audio creation (MP3, FLAC, WAV)";
      case MetadataCategory.Image:
        return "Upload your additional image creation (PNG, JPG, GIF)";
      case MetadataCategory.Video:
        return "Upload your additional video creation (MP4, MOV, GLB)";
      case MetadataCategory.VR:
        return "Upload your additional AR/VR creation (GLB)";
      case MetadataCategory.HTML:
        return "Upload your additional HTML File (HTML)";
      default:
        return "Please go back and choose a category";
    }
  };

  const acceptableFiles = (category: MetadataCategory) => {
    switch (category) {
      case MetadataCategory.Audio:
        return ".mp3,.flac,.wav";
      case MetadataCategory.Image:
        return ".png,.jpg,.gif";
      case MetadataCategory.Video:
        return ".mp4,.mov,.webm";
      case MetadataCategory.VR:
        return ".glb";
      case MetadataCategory.HTML:
        return ".html";
      default:
        return "";
    }
  };
  const getLimit = async () => {
    const data = (await getUserDetails()) as unknown as IUserDetails;
    setLimit(data?.limit ?? 0);
  };

  useEffect(() => {
    getLimit();
  }, []);

  useEffect(() => {
    (async function () {
      const {
        wallet_addresses: { charity_admin_wallet_address },
      } = (await fetchWalletAddressesOfProject(id)) as unknown as {
        wallet_addresses: TProjectWalletAddresses;
      };

      setCharityAdminAddress(charity_admin_wallet_address);
    })();
  }, []);

  const onShow = () => {
    setModalShow(true);
  };

  const handleChange = (value: number) => {
    setValue(value);
  };

  const onAddCredit = () => {
    updateLimit(true);
  };

  const modalBody = () => {
    return (
      <div>
        <p className="mb-5 font-weight-bold">{limit} Available Credits</p>

        <p className="mb-2">
          {!value
            ? goodPriceForOneCredit.toFixed(4)
            : (value * goodPriceForOneCredit).toFixed(4)}{" "}
          $GOOD
        </p>
        <QuantityPicker
          width="15rem"
          value={!value ? 1 : value}
          onChange={handleChange}
        />
        <p className="modal_pop">
          All credits are shared within the Commit Good organization.
        </p>
      </div>
    );
  };

  return (
    <>
      <Row className="call-to-action">
        <h2>Now, let&apos;s upload your creation</h2>
        <p
          style={{ fontSize: "1.2rem", marginBottom: "10px" }}
          className="text-justify text-md-left"
        >
          Your file will be uploaded to the decentralized web via Arweave.
          Depending on file type, can take up to 1 minute. Arweave is a new type
          of storage that backs data with sustainable and perpetual endowments,
          allowing users and developers to truly store data forever – for the
          very first time.
        </p>
      </Row>
      <Row className="content-action">
        <h3 className="font-weight-bold">
          Create NFT Using OpenAI <RequiredAttribute />
        </h3>
        <Dragger
          accept=".png,.jpg,.gif,.mp4,.svg"
          style={{ padding: 20, background: "rgba(255, 255, 255, 0.08)" }}
          multiple={false}
          onRemove={() => {
            setMainFile(undefined);
            setCoverFile(undefined);
          }}
          customRequest={(info) => {
            // dont upload files here, handled outside of the control
            info?.onSuccess?.({}, null as any);
          }}
          fileList={coverFile ? [coverFile as any] : []}
          onChange={async (info) => {
            const file = info.file.originFileObj;

            if (!file) {
              return;
            }

            const sizeKB = file.size / 1024;

            if (sizeKB < 25) {
              setCoverArtError(
                `The file ${file.name} is too small. It is ${
                  Math.round(10 * sizeKB) / 10
                }KB but should be at least 25KB.`
              );
              return;
            }

            setCoverFile(file);
            setCoverArtError(undefined);
          }}
        >
          <div className="ant-upload-drag-icon">
            <h3 style={{ fontWeight: 700 }}>
              Upload your creation (PNG) with equal width and height
            </h3>
          </div>
          {coverArtError ? (
            <Text type="danger">{coverArtError}</Text>
          ) : (
            <p className="ant-upload-text" style={{ color: "#6d6d6d" }}>
              Drag and drop, or click to browse
            </p>
          )}
        </Dragger>
      </Row>
      {props.attributes.properties?.category !== MetadataCategory.Image && (
        <Row
          className="content-action"
          style={{ marginBottom: 5, marginTop: 60 }}
        >
          <h3>{uploadMsg(props.attributes.properties?.category)}</h3>
          <Dragger
            accept={acceptableFiles(props.attributes.properties?.category)}
            style={{ padding: 20, background: "rgba(255, 255, 255, 0.08)" }}
            multiple={false}
            customRequest={(info) => {
              // dont upload files here, handled outside of the control
              info?.onSuccess?.({}, null as any);
            }}
            fileList={mainFile ? [mainFile as any] : []}
            onChange={async (info) => {
              const file = info.file.originFileObj;

              // Reset image URL
              setCustomURL("");
              setCustomURLErr("");

              if (file) setMainFile(file);
            }}
            onRemove={() => {
              setMainFile(undefined);
            }}
          >
            <div className="ant-upload-drag-icon">
              <h3 style={{ fontWeight: 700 }}>Upload your creation</h3>
            </div>
            <p className="ant-upload-text" style={{ color: "#6d6d6d" }}>
              Drag and drop, or click to browse
            </p>
          </Dragger>
        </Row>
      )}
      <Row>
        <div className="text-right text-danger font-weight-bold">
          {limit} tries remaining
        </div>
      </Row>
      <Form.Item
        className={"url-form-action"}
        label={<h3> Create NFT Using OpenAI</h3>}
        labelAlign="left"
        colon={false}
        validateStatus={customURLErr ? "error" : "success"}
        help={customURLErr}
      >
        <Input
          disabled={!!mainFile}
          placeholder={query ? query : "Enter Something here"}
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
        />
      </Form.Item>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <Button onClick={limit ? imageuploadfunction : onShow}>
          {limit ? "Create Image" : "Buy Credits"}
        </Button>
      </div>
      <Row className="volunteer_loader">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid">
            {results?.map((item, i) => (
              <div className="card" key={i}>
                <img
                  key={i}
                  className={`imgPreview" ${
                    selectedImg === i ? "img_selected" : ""
                  }`}
                  src={item?.url}
                  onClick={() => handleImageClick(item, i)}
                  onFocus={() => setCustomURLErr("")}
                  onBlur={() => {
                    if (!customURL) {
                      setCustomURLErr("");
                      return;
                    }

                    try {
                      // Validate URL and save
                      new URL(customURL);
                      setCustomURL(customURL);
                      setCustomURLErr("");
                    } catch (e) {
                      console.error(e);
                      setCustomURLErr("Please enter a valid absolute URL");
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Row>

      <Row className="content-action">
        <h3>
          Upload a creation (PNG, JPG, GIF, SVG) <RequiredAttribute />
        </h3>
        <Dragger
          accept=".png,.jpg,.gif,.mp4,.svg"
          style={{ padding: 20, background: "rgba(255, 255, 255, 0.08)" }}
          onRemove={(e) => {
            const filteredImage = coverFileM?.filter((f) => f.name !== e?.name);
            setCoverFileM(filteredImage);
          }}
          customRequest={(info) => {
            // dont upload files here, handled outside of the control
            info?.onSuccess?.({}, null as any);
          }}
          fileList={(coverFileM as any) ?? []}
          onChange={async (info) => {
            const file = info.file.originFileObj;

            if (!file) {
              return;
            }

            const sizeKB = file.size / 1024;

            if (sizeKB < 25) {
              setCoverArtError(
                `The file ${file.name} is too small. It is ${
                  Math.round(10 * sizeKB) / 10
                }KB but should be at least 25KB.`
              );
              return;
            }
            setCoverFileM((prev) => [...prev, file]);
            setCoverArtError(undefined);
          }}
          multiple={false}
        >
          <div className="ant-upload-drag-icon">
            <h3 style={{ fontWeight: 700 }}>
              Upload your creation (PNG, JPG, GIF, SVG)
            </h3>
          </div>
          {coverArtError ? (
            <Text type="danger">{coverArtError}</Text>
          ) : (
            <p className="ant-upload-text" style={{ color: "#6d6d6d" }}>
              Drag and drop, or click to browse
            </p>
          )}
        </Dragger>
      </Row>
      <ModalPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        onContinue={onAddCredit}
        title={"Buy Credits"}
      >
        {modalBody()}
      </ModalPopUp>

      <Row>
        <Button
          type="primary"
          size="large"
          disabled={disableContinue}
          onClick={async () => {
            setLoading(true);
            props.setAttributes({
              ...props.attributes,
              properties: {
                ...props.attributes.properties,
                files: [coverFile, mainFile, customURL]
                  .filter((f) => f)
                  .map((f) => {
                    const uri = typeof f === "string" ? f : f?.name || "";
                    const type =
                      typeof f === "string" || !f
                        ? "unknown"
                        : f.type || getLast(f.name.split(".")) || "unknown";

                    return {
                      uri,
                      type,
                    } as MetadataFile;
                  }),
                merchantFiles: coverFileM
                  .map((f) => f)
                  .filter((f) => f)
                  .map((f) => {
                    const uri = typeof f === "string" ? f : f?.name || "";
                    const type =
                      typeof f === "string" || !f
                        ? "unknown"
                        : f.type || getLast(f.name.split(".")) || "unknown";

                    return {
                      uri,
                      type,
                    } as MetadataFile;
                  }),
              },
              image: coverFile?.name || customURL || "",
              merchantizedImages: coverFileM.map((f) => f.name),
              animation_url:
                props.attributes.properties?.category !==
                  MetadataCategory.Image && customURL
                  ? customURL
                  : mainFile && mainFile.name,
            });
            const url = await fetch(customURL, {
              method: "GET",
              mode: "no-cors",
            }).then((res) => res.blob());
            const files = [
              coverFile,
              mainFile,
              customURL ? new File([url], customURL) : "",
            ].filter((f) => f) as File[];
            const mFiles = coverFileM.map((f) => f).filter((f) => f) as File[];
            props.setMerchantFiles(mFiles);
            props.setFiles(files);
            props.confirm();
            setLoading(false);
          }}
          style={{ marginTop: 24 }}
          className="action-btn"
        >
          Continue to Info
        </Button>
      </Row>
    </>
  );
};

const useArtworkFiles = (
  files: File[],
  attributes: IMetadataExtension,
  merchantFiles: File[]
) => {
  const [data, setData] = useState<{
    image: string;
    animation_url: string;
    merchant_url: string[];
  }>({
    image: "",
    animation_url: "",
    merchant_url: [],
  });

  const handleMerchantizedImages = async (merchantFiles: File[]) => {
    const files = merchantFiles?.filter((f) =>
      attributes?.merchantizedImages?.includes(f.name)
    );

    if (files && files.length > 0) {
      const list: string[] = [...data.merchant_url];
      for await (const file of files) {
        list.push((await uploadFile(file)) as string);
      }

      setData((data: any) => {
        return {
          ...(data || {}),
          merchant_url: list,
        };
      });
    }
  };

  useEffect(() => {
    if (attributes.image) {
      const file = files[1] ?? files[0];
      if (file) {
        setData((data: any) => {
          return {
            ...(data || {}),
            image: (file.name as string) || "",
          };
        });
      }
    }

    if (attributes.animation_url) {
      const file = files.find((f) => f.name === attributes.animation_url);
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          setData((data: any) => {
            return {
              ...(data || {}),
              animation_url: (event.target?.result as string) || "",
            };
          });
        };
        if (file) reader.readAsDataURL(file);
      }
    }
  }, [files, attributes]);

  useEffect(() => {
    if (merchantFiles && merchantFiles.length > 0)
      handleMerchantizedImages(merchantFiles);
  }, [merchantFiles]);

  return data;
};

const InfoStep = (props: {
  attributes: IMetadataExtension;
  files: File[];
  filesMerchant: File[];

  isCollection: boolean;
  setIsCollection: (val: boolean) => void;
  setAttributes: (attr: IMetadataExtension) => void;
  confirm: () => void;
}) => {
  const { image, merchant_url } = useArtworkFiles(
    props.files,
    props.attributes,
    props.filesMerchant
  );
  const [form] = Form.useForm();
  const [selectedCollection /* setSelectedCollection */] = useState<any[]>([]);
  const { price } = useGoodTokenPrice();
  useEffect(() => {
    if (selectedCollection.length) {
      props.setAttributes({
        ...props.attributes,
        collection: selectedCollection[0].metadata.info.mint,
      });
    }
  }, [selectedCollection]);

  return (
    <>
      <Row className="call-to-action">
        <h2>Describe your item</h2>
        <p>
          Provide detailed description of your creative process to engage with
          your audience.
        </p>
      </Row>
      <Row className="content-action" justify="space-around">
        <Row>
          <Col className="imagessection">
            <Row>
              <Col className="art_card_content">
                {props.attributes.image && (
                  <>
                    <img src={image} alt={""} />
                    <p>{props.attributes.name}</p>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              {merchant_url?.slice(0, 2)?.map((item) => (
                <Col className="art_card_content">
                  <img src={item} alt={""} />
                  <p>{props.attributes.name}</p>
                </Col>
              ))}
            </Row>
          </Col>

          <Col
            className="mt-3 feildSection  section mt-md-0"
            style={{ minWidth: 300 }}
          >
            <label className="action-field">
              <span className="field-title">
                Title <RequiredAttribute />
              </span>
              <Input
                autoFocus
                className="input"
                placeholder="Max 50 characters"
                maxLength={50}
                allowClear
                required
                value={props.attributes.name}
                onChange={(info) =>
                  props.setAttributes({
                    ...props.attributes,
                    name: info.target.value,
                  })
                }
              />
            </label>
            <label className="action-field">
              <span className="field-title">
                Price <RequiredAttribute />
              </span>
              <Input
                autoFocus
                className="input"
                type="number"
                placeholder="Max 50 characters"
                min={1}
                allowClear
                required
                value={props.attributes.price}
                onChange={(info) =>
                  props.setAttributes({
                    ...props.attributes,
                    price: +info.target.value,
                  })
                }
              />
              {props.attributes.price && (
                <span className="mt-2">
                  {props.attributes.price + " USDT"} ={" "}
                  {(props.attributes.price / price).toFixed(2) + " (in $GOOD)"}
                </span>
              )}
            </label>
            <label className="action-field">
              <span className="field-title">
                Reward <RequiredAttribute />
              </span>
            </label>
            <Form name="dynamic_attributes" form={form} autoComplete="off">
              <Form.List
                name="attributes"
                initialValue={props.attributes?.attributes ?? []}
              >
                {(fields, { add /* remove */ }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          name={[name, "trait_type"]}
                          rules={[{ required: true, message: "Missing Title" }]}
                          hasFeedback
                        >
                          <Input placeholder="Reward Title" />
                        </Form.Item>
                        <Form.Item
                          name={[name, "value"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Limit",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input type="number" placeholder="Redeem Limit" />
                        </Form.Item>
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Form>
          </Col>
        </Row>
      </Row>

      <Row>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            form.validateFields().then((values) => {
              const nftAttributes = values.attributes;
              if (
                !nftAttributes?.[0]?.trait_type ||
                !nftAttributes?.[0]?.value
              ) {
                return toast.error("Please enter reward to continue", {
                  toastId: "validation",
                });
              }
              // value is number if possible
              for (const nftAttribute of nftAttributes || []) {
                const newValue = Number(nftAttribute.value);
                if (!isNaN(newValue)) {
                  nftAttribute.value = newValue;
                }
              }
              props.setAttributes({
                ...props.attributes,
                attributes: nftAttributes,
              });
              props.confirm();
            });
          }}
          className="action-btn"
        >
          Continue to Mint
        </Button>
      </Row>
    </>
  );
};

const LaunchStep = (props: {
  confirm: () => void;
  attributes: IMetadataExtension;
  files: File[];
  filesMerchant: File[];
}) => {
  const { image } = useArtworkFiles(
    props.files,
    props.attributes,
    props?.filesMerchant
  );
  const [cost] = useState<number | string | undefined>(0.01344);

  return (
    <>
      <Row className="call-to-action">
        <h2>Launch your creation</h2>
        <p>
          Provide detailed description of your creative process to engage with
          your audience.
        </p>
      </Row>
      <Row
        className="content-action mint_content_action"
        justify="space-around"
      >
        <Col className="art_card_content">
          {props.attributes.image && (
            <>
              <img src={image} alt={""} />
              <p>{props.attributes.name}</p>
            </>
          )}
        </Col>

        <Col className="section flex-column" style={{ minWidth: 300 }}>
          <h3 className={"h3"}>Estimated Cost: </h3>
          <strong>{cost ? `~ ${cost} SOL` : "N/A"}</strong>
        </Col>
      </Row>
      <Row>
        <span className="text-danger mb-3 text-center">
          Note: Next transaction will require SOL
        </span>
      </Row>
      <Row>
        <Button
          type="primary"
          size="large"
          onClick={props.confirm}
          className="action-btn"
        >
          pay with MATIC
        </Button>
      </Row>
    </>
  );
};

const WaitingStep = (props: {
  mint: Function;
  minting: boolean;
  confirm: Function;
  step: number;
}) => {
  // useEffect(() => {
  //   const func = async () => {
  //     await props.mint();
  //     props.confirm();
  //   };
  //   func();
  // }, []);

  const setIconForStep = (currentStep: number, componentStep) => {
    if (currentStep === componentStep) {
      return <LoadingOutlined />;
    }
    return null;
  };

  return (
    <div
      style={{
        marginTop: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
      <Card>
        <Steps direction="vertical" current={props.step}>
          <Step
            className={"white-description"}
            title="Uploading"
            description="Starting Uploading Process"
            icon={setIconForStep(props.step, 0)}
          />
          <Step
            className={"white-description"}
            title="Creating"
            icon={setIconForStep(props.step, 1)}
          />
          <Step
            className={"white-description"}
            title="Listing"
            description="Listing"
            icon={setIconForStep(props.step, 2)}
          />
          <Step
            className={"white-description"}
            title="Finalizing"
            description="This will take a few seconds."
            icon={setIconForStep(props.step, 3)}
          />
        </Steps>
      </Card>
    </div>
  );
};

const Congrats = (props: {
  nft?: {
    metadataAccount: StringPublicKey;
  };
  alert?: string;
  project_id: string;
}) => {
  const history = useHistory();

  const newTweetURL = () => {
    const params = {
      text: "I've created a new NFT artwork on Metaplex, check it out!",
      url: `${
        window.location.origin
      }/#/art/${props.nft?.metadataAccount.toString()}`,
      hashtags: "NFT,Crypto,Metaplex",
      related: "Metaplex,Solana",
    };
    const queryParams = new URLSearchParams(params).toString();
    return `https://twitter.com/intent/tweet?${queryParams}`;
  };

  if (props.alert) {
    // TODO  - properly reset this components state on error
    return (
      <>
        <div className="text-white waiting-title">
          Sorry, there was an error!
        </div>
        <p>{props.alert}</p>
        <Button onClick={() => history.push(`/art/create/${props.project_id}`)}>
          Back to Create NFT
        </Button>
      </>
    );
  }
  useEffect(() => {
    setTimeout(() => {
      history.replace(`/project-details/${props.project_id}`);
    }, 2000);
  });
  return (
    <>
      <div
        className="waiting-title"
        style={{ color: "#fff", fontSize: "44px" }}
      >
        NFT is created, Congrats!
      </div>
      <div className="congrats-button-container">
        {/* <Button
          className="metaplex-button"
          onClick={() => window.open(newTweetURL(), "_blank")}
        >
          <span>Share it on Twitter</span>
        </Button> */}
        {/* <Button
          className="metaplex-button"
          onClick={() =>
            history.replace(`/project-details/${props.project_id}`)
          }
        >
          <span>See it in your collection</span>
        </Button> */}
      </div>
    </>
  );
};

export default withAuth(withNftCreator(ArtCreateView));
