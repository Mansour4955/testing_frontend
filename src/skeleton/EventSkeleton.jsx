import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

export default function EventSkeleton() {
  const { mode } = useSelector((state) => state.settings);

  return (
    <SkeletonTheme
      baseColor={mode === "light" ? "#E5E7EB" : "#3F3F46"} // light / dark modeButtonBackground
      highlightColor={mode === "light" ? "#D1D5DB" : "#27272A"} // light / dark hoverOverModeButtonBackground
    >
      <div
        className={`${
          mode === "light"
            ? "bg-light-cardsBackground"
            : "bg-dark-cardsBackground"
        } p-4 max-xs:w-[95%] xs:w-[95%] sm360:w-[95%] sm480:w-[95%] sm:w-[95%] md:w-[90%] lg:w-[85%] rounded-lg shadow-md flex flex-col gap-y-2`}
      >
        <div style={{ display: "flex", columnGap: "6px" }}>
          {/* Avatar Skeleton */}
          <Skeleton circle width={48} height={48} />

          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "3px" }}
          >
            {/* Event title */}
            <Skeleton width={90} height={20} />
            {/* Time or date */}
            <Skeleton width={40} height={15} />
          </div>
        </div>

        {/* Event description */}

        <Skeleton width="95%" height={20} count={2} />

        {/* Event content skeleton */}
        {/* For content */}
        <div className="w-full h-[350px] sm:h-[400px] lg:h-[450px]">
          <Skeleton height="100%" />
        </div>

        {/* Like & Comment Skeletons */}

        <Skeleton width="100%" height={24} />

        {/* Divider */}
        <span
          className={`${
            mode === "light" ? "bg-light-background" : "bg-dark-background"
          } h-0.5 w-full`}
        />

        {/* Action buttons skeleton */}
        <Skeleton width="100%" height={30} />
      </div>
    </SkeletonTheme>
  );
}
