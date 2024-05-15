"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBusiness = () => {
  const [businessName, setBusinessName] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router=useRouter()
  const onCreateBusiness = async () => {
    console.log("btn clicked", businessName);
    //Business-collection name, provide field
    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName,
      email: user.email,
      userName: user.given_name + " " + user.family_name,
    }).then((resp) => {
      console.log("Doc saved");
      toast("New business created!")
      router.replace('/dashboard')
    });
  };

  return (
    <div className="p-14 flex justify-center my-[70px]">
      <div className="flex flex-col items-center gap-5 max-w-3xl">
        <Image
          src={"/logo.svg"}
          height={100}
          width={100}
          className="w-[80px] sm:w-[100px]"
        ></Image>
        <h2 className="font-bold text-4xl">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name:</label>
          <Input
            placeholder="Eg: Titans"
            className="mt-2"
            onChange={(event) => {
              setBusinessName(event.target.value);
            }}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
