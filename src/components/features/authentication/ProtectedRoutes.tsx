import Spinner from "@/components/my-ui/Spinner";
import { getUser } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/login");
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (!isLoading && data) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoutes;
