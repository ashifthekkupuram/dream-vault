import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";

import type { DreamType } from "../../types/dream.type";
import DreamDeleteModal from "./DreamDeleteModal";
import HTMLTagsRemover from "../../utils/html-tags-remover";
import { EMOJIES } from "../../types/dream.type";

const DreamCard = (dream: DreamType) => {
  const navigate = useNavigate();

  return (
    <Card className="relative w-full max-w-2xs pt-0 hover:scale-101 transition-all">
      <CardContent className="p-0">
        <div
          onClick={() => navigate(`/dream/${dream.id}`)}
          className="flex justify-between items-start p-4 bg-black/35 hover:bg-black/50 cursor-pointer w-full"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="text-lg">{EMOJIES[dream.mood]}</span>
              <span className="text-sm font-semibold">{dream.mood}</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="destructive" className="font-semibold">
                {dream.isLucid ? "LUCID" : "NOT LUCID"}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="ml-auto">
              {format(dream.dreamedOn, "dd/MM/yyyy hh:mm aa")}
            </Badge>
            <Badge className="ml-auto" variant="secondary">
              {dream.emotion}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardDescription>
          <div className="line-clamp-2 font-medium text-sm">
            {HTMLTagsRemover(dream.content)}
          </div>
        </CardDescription>
        <div className="flex w-full justify-start items-center gap-2 overflow-hidden">
          {dream.tags.map((tag, index) => (
            <Badge key={index} className="capitalize" variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardFooter>
        <DreamDeleteModal dreamId={dream.id} />
      </CardFooter>
    </Card>
  );
};

export default DreamCard;
