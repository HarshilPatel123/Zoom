import NavBar from "@/components/ui/NavBar";
import SideBar from "@/components/ui/SideBar";
import { Metadata } from "next";
import React, { Children } from "react";

export const metadata: Metadata = {
    title: "ZOOM",
    description: "Video Calling App",
    icons: {
      icon: '/icons/logo.svg'
    }
  };

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <NavBar/>
            <div className="flex">
                <SideBar/>
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
           
        </main>
    );
};

export default HomeLayout;
