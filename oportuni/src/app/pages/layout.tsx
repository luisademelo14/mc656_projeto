// app/layout.tsx
import { ReactNode } from "react";
import AuthGuard from "@/src/components/AuthGuard"; // Import the AuthGuard component

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div>{children}</div> {/* All page content will be rendered inside this div */}
    </AuthGuard>
  );
}