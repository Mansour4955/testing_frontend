import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// Lazy load the component
const Comment = dynamic(() => import("./Comment"), {
  ssr: false, // Optional: Disable SSR if needed
});
export default function ShowComments({
  setShowCreateComment,
  setShowComments,
  mode,
  eventId,
  authorId,
  createCommentCount,
  showCreateComment,
  deleteCommentCount,
  setDeleteCommentCount,
}) {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]); // Stores all comments
  const [page, setPage] = useState(1); // Tracks current page for pagination
  const [hasMore, setHasMore] = useState(false); // Tracks if more data is available
  const [loading, setLoading] = useState(false); // Prevents multiple simultaneous API calls

  const commentsContainerRef = useRef(null); // Ref to the scrollable container

  // Fetch initial comments
  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments?eventId=${eventId}&page=1`
        );
        setComments(res.data.comments || []);
        setHasMore(res.data.hasMore || false);
        setPage(2); // Prepare for the next page
        console.log("Initial comments response:", res.data);
      } catch (err) {
        console.error("Error fetching initial comments:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [eventId, createCommentCount, deleteCommentCount]);

  // Fetch more comments
  const fetchMoreComments = async () => {
    if (loading || !hasMore) return; // Prevent duplicate calls or unnecessary fetches
    setLoading(true);
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments?eventId=${eventId}&page=${page}`
      );
      setComments((prev) => [...prev, ...(res.data.comments || [])]);
      setPage((prev) => prev + 1);
      setHasMore(res.data.hasMore || false);
      console.log("More comments response:", res.data);
    } catch (err) {
      console.error("Error fetching more comments:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll event
  const handleCommentsScroll = () => {
    const container = commentsContainerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 20 && // Near the bottom
      hasMore &&
      !loading
    ) {
      fetchMoreComments();
    }
  };

  return (
    <div
      className={`${showCreateComment ? "rounded-t-xl" : "rounded-xl"} ${
        mode === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
    >
      <div
        className={`max-h-[60vh] overflow-y-auto flex `}
        ref={commentsContainerRef} // Attach ref to the container
        onScroll={handleCommentsScroll} // Handle scroll event
      >
        {/* Main comments section */}
        <div className="flex-1 max-sm480:p-1 p-2 flex flex-col gap-y-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                commentData={comment}
                mode={mode}
                authorId={authorId}
                setDeleteCommentCount={setDeleteCommentCount}
                deleteCommentCount={deleteCommentCount}
              />
            ))
          ) : (
            <p className="text-center">{t("words.noCommentsFound")}</p>
          )}

          {/* {loading && <p>Loading...</p>} */}
        </div>
      </div>
      {/* Close Button */}
      <div className="flex justify-center">
        <button
          className={`w-4/5 px-4 duration-150 ${
            showCreateComment ? "mt-2 mb-1" : "my-2"
          }  py-1 max-xs:text-xs xs:text-xs sm:text-sm lg:text-base font-medium ${
            mode === "light"
              ? "bg-light-primary hover:bg-light-secondary text-dark-text"
              : "bg-dark-primary hover:bg-dark-secondary text-light-text"
          } rounded-lg`}
          onClick={() => {
            setShowComments(false);
            setShowCreateComment(false);
          }}
        >
          {t("words.close")}
        </button>
      </div>
    </div>
  );
}
