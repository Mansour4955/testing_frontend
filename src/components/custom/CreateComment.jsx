import Image from "next/image";
import React, { useState } from "react";
import profileImage from "../../../public/default_profile_image.webp";
import axios from "axios";
import { useTranslation } from "next-i18next";
export default function CreateComment({
  mode,
  eventId,
  setShowCreateComment,
  setCreateCommentCount,
  createCommentCount,
  setShowComments,
  showComments,
}) {
  const { t } = useTranslation();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzFjYWZmM2ZmNDhjZjc0N2ExNjgyMyIsInJvbGUiOiJub3JtYWxfcHJvZmVzc2lvbmFsIiwiaWF0IjoxNzM3NjEwMjAzfQ.11m55Oxnuq8ahbKgJAh801AGUEskxn5cv4RzOY2WrVU";
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const [errorComment, setErrorComment] = useState("");
  const handleSendComment = async () => {
    if (comment.trim() !== "") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`,
          { eventId, comment },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Create a comment response: ", res.data);
        setComment("");
        setCreateCommentCount(createCommentCount + 1);
        setShowComments(true);
      } catch (err) {
        console.log("Error create a comment: ", err.message);
      }
    } else {
      setErrorComment("Please enter a comment");
      console.log("errorComment: ", "Please enter a comment");
    }
  };
  return (
    <div
      className={`p-2 ${
        showComments ? "rounded-b-xl" : "rounded-xl"
      } flex flex-col gap-y-1 ${
        mode === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
    >
      <div className="flex max-xs:gap-x-1 xs:gap-x-1 sm:gap-x-2">
        <Image
          src={profileImage}
          alt="Commenter Image"
          className="max-xs:w-7 max-xs:h-7 xs:w-7 xs:h-7 sm480:w-8 sm480:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full"
          width={100}
          height={100}
        />
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setErrorComment("");
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} // Use onBlur to handle losing focus
          placeholder={t("placeholders.writeComment")}
          className={`w-full p-2 rounded-md border focus:outline-none max-xs:text-xs xs:text-xs sm:text-sm lg:text-base
          ${
            isFocused
              ? mode === "light"
                ? "border-light-primary"
                : "border-dark-primary"
              : mode === "light"
              ? "border-light-secondaryText"
              : "border-dark-secondaryText"
          }
          ${
            mode === "dark"
              ? "bg-dark-cardsBackground caret-dark-primary"
              : "bg-light-cardsBackground caret-light-primary"
          }`}
        />
      </div>
      <div
        className={`ml-auto flex gap-x-2 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base`}
      >
        <span
          onClick={() => setShowCreateComment(false)}
          className={`rounded-md flex items-center font-medium cursor-pointer justify-center py-1 px-2 duration-150  ${
            mode === "light"
              ? "bg-light-secondaryText text-dark-text hover:bg-light-secondary"
              : "bg-dark-secondaryText text-light-text hover:bg-dark-secondary"
          }`}
        >
          {t("words.cancel")}
        </span>
        <span
          onClick={handleSendComment}
          className={`rounded-md flex items-center font-medium cursor-pointer justify-center py-1 px-2 duration-150  ${
            mode === "light"
              ? "bg-light-primary text-dark-text hover:bg-light-secondary"
              : "bg-dark-primary text-light-text hover:bg-dark-secondary"
          }`}
        >
          {t("words.send")}
        </span>
      </div>
    </div>
  );
}
