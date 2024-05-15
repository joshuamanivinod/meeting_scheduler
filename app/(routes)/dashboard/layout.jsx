import React from "react";
import SideNavBar from "./_components/sidenavbar";
import DashboardHeader from "./_components/dashboardHeader";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="block md:hidden m-2">
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <SideNavBar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="hidden md:block md:w-64 bg-slate-50 h-screen fixed">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <Toaster />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
