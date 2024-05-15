"use client"

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center m-5">
      {/* left */}
      <div className="flex flex-col justify-center items-center my-20">
        <div className="text-center max-w-xl">
          <h2 className="font-bold text-[50px]">Easy scheduling ahead</h2>
          <h2 className="text-xl mt-5 text-slate-500">
            Scheduly is your scheduling automation platform for eliminating the
            back-and-forth emails to find the perfect time — and so much more.
          </h2>
          <div className="flex gap-4 flex-col mt-5">
            <h3>Sign Up free with Google and Facebook</h3>
            <div className="flex justify-center gap-8">
              <LoginLink>
                <Button className="p-7 flex gap-4">
                  <Image src={"/Google.png"} width={30} height={30}></Image>
                  Sign up with Google
                </Button>
              </LoginLink>
              <LoginLink>
                <Button className="p-7 flex gap-4">
                  <Image src={"/facebook.png"} width={30} height={30}></Image>
                  Sign up with Facebook
                </Button>
              </LoginLink>
            </div>
            <hr />
            <h2>
              {/* <Link href="" className="text-primary"> */}
              <LoginLink className="text-primary">
                Sign up Free with Email.
              </LoginLink>
              {/* </Link> */}
              No Credit card required
            </h2>
          </div>
        </div>
      </div>
      {/* right */}
      <Image
        src={"/undraw3.png"}
        width={600}
        height={100}
        className="hidden lg:block"
      ></Image>
    </div>
  );
};

export default Hero;
