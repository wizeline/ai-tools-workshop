type Activity = {
  id: string;
  sports:
    | "Football"
    | "Basketball"
    | "Volleyball"
    | "Tennis"
    | "Badminton"
    | "Table Tennis"
    | "Running"
    | "Swimming"
    | "Cycling"
    | "Gym"
    | "Yoga"
    | "Dance"
    | "Others";
  description: string;
  startDate: number;
  endDate: number;
  lookingFor: number;
  ownerId: string;
  participantsIds: string[];
  applicantsIds: string[];
  status: "Open" | "Closed" | "Completed";
};

export default Activity;
