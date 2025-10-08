import { Skeleton } from "@/components/ui/skeleton";

function SettingsFormSkeleton() {
  return (
    <div className="space-y-6 flex flex-col">
      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-10 max-w-lg flex-1 rounded-xl" />
      </div>

      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-10 max-w-lg flex-1 rounded-xl" />
      </div>

      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-10 max-w-lg flex-1 rounded-xl" />
      </div>

      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-10 max-w-lg flex-1 rounded-xl" />
      </div>

      <div className="flex justify-end mt-3 md:mr-12">
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export default SettingsFormSkeleton;
