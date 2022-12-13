import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { CampaignVolunteers } from "../../../interfaces/project";
import HeroSection from "../../../layouts/hero-section";
import { VolunteerCard } from "./components/volunteer-card";
import {
  clearHours,
  volunteerTasksApi,
} from "../../../utils/services/actions/campaigns";
import { useParams } from "react-router-dom";
import withAuth from "../../../hoc/with-auth";
import withVolunteerRole from "../../../hoc/with-volunteer-role";
import { Button, Row } from "react-bootstrap";
import {
  withdrawEscrowTokens,
  checkEscrow,
  createEscrow,
} from "../../artCreate/calls";
import { toast } from "react-toastify";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader } from "../../../shared/Loader/Loader";
import { WithdrawVolunteer } from "../../artCreate/EtherCall";
import { ExtractErrorMessage } from "../../../utils/ExtractErrorMessage";

export const VolunteersTasks = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [volunteers, setVolunteers] = useState<CampaignVolunteers[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalHours, setTotalHours] = useState<number>(0);

  const [transactionStatus, setTransactionStatus] = useState(false);
  const getVolunteers = useCallback(
    async (fetching: boolean) => {
      setLoading(true);
      const data = (await volunteerTasksApi().finally(() => {
        setLoading(false);
      })) as unknown as {
        volunteers: CampaignVolunteers[];
        working_hours: number;
      };
      if (fetching) {
        setTotalHours(data.working_hours);
        setVolunteers(data.volunteers);
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
      <Loader />
    </div>
  ) : null;

  const NoTask =
    !loading && !volunteers.length ? (
      <div className="text-center h3">
        <h3>No Tasks Applied</h3>
      </div>
    ) : null;

  const withDraw = async () => {
    if (transactionStatus) return;

    setLoading(true);
    await WithdrawVolunteer()
      .then((res) => {
        if (res) {
          setTransactionStatus(true);
          toast.success("Sent successfully", {
            toastId: "volunteer-application",
          });
          clearHours().then((res) => {
            console.log(res, "res here");
          });
        }
      })
      .catch((err) => toast.error(ExtractErrorMessage(err)))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="main">
      <HeroSection heading="Tasks" />

      <section className="search-results-section">
        <div className="container">
          {LoadingData}
          {NoTask}
          {totalHours > 40 ? (
            <div className="text-right">
              <React.Fragment>
                <Button
                  onClick={withDraw}
                  style={{ width: "273px" }}
                  disabled={transactionStatus || !totalHours}
                >
                  {" "}
                  Withdraw from escrow
                </Button>
              </React.Fragment>
            </div>
          ) : (
            ""
          )}
          <Row>
            {volunteers.map((item) => (
              <VolunteerCard {...item} key={item.id} />
            ))}
          </Row>
        </div>
      </section>
    </main>
  );
};

export default withAuth(withVolunteerRole(VolunteersTasks));
