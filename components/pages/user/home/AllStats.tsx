import React, { useEffect, useState } from "react";
import { StatCard } from "@/components/shared";
import { StatService} from "@/services";

const AllStats = () => {
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    getStatsRequest();
  }, [])

  const getStatsRequest = async () => {
    try {
      const response = await StatService.getAllStats();
      // console.log(response?.data);
      const fetchedStats = response?.data?.stats
      const reversedStats = fetchedStats.reverse();
      setStats(reversedStats);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="md:w-[80%] flex flex-col gap-8 p-4 md:p-8">
      {stats.map((stat: any) => {
        return (
          <StatCard
            key={stat._id}
            firstName={stat.presenterFirstName}
            lastName={stat.presenterLastName}
            username={stat.presenterUserName}
            school={stat.schoolName}
            grade={stat.grade}
            date={stat.createdAt}
            total={stat.total}
            rec={stat.rec}
            tws={stat.tws}
            feedback={stat.feedback}
            seminarName={stat.seminarName}
          />
        );
      })}
    </div>
  );
};

export default AllStats;
