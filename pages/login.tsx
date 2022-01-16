import { NextPage } from "next";
import AuthForm from "../components/authForm";

const Login: NextPage = (props) => {
  return (
    <div className="w-full mt-1/10 flex justify-center items-center">
      <AuthForm className="shadow-md p-10 rounded-md" />
    </div>
  );
};

export default Login;
