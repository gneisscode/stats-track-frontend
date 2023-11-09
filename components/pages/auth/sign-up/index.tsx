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

const SignUp = () => {
  const { dispatch } = useContext(Context);
  const router = useRouter();
  const defaultValues = {
    firstName:"",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };


  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Enter your first name"),
    lastName: yup.string().required("Enter your last name"),
    username: yup.string().required("Enter your username"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: yup
      .string()
      .required("Enter your password")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters long, contain one uppercase letter, and at least one number."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password"),
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

   const signUpRequest = async () => {
     try {
       const { confirmPassword, ...formValues } = getValues();
       const response = await AuthService.signUp(formValues);
       console.log(response?.data);
       dispatch({ type: "LOGIN_SUCCESS", payload: response?.data.data });
       router.push("/user/home");
     } catch (error: any) {
       console.log(error);
       dispatch({ type: "LOGIN_FAILURE" });
       throw new Error(error?.response?.data?.message || "An error occurred");
     }
   };

    const mutation: any = useMutation(signUpRequest, {
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
    <AuthLayout heading="Sign Up">
      <form
        action="submit"
        className="flex flex-col gap-4 justify-center w-[80%]"
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="firstName"
              label="First Name"
              labelPlacement="inside"
              isInvalid={errors.firstName ? true : false}
              variant="bordered"
            />
          )}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName?.message}</p>
        )}

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="lastName"
              label="Last Name"
              labelPlacement="inside"
              isInvalid={errors.lastName ? true : false}
              variant="bordered"
            />
          )}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName?.message}</p>
        )}
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
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="username"
              label="Username"
              labelPlacement="inside"
              isInvalid={errors.username ? true : false}
              variant="bordered"
            />
          )}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username?.message}</p>
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              id="confirmPassword"
              label="ConfirmPassword"
              labelPlacement="inside"
              isInvalid={errors.confirmPassword ? true : false}
              variant="bordered"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}

        <div className="self-center mb-2">
          <Button
            className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium"
            onClick={handleSubmit(onSubmit)}
            isLoading={mutation.isLoading}
            variant="flat"
            radius="full"
          >
            Sign Up
          </Button>
        </div>
      </form>

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
