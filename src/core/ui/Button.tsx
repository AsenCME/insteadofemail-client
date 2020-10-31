import React from "react";

type Props = {
  text: string;
  dark?: boolean;
  fill?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};
export const Button: React.FC<Props> = ({
  text,
  dark = false,
  fill = false,
  type = "submit",
  loading = false,
  fullWidth = false,
  onClick = () => {},
}) => {
  // TODO: Loading Spinner
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={dark ? "dark" : ""}
      style={{ flex: fill ? "1" : "none", width: fullWidth ? "100%" : "auto" }}
    >
      {loading ? <span>Loading...</span> : <span>{text}</span>}
    </button>
  );
};
