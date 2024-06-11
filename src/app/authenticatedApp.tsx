"use client";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedApp = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }

  return <>{children}</>;
};

export default AuthenticatedApp;
