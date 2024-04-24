

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  province?: string;
  teamLead?: string;
  organisation?: string;
};


export type StatCardProps = {
  firstName: string;
  lastName: string;
  username: string;
  school: string;
  grade: number;
  date: string;
  total: number;
  rec: number;
  tws: number;
  seminarName: string;
  feedback?: string;
};