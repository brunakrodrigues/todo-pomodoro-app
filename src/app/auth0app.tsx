"use client";

import AuthenticatedApp from "@/app/authenticatedApp";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Auth0App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <Auth0Provider
    domain="todo-0ktbc4ol4s0x7mfe.us.auth0.com"
    clientId="rJuZ5wk0Ap9rCZRFz20DxjBq6sPmoSzO"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "http://localhost:8000",
    }}
  >
    <QueryClientProvider client={queryClient}>
      <AuthenticatedApp>{children}</AuthenticatedApp>
    </QueryClientProvider>
  </Auth0Provider>
);

export default Auth0App;
