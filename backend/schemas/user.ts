type User = {
  id: string;
  email: string;
  name: string;
  image?: string;
  password: string;
  verified: boolean;
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  birthday?: number;
  statistics?: string;
  friendsIds?: string[];
};

export default User;
