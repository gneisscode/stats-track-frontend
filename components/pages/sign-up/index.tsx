import React from "react";
import { AuthLayout } from "@/components/layouts";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

const SignUp = () => {
  return (
    <AuthLayout heading="Sign Up">
      <div className="flex flex-col items-center gap-8 justify-center w-[80%]">
        <Input type="text" label="First Name" labelPlacement="inside" />
        <Input type="text" label="Last Name" labelPlacement="inside" />
        <Input type="email" label="Email" labelPlacement="inside" />
        <Input type="text" label="Username" labelPlacement="inside" />
        <Input type="password" label="Password" labelPlacement="inside" />
      </div>

      <div>
        <Button
          className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium"
          href="#"
          variant="flat"
          radius="full"
        >
          Sign Up
        </Button>
      </div>

      <p className="mt-4 mb-8">
        Already have an account?&nbsp;
        <Link href={"/auth/sign-in"} className=" text-text-red-primary">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
