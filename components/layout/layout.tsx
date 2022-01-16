import { FunctionComponent } from "react";
import MainHeader from "./main-header";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main className="flex justify-center">
        <div className="w-full lg:px-8 max-w-sm md:max-w-7xl">{children}</div>
      </main>
    </>
  );
};

export default Layout;
