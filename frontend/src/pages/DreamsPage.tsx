import { useNavigate } from "react-router-dom";
import { BedSingle } from "lucide-react";

import { Button } from "../components/ui/button";
import DreamList from "../components/Dream/DreamList";

const DreamsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="flex justify-start items-center gap-3 py-5 w-full">
        <BedSingle size={40} />
        <h3 className="font-semibold text-2xl">Your Dreams</h3>
        <Button
          onClick={() => navigate("/dream-create")}
          className="ml-auto"
          variant="destructive"
        >
          Record Your Dream
        </Button>
      </div>
      <DreamList />
    </div>
  );
};

export default DreamsPage;
