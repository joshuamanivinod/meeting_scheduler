import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const PreviewMeeting = ({ formValue }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; //8am in min
    const endTime = 22 * 60; // 10pm in min
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; //convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    setTimeSlots(slots);
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-8 border-t-8"
      style={{ borderTopColor: formValue?.themeColor }}
    >
      <Image src={"/logo.svg"} height={20} width={60} alt="logo" />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* meeting info */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-2xl">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {formValue?.duration} Min
            </h2>
            <h2 className="flex">
              <MapPin />
              {formValue?.locationType} Meeting{" "}
            </h2>
            <Link
              href={formValue?.locationUrl ? formValue?.locationUrl : "#"}
              className="text-primary"
            >
              {formValue?.locationUrl}
            </Link>
          </div>
        </div>
        {/* time and date selection */}
        <div className="md:col-span-2 lg:flex px-4">
          {/* calender */}
          <div className="flex flex-col px-2">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md mt-5"
              disabled={(date)=>date<=new Date()}
            />
          </div>
          {/* time slots */}
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5 mt-10"
            style={{ maxHeight: "400px"}}
          >
            {timeSlots?.map((time, index) => (
              <Button
                className="border-primary text-primary px-10"
                variant="outline"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
