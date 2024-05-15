"use client";

import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Briefcase,
  Calendar,
  CalendarDays,
  Clock,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideNavBar = () => {
  const menu = [
    {
      id: 1,
      name: "Meeting type",
      path: "/dashboard/meeting-type",
      icon: Briefcase, // icon from lucid-react
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: CalendarDays, // icon from lucid-react
    },
    {
      id: 3,
      name: "Availablity",
      path: "/dashboard/availablity",
      icon: Clock, // icon from lucid-react
    },
    // {
    //   id: 4,
    //   name: "Settings",
    //   path: "/dashboard/settings",
    //   icon: Settings, // icon from lucid-react
    // },
  ];
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    path && setActivePath(path);
  }, [path]);
  const router = useRouter();

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center p-3">
        <Image
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="logo"
          onClick={() => router.replace("/dashboard")}
          className="cursor-pointer"
        />
      </div>
      <Link href={"/create-meeting"}>
        <Button className="flex gap-2 w-full rounded-full mt-7">
          <Plus />
          Create
        </Button>
      </Link>
      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button
              key={index}
              className={`w-full flex gap-2 justify-start shadow-sm font-normal text-lg hover:bg-blue-100 ${
                activePath == item.path && "text-primary bg-blue-100"
              }`}
              variant="ghost"
            >
              <item.icon />
              {item.name}
            </Button>
          </Link>
        ))}

        {/* <LogoutLink
          className={`w-full flex gap-2 justify-start text-black px-3 py-3 font-normal text-lg hover:bg-blue-100`}
        > */}
        <LogoutLink>
          <Button
            className={`w-full flex gap-2 justify-start shadow-sm font-normal text-lg hover:bg-blue-100`}
            variant="ghost"
          >
            <LogOut /> Logout
          </Button>
        </LogoutLink>
      </div>
    </div>
  );
};

export default SideNavBar;
