"use client";
import Events from "@/components/custom/Events";
import { useState } from "react";
import FilterEvents from "@/components/custom/FilterEvents";
import CreateEvent from "@/components/custom/CreateEvent";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [status, setStatus] = useState("all");
  const [counter, setCounter] = useState(0);
  const [createEventCount, setCreateEventCount] = useState(0);
  return (
    <div className="w-full flex flex-col gap-y-10 max-sm:gap-y-6">
      <div className="w-full flex justify-center">
        <div className="max-xs:w-[95%] xs:w-[95%] sm360:w-[95%] sm480:w-[95%] sm:w-[95%] md:w-[90%] lg:w-[85%] flex flex-col gap-y-10 max-sm:gap-y-6">
          <CreateEvent
            setCreateEventCount={setCreateEventCount}
            createEventCount={createEventCount}
          />
          <FilterEvents
            setCounter={setCounter}
            counter={counter}
            setStatus={setStatus}
            setFilter={setFilter}
          />
        </div>
      </div>
      <Events
        createEventCount={createEventCount}
        filter={filter}
        counter={counter}
        status={status}
        parent="eventsPage"
      />
    </div>
  );
}
