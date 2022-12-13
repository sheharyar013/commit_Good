import React, { memo, useCallback, useEffect, useState } from "react";
import { IProject } from "../interfaces/project";
import { getSessionUser } from "../utils/auth";
import { getCampaigns } from "../utils/services/actions";

type SearchResultsProps = {
  country: string;
  projectName: string;
  isHome?: boolean;
  filterMyProjects?: boolean;
};

export function useCompaignList() {
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
  const onPageChange = useCallback(() => {
    setLoading(true);
    getCampaigns("", "", page)
      .then((resp: any) => {
        if (resp.success) {
          if (!resp?.data?.length) {
            setHasMore(false);
            return;
          }
          setList((prev) => {
            const newProjects = resp.data?.filter(
              (item: any) => item.user_id === getSessionUser()?.id
            );
            return [...prev, ...newProjects];
          });
          setProjects((prev) => [...prev, ...resp.data]);
          setHasMore(true);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [page]);
  return { onPageChange, list, onLoadMore, page };
}
