import React, { useCallback, useEffect, useState } from "react";
import {
  getAppliedVolunteers,
  getPaidStaus,
} from "../../../utils/services/actions/campaigns";

import { useParams } from "react-router-dom";
import { getSessionUser } from "../../../utils/auth";
import { toast } from "react-toastify";
import { UserIcon } from "../../../utils/images";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { sendVolunteersToken } from "../../artCreate/calls";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { Loader } from "../../../shared/Loader/Loader";
export const VolunteerApplied = () => {
  const { id } = useParams();
  const [volunteers, setVolunteers] = useState([]);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);

  const getVolunteers = useCallback(
    async (fetching) => {
      setLoading(true);
      const data = await getAppliedVolunteers(id, true).finally(() => {
        setLoading(false);
      });
      if (fetching) {
        setResponse(data);
        setVolunteers(data.volunteer_appliers);
      }
    },
    [id]
  );
  useEffect(() => {
    let fetching = true;
    getVolunteers(fetching);
    return () => {
      fetching = false;
    };
  }, []);

  const LoadingData = loading ? (
    <div className="text-center h4">
      <h4>Loading...</h4>
    </div>
  ) : null;

  const NoData =
    !loading && !volunteers.length ? (
      <div className="text-center h3">
        <h3>No Volunteer applied for this campaign</h3>
      </div>
    ) : null;

  if (
    ![response.campiagn_admin_id, response.campaign_coordinator].includes(
      getSessionUser().id
    )
  ) {
    return <></>;
  }

  return (
    <div className="ml-3 mt-4 volunteer_loader">
      {loadingCard === true ? <Loader /> : ""}
      <h4 className="text-dark h4 ml-2">Volunteers Applied</h4>

      <section className={`search-results-section`}>
        <div>
          {LoadingData}
          {NoData}
          <div className="row">
            {volunteers.map((item) => (
              <VolunteerCard
                {...item}
                key={item.id}
                setLoadingCard={setLoadingCard}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
    // </main>
  );
};

export const VolunteerCard = ({
  name,
  wallet_address,
  hours,
  payed,
  image,
  campiagn_id,
  volunteer_id,
  setLoadingCard,
  ...props
}) => {
  const [applied, setApplied] = useState(!!payed);
  const [loading, setLoading] = useState(false);
  const [paidStatus, setPaidStatus] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const wallet = useWallet();

  useEffect(() => {
    if (transactionStatus) {
      getPaidStaus(campiagn_id, volunteer_id).then((res) => {
        setPaidStatus(!!res?.success);
      });
    }
  }, [transactionStatus]);

  const apply = async () => {
    setLoadingCard(true);
    if (!wallet.publicKey) {
      return toast.info("Please connect your wallet first", {
        toastId: "volunteer-application",
      });
    }
    if (!wallet_address) {
      return toast.info(
        "Please ask the user to update wallet address by going to profile or home",
        {
          toastId: "volunteer-application",
        }
      );
    }
    if (loading || paidStatus || applied || !wallet_address) {
      return;
    }
    setLoading(true);
    sendVolunteersToken(connection, wallet, wallet_address, 1)
      .then(() => {
        setLoadingCard(false);
        setApplied(true);
        setTransactionStatus(true);
        toast.success("Sent successfully", {
          toastId: "volunteer-application",
        });
      })
      .catch((err) => {
        setApplied(false);
        toast.error(`Error: ${err?.message ?? err}`, {
          toastId: "volunteer-application",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-3 col-lg-3 col-md-4 col-sm-6">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      ></div>
      <div className="search-card">
        <div className="card-content">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{name}</h2>
            <div className="profile-img">
              <img src={image?.includes("missing") ? UserIcon : image} alt="" />
            </div>
          </div>
          <p>{wallet_address.slice(0, 8) + "..."}</p>
        </div>
        <div className="search-card-footer d-flex justify-content-between align-items-center">
          <h4>
            <span>Hours: </span>
            <span className="price-total">{hours}</span>
          </h4>
        </div>
        <div>
          {!props?.ready_for_reward ? (
            <h6 className="text-danger text-center">
              10% funded GOOD token rewards are not issued yet.
            </h6>
          ) : (
            ""
          )}
        </div>
        {/* <div className="create-nft-card-btn">
          <button
            type="button"
            onClick={apply}
            disabled={applied || paidStatus || !props?.ready_for_reward}
          >
            {applied || paidStatus ? "Paid" : "Transfer Funds"}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VolunteerApplied;
