"use client";
import Events from "@/components/custom/Events";
import dynamic from "next/dynamic";
import { useState } from "react";

// Lazy load the component
const FilterEvents = dynamic(() => import("@/components/custom/FilterEvents"), {
  ssr: false, // Optional: Disable SSR if needed
});
const CreateEvent = dynamic(() => import("@/components/custom/CreateEvent"), {
  ssr: false, // Optional: Disable SSR if needed
});
export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [createEventCount, setCreateEventCount] = useState(0);
  return (
    <div className="w-full flex flex-col gap-y-10 max-sm:gap-y-6">
      <div className="w-full flex justify-center">
        <div className="max-xs:w-[95%] xs:w-[95%] sm360:w-[95%] sm480:w-[95%] sm:w-[95%] md:w-[90%] lg:w-[85%] flex flex-col gap-y-10 max-sm:gap-y-6">
          <CreateEvent
            setCreateEventCount={setCreateEventCount}
            createEventCount={createEventCount}
          />
          <FilterEvents setFilter={setFilter} />
        </div>
      </div>
      <Events
        createEventCount={createEventCount}
        filter={filter}
        parent="eventsPage"
      />
    </div>
  );
}
