import React, { memo, useCallback, useEffect, useState } from "react";
import { getSessionUser } from "../../utils/auth";

import { IProject } from "../../interfaces/project";
import PropTypes from "prop-types";
import { getCampaigns } from "../../utils/services/actions";
import { ProjectCard } from "./components/projects-card";

type SearchResultsProps = {
  country: string;
  projectName: string;
  isHome?: boolean;
  filterMyProjects?: boolean;
};

function SearchResults({
  country,
  projectName,
  isHome,
  filterMyProjects,
}: SearchResultsProps) {
  const [list, setList] = useState<IProject[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const onLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  /**
   *
   * @param {boolean} fetching
   */
  const populateCampaigns = (fetching: boolean) => {
    if (!fetching || loading) {
      return;
    }
    setPage(1);
    setLoading(true);
    getCampaigns(country, projectName)
      .then((resp: any) => {
        if (resp.success && fetching) {
          if (!resp?.data?.length) {
            setHasMore(false);
            setList([]);
            setProjects([]);
            return;
          }
          setList(
            filterMyProjects
              ? resp.data?.filter(
                  (item: any) => item.user_id === getSessionUser()?.id
                )
              : resp.data
          );
          setProjects(resp.data);
          setHasMore(true);
        }
      })
      .catch((error) => {
        if (fetching) console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPageChange = useCallback(
    (fetchingData: boolean) => {
      if (!fetchingData || page === 1 || loading) {
        return;
      }
      setLoading(true);
      getCampaigns(country, projectName, page)
        .then((resp: any) => {
          if (resp.success && fetchingData) {
            if (!resp?.data?.length) {
              setHasMore(false);
              return;
            }
            setList((prev) => {
              const newProjects = filterMyProjects
                ? resp.data?.filter(
                    (item: any) => item.user_id === getSessionUser()?.id
                  )
                : resp.data;
              return [...prev, ...newProjects];
            });
            setProjects((prev) => [...prev, ...resp.data]);
            setHasMore(true);
          }
        })
        .catch((error) => {
          if (fetchingData) console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [page]
  );

  useEffect(() => {
    let fetching = true;
    populateCampaigns(fetching);

    return () => {
      fetching = false;
    };
    //eslint-disable-next-line
  }, [country, projectName]);

  useEffect(() => {
    let fetchData = true;
    onPageChange(fetchData);

    return () => {
      fetchData = false;
    };
  }, [page]);

  useEffect(() => {
    setList(
      filterMyProjects
        ? [...projects.filter((item) => item.user_id === getSessionUser()?.id)]
        : [...projects]
    );
  }, [filterMyProjects]);

  const isLoading = loading ? "Loading..." : "Load More";

  if (!list.length) {
    return (
      <div className="text-center mb-4 text-dark h3">
        No Project Found
        {!isHome && hasMore && filterMyProjects ? (
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn-connect-wallet p-3"
              onClick={onLoadMore}
              disabled={!hasMore}
            >
              {isLoading}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  const listProjects = () => {
    const projectsList = isHome ? list.slice(0, 4) : list;
    return projectsList.map((campaign) => (
      <ProjectCard
        filterMyProjects={filterMyProjects}
        campaign={campaign}
        key={campaign.id}
      />
    ));
  };

  return (
    <section className="search-results-section">
      <div className="container">
        <div className="row">{listProjects()}</div>
        {!isHome && hasMore ? (
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn-connect-wallet p-3"
              onClick={onLoadMore}
              disabled={!hasMore}
            >
              {isLoading}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

SearchResults.propTypes = {
  country: PropTypes.string,
  filterMyProjects: PropTypes.bool,
  isHome: PropTypes.bool,
  projectName: PropTypes.string,
};

export default memo(SearchResults);
