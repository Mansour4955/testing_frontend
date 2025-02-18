import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ProfessionCardSkeleton() {
  const { mode } = useSelector((state) => state.settings); // Accessing the mode from redux for light/dark mode
  const { t } = useTranslation();

  return (
    <div
      className={`w-full flex flex-col gap-y-3 rounded-xl duration-100 ${
        mode === "light"
          ? "shadow-[0px_1px_6px_0px_#1DA1F2] hover:shadow-[0px_1px_6px_0px_#1DB954]"
          : "shadow-[0px_1px_6px_0px_#8AB4F8] hover:shadow-[0px_1px_6px_0px_#1DB954]"
      }`}
    >
      <SkeletonTheme
        baseColor={mode === "light" ? "#E5E7EB" : "#3F3F46"} // light / dark modeButtonBackground
        highlightColor={mode === "light" ? "#D1D5DB" : "#27272A"} // light / dark hoverOverModeButtonBackground
      >
        {/* Top part with profile image */}
        <div className="flex flex-col items-center px-4 py-4 gap-y-4">
          <Skeleton
            circle
            height={50}
            width={50}
            className="rounded-full lg:w-20 lg:h-20 max-sm:w-14 max-sm:h-14 sm:w-[72px] sm:h-[72px] shadow-md"
          />
          <div className="flex flex-col items-center capitalize font-medium ">
            <Skeleton height={20} width={150} />
            <Skeleton count={1} width={180} />
          </div>
        </div>

        {/* Pricing and more details */}
        <div
        dir={t("dir")}
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
          className="w-full py-2"
        >
          <div className="font-normal flex gap-x-2 mt-2 ">
            <Skeleton width={70} />
            <Skeleton width={50} />
            <Skeleton width={60} />
          </div>
        </div>

        {/* Bottom part with rating and description */}
        <div
        dir={t("dir")}
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
          className={`flex flex-col gap-y-3 rounded-b-xl py-3 ${
            mode === "light"
              ? "bg-light-cardsBackground"
              : "bg-dark-cardsBackground"
          }`}
        >
          <div dir={t("dir")} className="flex gap-x-2 items-center ">
            <Skeleton width={20} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={60} height={20} />
          </div>
          <Skeleton count={2} height={20} />
        </div>
      </SkeletonTheme>
    </div>
  );
}
