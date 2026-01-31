import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { AxiosError } from "axios";

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

  const { data, isFetching, error } = useQuery({
    queryKey: ["dreams", session?.user.id],
    queryFn: async () => {
      try {
        const response = await axios.get("/dream");
        return response.data.data;
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data.message || "Internal Server Error"
            : "Internal Server Error";
        throw new Error(errorMessage);
      }
    },
  });

  return (
    <div className="flex flex-col w-full gap-5">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      {isFetching ? (
        <div className="flex flex-row justify-start items-center overflow-hidden gap-3 px-5">
          {[1, 2, 3, 4].map((_, index) => (
            <DreamCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div
          className={cn(
            "flex justify-center items-center w-full mt-10 text-destructive capitalize text-xl font-light",
          )}
        >
          {error.message}
        </div>
      ) : data && data.length > 0 ? (
        <div className="flex flex-row justify-start items-center flex-wrap gap-3 px-5">
          {data.map((dream: DreamType) => (
            <DreamCard key={dream.id} {...dream} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-10 capitalize text-xl font-light">
          No Dreams has been recorded
        </div>
      )}
    </div>
  );
};

export default DreamList;
