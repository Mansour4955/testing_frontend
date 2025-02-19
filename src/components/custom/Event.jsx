import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import luxonEvent from "@/helpers/luxonEvent";
import { useTranslation } from "next-i18next";
import { IoPersonSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import ShowCommentsSkeleton from "@/skeleton/ShowCommentsSkeleton";
import getProfileImage from "@/helpers/getProfileImage";
import Reaction from "./Reaction";
import { useMediaQuery } from "react-responsive";
import JoinLeaveEvent from "./JoinLeaveEvent";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Lazy load the component

const CreateComment = dynamic(() => import("./CreateComment"), {
  ssr: false, // Optional: Disable SSR if needed
});
const ShowComments = dynamic(() => import("./ShowComments"), {
  ssr: false, // Optional: Disable SSR if needed
  loading: () => <ShowCommentsSkeleton />, // Fallback UI
});

export default function Event({
  setDeleteEventCount,
  deleteEventCount,
  eventData,
  mode,
}) {
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const { t } = useTranslation();
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [deleteCommentCount, setDeleteCommentCount] = useState(0);
  const [createCommentCount, setCreateCommentCount] = useState(0);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [event, setEvent] = useState(eventData);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(
    event.description
  );
  const [hostProfile, setHostProfile] = useState(null);
  const isSmallerThan360 = useMediaQuery({ query: "(max-width: 360px)" });
  const isSmallerThan480 = useMediaQuery({ query: "(max-width: 480px)" });
  const isSmallerThan640 = useMediaQuery({ query: "(max-width: 640px)" });
  // get host profile
  useEffect(() => {
    const image = getProfileImage(event.host);
    setHostProfile(image);
  }, []);
  // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Dynamic timezone
  const formattedDate = luxonEvent(event.createdAt);

  useEffect(() => {
    const getCommentsNumber = async () => {
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments?eventId=${event._id}`
        );
        setCommentsNumber(Number(res.data.totalComments));
        console.log(
          "Getting comments number response: ",
          res.data.totalComments
        );
      } catch (err) {
        console.log("Error getting comments number: ", err.message);
      }
    };
    getCommentsNumber();
  }, [createCommentCount, deleteCommentCount]);
  const handleUpdateEvent = () => {
    setShowUpdateEvent(true);
    setShowDeleteEvent(false);
    setShowOptionsPopup(false);
  };
  const handleDeleteEvent = () => {
    setShowDeleteEvent(true);
    setShowUpdateEvent(false);
    setShowOptionsPopup(false);
  };

  const handleDeleteEventReqeust = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${event._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("Delete an event response: ", res.data);
      setShowDeleteEvent(false);
      setDeleteEventCount(deleteEventCount + 1);
    } catch (err) {
      console.log("Error delete an event: ", err.message);
    }
  };
  const handleUpdateEventReqeust = async () => {
    if (event.description === updatedDescription) {
      console.log(
        "Description didn't change, change something to update or cancel"
      );
    } else {
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${event._id}`,
          { description: updatedDescription },
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Update the event response: ", res.data);
        setEvent(res.data);
        setShowUpdateEvent(false);
      } catch (err) {
        console.log("Error updating the event: ", err.message);
      }
    }
  };

  return (
    <div className="max-xs:w-[95%] xs:w-[95%] sm360:w-[95%] sm480:w-[95%] sm:w-[95%] md:w-[90%] lg:w-[85%] ">
      <div className="relative w-full">
        {(showDeleteEvent || showUpdateEvent) && (
          <div
            className={`absolute left-1/2 top-[10px] -translate-x-1/2 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base z-30 ${
              showUpdateEvent
                ? "max-xs:w-[250px] xs:w-[250px] sm:w-[350px]"
                : showDeleteEvent
                ? "max-xs:w-[250px] xs:w-[250px] sm:w-[350px]"
                : ""
            } shadow-xl rounded-md font-medium ${
              mode === "light" ? "bg-light-background" : "bg-dark-background"
            }`}
          >
            {showDeleteEvent && (
              <div className="rounded-md p-2 flex flex-col gap-y-2">
                <p>{t("sentences.deleteEventMessage")}</p>
                <div className={`flex gap-x-2 `}>
                  <span
                    onClick={() => setShowDeleteEvent(false)}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-secondaryText text-dark-text hover:text-light-text"
                        : "bg-dark-secondaryText text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.cancel")}
                  </span>
                  <span
                    onClick={handleDeleteEventReqeust}
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
            {showUpdateEvent && (
              <div className="rounded-md p-2 flex flex-col gap-y-2">
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
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <div className="flex gap-x-2">
                  <span
                    onClick={() => setShowUpdateEvent(false)}
                    className={`flex-1 flex items-center justify-center py-1 px-2 rounded-md cursor-pointer duration-150 ${
                      mode === "light"
                        ? "bg-light-secondaryText text-dark-text hover:text-light-text"
                        : "bg-dark-secondaryText text-light-text hover:text-dark-text"
                    }`}
                  >
                    {t("words.cancel")}
                  </span>
                  <span
                    onClick={handleUpdateEventReqeust}
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
      <div
        className={`p-5 max-sm360:p-3 rounded-xl flex flex-col gap-y-3 w-full ${
          mode === "light"
            ? "bg-light-cardsBackground text-dark-background"
            : "bg-dark-cardsBackground text-light-background"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex max-xs:gap-x-1 xs:gap-x-1 sm:gap-x-2 lg:gap-x-3">
            {hostProfile && (
              <Image
                src={hostProfile}
                alt="hostProfile"
                className="max-xs:w-7 max-xs:h-7 xs:w-7 xs:h-7 sm480:w-8 sm480:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full cursor-pointer"
                width={100}
                height={100}
              />
            )}

            <div className="flex flex-col">
              <p
                className={`max-xs:text-xs xs:text-xs sm:text-sm lg:text-base font-medium cursor-pointer hover:underline ${
                  mode === "light" ? "text-light-primary" : "text-dark-primary"
                }`}
              >
                {`${event.host.firstName} ${event.host.lastName}`}
              </p>
              <p
                className={`max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm font-normal ${
                  mode === "light"
                    ? "text-light-secondaryText"
                    : "text-dark-secondaryText"
                }`}
              >
                {formattedDate}
              </p>
              <span
                className={`max-xs:text-[10px] xs:text-[10px] sm:text-xs lg:text-sm font-normal ${
                  event.status === ("cancelled" || "completed")
                    ? mode === "light"
                      ? "text-light-red"
                      : "text-dark-red"
                    : event.status === "ongoing"
                    ? mode === "light"
                      ? "text-light-secondary"
                      : "text-dark-secondary"
                    : mode === "light"
                    ? "text-light-secondaryText"
                    : "text-dark-secondaryText"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>
          <div className="flex gap-x-3">
            {event.host._id !== userData?.myId && (
              <JoinLeaveEvent mode={mode} setEvent={setEvent} event={event} />
            )}
            <div className="flex gap-x-0.5">
              <span className="max-xs:text-xs xs:text-xs sm:text-sm">
                {event.participants.length}
              </span>
              <IoPersonSharp
                size={
                  isSmallerThan360
                    ? 12
                    : isSmallerThan480
                    ? 14
                    : isSmallerThan640
                    ? 16
                    : 16
                }
              />
            </div>
            {event.host._id === userData?.myId && (
              <div className={`${showOptionsPopup && "relative z-30"}`}>
                {showOptionsPopup ? (
                  <span onClick={() => setShowOptionsPopup(false)}>
                    <AiOutlineClose className={`cursor-pointer `} size={16} />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setShowOptionsPopup(true);
                      setShowUpdateEvent(false);
                      setShowDeleteEvent(false);
                    }}
                  >
                    <FaEllipsisH className={`cursor-pointer `} size={18} />
                  </span>
                )}
                {showOptionsPopup && (
                  <div
                    className={`absolute p-2 flex flex-col shadow-xl gap-y-2 rounded-md max-xs:text-xs xs:text-xs sm:text-sm lg:text-base right-0
                     min-w-[150px] max-w-[200px] top-[20px] ${
                       mode === "light"
                         ? "bg-light-cardsBackground text-dark-text"
                         : "bg-dark-cardsBackground text-light-text"
                     }`}
                  >
                    <span
                      onClick={handleUpdateEvent}
                      className={`flex-1 py-1 flex items-center font-semibold rounded-md justify-center duration-150 cursor-pointer ${
                        mode === "light"
                          ? "bg-light-primary hover:text-light-text"
                          : "bg-dark-primary hover:text-dark-text"
                      }`}
                    >
                      {t("words.update")}
                    </span>
                    <span
                      onClick={handleDeleteEvent}
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
        <div className="flex flex-col gap-y-2">
          <div className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base flex flex-col gap-y-1">
            <p className="max-xs:text-sm xs:text-sm sm:text-base lg:text-lg flex items-center gap-x-1">
              (<span className="capitalize">{event.access}</span>
              <span>{event.category}</span>)
            </p>
            <p>{event.description}</p>
          </div>
          {event.content.publicId && (
            <div className="w-full h-[350px] sm:h-[400px] lg:h-[450px]">
              {event.content.type === "image" ? (
                <Image
                  src={event.content.url}
                  alt="Event Image"
                  className="w-full h-full object-cover rounded-lg"
                  width={700}
                  height={700}
                />
              ) : (
                <video
                  className="w-full h-full object-cover rounded-lg"
                  controls
                >
                  <source src={event.content.url} type="video/mp4" />
                </video>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          <p className="flex-1 flex gap-x-1 justify-center items-center max-xs:text-xs xs:text-xs sm:text-sm lg:text-base">
            {event.likes.length === 0 || event.likes.length === 1
              ? `${event.likes.length} ${t("words.like")}`
              : `${event.likes.length} ${t("words.likes")}`}
          </p>
          <p
            onClick={() => {
              setShowCreateComment(true);
              setShowComments(true);
            }}
            className="max-xs:text-xs xs:text-xs sm:text-sm lg:text-base flex-1 flex justify-center items-center cursor-pointer"
          >
            {commentsNumber === 0 || commentsNumber === 1
              ? `${commentsNumber} ${t("words.comment")}`
              : `${commentsNumber} ${t("words.comments")}`}
          </p>
        </div>
        <span
          className={`h-0.5 w-full ${
            mode === "light" ? "bg-light-background" : "bg-dark-background"
          }`}
        />
        <div className={`flex`}>
          <div className="flex-1 flex justify-center items-center">
            <Reaction
              setEvent={setEvent}
              parent="event"
              mode={mode}
              eventId={event._id}
              likes={event.likes}
            />
          </div>
          <p
            onClick={() => {
              setShowCreateComment(true);
            }}
            className="flex-1 flex justify-center items-center cursor-pointer max-xs:text-xs xs:text-xs sm:text-sm lg:text-base"
          >
            {t("words.doComment")}
          </p>
        </div>
        {(showComments || showCreateComment) && (
          <div className="flex flex-col">
            {showComments && (
              <div className="">
                <ShowComments
                  setShowComments={setShowComments}
                  mode={mode}
                  authorId={event.host._id}
                  eventId={event._id}
                  createCommentCount={createCommentCount}
                  showCreateComment={showCreateComment}
                  setDeleteCommentCount={setDeleteCommentCount}
                  deleteCommentCount={deleteCommentCount}
                  setShowCreateComment={setShowCreateComment}
                />
              </div>
            )}
            {showCreateComment && (
              <CreateComment
                mode={mode}
                eventId={event._id}
                setShowCreateComment={setShowCreateComment}
                setCreateCommentCount={setCreateCommentCount}
                createCommentCount={createCommentCount}
                setShowComments={setShowComments}
                showComments={showComments}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
