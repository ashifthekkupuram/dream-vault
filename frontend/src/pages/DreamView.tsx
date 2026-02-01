import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Spinner } from "../components/ui/spinner";

import { EMOJIES, type MoodType } from "../types/dream.type";
import { UseAuthenticatedAxios } from "../api/axios";
import { cn } from "../lib/utils";
import ContentViewer from "../components/ContentViewer";

const DreamView = () => {
  const { dreamId } = useParams();

  const axios = UseAuthenticatedAxios();
  const navigate = useNavigate();

  const {
    data: dream,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["dream", dreamId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/dream/${dreamId}`);
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
    <div className="container mx-auto">
      <div className="flex justify-start items-center gap-3 py-5 w-full">
        <Button onClick={() => navigate("/dreams")} variant="ghost">
          {" "}
          <ArrowLeft />{" "}
        </Button>
        <h3 className="font-semibold text-2xl">View Dream</h3>
        {dream && (
          <Button
            onClick={() => navigate(`/dream-edit/${dream.id}`)}
            className="ml-auto"
            variant="default"
          >
            {" "}
            <Pencil />{" "}
          </Button>
        )}
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center w-full mt-10">
          <Spinner className="size-10" />
        </div>
      ) : error ? (
        <div
          className={cn(
            "flex justify-center items-center w-full mt-10 text-destructive capitalize text-xl font-light",
          )}
        >
          {error.message}
        </div>
      ) : dream ? (
        <div className="flex flex-col justify-center items-start gap-2 px-6 md:px-12">
          {/* Showing Mood, Emotion, Lucid or Not */}
          <div className="flex justify-start items-center gap-1">
            {/* Showing Mood */}
            <Badge variant="secondary">
              <span className="text-lg">{EMOJIES[dream.mood as MoodType]}</span>
              <span className="text-md mx-1 font-semibold">{dream.mood}</span>
            </Badge>
            {/* Showing Emoji */}
            <Badge variant="secondary">
              <span className="text-lg">💭</span>
              <span className="text-md mx-1 font-semibold">
                {dream.emotion}
              </span>
            </Badge>
            {/* Showing Lucid or Not */}
            <Badge variant="secondary">
              <span className="text-lg">🔮</span>
              <span className="text-md mx-1 font-semibold">
                {dream.isLucid ? "Lucid" : "Not Lucid"}
              </span>
            </Badge>
          </div>
          {/* Showing All The Tags */}
          <div className="flex justify-start items-center flex-wrap gap-1 mt-2">
            {dream.tags.map((tag: string) => (
              <Badge className="capitalize" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          {/* Showing Dreamed On */}
          <span className="text-xs mt-2">
            Dreamed At{" "}
            <span className="font-semibold">
              {format(dream.dreamedOn, "do MMMM yyyy, hh:mm aa")}
            </span>
          </span>
          {/* Showing Content */}
          <ContentViewer editorState={dream.content} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-10 capitalize text-xl font-light">
          Could not get dream
        </div>
      )}
    </div>
  );
};

export default DreamView;
