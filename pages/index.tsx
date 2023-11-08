import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Chip,
} from "@nextui-org/react";

export default function Home() {
  return (
    <main className="w-[100%] min-h-[100vh] flex flex-col bg-background-light items-center pt-4">
      <Navbar>
        <NavbarBrand>
          <h1 className="font-Khorla text-heading-blue-primary text-2xl">
            StatsTrack
          </h1>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem className="hidden md:block">
            <Chip
              variant="dot"
              color="success"
              classNames={{
                base: " bg-gradient-to-br from-heading-blue-primary to-text-red-primary border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-background-light",
              }}
            >
              Introducing version 1.0🎉
            </Chip>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent>
          <NavbarItem>
            <div className="flex gap-4 btn">
              <Button
                className=" text-heading-blue-primary bg-background-light border-heading-blue-primary font-medium"
                href="#"
                variant="bordered"
                radius="full"
              >
                Sign Up
              </Button>
              <Button
                className="bg-heading-blue-primary text-background-light font-medium"
                href="#"
                variant="flat"
                radius="full"
              >
                Sign In
              </Button>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="mt-8 md:hidden">
        <Chip
          variant="dot"
          color="success"
          classNames={{
            base: "bg-gradient-to-br from-heading-blue-primary to-text-red-primary border-small border-white/50 shadow-pink-500/30",
            content: "drop-shadow shadow-black text-background-light",
          }}
        >
          Introducing version 1.0🎉
        </Chip>
      </div>

      <div className="flex flex-col justify-center items-center mt-[55px]  md:mt-[84px] p-4 w-[90%] md:w-[70%]">
        <div className="hero-bg"></div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-center font-Khorla text-[32px] md:text-[82px] text-text-black">
            <span className="hero-text">Elevate</span> How You Track Your Stats
            📈
          </h1>
          <p className=" text-text-black text-center text-[22px]">
            Record your seminar stats easily. Track your performance more
            efficiently.
          </p>
          <Button
            className="mt-4 w-48 btn bg-heading-blue-primary text-background-light font-medium"
            href="#"
            variant="flat"
            radius="full"
          >
            Get Started
          </Button>
        </div>
      </div>

      <div className="mt-auto mb-4">
        <p>&copy; 2023 StatsTrack. All rights reserved.</p>
      </div>
    </main>
  );
}
