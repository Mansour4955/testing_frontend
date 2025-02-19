import { useLocalStorage } from "@/hooks/useLocalStorage";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setMode } from "@/redux/settingsSlice";
import LanguageSelector from "./LanguageSelector";
import { setUser } from "@/redux/userSlice";
import axios from "axios";

export default function PlatformDisplayer({ children }) {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const { getItem, setItem } = useLocalStorage("mode");
  const { getItem: getUser } = useLocalStorage("userData");
  useEffect(() => {
    const theUser = getUser() || null;
    const theMode = getItem() || "light";
    dispatch(setMode(theMode));
    if (theUser) {
      try {
        const res = axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${theUser.id}`,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${theUser.token}`, // Pass the token in the Authorization header
            },
          }
        ).then((res) => {
          console.log("userData:", res.data);
          dispatch(setUser(res.data));
        });
      } catch (error) {
        console.error("Error getting user data :", error.message);
      }
    }
    setLoading(false);
  }, [getItem, counter]);
  const { mode } = useSelector((state) => state.settings);

  if (loading) {
    return null;
  }
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${
        mode === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      } `}
    >
      <div className="mb-[72px] max-lg:mb-[68px] max-md:mb-[48px] max-sm:mb-[44px] max-sm480:mb-[40px]">
        <Header setItem={setItem} counter={counter} setCounter={setCounter} />
      </div>
      <LanguageSelector />
      <div className="flex-1 pb-20">{children}</div>
    </div>
  );
}
