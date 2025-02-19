"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import getProfileImage from "@/helpers/getProfileImage";

const MyProfile = () => {
  const { mode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    if (user) setProfileImage(getProfileImage(user));
  }, [user]);
  return (
    <div className="flex flex-col">
      {profileImage && (
        <Image
          src={profileImage}
          alt="logo"
          width={100}
          height={100}
          className={`rounded-full w-full mx-auto mt-3 max-sm:w-20 max-sm:h-20 sm480:w-28 sm480:h-28 lg:w-32 lg:h-32 shadow-md duration-150 border-[4px]  ${
            mode === "light"
              ? "border-light-background"
              : "border-dark-background"
          }`}
        />
      )}

      <div
        className={`flex w-full mt-2 max-sm:mb-5 sm480:mb-7 lg:mb-9 duration-150 px-4 justify-center`}
      >
        <div className="flex flex-col items-center gap-y-3 max-md:gap-y-1 max-xl:gap-y-2 duration-150">
          <span
            className={`capitalize font-semibold max-xs:text-sm xs:text-sm sm:text-base lg:text-lg`}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
