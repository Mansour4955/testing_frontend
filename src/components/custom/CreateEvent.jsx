"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

// Lazy load the component
const CreateEventForm = dynamic(() => import("./CreateEventForm"), {
  ssr: false, // Optional: Disable SSR if needed
});
export default function CreateEvent({ createEventCount, setCreateEventCount }) {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.settings);
  const [showAllInputs, setShowAllInputs] = useState(false);

  return (
    <div className="flex justify-center">
      <div
        className={`my-4 p-4 sm480:w-[450px] max-sm480:w-full ${
          mode === "light"
            ? "bg-white text-light-text"
            : "bg-black text-dark-text"
        } rounded-lg shadow`}
      >
        {showAllInputs ? (
          <h2
            className={`${
              mode === "light" ? "text-light-primary" : "text-dark-primary"
            }  max-xs:text-base xs:text-base sm:text-lg lg:text-xl font-bold mb-3`}
          >
            {t("words.createEvent")}
          </h2>
        ) : (
          <p
            className={`max-xs:text-sm justify-center xs:text-sm sm:text-base lg:text-lg flex gap-x-1.5 items-center`}
          >
            <span>{t("words.wannaCreateEvent")}</span>
            <span
              onClick={() => setShowAllInputs(true)}
              className={`hover:underline cursor-pointer ${
                mode === "light" ? "text-light-primary" : "text-dark-primary"
              }`}
            >
              {t("sentences.clickHere")}
            </span>
          </p>
        )}
        {showAllInputs && (
          <CreateEventForm
            setCreateEventCount={setCreateEventCount}
            createEventCount={createEventCount}
            mode={mode}
            setShowAllInputs={setShowAllInputs}
          />
        )}
      </div>
    </div>
  );
}
