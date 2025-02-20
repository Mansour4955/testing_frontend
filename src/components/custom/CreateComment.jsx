import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";
export default function CreateComment({
  host,
  mode,
  eventId,
  setShowCreateComment,
  setCreateCommentCount,
  createCommentCount,
  setShowComments,
  showComments,
}) {
  const { t } = useTranslation();
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();

  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const sendCommentNotification = async () => {
    const recipient = [host];
    const reference = {
      referenceId: eventId,
      referenceModel: "Comment",
    };

    const data = { recipient, notificationType: "comment", reference };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("notification comment response: ", res.data);
    } catch (err) {
      console.log("Error posting notification comment: ", err.message);
    }
  };
  const handleSendComment = async () => {
    if (comment.trim() !== "") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`,
          { eventId, comment },
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Create a comment response: ", res.data);
        setComment("");
        setCreateCommentCount(createCommentCount + 1);
        setShowComments(true);
        if (host !== userData?.id) {
          sendCommentNotification();
        }
        toast.success(t("logs.commentCreateSuccess"));
      } catch (err) {
        toast.error(t("logs.commentCreateError"));
        console.log("Error create a comment: ", err.message);
      }
    } else {
      toast.error(t("logs.plsEnterComment"));
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
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
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
