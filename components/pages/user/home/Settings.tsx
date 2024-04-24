import React, { useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Input,
  Button,
} from "@nextui-org/react";
import { generateInitials } from "@/utils";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, {Toaster}  from "react-hot-toast";
import { UserService } from "@/services";
import { Context } from "@/context/Context";

type TUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  province?: string;
  teamLead?: string;
  averageRec?: string;
  averageTWS?: string;
};
const Settings = ({ user }: { user: TUser | null }) => {
  const {dispatch} = useContext(Context);
  let firstName,
    lastName,
    email,
    username,
    province,
    teamLead,
    averageRec,
    averageTWS;

    if(user){
       ({
         firstName,
         lastName,
         email,
         username,
         province,
         teamLead,
         averageRec,
         averageTWS,
       } = user);

    }

 

  const router = useRouter();

  const defaultValues = {
    _id: user?._id,
    firstName: "",
    lastName: "",
    username: "",
    province: "",
    teamLead: "",
  };

  console.log(user?._id)

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Enter your first name"),
    lastName: yup.string().required("Enter your last name"),
    username: yup.string().required("Enter your username"),
    province: yup.string(),
    teamLead: yup.string(),
    _id: yup.string(),
  });

  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user) {
      Object.keys(defaultValues).map(
        (
          key: string //@ts-ignore
        ) => setValue(key, user[key])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  
    const updateUserRequest = async () => {
      if(user){
          try {
            console.log(getValues())
            const response = await UserService.UpdateUser(getValues());
            console.log(response?.data);
            dispatch({ type: "UPDATE_SUCCESS", payload: response?.data.data });
            const updateSuccess = () => toast.success(response?.data.message);
            updateSuccess();
          } catch (error: any) {
            console.log(error);
            dispatch({ type: "UPDATE_FAILURE" });
            const updateFailure = () => toast.error("profile update failed.");
            updateFailure();
          }

      }
    
    };

    const mutation: any = useMutation(updateUserRequest, {
      onSuccess: (res: any) => {
        console.log(res?.data);
        if (res?.data) {
          dispatch({ type: "UPDATE_SUCCESS", payload: res?.data.data });
        }
      },
    });

    const onSubmit = () => mutation.mutate();
  return (
    <div className="pt-4 lg:w-[80%]">
      <Card className="p-4">
        {user && (
          <CardHeader className="flex items-center gap-4">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={generateInitials(firstName, lastName)}
              size="lg"
              // src
            />
            <div className="flex flex-col mt-4">
              <p className="text-heading-blue-primary font-bold text-lg">{`${firstName} ${lastName}`}</p>
              <p className="text-text-blue-primary">{`@${username}`}</p>
              <p className="text-text-blue-primary text-sm font-medium">
                Average Recommend:{" "}
                <span className="text-text-red-primary">{`${averageRec}%`}</span>
              </p>
              <p className="text-text-blue-primary text-sm font-medium">
                Average Time Well Spent:{" "}
                <span className="text-text-red-primary">{`${averageTWS}%`}</span>
              </p>
            </div>
          </CardHeader>
        )}

        <CardBody>
          <form action="submit" className="flex flex-col items-center">
            <div className="flex flex-col gap-4 justify-center w-[100%]">
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="firstName"
                    value={value}
                    onChange={onChange}
                    label="First Name"
                    labelPlacement="inside"
                    isInvalid={errors.firstName ? true : false}
                    errorMessage={errors.firstName?.message}
                    variant="bordered"
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="lastName"
                    value={value}
                    onChange={onChange}
                    label="Last Name"
                    labelPlacement="inside"
                    isInvalid={errors.lastName ? true : false}
                    errorMessage={errors.lastName?.message}
                    variant="bordered"
                  />
                )}
              />

              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="username"
                    value={value}
                    label="Username"
                    labelPlacement="inside"
                    isInvalid={errors.username ? true : false}
                    errorMessage={errors.username?.message}
                    variant="bordered"
                    onChange={onChange}
                  />
                )}
              />

              <Input
                name="email"
                type="email"
                id="email"
                value={email}
                label="Email"
                labelPlacement="inside"
                variant="bordered"
                isReadOnly
                isDisabled
              />

              <Controller
                name="province"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="province"
                    onChange={onChange}
                    value={value}
                    label="Province"
                    labelPlacement="inside"
                    variant="bordered"
                  />
                )}
              />

              <Controller
                name="teamLead"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="teamLead"
                    value={value}
                    onChange={onChange}
                    label="Team Lead"
                    labelPlacement="inside"
                    variant="bordered"
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Button
                className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium"
                onClick={handleSubmit(onSubmit)}
                isLoading={mutation.isLoading}
                variant="flat"
                radius="full"
              >
                Update Profile
              </Button>
            </div>
            <Toaster />
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
