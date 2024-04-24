import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { AddStats } from "@/components/icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { StatService } from "@/services";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const AddStatModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const defaultValues = {
    school: "",
    grade: "",
    seminarName: "",
    total: "",
    rec: "",
    tws: "",
    feedback: "",
  };

  const validationSchema = yup.object().shape({
    school: yup.string().required("Enter your school"),
    grade: yup.string().required("pick a grade"),
    seminarName: yup.string().required("Enter the name of the seminar"),
    total: yup.string().required("Enter a total"),
    rec: yup.string().required("Enter number recommend value"),
    tws: yup.string().required("Enter time well spent value"),
    feedback: yup.string(),
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

  
  const createStatRequest = async () => {
    try {
      const response = await StatService.createStat(getValues());
      console.log(response?.data);
      const uploadSuccess = () => toast.success(response?.data.message);
      uploadSuccess();
      router.reload();
    } catch (error) {
      console.log(error);
      const uploadFailure = () => toast.error("Stat upload failed.");
      uploadFailure();
    }
  };

    const mutation: any = useMutation(createStatRequest, {
      onSuccess: (res: any) => {
        console.log(res?.data);
      },
    });

    const onSubmit = () => mutation.mutate();

  return (
    <div>
      <div className="flex gap-4 md:gap-8 btn cursor-pointer" onClick={onOpen}>
        <AddStats width={50} />
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                <h1 className=" text-heading-blue-primary text-[24px] mt-4">
                  Upload a new stat
                </h1>
              </ModalHeader>
              <ModalBody>
                <form action="submit" className="flex flex-col items-center">
                  <div className="flex flex-col gap-4 justify-center w-[100%]">
                    <Controller
                      name="school"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="school"
                          label="School Name"
                          labelPlacement="inside"
                          isInvalid={errors.school ? true : false}
                          errorMessage={errors.school?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="grade"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="grade"
                          label="Grade"
                          labelPlacement="inside"
                          isInvalid={errors.grade ? true : false}
                          errorMessage={errors.grade?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="seminarName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="seminarName"
                          label="Seminar Name"
                          labelPlacement="inside"
                          isInvalid={errors.seminarName ? true : false}
                          errorMessage={errors.seminarName?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="total"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="tota"
                          label="Total No. of Students"
                          labelPlacement="inside"
                          isInvalid={errors.total ? true : false}
                          errorMessage={errors.total?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="rec"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="rec"
                          label="Total Recommend"
                          labelPlacement="inside"
                          isInvalid={errors.rec ? true : false}
                          errorMessage={errors.rec?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="tws"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          id="tws"
                          label="Total Time Well Spent"
                          labelPlacement="inside"
                          isInvalid={errors.tws ? true : false}
                          errorMessage={errors.tws?.message}
                          variant="bordered"
                        />
                      )}
                    />

                    <Controller
                      name="feedback"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          type="text"
                          id="feedback"
                          label="Feedback"
                          variant="bordered"
                          placeholder="Enter your feedback"
                          disableAnimation
                          disableAutosize
                          classNames={{
                            input: "resize-y min-h-[40px]",
                          }}
                        />
                      )}
                    />
                  </div>
                  <Button
                    className="mt-8 w-48 btn bg-heading-blue-primary text-background-light font-medium mb-4"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={mutation.isLoading}
                    variant="flat"
                    radius="full"
                  >
                    Upload Stat
                  </Button>
                  <Toaster />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddStatModal;
