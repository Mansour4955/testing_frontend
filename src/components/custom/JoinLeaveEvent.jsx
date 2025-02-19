import React from "react";
import { useTranslation } from "react-i18next";

export default function JoinLeaveEvent({ mode, setEvent, event }) {
  const { t } = useTranslation();
  const myId = "67b396ab55bc92ee3bd4094d";
  const isUSerParticipant = event.participants.find(
    (user) => user._id === myId
  );
  return (
    <div className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
      {isUSerParticipant ? (
        <span
          className={`py-0.5 cursor-pointer px-2 rounded-md text-dark-text hover:text-light-text duration-100 ${
            mode === "light" ? "bg-light-red" : "bg-dark-red"
          }`}
        >
          {t("words.leave")}
        </span>
      ) : (
        <span
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
