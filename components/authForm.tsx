import { signIn, SignInResponse } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useContext, useRef, useState } from "react";
import NotificationContext from "../store/notification-context";
import Notification from "./notification";

interface Props {
  className: string;
}

async function createUser(email: string, password: string): Promise<string> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error");
  }

  return data;
}

const AuthForm: FunctionComponent<Props> = (props) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (emailInputRef.current && passwordInputRef.current) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      if (isLogin) {
        const result: SignInResponse | undefined = await signIn<any>("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        if (result && result.error) {
          notificationCtx.showNotification({ title: "error", message: result.error, status: "error" });
        }else{
          router.replace('/');
        }
      } else {
        const email = enteredEmail;
        const password = enteredPassword;
        const result = await createUser(email, password);
        notificationCtx.showNotification({ title: "error", message: "sdad", status: "error" });
      }
    }
  }

  return (
    <>
      <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Image src="/logo_196.png" alt="Mush Ident Logo Square" width={120} height={120} />
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" action="#" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-sm shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  E-Mail-Adresse
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  ref={emailInputRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" min-w-[250px] group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-mush hover:bg-mush focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? "Login" : "registrieren"}{" "}
              </button>
              <button type="button" className="w-full hover:underline" onClick={switchAuthModeHandler}>
                <small>{isLogin ? "registrieren" : "anmelden"}</small>
              </button>
            </div>
          </form>
        </div>
      </div>
      {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
    </>
  );
};

export default AuthForm;
