import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { UseAuthenticatedAxios } from "../../api/axios";
import type { DreamType } from "../../types/dream.type";
import { authClient } from "../../lib/auth-client";
import { cn } from "../../lib/utils";
import DreamCard from "./DreamCard";
import DreamCardSkeleton from "./DreamCardSkeleton";

const DreamList = () => {
  const axios = UseAuthenticatedAxios();

  const { data: session } = authClient.useSession();

  const { inView, ref } = useInView({});

  const {
    data,
    isFetching,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["dreams", session?.user.id],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get("/dream", {
        params: {
          page: pageParam,
          limit: 12,
        },
      });

      return response.data.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 12 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex flex-col w-full gap-5">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-row justify-start items-center flex-wrap gap-3 px-5">
        {data && data.pages.length > 0 && (
          <>
            {data.pages.map((dreams, index) => (
              <React.Fragment key={index}>
                {dreams.map((dream: DreamType) => (
                  <DreamCard key={dream.id} {...dream} />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && <div ref={ref} />}
          </>
        )}
        {isFetching || isFetchingNextPage ? (
          <>
            {[1, 2, 3, 4].map((_, index) => (
              <DreamCardSkeleton key={index} />
            ))}
          </>
        ) : null}
        {data?.pages.flat().length === 0 &&
          !isFetching &&
          !isFetchingNextPage && (
            <div className="flex justify-center items-center w-full mt-10 capitalize text-xl font-light">
              No Dreams has been recorded
            </div>
          )}
        {error && (
          <div
            className={cn(
              "flex justify-center items-center w-full mt-10 text-destructive capitalize text-xl font-light",
            )}
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamList;
