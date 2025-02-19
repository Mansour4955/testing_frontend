import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Reaction({
  parent,
  mode,
  likes,
  setEvent,
  eventId,
  setComment,
  commentId,
}) {
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();

  const { t } = useTranslation();
  const isSmallerThan360 = useMediaQuery({ query: "(max-width: 360px)" });
  const isSmallerThan480 = useMediaQuery({ query: "(max-width: 480px)" });
  const isSmallerThan640 = useMediaQuery({ query: "(max-width: 640px)" });

  const isUserReacted = likes.find((like) => like._id === userData?.id);

  const eventToggleLike = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/likes/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      setEvent(res.data.event);
      console.log("Toggle like response: ", res.data);
    } catch (err) {
      console.log("Error event toggle like: ", err.message);
    }
  };
  const commentToggleLike = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/likes/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      setComment(res.data.comment);

      console.log("Toggle like for comment response: ", res.data);
    } catch (err) {
      console.log("Error comment  toggle like: ", err.message);
    }
  };
  const handleReactionClick = () => {
    if (parent === "event") {
      eventToggleLike();
    } else if (parent === "comment") {
      commentToggleLike();
    }
  };

  return (
    <div
      className={`relative cursor-pointer flex gap-x-1 items-center `}
      onClick={handleReactionClick}
    >
      {/* Reaction Display */}
      <div
        className={`flex items-center gap-x-1 ${
          isUserReacted
            ? mode === "light"
              ? "text-light-primary"
              : "text-dark-primary"
            : ""
        }`}
      >
        {parent === "event" &&
          (isUserReacted ? (
            <BiSolidLike
              size={
                isSmallerThan360
                  ? 12
                  : isSmallerThan480
                  ? 14
                  : isSmallerThan640
                  ? 14
                  : 16
              }
            />
          ) : (
            <BiLike
              size={
                isSmallerThan360
                  ? 12
                  : isSmallerThan480
                  ? 14
                  : isSmallerThan640
                  ? 14
                  : 16
              }
            />
          ))}
        <span className={` "max-xs:text-xs xs:text-xs sm:text-sm lg:text-base`}>
          {t("words.like")}
        </span>
      </div>
    </div>
  );
}
