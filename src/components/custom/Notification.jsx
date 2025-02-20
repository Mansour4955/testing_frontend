"use client";
import luxonEvent from "@/helpers/luxonEvent";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Notification({ notificationData, mode }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const formattedDate = luxonEvent(data?.createdAt);
  const router = useRouter();
  useEffect(() => {
    setData(notificationData);
  }, [notificationData]);
  const handleClickNotification = () => {
    router.push(`/events/${data?.reference?.referenceId?._id}`);
  };
  return (
    <div
      onClick={handleClickNotification}
      className={`w-full flex justify-between gap-x-5 p-4 border-b rounded-xl shadow-sm cursor-pointer ${
        mode === "light"
          ? "bg-light-cardsBackground text-light-text border-light-modeButtonBackground"
          : "bg-dark-cardsBackground text-dark-text border-dark-modeButtonBackground"
      }`}
    >
      <p className="flex-1 flex flex-wrap gap-x-2 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base line-clamp-1">
        <span>{t("words.hi")},</span>
        <span className="font-medium">{`${user?.firstName},`}</span>
        <span
          className={`font-semibold max-xs:text-sm xs:text-sm sm:text-base lg:text-lg flex -mt-0.5 ${
            mode === "light" ? "text-light-primary" : "text-dark-primary"
          }`}
        >
          {`${data?.actor?.firstName} ${data?.actor?.lastName}`}
        </span>
        <span
          className={`${
            data?.notificationType === "leaved"
              ? mode === "light"
                ? "text-light-red"
                : "text-dark-red"
              : mode === "light"
              ? "text-light-secondary"
              : "text-dark-secondary"
          }`}
        >
          {t(`notificationActions.${data?.notificationType}`)}
        </span>
        <span className="">{data?.reference?.referenceId?.description}</span>
      </p>
      <span
        className={`max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm ${
          mode === "light"
            ? "text-light-modeButtonIcon"
            : "text-dark-modeButtonIcon"
        }`}
      >
        {formattedDate || ""}
      </span>
    </div>
  );
}
