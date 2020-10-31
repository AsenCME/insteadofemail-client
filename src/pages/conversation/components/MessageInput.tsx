import React, { useState } from "react";
import { useCreateMessageMutation } from "../../../core/graphql/generated";
import { User } from "../../../core/types";
import { Button } from "../../../core/ui/Button";
import { Input } from "../../../core/ui/Input";
import { required } from "../../../core/utils/validators";

type Props = {
  user: User;
  conversation_id: string;
};
export const MessageInput: React.FC<Props> = ({ user, conversation_id }) => {
  const [content, setContent] = useState("");
  const [sendMessage, { loading: sending }] = useCreateMessageMutation();
  return (
    <div
      style={{
        left: 0,
        bottom: 0,
        padding: 20,
        width: "100vw",
        position: "fixed",
        backgroundColor: "black",
      }}
    >
      <div className="primary__text" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>{user.email}</div>
        {user.display_name && <div>{user.display_name}</div>}
      </div>
      <form
        style={{ display: "flex", flex: "1" }}
        onSubmit={async e => {
          e.preventDefault();
          if (content.trim().length === 0) return;
          await sendMessage({
            variables: {
              content,
              sender: user._id,
              conversation: conversation_id,
            },
          });
          setContent("");
        }}
      >
        <Input
          fill
          dark
          value={content}
          rules={[required]}
          placeholder="Your message..."
          onChange={v => setContent(v)}
        />
        <div style={{ width: 20 }} />
        <Button dark text="Send" loading={sending} />
      </form>
    </div>
  );
};
