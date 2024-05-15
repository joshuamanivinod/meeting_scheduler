"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import { format } from "date-fns";

const ScheduledMeeting = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient(); // to get user details
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    user && getScheduledMeeting();
  }, [user]);

  /**
   * Used to getbusiness prev meetings
   */
  const getScheduledMeeting = async () => {
    setMeetingList([]);
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("businessEmail", "==", user.email)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setMeetingList((prev) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type) => {
    //type-upcoming/expired
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formatedTimeStamp >= format(new Date(), "t")
      );
    }else{
      return meetingList.filter(
        (item) => item.formatedTimeStamp < format(new Date(), "t")
      );
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduledMeeting;
