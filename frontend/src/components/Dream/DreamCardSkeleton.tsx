import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const DreamCardSkeleton = () => {
  return (
    <Card className="relative w-full max-w-2xs pt-0">
      <CardContent className="p-0">
        <div className="flex justify-between items-start p-4 bg-black/35 hover:bg-black/50 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="w-7 h-7 rounded-full bg-muted" />

              <Skeleton className="h-6 w-[100px] rounded-full bg-muted" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-[100px] rounded-full bg-muted" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-[100px] rounded-full bg-muted" />
            <Skeleton className="h-6 w-[100px] rounded-full bg-muted" />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="truncate">
          <Skeleton className="h-4 w-[140px] rounded-full bg-muted" />
        </CardTitle>
        <CardDescription className="truncate">
          <Skeleton className="h-4 w-full rounded-full bg-muted" />
        </CardDescription>
        <div className="flex w-full justify-start items-center gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-[50px] rounded-full bg-muted"
            />
          ))}
        </div>
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-10 w-10 bg-muted" />
      </CardFooter>
    </Card>
  );
};

export default DreamCardSkeleton;
