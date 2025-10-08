import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, userLogout } from "@/services/auth.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, UserCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function NavUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: userLogoutApi } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], undefined);
      navigate("/login");
      toast.success("Logout Successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <>
      <div className="font-semibold">{user?.user_metadata?.name}</div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="h-9 w-9 rounded-full relative overflow-hidden">
            <img
              src={user?.user_metadata?.userImage || "img/default-user.jpg"}
              alt="user"
              className="h-full w-full absolute cursor-pointer"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={"/account"}>
            <DropdownMenuItem className="cursor-pointer">
              <UserCircle2 />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => userLogoutApi()}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
