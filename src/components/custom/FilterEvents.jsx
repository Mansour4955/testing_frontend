import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function FilterEvents({
  setFilter,
  setStatus,
  counter,
  setCounter,
}) {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.settings);
  const eventsStatusTypesArray = t("status", {
    returnObjects: true,
  });
  const eventsTypesArray = t("eventsTypes", { returnObjects: true });
  return (
    <div
      className={`p-3 w-full flex flex-col gap-y-3 ${
        mode === "light"
          ? "bg-white text-light-text"
          : "bg-black text-dark-text"
      } rounded-lg shadow`}
    >
      <div className="flex w-full sm480:gap-x-4 max-sm480:gap-y-3 max-sm480:flex-col">
        <div className="flex-1 flex-col gap-y-2">
          <label className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
            {t("words.eventType")}
          </label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border-2 rounded-md text-light-text outline-none w-full"
          >
            <option value="">{t("words.all")}</option>
            {eventsTypesArray.map((event, index) => (
              <option key={index} value={event.value}>
                {event.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex-col gap-y-2">
          <label className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
            {t("words.eventStatusType")}
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border-2 rounded-md text-light-text outline-none w-full"
          >
            <option value="">{t("words.all")}</option>
            {eventsStatusTypesArray.map((status, index) => (
              <option key={index} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className={`w-fit px-2 py-1 max-xs:text-sm ml-2 duration-150 rounded-md xs:text-sm sm:text-base lg:text-lg ${
          mode === "light"
            ? "bg-light-primary hover:bg-light-secondary text-dark-text"
            : "bg-dark-primary hover:bg-dark-secondary text-light-text"
        }`}
        onClick={() => setCounter(counter + 1)}
      >
        {t("words.filter")}
      </button>
    </div>
  );
}
