import React, { FC, useEffect, useState } from "react";
import { IExtendedNftData } from "../../../../hooks/useMoralis";
import { UserIcon } from "../../../../utils/images";
import { Row } from "react-bootstrap";
import { useGoodTokenPrice } from "../../../../hooks/useGoodPrice";
import { useLocation } from "react-router-dom";
import { Buy } from "../../../artCreate/EtherCall";
import { SaveNftToDB } from "../../../../utils/services/actions/nft";
import { convertToFormData } from "../../../../utils/convert-to-form-data";
import ImageSlider from "../../../../components/ImageSlider/ImageSlider";
import { toast } from "react-toastify";
import { ExtractErrorMessage } from "../../../../utils/ExtractErrorMessage";
import { Loader } from "../../../../shared/Loader/Loader";
import { useMoralis } from "../../../../hooks/useMoralis";

type Props = {
  item: IExtendedNftData;
  setLoadOverLay: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllNfts: () => any;
};

export const NFTCard: FC<Props> = ({ item, fetchAllNfts }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { price: lastPrice } = useGoodTokenPrice();
  const { pathname } = useLocation();
  // const { fetchAllNfts } = useMoralis();
  const [boolean, setBoolean] = useState(false);

  const UpdateNTF = async (txId) => {
    const resp = await SaveNftToDB(
      convertToFormData({
        tx_id: txId.transactionHash,
        mint_id: item.mint_id,
        nft_status: "Purchased",
        id: item.id,
      })
    );
    // if (resp) {
    //   console.log(resp, "kshk");
    //   setBoolean(true);
    // }
  };

  useEffect(() => {
    console.log(boolean);
    if (boolean) {
      setBoolean(false);
    }
  }, [boolean]);

  const buyNft = async () => {
    console.log("inside function start");
    setLoading(true);
    const txId = Buy(item.mint_id, item.price.toString())
      .then((res) => {
        console.log(res, "response");
        if (res?.transactionHash) {
          UpdateNTF(res);

          setTimeout(() => {
            fetchAllNfts();
            setLoading(false);
          }, 2000);

          setTimeout(() => {
            toast.success("Transaction Completed");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err, "find errro");
        return toast.error(ExtractErrorMessage(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  {
    console.log(!pathname.includes("/artworks"));
  }

  return (
    <div className="col-lg-3 col-md-4 c0l-sm-6 mt-3">
      <div className="search-card">
        <div className="card-img project-image">
          <ImageSlider image={item} />
        </div>
        <div className="card-content">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="font-weight-bold">{item.title}</h2>
            <div className="profile-img">
              <img src={UserIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="search-card-footer d-flex justify-content-between align-items-center">
          <div className="w-100 px-4">
            {pathname.includes("/artworks") && (
              <Row className="card-reward mb-2">
                <span className="text-dark " style={{ fontSize: "12px" }}>
                  Charity Name:
                </span>

                <span style={{ fontSize: "12px" }}>{item.charity_name}</span>
              </Row>
            )}
            <Row className="card-reward">
              <span className="text-dark ">Reward</span>

              <span>{item.reward_title}</span>
            </Row>
            <Row className="card-reward pt-2">
              <span className=" text-dark ">Limit</span>

              <span>{item.redeem_limit}</span>
            </Row>

            <Row className="card-reward pt-3">
              <span className="text-dark font-weight-bold">Price </span>
              {item.price && lastPrice && (
                <span className="price-total text-dark font-weight-bold">
                  {(item?.price / lastPrice).toFixed(2)} $GOOD
                </span>
              )}
            </Row>
          </div>
          {/* )} */}
        </div>

        {loading && <Loader />}

        {!pathname.includes("/artworks") && (
          <div className="create-nft-card-btn">
            <button onClick={buyNft}>BUY</button>
          </div>
        )}
      </div>
    </div>
  );
};
