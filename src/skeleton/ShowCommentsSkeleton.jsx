import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

export default function ShowCommentsSkeleton() {
  const { mode } = useSelector((state) => state.settings);
  return (
    <SkeletonTheme
      baseColor={mode === "light" ? "#E5E7EB" : "#3F3F46"} // light / dark modeButtonBackground
      highlightColor={mode === "light" ? "#D1D5DB" : "#27272A"} // light / dark hoverOverModeButtonBackground
    >
      <div
        className={`rounded-t-xl ${
          mode === "light" ? "bg-light-background" : "bg-dark-background"
        } flex flex-col gap-y-2 flex-1 max-sm480:p-1 p-2`}
      >
        <div className="flex gap-x-2">
          {/* Avatar Skeleton */}
          <Skeleton circle width={40} height={40} />

          <div className="flex-1">
            {/* Name Skeleton */}
            <Skeleton width={80} height={12} />

            {/* Comment Text Skeleton */}
            <Skeleton width="80%" height={50} borderRadius={8} />

            {/* Like & Reply buttons skeleton */}
            <div
              style={{ maxWidth: "20%" }}
              className="grid grid-cols-2 gap-x-3 mt-2 px-5"
            >
              <span className="col-span-1">
                <Skeleton width="100%" height={10} />
              </span>
              <span className="col-span-1">
                <Skeleton width="100%" height={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2">
          {/* Avatar Skeleton */}
          <Skeleton circle width={40} height={40} />

          <div className="flex-1">
            {/* Name Skeleton */}
            <Skeleton width={80} height={12} />

            {/* Comment Text Skeleton */}
            <Skeleton width="80%" height={50} borderRadius={8} />

            {/* Like & Reply buttons skeleton */}
            <div
              style={{ maxWidth: "20%" }}
              className="grid grid-cols-2 gap-x-3 mt-2 px-5"
            >
              <span className="col-span-1">
                <Skeleton width="100%" height={10} />
              </span>
              <span className="col-span-1">
                <Skeleton width="100%" height={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <SkeletonTheme
            baseColor={mode === "light" ? "#1da1f2" : "#8ab4f8"}
            highlightColor={mode === "light" ? "#8ab4f8" : "#1da1f2"}
          >
            <div
              className={`w-4/5 px-4 duration-150 mt-2 mb-1 py-1 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base font-medium  rounded-lg`}
            >
              <Skeleton width="100%" height={30} />
            </div>
          </SkeletonTheme>
        </div>
      </div>
    </SkeletonTheme>
  );
}
