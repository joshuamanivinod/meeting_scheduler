"use client";

import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(13);

  const router = useRouter();

  useEffect(() => {
    user && isBussinessRegistered();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 50);
    return () => clearTimeout(timer);
  }, []);

  const isBussinessRegistered = async () => {
    const docRef = doc(db, "Business", user.email); //business-collection name, "SF"-name of the document
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setLoading(false);
        router.replace("/create-business");
      }
    } catch (error) {
      console.log("No such document!");
      setLoading(false);
      router.replace("/create-business");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  return (
    <div>
      <MeetingType />
      {/* <LogoutLink>Logout</LogoutLink> */}
    </div>
  );
};

export default Dashboard;
