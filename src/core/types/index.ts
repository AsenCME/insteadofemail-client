export type Rule = (v: string) => string | undefined;
export type User = {
  _id?: string;
  email: string;
  display_name?: string;
};
export type Message = {
  content: string;
  sender: User;
  createdAt: number;
};
export type Conversation = {
  _id?: string;
  name: string;
  createdBy: User;
  createdAt: number;
  participants?: User[];
};
