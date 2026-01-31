import { useState } from "react";
import { UseAuthenticatedAxios } from "../api/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useDreamDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axios = UseAuthenticatedAxios();

  const deleteDream = async (dreamId: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/dream/${dreamId}`);
      toast.success("Dream has been deleted");
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
