// components/AuthGuard.tsx
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
    // Check if the user is authenticated from UserSession
    const session = UserSession.getInstance();
    const authStatus = session.isUserAuthenticated();
    setIsAuthenticated(authStatus);

    // Redirect to login if not authenticated
    if (!authStatus) {
      router.push("/password/login");
    }
  }, [router]);

  // Render children if authenticated; otherwise, redirecting will occur
  return <>{isAuthenticated && children}</>;
};

export default AuthGuard;
