import React from "react";
import { AuthLayout } from "@/components/layouts";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

const SignIn = () => {
  return (
    <AuthLayout heading="Sign In">
      <div className="flex flex-col items-center gap-8 justify-center w-[80%]">
        <Input type="email" label="Email" labelPlacement="inside" />
        <Input type="password" label="Password" labelPlacement="inside" />
      </div>

      <div>
        <Button
          className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium"
          href="#"
          variant="flat"
          radius="full"
        >
          Sign In
        </Button>
      </div>

      <p className="mt-4 mb-8">
        Don&apos;t have an account?&nbsp;
        <Link href={"/auth/sign-up"} className=" text-text-red-primary">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
