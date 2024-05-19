import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Clock2,
  LoaderIcon,
  MapPin,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import Email from "@/emails";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevBooking, setPrevBooking] = useState([]);
  const router = useRouter();

  const db = getFirestore(app);
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

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

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo?.daysAvailable?.[day]) {
      getPrevEventBooking(date);
      setEnableTimeSlot(true);
    } else {
      setEnableTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(userEmail) == false) {
      toast("Enter valid email address");
      return;
    }
    const docId = Date.now().toString();
    // add data to firebase
    setLoading(true);
    await setDoc(doc(db, "ScheduledMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedDate: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then((resp) => {
      setLoading(false);
      // toast("Meeting scheduled successfully!");
      router.replace("/confirmation");
      sendEmail(userName);
    });
  };

  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={format(date, "PPP").toString()}
        duration={eventInfo?.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationUrl}
        userFirstName={user}
      />
    );

    plunk.emails
      .send({
        to: userEmail,
        subject: "Meeting schedule details",
        body: emailHtml,
      })
      .then((resp) => {
        console.log(resp);
        router.replace("/confirmation");
      });
  };

  //used to fetch prev booking for given event
  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-8 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      {/* TOP */}
      <div className="flex justify-between">
        {/* logo */}
        <Image
          src={"/logo.svg"}
          height={40}
          width={80}
          alt="logo"
          className="ml-5"
        />
        {/* Schedule meeting, back, next button */}
        <div className="flex">
          {step == 2 && (
            <Button
              className="m-1 mt-5 px-4 py-3 flex"
              variant="outline"
              onClick={() => setStep(1)}
            >
              <ChevronLeft /> Back
            </Button>
          )}
          {step == 1 ? (
            <Button
              className="m-1 mt-5 px-5 py-3"
              disabled={!selectedTime || !date}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              className="m-1 mt-5 px-7 py-3"
              disabled={!userEmail || !userName}
              onClick={handleScheduleEvent}
            >
              {loading ? <LoaderIcon className="animate-spin" /> : "Schedule"}
            </Button>
          )}
        </div>
      </div>
      {/* MIDDLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* LEFT SIDE: meeting info */}
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting{" "}
            </h2>
            <h2 className="flex gap-2">
              <CalendarDays />
              {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* RIGHT SIDE: time and date selection */}
        {step == 1 ? (
          <TimeDateSelection
            date={date}
            handleDateChange={handleDateChange}
            timeSlots={timeSlots}
            setSelectedTime={setSelectedTime}
            enableTimeSlot={enableTimeSlot}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
