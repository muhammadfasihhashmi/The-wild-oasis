import UserSignupForm from "@/components/features/authentication/userSignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

function Users() {
  return (
    <>
      <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-4 dark:text-gray-100">
        Create New User
      </h1>
      <Card className="shadow-lg border dark:bg-zinc-900 dark:border-none">
        <CardHeader>
          <CardDescription className="text-base text-zinc-600 mb-3 dark:text-gray-100">
            Manage your employees here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserSignupForm />
        </CardContent>
      </Card>
    </>
  );
}

export default Users;
