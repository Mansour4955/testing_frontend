import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import luxonEvent from "@/helpers/luxonEvent";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import getProfileImage from "@/helpers/getProfileImage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// Lazy load the component
const Reaction = dynamic(() => import("./Reaction"), {
  ssr: false, // Optional: Disable SSR if needed
});

export default function Comment({
  commentData,
  mode,
  authorId,
  setDeleteCommentCount,
  deleteCommentCount,
}) {
  const { t } = useTranslation();
  const [comment, setComment] = useState(commentData);
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const [showUpdateComment, setShowUpdateComment] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const profileImageOfCommentOwner = getProfileImage(comment.user);
  const formattedDate = luxonEvent(comment.createdAt);

  const handleUpdateComment = () => {
    setShowUpdateComment(true);
    setShowDeleteComment(false);
    setShowOptionsPopup(false);
  };
  const handleDeleteComment = () => {
    setShowDeleteComment(true);
    setShowUpdateComment(false);
    setShowOptionsPopup(false);
  };
  const handleDeleteCommentReqeust = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("Delete a comment response: ", res.data);
      setShowDeleteComment(false);
      setDeleteCommentCount(deleteCommentCount + 1);
    } catch (err) {
      console.log("Error delete a comment: ", err.message);
    }
  };
  const handleUpdateCommentReqeust = async () => {
    if (comment.comment === updatedComment) {
      console.log(
        "Comment didn't change, change something to update or cancel"
      );
    } else {
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${comment._id}`,
          { comment: updatedComment },
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Update a comment response: ", res.data);
        setComment(res.data);
        setShowUpdateComment(false);
      } catch (err) {
        console.log("Error updating a comment: ", err.message);
      }
    }
  };
  return (
    <div>
      <div className="relative w-full">
        {(showDeleteComment || showUpdateComment) && (
          <div
            className={`absolute left-1/2 top-[10px] -translate-x-1/2 max-xs:w-[200px] xs:w-[200px] sm:w-[300px] shadow-xl rounded-md font-medium z-30 ${
              mode === "light" ? "bg-light-background" : "bg-dark-background"
            }`}
          >
            {showDeleteComment && (
              <div className="rounded-md p-2 flex flex-col gap-y-2 z-30 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
                <p>{t("words.deleteCommentMessage")}</p>
                <div className={`flex gap-x-2 `}>
                  <span
                    onClick={() => setShowDeleteComment(false)}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-secondaryText text-dark-text hover:text-light-text"
                        : "bg-dark-secondaryText text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.cancel")}
                  </span>
                  <span
                    onClick={handleDeleteCommentReqeust}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-red text-dark-text hover:text-light-text"
                        : "bg-dark-red text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.delete")}
                  </span>
                </div>
              </div>
            )}
            {showUpdateComment && (
              <div className="rounded-md p-2 flex flex-col gap-y-2 z-30 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
                <textarea
                  onFocus={() => setIsTextareaFocused(true)}
                  onBlur={() => setIsTextareaFocused(false)}
                  className={`rounded-md px-2 py-1 focus:outline-none border ${
                    isTextareaFocused
                      ? mode === "light"
                        ? "border-light-primary"
                        : "border-dark-primary"
                      : "border-transparent"
                  } ${
                    mode === "light"
                      ? "caret-light-primary bg-light-cardsBackground text-light-text"
                      : "caret-dark-primary bg-dark-cardsBackground text-dark-text"
                  }`}
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                />
                <div className="flex gap-x-2">
                  <span
                    onClick={() => setShowUpdateComment(false)}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-secondaryText text-dark-text hover:text-light-text"
                        : "bg-dark-secondaryText text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.cancel")}
                  </span>
                  <span
                    onClick={handleUpdateCommentReqeust}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-primary text-dark-text hover:text-light-text"
                        : "bg-dark-primary text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.update")}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          {profileImageOfCommentOwner && (
            <Image
              src={profileImageOfCommentOwner}
              alt="Profile Image of the person who wrote this comment"
              width={100}
              height={100}
              className="max-xs:w-6 max-xs:h-6 xs:w-6 xs:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full cursor-pointer"
            />
          )}

          <div className="flex flex-col gap-y-1 min-w-[60%]">
            <div
              className={`py-1 px-2 rounded-xl ${
                mode === "light"
                  ? "bg-light-secondaryText text-dark-text"
                  : "bg-dark-secondaryText text-light-text"
              }`}
            >
              <div className="flex items-center max-xs:gap-x-5 xs:gap-x-5 sm:gap-x-10 justify-between">
                <div className="flex items-center gap-x-2 font-semibold">
                  <p
                    className={`max-xs:text-xs xs:text-xs sm:text-sm lg:text-base `}
                  >
                    {`${comment.user.firstName} ${comment.user.lastName}`}
                  </p>
                  {comment.user._id === authorId && (
                    <p
                      className={`px-1 max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm rounded-md ${
                        mode === "light"
                          ? "bg-light-secondary"
                          : "bg-dark-secondary"
                      }`}
                    >
                      {t("words.host")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-x-2">
                  {comment.edited && (
                    <p
                      className={`px-1 max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm rounded-md ${
                        mode === "light"
                          ? "text-light-secondary bg-light-cardsBackground"
                          : "text-dark-secondary bg-dark-cardsBackground"
                      }`}
                    >
                      {t("words.edited")}
                    </p>
                  )}
                  <p className="max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm">
                    {formattedDate}
                  </p>
                  {comment.user._id === userData?.myId && (
                    <div className={`${showOptionsPopup && "relative"}`}>
                      {showOptionsPopup ? (
                        <span onClick={() => setShowOptionsPopup(false)}>
                          <AiOutlineClose
                            className={`cursor-pointer ${
                              mode === "light"
                                ? "text-light-cardsBackground"
                                : "text-dark-cardsBackground"
                            }`}
                            size={16}
                          />
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            setShowOptionsPopup(true);
                            setShowUpdateComment(false);
                            setShowDeleteComment(false);
                          }}
                        >
                          <FaEllipsisH
                            className={`cursor-pointer ${
                              mode === "light"
                                ? "text-light-cardsBackground"
                                : "text-dark-cardsBackground"
                            }`}
                            size={18}
                          />
                        </span>
                      )}
                      {showOptionsPopup && (
                        <div
                          className={`absolute p-2 flex flex-col shadow-xl gap-y-2 rounded-md min-w-[150px] max-w-[200px] max-xs:text-xs xs:text-xs sm:text-sm lg:text-base ${
                            t("dir") === "ltr" ? "right-0" : "left-0"
                          } top-[20px] z-30 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base ${
                            mode === "light"
                              ? "bg-light-cardsBackground"
                              : "bg-dark-cardsBackground"
                          }`}
                        >
                          <span
                            onClick={handleUpdateComment}
                            className={`flex-1 py-1 flex items-center font-semibold rounded-md justify-center duration-150 cursor-pointer ${
                              mode === "light"
                                ? "bg-light-primary hover:text-light-text"
                                : "bg-dark-primary hover:text-dark-text"
                            }`}
                          >
                            {t("words.update")}
                          </span>
                          <span
                            onClick={handleDeleteComment}
                            className={`flex-1 py-1 flex items-center font-semibold rounded-md justify-center duration-150 cursor-pointer  ${
                              mode === "light"
                                ? "bg-light-red hover:text-light-text"
                                : "bg-dark-red hover:text-dark-text"
                            }`}
                          >
                            {t("words.delete")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p
                className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
                dir="auto"
              >
                {comment.comment}
              </p>
            </div>
            <div className="px-2 flex gap-x-3 text-xs items-center">
              <div className="flex items-center gap-x-3">
                <Reaction
                  parent="comment"
                  mode={mode}
                  likes={comment.likes}
                  commentId={comment._id}
                  setComment={setComment}
                />
              </div>
              <span
                className={`w-[1px] h-4/5 items-center ${
                  mode === "light" ? "bg-light-primary" : "bg-dark-primary"
                }`}
              />
              <p
                className={`flex gap-x-1 justify-center items-center ${
                  mode === "light" ? "text-light-primary" : "text-dark-primary"
                }`}
              >
                {comment.likes.length === 0 || comment.likes.length === 1
                  ? `${comment.likes.length} ${t("words.like")}`
                  : `${comment.likes.length} ${t("words.likes")}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
