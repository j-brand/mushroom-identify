import { useSession } from "next-auth/react";
import { FunctionComponent } from "react";

interface Props {}

const AuthGuard: FunctionComponent<Props> = (props) => {
  const { status } = useSession();

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
