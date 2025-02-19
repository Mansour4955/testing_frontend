import { useLocalStorage } from "@/hooks/useLocalStorage";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";

export default function JoinLeaveEvent({ mode, setEvent, event }) {
  const { t } = useTranslation();
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const isUSerParticipant = event.participants.find(
    (user) => (user._id ? user._id : user) === userData?.id
  );
  const handleJoinEvent = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/join/${event._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      setEvent(res.data.event);
      console.log("Join event response: ", res.data);
    } catch (err) {
      console.log("Error joining the event: ", err.message);
    }
  };
  const handleLeaveEvent = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/leave/${event._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      setEvent(res.data.event);
      console.log("Join event response: ", res.data);
    } catch (err) {
      console.log("Error joining the event: ", err.message);
    }
  };
  return (
    <div className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
      {isUSerParticipant ? (
        <span
          onClick={handleLeaveEvent}
          className={`py-0.5 cursor-pointer px-2 rounded-md text-dark-text hover:text-light-text duration-100 ${
            mode === "light" ? "bg-light-red" : "bg-dark-red"
          }`}
        >
          {t("words.leave")}
        </span>
      ) : (
        <span
          onClick={handleJoinEvent}
          className={`py-0.5 cursor-pointer px-2 rounded-md text-dark-text hover:text-light-text duration-100 ${
            mode === "light" ? "bg-light-secondary" : "bg-dark-secondary"
          }`}
        >
          {t("words.join")}
        </span>
      )}
    </div>
  );
}
