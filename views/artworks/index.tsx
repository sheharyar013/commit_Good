import React, { useEffect, useState } from "react";
import { useMoralis } from "../../hooks/useMoralis";
import { NFTCard } from "./components/ItemCard/item";
import { Container, Row } from "react-bootstrap";
import { Loader } from "../../shared/Loader/Loader";
import { loaderOverlayStyle } from "../../constants/constants";
import { useCompaignList } from "../../hooks/useCompaign";

export const MyArtWorks = ({ pubKey }: { pubKey?: string }) => {
  const [loadOverLay, setLoadOverLay] = useState(false);
  const nftPerRow = 4;
  const [next, setNext] = useState(nftPerRow);
  const { onPageChange, list, onLoadMore, page } = useCompaignList();
  const { fetchAllNfts, loading, listedNftBE } = useMoralis(pubKey);

  const handleMoreNfts = () => {
    setNext((prev) => prev + nftPerRow);
  };

  useEffect(() => {
    fetchAllNfts();
  }, []);

  useEffect(() => {
    onPageChange();
  }, [page]);

  if (loading && !listedNftBE.length) {
    return <h3 className="nft-loading">Loading....</h3>;
  }

  if (!listedNftBE.length) {
    return (
      <Container>
        <h3 className="nft-loading">
          No NFT is associated with this {pubKey ? "Project" : "Wallet"}
        </h3>
      </Container>
    );
  }

  return (
    <Container className="conatiner_loader">
      {loadOverLay ? <Loader style={loaderOverlayStyle} /> : null}
      <Row className="pb-4">
        {listedNftBE?.slice(0, next)?.map((item) => (
          <NFTCard
            item={item}
            key={item.mint_id}
            setLoadOverLay={setLoadOverLay}
            fetchAllNfts={fetchAllNfts}
          />
        ))}
      </Row>
      {next < listedNftBE?.length && (
        <div className="text-center mt-4 mb-3">
          <button
            type="button"
            className="btn-connect-wallet p-3"
            onClick={handleMoreNfts}
          >
            Load More
          </button>
        </div>
      )}
    </Container>
  );
};
