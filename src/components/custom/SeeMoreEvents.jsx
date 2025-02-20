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
      className={`mt-10 max-md:mt-8 max-sm:mt-6 max-xs:text-sm xs:text-sm sm:text-base lg:text-lg text-center font-semibold flex items-center gap-x-1.5 justify-center`}
    >
      {t("sentences.toSeeAllEvents")}

      {user ? (
        <Link
          href="/events"
          className={`hover:underline ${
            mode === "light" ? "text-light-primary" : "text-dark-primary"
          }`}
        >
          {t("sentences.clickHere")}
        </Link>
      ) : (
        <Link
          href="/login"
          className={`underline ${
            mode === "light" ? "text-light-primary" : "text-dark-primary"
          }`}
        >
          {t("sentences.loginHere")}
        </Link>
      )}
    </div>
  );
}
