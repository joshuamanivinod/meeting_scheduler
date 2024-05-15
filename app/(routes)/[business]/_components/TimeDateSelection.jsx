import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const TimeDateSelection = ({
  date,
  handleDateChange,
  timeSlots,
  setSelectedTime,
  enableTimeSlot,
  selectedTime,
  prevBooking
}) => {

  // Time slot validation
  const checkTimeSlot=(time)=>{
    return (prevBooking.filter(item=>item.selectedTime==time)).length>0
  }

  return (
    <div className="md:col-span-2 lg:flex px-4">
      {/* calender */}
      <div className="flex flex-col px-2 mt-7 md:mt-0">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md mt-5"
          disabled={(date) => date <= new Date()}
        />
      </div>
      {/* time slots */}
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5 mt-10"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots?.map((time, index) => (
          <Button
            key={index}
            className={`border-primary text-primary px-10 ${time==selectedTime&&"bg-primary text-white"}`}
            variant="outline"
            onClick={() => setSelectedTime(time)}
            disabled={!enableTimeSlot||checkTimeSlot(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeDateSelection;
