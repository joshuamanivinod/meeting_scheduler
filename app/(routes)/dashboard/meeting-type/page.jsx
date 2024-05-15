import { Input } from "@/components/ui/input";
import React from "react";
import MeetingEventList from "./_components/MeetingEventList";
import Search from "./_components/Search";

const MeetingType = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5 ">
        <h2 className="font-sans text-3xl md:text-4xl">Meeting Event Type</h2>
        {/* <Search/> */}
        {/* <Input placeholder={`Search`} className="max-w-xs" /> */}
        <hr />
      </div>
      <MeetingEventList />
    </div>
  );
};

export default MeetingType;
