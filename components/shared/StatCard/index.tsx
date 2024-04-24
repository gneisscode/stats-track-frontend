import React from 'react'
import { Card, CardBody, CardHeader, Avatar } from '@nextui-org/react'
import { formatDate, generateInitials } from '@/utils';
import { StatCardProps } from '@/types';
import { Delete, Edit } from '@/components/icons';


// @ts-ignore
const StatCard = ({firstName, lastName, username, school, grade, date, total, rec, tws, feedback, seminarName}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex gap-4">
        <Avatar
          className="transition-transform"
          color="secondary"
          name={generateInitials(firstName, lastName)}
          size="md"
        />
        <div className="flex flex-col">
          <p className="font-bold text-heading-blue-primary text-[20px]">{`${firstName} ${lastName}`}</p>
          <p className="text-text-blue-primary">{`@${username}`}</p>
        </div>

        <div className='flex gap-4 items-center ml-auto'>
          <div className='cursor-pointer'>
            <Edit />
          </div>
          <div className='cursor-pointer'>
            <Delete />
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="font-semibold text-heading-blue-primary">
          <p>
            {`Date: `}
            <span className="text-text-blue-primary font-normal">
              {formatDate(date)}
            </span>
          </p>
          <p>
            {`School: `}
            <span className="text-text-blue-primary font-normal">{school}</span>
          </p>
          <p>
            {`Grade: `}
            <span className="text-text-blue-primary font-normal">{grade}</span>
          </p>
           <p>
            {`Seminar: `}
            <span className="text-text-blue-primary font-normal">{seminarName}</span>
          </p>
          <p></p>
          <p>
            {`Recommend: `}
            <span className="text-text-blue-primary font-normal">
              {rec}/{total}
            </span>
          </p>
          <p>
            {`Time Well Spent: `}
            <span className="text-text-blue-primary font-normal">
              {tws}/{total}
            </span>
          </p>
          {feedback && (
            <p>
              {`feedback: `}
              <span className="text-text-blue-primary font-normal">
                {feedback}
              </span>
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default StatCard