import { Trash, Trash2Icon } from "lucide-react";
import useDreamDelete from "../../hooks/useDreamDelete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type PropsType = {
  dreamId: string;
};

const DreamDeleteModal = ({ dreamId }: PropsType) => {
  const { loading, deleteDream } = useDreamDelete();

  const onDelete = () => {
    deleteDream(dreamId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete dream?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this dream record. View{" "}
            <a href="#">Settings</a>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size="" variant="">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction size="" variant="destructive" onClick={onDelete}>
            {loading ? "Loading..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DreamDeleteModal;
