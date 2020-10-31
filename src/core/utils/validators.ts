import { Rule } from "../types";

export const required: Rule = (v: string) => {
  if (!v || v.trim().length === 0) return "Field is required";
  else return undefined;
};

export const objectId: Rule = (v: string) => {
  if (v.trim().length !== 12) return "Field must be 12 characters long";
  else return undefined;
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const email: Rule = (v: string) => {
  if (!emailRegex.test(v)) return "Invalid email";
  else return undefined;
};
