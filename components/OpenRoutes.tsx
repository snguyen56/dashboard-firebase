import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function OpenRoutes({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);
  return <>{!user ? children : null}</>;
}
