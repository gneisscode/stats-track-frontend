import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import AllStats from "./AllStats";
import MyStats from "./MyStats";
import ProvinceStats from "./ProvinceStats";
import { Avatar } from "@nextui-org/avatar";
import { generateInitials } from "@/utils";
import { leaders } from "@/components/shared/LeaderCard/users";
import AddStatModal from "@/components/shared/AddStatModal";
import Settings from "./Settings";

const Home = () => {
  type TUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    province?: string;
    teamLead?: string;
    averageRec?: string;
    averageTWS?: string;
  };
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser?.user);
  }, []);

  return (
    <div className="relative flex flex-col w-[100%] min-h-[100vh]  bg-background-light">
      <Navbar maxWidth="full" className="md:px-8 mt-4">
        <NavbarBrand>
          <h1 className=" hero-text text-heading-blue-primary text-4xl lg:text-6xl">
            StatsTrack
          </h1>
        </NavbarBrand>

        <NavbarContent className=" w-fit">
          <div className="hidden lg:block">
            <Input
              classNames={{
                base: "max-w-fit sm:max-w-[10rem] h-10",
                mainWrapper: "w-[600px] h-full",
                input: "text-small",
                inputWrapper:
                  "w-[600px] h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="lg"
              // startContent={<SearchIcon size={18} />}
              type="search"
            />
          </div>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <AddStatModal />
          </NavbarItem>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                // name='em'

                name={generateInitials(
                  //@ts-ignore
                  user?.firstName,
                  //@ts-ignore
                  user?.lastName
                )}
                size="sm"
                // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                {/* @ts-ignore */}
                <p className="font-semibold">{user?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div className=" md:mt-8 w-[100%] flex flex-col md:flex-row justify-center px-6 md:px-14">
        <div className="w-[100%] md:w-[70%]">
          <Tabs
            variant="underlined"
            aria-label="Tabs variants"
            className="border-b border-gray-100 w-[100%] md:w-[80%]"
            classNames={{
              tabList: "px-0 gap-6 w-full relative rounded-none mb-[-5px]",
              cursor: "w-full bg-heading-blue-primary",
              tab: "max-w-fit px-0 h-12 text-md",
              tabContent:
                "group-data-[selected=true]:text-heading-blue-primary font-medium",
            }}
          >
            <Tab key="all-stats" title="All Stats">
              <AllStats />
            </Tab>
            <Tab key="prov-stats" title="Province Stats">
              <ProvinceStats />
            </Tab>
            <Tab key="my-stats" title="My Stats">
              <MyStats />
            </Tab>
            <Tab key="analytics" title="Analytics">
              Analytics
            </Tab>
            <Tab key="settings" title="Settings">
              <Settings user={user} />
            </Tab>
          </Tabs>
        </div>
        <div className="flex w-[100] md:w-[30%] h-[70%]">
          <Divider orientation="vertical" className=" h-[100%] bg-gray-100" />
          <div className="flex flex-col items-center w-[100%]">
            <h1 className="text-center text-2xl text-heading-blue-primary">
              <span className="">Leaderboard</span>🔥
            </h1>
            <Tabs className="mt-8">
              <Tab title="National" />
              <Tab title="Provincial" />
            </Tabs>

            <div className="w-[100%] items-center flex flex-col gap-4 mt-8">
              {leaders.map(
                (
                  { id, firstName, lastName, username, averageRec, averageTWS },
                  index
                ) => {
                  return (
                    <Card key={id} className=" w-[300px]">
                      <CardHeader className="w-[100%]">
                        <div className="w-[100%] flex gap-4 items-center">
                          <Avatar
                            isBordered
                            className="transition-transform"
                            color="secondary"
                            name={generateInitials(firstName, lastName)}
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                          />
                          <div className="flex flex-col">
                            <p className="text-heading-blue-primary font-bold">{`${firstName} ${lastName}`}</p>
                            <p className="text-sm text-text-blue-primary">{`@${username}`}</p>
                          </div>

                          <div className="ml-auto text-heading-blue-primary">
                            <h1 className="text-xl font-bold">{index + 1}</h1>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <p className="text-text-blue-primary font-medium">
                          Average Recommend:{" "}
                          <span className="text-text-red-primary">
                            {`${averageRec}%`}
                          </span>
                        </p>
                        <p className="text-text-blue-primary font-medium">
                          Average Time Well Spent:{" "}
                          <span className="text-text-red-primary">
                            {`${averageTWS}%`}
                          </span>
                        </p>
                      </CardBody>
                    </Card>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
