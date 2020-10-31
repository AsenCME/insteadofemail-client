import { useMemo } from "react";
import { conv_key, user_key } from "./constants";

export function useQueryString() {
  const map = useMemo(() => {
    const search = window.location.search;
    const params = new Map<string, string>();
    search
      .substr(1)
      .split("&")
      .forEach(x => {
        const param = x.split("=");
        params.set(param[0], param[1]);
      });
    return params;
  }, []);

  return { conversation_id: map.get(conv_key), user_id: map.get(user_key) };
}
