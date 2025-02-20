"use client";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import EventSkeleton from "@/skeleton/EventSkeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// Lazy load the component
const Event = dynamic(() => import("./Event"), {
  ssr: false, // Optional: Disable SSR if needed
  loading: () => <EventSkeleton />, // Fallback UI
});

export default function Events({ parent, filter = "all", createEventCount }) {
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.settings);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // Tracks if more data is available
  const [loading, setLoading] = useState(false); // Prevents multiple simultaneous API calls
  const [deleteEventCount, setDeleteEventCount] = useState(0);
  const lastEventRef = useRef(null); // Ref for the last event

  useEffect(() => {
    const getevents = async () => {
      try {
        let res;
        res =
          parent === "homePage"
            ? await axios(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/public`
              )
            : parent === "eventsPage"
            ? await axios(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?page=1&filter=${filter}`,
                {
                  headers: {
                    Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
                  },
                }
              )
            : null;

        setEvents(res.data.events);
        console.log("res.data.events: ", res.data.events);

        if (parent === "eventsPage") {
          setHasMore(res.data.hasMore || false);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching events :", error);
      }
    };
    getevents();
  }, [deleteEventCount, filter, createEventCount]);

  // Fetch more events
  const fetchMoreEvents = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?page=${page}&filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
          },
        }
      );
      setEvents((prev) => [...prev, ...(res.data.events || [])]);
      setPage((prev) => prev + 1);
      setHasMore(res.data.hasMore || false);
    } catch (error) {
      console.error("Error fetching more events :", error);
    } finally {
      setLoading(false);
    }
  };

  // Observe the last event for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasMore &&
          !loading &&
          parent === "eventsPage"
        ) {
          fetchMoreEvents();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (lastEventRef.current) {
      observer.observe(lastEventRef.current);
    }

    return () => {
      if (lastEventRef.current) {
        observer.unobserve(lastEventRef.current);
      }
    };
  }, [lastEventRef, hasMore, loading]);

  return (
    <div className="w-full">
      {events?.length > 0 ? (
        <div className="flex flex-col items-center max-xs:gap-y-3 xs:gap-y-3 sm480:gap-y-4 sm:gap-y-5 md:gap-y-6 lg:gap-y-7 mt-10 max-md:mt-8 max-sm:mt-6">
          {events.map((event, index) =>
            // Attach the ref to the wrapper of the last event
            index === events.length - 1 ? (
              <div
                className="min-w-full flex justify-center"
                key={index}
                ref={lastEventRef}
              >
                <Event
                  mode={mode}
                  eventData={event}
                  deleteEventCount={deleteEventCount}
                  setDeleteEventCount={setDeleteEventCount}
                />
              </div>
            ) : (
              <div className="min-w-full flex justify-center" key={index}>
                <Event
                  mode={mode}
                  eventData={event}
                  deleteEventCount={deleteEventCount}
                  setDeleteEventCount={setDeleteEventCount}
                />
              </div>
            )
          )}
        </div>
      ) : (
        <p
          className={`text-center font-semibold max-xs:text-sm xs:text-sm sm:text-base lg:text-lg`}
        >
          {t(`sentences.noEventsFound`)}
        </p>
      )}
    </div>
  );
}
