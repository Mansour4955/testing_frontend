"use client"; // Ensure it's only used on the client side

import { useSocket } from "@/hooks/useSocket"; // Import the custom hook
import Notification from "@/components/custom/Notification";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Notifications() {
  const { mode } = useSelector((state) => state.settings);
  const { t } = useTranslation();
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const [notifications, setNotifications] = useState([]);
  // Use the custom hook to manage WebSocket and notifications
  const { notifications: theNotifications, socket } = useSocket(userData?.id);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastNotificationRef = useRef(null);

  // Fetch initial notifications (if needed)
  useEffect(() => {
    const fetchInitialNotifications = async () => {
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
        setNotifications(res.data.notifications);
        console.log(res.data.notifications);
        setHasMore(res.data.hasMore || false);
        setPage((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchInitialNotifications();
  }, [userData?.token, theNotifications]);

  // Fetch more notifications
  const fetchMoreNotifications = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setNotifications((prev) => [...prev, ...(res.data.notifications || [])]);
      setPage((prev) => prev + 1);
      setHasMore(res.data.hasMore || false);
    } catch (error) {
      console.error("Error fetching more notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Observe the last notification for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          fetchMoreNotifications();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (lastNotificationRef.current) {
      observer.observe(lastNotificationRef.current);
    }

    return () => {
      if (lastNotificationRef.current) {
        observer.unobserve(lastNotificationRef.current);
      }
    };
  }, [lastNotificationRef, hasMore, loading]);

  return (
    <div className="w-full">
      {notifications.length > 0 ? (
        <div className="flex flex-col items-center">
          {notifications.map((notification, index) => (
            <div
              className="min-w-full flex justify-center"
              key={index}
              ref={
                index === notifications.length - 1 ? lastNotificationRef : null
              }
            >
              <Notification mode={mode} notificationData={notification} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold mt-5">
          {t("sentences.noNotificationsFound")}
        </p>
      )}
    </div>
  );
}
