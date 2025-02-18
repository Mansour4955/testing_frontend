import { IoSunnyOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation"; // Import usePathname
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
const Header = ({ setItem, counter, setCounter }) => {
  const router = useRouter();
  const isSmallerThan640 = useMediaQuery({ query: "(max-width: 640px)" });
  const isSmallerThan360 = useMediaQuery({ query: "(max-width: 360px)" });

  const isLoggedIn = true;
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.settings);
  const toggleDarkMode = () => {
    if (mode === "light") setItem("dark");
    else setItem("light");
    setCounter(counter + 1);
  };
  const pathname = usePathname(); // Get the current path using usePathname


  return (
    <header
      className={`fixed top-0 left-0 right-0 flex p-4 duration-150 max-md:p-2 shadow-md opacity-[0.95.5] z-50
         ${mode === "light" ? "bg-light-background" : "bg-dark-background"}
         `}
    >
      <AnimatePresence>
        {openBurgerMenu && (
          <motion.div
            initial={{ opacity: 0, y: -100 }} // Starting state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: -100 }} // Exit state
            transition={{ duration: 0.3 }} // Duration of transition
            className={`absolute left-0 right-0 top-full p-4 max-sm480:p-3 flex flex-col gap-y-3 max-sm480:gap-y-1.5 z-30 md:hidden ${
              mode === "light"
                ? "bg-light-primary text-light-background"
                : "bg-dark-primary text-dark-background"
            }`}
          >
            <Link
              href="/"
              onClick={() => setOpenBurgerMenu(false)}
              className={`font-medium max-sm:text-base max-sm480:text-sm sm:text-lg md:text-xl duration-150 ${
                mode === "light"
                  ? "hover:text-light-text"
                  : "hover:text-dark-text"
              } ${
                pathname === "/" &&
                (mode === "light" ? "text-light-text" : "text-dark-text")
              }`}
            >
              {t("headers.home")}
            </Link>
            {isLoggedIn && (
              <Link
                href="/events"
                onClick={() => setOpenBurgerMenu(false)}
                className={`font-medium sm:text-lg md:text-xl max-sm:text-base max-sm480:text-sm duration-150 ${
                  mode === "light"
                    ? "hover:text-light-text"
                    : "hover:text-dark-text"
                }`}
              >
                {t("headers.events")}
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/myProfile"
                onClick={() => setOpenBurgerMenu(false)}
                className={`font-medium sm:text-lg md:text-xl max-sm:text-base max-sm480:text-sm duration-150 ${
                  mode === "light"
                    ? "hover:text-light-text"
                    : "hover:text-dark-text"
                }`}
              >
                {t("headers.myProfile")}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-1 justify-between items-center">
        <Link
          href="/"
          className={`flex items-center font-bold text-base sm480:text-lg sm:text-xl md:text-2xl  ${
            mode === "light" ? "text-light-primary" : "text-dark-primary"
          }`}
        >
          EventMaker
        </Link>
        <nav className="flex flex-1 justify-center items-center gap-x-5 max-md:hidden">
          <Link
            href="/"
            className={`font-medium md:text-lg duration-150 ${
              mode === "light"
                ? "hover:text-light-primary"
                : "hover:text-dark-primary"
            } ${
              pathname === "/" &&
              (mode === "light" ? "text-light-primary" : "text-dark-primary")
            }`}
          >
            {t("headers.home")}
          </Link>
          <Link
            href="/events"
            className={`font-medium md:text-lg duration-150 ${
              mode === "light"
                ? "hover:text-light-primary"
                : "hover:text-dark-primary"
            } ${
              (pathname === "/events" || pathname.startsWith("/events")) &&
              (mode === "light" ? "text-light-primary" : "text-dark-primary")
            }`}
          >
            {t("headers.events")}
          </Link>
        </nav>

        <div className="flex justify-center items-center gap-x-0">
          <button
            name="toggle mode"
            onClick={toggleDarkMode}
            className={`flex items-center justify-center lg:w-10 lg:h-10 max-lg:w-9 max-lg:h-9 max-md:w-8 max-md:h-8 max-sm:w-6 max-sm:h-6 max-sm360:w-5 max-sm360:h-5 rounded-full duration-150 ${
              mode === "light"
                ? " hover:bg-light-modeButtonBackground"
                : " hover:bg-dark-modeButtonBackground"
            } `}
          >
            {mode === "dark" ? (
              <IoSunnyOutline
                name="Light mode button"
                size={isSmallerThan360 ? 14 : isSmallerThan640 ? 16 : 24}
                className="text-dark-modeButtonIcon"
              />
            ) : (
              <FiMoon
                name="Dark mode button"
                size={isSmallerThan360 ? 14 : isSmallerThan640 ? 16 : 24}
                className="text-light-modeButtonIcon"
              />
            )}
          </button>
          <button
            name="Notifications"
            className={`flex items-center justify-center lg:w-10 lg:h-10 max-lg:w-9 max-lg:h-9 max-md:w-8 max-md:h-8 max-sm:w-6 max-sm:h-6 max-sm360:w-5 max-sm360:h-5 rounded-full duration-150 ${
              mode === "light"
                ? " hover:bg-light-modeButtonBackground text-light-modeButtonIcon"
                : " hover:bg-dark-modeButtonBackground text-dark-modeButtonIcon"
            } `}
          >
            <IoIosNotifications
              size={isSmallerThan360 ? 16 : isSmallerThan640 ? 18 : 26}
            />
          </button>
          <button
            name="BurgerMenu"
            onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
            className={`flex items-center justify-center cursor-pointer max-md:w-8 max-md:h-8 max-sm:w-6 max-sm:h-6 max-sm360:w-5 max-sm360:h-5 md:hidden rounded-full duration-150 ${
              mode === "light"
                ? " hover:bg-light-modeButtonBackground text-light-modeButtonIcon"
                : " hover:bg-dark-modeButtonBackground text-dark-modeButtonIcon"
            } `}
          >
            {openBurgerMenu ? (
              <AiOutlineClose
                size={isSmallerThan360 ? 14 : isSmallerThan640 ? 16 : 24}
                className=""
              />
            ) : (
              <MdMenu
                size={isSmallerThan360 ? 14 : isSmallerThan640 ? 16 : 24}
                className=""
              />
            )}
          </button>
          {isLoggedIn && (
            <div name="profile" className="flex max-md:hidden">
              <span
                className={`lg:h-10 w-[2px] max-lg:h-9 max-md:h-8 mx-1 ${
                  mode === "light" ? "bg-light-primary" : "bg-dark-primary"
                }`}
              />
              <Image
                src="/profile.png"
                width={100}
                height={100}
                alt="profilePhoto"
                className={`lg:w-10 lg:h-10 rounded-full max-lg:w-9 max-lg:h-9 ${
                  t("dir") === "ltr" ? "ml-3" : "mr-3"
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
