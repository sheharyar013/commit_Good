import { ethers } from "ethers";
import { toast } from "react-toastify";

const nftAbi = [
  "function safeMint(address to, string memory uri) public",
  "event NFTMinted(uint256 nftId)",
];

const marketplaceAbi = [
  "function buyNft(address _nftContract, uint256 _tokenId) public payable nonReentrant",
  `function listNft(address _nftContract,address _charity, address _charityCoordinator,address _platform,uint256 _tokenId, uint256 _price) public payable nonReentrant `,
];

const newMarketplaceAbi = [
  "function transferVolunteer(address _volunteerAddress, uint256 _award) public payable",
  "function withdrawVolunteer() public payable",
];

const tokenAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint amount) external returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// const nftUri = //add as an argument
//   "https://commit-good-images-charity-staging.s3.amazonaws.com/meta.json";

export const Mint = async (nftUri) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    const nftContract = new ethers.Contract(
      "0x56867081f2e138bcea7fb417d4a169022f5d82cc",
      nftAbi,
      signer
    );

    const tx = await nftContract.safeMint(signerAddress, nftUri);

    const moreinfo = await tx.wait();
    const nftId = moreinfo.events
      .filter((elem) => elem.event == "NFTMinted")[0]
      .args.nftId.toNumber();
    // .filter((elem) => elem.event == "NFTMinted")[0]
    // .data.toNumber();
    console.log("mintgotit=", nftId);
    console.log("transaction", tx);
    console.log("moreinfo", moreinfo);
    //   console.log("address:", nftContract.address);
    return nftId;
  } catch (error) {
    throw new Error(error);
  }
};

export const List = async (
  charityAddress,
  charityCoordinatorAddress,
  platformAddress,
  nftId,
  price
) => {
  console.log(
    charityAddress,
    charityCoordinatorAddress,
    platformAddress,
    nftId,
    price,
    "list rops"
  );
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wei = 1000000000000000000;

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    const marketplaceContract = new ethers.Contract(
      "0x824cbd9392f1280A801eb1Fb77006600cE7d037e",
      marketplaceAbi,
      signer
    );

    const nftContractAddress = "0x56867081f2e138bcea7fb417d4a169022f5d82cc";

    const convertedPrice = price * wei;
    const tx = await marketplaceContract.listNft(
      nftContractAddress,
      charityAddress,
      charityCoordinatorAddress,
      platformAddress,
      nftId,
      convertedPrice.toString()
    );

    const moreinfo = await tx.wait();

    console.log("transaction", tx);
    console.log("moreinfo", moreinfo);
    return moreinfo.transactionHash;
    //   console.log("address:", nftContract.address);
  } catch (error) {
    throw new Error(error);
  }
};

export const Buy = async (nftId, price) => {
  console.log(nftId, "nftid");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      "0x824cbd9392f1280A801eb1Fb77006600cE7d037e",
      marketplaceAbi,
      signer
    );

    const nftContractAddress = "0x56867081f2e138bcea7fb417d4a169022f5d82cc";
    const tokenAddress = "0xDbD13de8A4a1ec7012c7fD717e3F3c0A2dBaFF36";
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    const nftprice = ethers.utils.parseEther(price);

    const approvetx = await tokenContract.approve(
      "0x824cbd9392f1280A801eb1Fb77006600cE7d037e",
      nftprice
    );

    const approveinfo = await approvetx.wait();

    const tx = await marketplaceContract.buyNft(nftContractAddress, nftId);

    const moreinfo = await tx.wait();

    console.log("transaction", tx);
    console.log("moreinfo", moreinfo);
    // if (moreinfo.transactionHash) return toast.info('Transaction Completed')
    return moreinfo;
    //   console.log("address:", nftContract.address);
  } catch (error) {
    throw new Error(error.message);
    // return error
  }
};

export const Send = async (Address, Value) => {
  console.log(Address, Value);
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const tokenAddress = "0xDbD13de8A4a1ec7012c7fD717e3F3c0A2dBaFF36";

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    const sendValue = ethers.utils.parseEther(Value);

    const tx = await tokenContract.transfer(Address, sendValue);

    const moreinfo = await tx.wait();

    console.log("transaction", tx);
    console.log("moreinfo", moreinfo);

    //   console.log("address:", nftContract.address);
    return moreinfo.transactionHash;
  } catch (error) {
    throw new Error(error);
  }
};

export const WithdrawVolunteer = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const tokenAddress = "0xDbD13de8A4a1ec7012c7fD717e3F3c0A2dBaFF36";
    const newMarketPlaceAddress = "0xB1460f24F0fB67c5B7C2D1D9F1602f244365f845";
    const marketplaceContract = new ethers.Contract(
      newMarketPlaceAddress,
      newMarketplaceAbi,
      signer
    );
    console.log("withdrawing");
    const tx = await marketplaceContract.withdrawVolunteer();
    const moreinfo = await tx.wait();
    console.log("transaction", tx);
    console.log("moreinfo", moreinfo);
    //   console.log("address:", nftContract.address);
    return moreinfo.ListtransactionHash;
  } catch (error) {
    throw new Error(error.message);
  }
};
