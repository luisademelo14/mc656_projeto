"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserSession from "@/src/components/UserSession";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure this code runs on the client side
      const session = UserSession.getInstance();
      const authStatus = session.isUserAuthenticated();
      setIsAuthenticated(authStatus);

      if (!authStatus) {
        router.push("/password/login");
      }
    }
  }, [router]);

  // Only render children if authenticated (client-side)
  return <>{isAuthenticated && children}</>;
};

export default AuthGuard;
