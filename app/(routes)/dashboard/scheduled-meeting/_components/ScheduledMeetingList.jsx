import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Timer, User, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScheduledMeetingList = ({ meetingList }) => {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <Accordion type="single" collapsible key={index} className="shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
              <AccordionContent>
                <div className="mt-3 flex flex-col gap-4">
                  <h2 className="flex gap-2">
                    <UserRound/>
                    {meeting?.userName}
                  </h2>
                  <h2 className="flex gap-2">
                    <Clock />
                    {meeting?.duration} Min
                  </h2>
                  {/* <h2 className="flex gap-2">
                      <MapPin />
                      {meeting?.locationType} Meeting{" "}
                    </h2> */}
                  <h2 className="flex gap-2">
                    <CalendarDays />
                    {meeting.formatedDate}
                  </h2>

                  <h2 className="flex gap-2">
                    <Timer />
                    {meeting.selectedTime}
                  </h2>

                  <Link
                    href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                    className="text-primary"
                  >
                    {meeting?.locationUrl}
                  </Link>
                  <Link href={meeting.locationUrl}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default ScheduledMeetingList;
