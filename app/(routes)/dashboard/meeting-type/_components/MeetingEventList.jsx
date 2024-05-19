"use client";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getDoc, getFirestore, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Clock,
  Copy,
  MapPin,
  Pen,
  SettingsIcon,
  Trash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const MeetingEventList = () => {
  const db = getFirestore(app);
  const router = useRouter(); // of next/navigation
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState();
  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);

  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email, orderBy("id", "desc"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };

  const onDeleteMeetingEvent = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((resp) => {
      toast("Meeting event DELETED!");
      getEventList();
    });
  };

  const BusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setBusinessInfo(result);
  };

  const onCopyClickHandler = (event) => {
    const meetingEventUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to clipboard");
  };

  return (
    <div className="mt-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.length > 0 ? (
        eventList?.map((event, index) => (
          <div
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className=" flex justify-end">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => onDeleteMeetingEvent(event)}
              >
                <Trash2 />
              </div>
              {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SettingsIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-2 cursor-pointer">
                      <Pen /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2 cursor-pointer"
                      onClick={() => onDeleteMeetingEvent(event)}
                    >
                      <Trash /> Detete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock /> {event?.duration} Min
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin /> {event?.locationType}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm items-center text-primary cursor-pointer"
                onClick={() => {
                  onCopyClickHandler(event);
                  // navigator.clipboard.writeText(event?.locationUrl);
                  // toast("Copied to clipboard");
                }}
              >
                <Copy className="h-4 w-4" /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="border-primary rounded-full text-primary"
                onClick={() => {
                  router.replace(
                    process.env.NEXT_PUBLIC_BASE_URL +
                      "/" +
                      businessInfo.businessName +
                      "/" +
                      event.id
                  );
                  // onCopyClickHandler(event);
                }}
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-1 text-gray-500">
          <p>
            Click on the create button to create your first meeting so that
            others can book slots accordingly.
          </p>
          <p>
            You can also click the availability button to choose which dates you are available so that other's won't book slots on that day.
          </p>
        </div>
      )}
    </div>
  );
};

export default MeetingEventList;
