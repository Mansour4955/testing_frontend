"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import EventSkeleton from "@/skeleton/EventSkeleton";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Lazy load the component
const Event = dynamic(() => import("@/components/custom/Event"), {
  ssr: false, // Optional: Disable SSR if needed
  loading: () => <EventSkeleton />, // Fallback UI
});

export default function page() {
  const { mode } = useSelector((state) => state.settings);
  const { getItem } = useLocalStorage("userData");
  const userData = getItem();
  const params = useParams();
  const [eventData, setEventData] = useState(null);
  console.log("params: ", params);

  useEffect(() => {
    const getEventById = async (id) => {
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Getting event response: ", res.data);
        setEventData(res.data);
      } catch (err) {
        console.log("Error getting event: ", id, err.message);
      }
    };
    if (params?.id) getEventById(params?.id);
  }, [params?.id]);
  console.log("eventData: ", eventData);

  return (
    <div className="mt-5 flex justify-center">
      {params?.id && eventData && <Event mode={mode} eventData={eventData} />}
    </div>
  );
}
