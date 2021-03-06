import Link from "next/link";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "../icons/logout-icon";
import MenuOpenIcon from "../icons/menuOpen-icon";
import MenuCloseIcon from "../icons/menuClose-icon";

const MainHeader: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { status } = useSession();

  const logoutHandler = () => {
    signOut({callbackUrl: "/login"});
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <nav className="bg-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                {!isOpen ? <MenuOpenIcon className="text-neutral-400" /> : <MenuCloseIcon className="text-neutral-400" />}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Image className="block h-8 w-auto" src="/logo.png" width={180} height={38} alt="Workflow" />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/key/1">
                    <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"> The Key</a>
                  </Link>
                  <Link href="/habitus">
                    <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Habitus</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {status === "authenticated" && (
                <button onClick={logoutHandler}>
                  <LogoutIcon className="text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={`w-full bg-gray-800 absolute overflow-hidden z-20 transform transition-all ${isOpen ? " h-28" : "h-0"}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/key/1">
              <a onClick={toggle} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                The Key
              </a>
            </Link>
            <Link href="/habitus">
              <a onClick={toggle} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Hamitus
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
