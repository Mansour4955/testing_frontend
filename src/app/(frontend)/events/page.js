"use client"
import CreateEvent from "@/components/custom/CreateEvent";
import Events from "@/components/custom/Events";
import FilterEvents from "@/components/custom/FilterEvents";
import React from "react";

export default function EventsPage() {
  return (
    <div className="w-full flex flex-col gap-y-10 max-sm:gap-y-6">
      <CreateEvent />
      <FilterEvents />
      <Events parent="eventsPage" />
    </div>
  );
}
