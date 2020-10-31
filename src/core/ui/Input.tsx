import React, { useCallback, useState } from "react";

type Rule = (v: string) => string | undefined;
type Props = {
  value?: string;
  rules?: Rule[];
  fill?: boolean;
  dark?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?(v: string): void;
};
export const Input: React.FC<Props> = ({
  value = "",
  rules = [],
  dark = false,
  fill = false,
  required = false,
  placeholder = "",
  onChange = () => {},
}) => {
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = useCallback(
    (v: string) => {
      setInvalid(false);
      setErrors([]);
      rules.forEach(rule => {
        const check = rule(v);
        if (!check) return;
        if (!invalid) setInvalid(true);
        setErrors(prevErrors => [...prevErrors, check]);
      });
      onChange(v);
    },
    [invalid, rules, onChange],
  );

  return (
    <div style={{ flex: fill ? "1" : "none" }}>
      <input
        type="text"
        value={value}
        required={required}
        style={{ width: "100%" }}
        placeholder={placeholder}
        className={`${invalid && "invalid"} ${dark && "dark"}`}
        onChange={e => handleChange(e.target.value)}
      />
      {invalid && (
        <div style={{ marginTop: 10 }}>
          {errors.map((err, i) => (
            <div key={i} className="error-message">
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
