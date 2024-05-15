"use client";

import DaysList from "@/app/_utils/DaysList";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

const Availablity = () => {
  const [daysAvailable, setDaysAvailable] = useState([
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Thursday: false,
    },
    {
      Friday: false,
    },
    {
      Saturday: false,
    },
  ]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setDaysAvailable(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime);
  };

  const onHandleChange = (days, value) => {
    setDaysAvailable({
      ...daysAvailable,
      [days]: value,
    });
    console.log(daysAvailable);
  };

  const handleSave = async () => {
    console.log(daysAvailable, startTime, endTime);
    const docRef = doc(db, "Business", user?.email);
    await updateDoc(docRef, {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime,
      endTime,
    }).then((resp) => {
      // console.log("I reached here")
      toast("Changes Updated!");
    });
  };

  return (
    <div>
      <h2 className="font-bold text-2xl p-10">Availability</h2>
      <hr className="my-7" />

      <div className="md:flex pb-7">
        {" "}
        {/*  */}
        {/* Availability Days */}
        <div className="px-10 py-3">
          <h2 className="font-bold">Availability Days</h2>
          {/* grid grid-cols-2 md:grid-cols-4 */}
          <div className="flex flex-col gap-3 my-3">
            {DaysList.map((item, index) => (
              <div key={index}>
                <h2>
                  <Checkbox
                    onCheckedChange={(e) => onHandleChange(item.days, e)}
                    checked={
                      daysAvailable[item.days]
                        ? daysAvailable[item.days]
                        : false
                    }
                  />{" "}
                  {item.days}
                </h2>
              </div>
            ))}
          </div>
        </div>
        {/* Availability Time */}
        <div className="px-10 py-3">
          <h2 className="font-bold">Availability Time</h2>
          <div className="flex gap-10">
            <div className="mt-3">
              <h2>Start Time</h2>
              <Input
                type="time"
                onChange={(e) => setStartTime(e.target.value)}
                defaultValue={startTime}
              />
            </div>
            <div className="mt-3 ">
              <h2>End Time</h2>
              <Input
                type="time"
                onChange={(e) => setEndTime(e.target.value)}
                defaultValue={endTime}
              />
            </div>
          </div>
          <div className="flex mt-2">
            <Button className="mt-8 px-10" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availablity;
