"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function SeeMoreEvents() {
  const { mode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <div
      className={`mt-10 max-md:mt-8 max-sm:mt-6 max-xs:text-base xs:text-base sm:text-lg lg:text-xl text-center font-semibold ${
        mode === "light" ? "text-light-primary" : "text-dark-primary"
      }`}
    >
      To see all events <Link href="/events">Click here</Link>
    </div>
  );
}
