import React, { useMemo } from "react";
import { useQueryString } from "./core/utils/useQueryString";
import { Conversation } from "./pages/conversation";
import { Home } from "./pages/home";

export const App: React.FC = () => {
  const { conversation_id, user_id } = useQueryString();

  const _renderPage = useMemo(() => {
    if (!conversation_id) return <Home />;
    return <Conversation conversation_id={conversation_id} user_id={user_id} />;
  }, [conversation_id, user_id]);

  return <div style={{ padding: 50 }}>{_renderPage}</div>;
};
