import React from "react";
import { CardHeader, CardBody, CardFooter, Card } from "@nextui-org/react";
import Link from "next/link";

type TCard = {
  heading?: JSX.Element | React.ReactNode;
  children: JSX.Element | React.ReactNode;
};

const AuthLayout = ({ heading, children}: TCard) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-10 mb-8">
      <Link href="/">
        <h1 className="hero-text font-Khorla text-heading-blue-primary text-[48px]">
          StatsTrack
        </h1>
      </Link>
      <Card className="w-[90%] md:w-[500px] h-fit">
        <CardHeader className="flex justify-center mt-4 font-Khorla text-heading-blue-primary text-2xl">
          {heading}
        </CardHeader>
        <CardBody className="flex items-center">{children}</CardBody>
      </Card>
    </div>
  );
};

export default AuthLayout;
