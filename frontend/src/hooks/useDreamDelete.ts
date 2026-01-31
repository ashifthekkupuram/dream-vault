import { useState } from "react";
import { UseAuthenticatedAxios } from "../api/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { DreamType } from "../types/dream.type";
import { authClient } from "../lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDreamDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axios = UseAuthenticatedAxios();
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const deleteDream = async (dreamId: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/dream/${dreamId}`);
      toast.success("Dream has been deleted");
      queryClient.invalidateQueries({ queryKey: ["dreams", session?.user.id] });
    } catch (error) {
      setError(
        error instanceof AxiosError
          ? error.response?.data.message || "Internal Server Error"
          : "Internal Server Error",
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteDream };
};

export default useDreamDelete;
