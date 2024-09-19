import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ProductCardSkeleton() {
    return (
      <Card className="flex flex-col p-4">
        <Skeleton className="w-full h-48 rounded-md mb-4" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4 mt-2" />
      </Card>
    );
  }