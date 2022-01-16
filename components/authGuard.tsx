import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";

interface Props {}

const AuthGuard: FunctionComponent<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    window.location.href = "/login";
  }

  if (status === "authenticated") {
    return <>{props.children}</>;
  }

  return <></>;
};

export default AuthGuard;
