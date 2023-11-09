import React from "react";
import { AuthLayout } from "@/components/layouts";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Context } from "@/context/Context";
import { AuthService } from "@/services";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const SignIn = () => {
  const { dispatch } = useContext(Context);
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: yup.string().required("Enter your password"),
  });

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const signInRequest = async () => {
    try {
      const response = await AuthService.signIn(getValues());
      console.log(response?.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response?.data.data });
      router.push("/user/home");
      //  if (typeof window !== "undefined") {
      //    window.location.href = "/user/home";
      //  }
    } catch (error: any) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  const mutation: any = useMutation(signInRequest, {
    onSuccess: (res: any) => {
      console.log(res?.data);
      if (res?.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
        router.push("/user/home");
      }
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <AuthLayout heading="Sign In">
      <form
        action="submit"
        className="flex flex-col items-center justify-center w-[80%]"
      >
        <div className="flex flex-col gap-4 justify-center w-[100%]">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                id="email"
                label="Email"
                labelPlacement="inside"
                isInvalid={errors.email ? true : false}
                variant="bordered"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                id="password"
                label="Password"
                labelPlacement="inside"
                isInvalid={errors.password ? true : false}
                variant="bordered"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>

        <div className="mb-2">
          <Button
            className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium"
            onClick={handleSubmit(onSubmit)}
            isLoading={mutation.isLoading}
            variant="flat"
            radius="full"
          >
            Sign In
          </Button>
        </div>
      </form>

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
