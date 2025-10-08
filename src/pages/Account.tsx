import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import EditUserAccountForm from "@/components/features/authentication/EditUserAccountForm";
import EditUserPasswordForm from "@/components/features/authentication/EditUserPasswordForm";

function Account() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-4 dark:text-gray-100">
          User Account
        </h1>
        <Card className="shadow-lg border border-zinc-200 dark:border-none dark:bg-zinc-900">
          <CardHeader>
            <CardDescription className="text-base text-zinc-600 mb-3">
              Manage your account here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditUserAccountForm />
          </CardContent>
        </Card>
      </div>
      <div>
        <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-4 dark:text-gray-100">
          Password
        </h1>
        <Card className="shadow-lg border border-zinc-200 dark:bg-zinc-900 dark:border-none">
          <CardHeader>
            <CardDescription className="text-base text-zinc-600 mb-3">
              Manage your password here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditUserPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Account;
