import SettingsForm from "@/components/features/settings/SettingsForm";
import SettingsFormSkeleton from "@/components/my-ui/SettingFormSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import useSettings from "@/hooks/settings-hooks/useSettings";

function Setting() {
  const { data, isError, isLoading, isSuccess } = useSettings();

  return (
    <>
      <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-4 dark:text-gray-100 ">
        Hotel Settings
      </h1>
      <Card className="shadow-lg border border-zinc-200 dark:bg-zinc-900 dark:border-none">
        <CardHeader>
          <CardDescription className="text-base text-zinc-600 mb-3 dark:text-gray-100">
            Manage your hotel settings here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <SettingsFormSkeleton />}
          {isError && (
            <p className="text-red-500 font-medium">
              Failed to fetch settings!
            </p>
          )}
          {isSuccess && data && <SettingsForm defaultData={data} />}
        </CardContent>
      </Card>
    </>
  );
}

export default Setting;
