import { useState } from "react";
import type z from "zod";

import { UseAuthenticatedAxios } from "../api/axios";
import type { dreamScheme } from "../schemas";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useDreamCreate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axios = UseAuthenticatedAxios();

  const navigate = useNavigate()

  const createDream = async (values: z.infer<typeof dreamScheme>) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/dream", {
        ...values,
        dreamedOn: new Date(values.dreamedOn),
      });
      navigate("/dreams")
      toast.success("Dream has been recorded");
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

  return { loading, error, createDream };
};

export default useDreamCreate;
