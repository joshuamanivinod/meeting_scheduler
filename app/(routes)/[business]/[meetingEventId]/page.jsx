"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/meetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const SharedMeetingEvent = ({ params }) => {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
    params && getMeetingBusinessandEventDetails();
  }, [params]);

  // *****
  const getMeetingBusinessandEventDetails = async () => {
    setLoading(true); //start loading
    const q = query(collection(db, "Business"),where("businessName", "==", decodeURI(params?.business)));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      console.log(doc.data());
      setBusinessInfo(doc.data());
    });

    // to get event details
    const docRef = doc(db, "MeetingEvent", params?.meetingEventId);
    const result = await getDoc(docRef);
    setEventInfo(result.data());

    setLoading(false); //stop loading
  };
  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default SharedMeetingEvent;
