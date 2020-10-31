import React, { useState } from "react";
import { useJoinConversationMutation } from "../../../core/graphql/generated";
import { Conversation } from "../../../core/types";
import { Input, Button } from "../../../core/ui";
import { user_key } from "../../../core/utils/constants";
import { required, email as emailRule } from "../../../core/utils/validators";

type Props = {
  conversation: Conversation;
};
export const JoinConversation: React.FC<Props> = ({ conversation }) => {
  const [email, setEmail] = useState("");
  const [join, { loading }] = useJoinConversationMutation();
  return (
    <div>
      <div style={{ fontSize: 20 }}>
        <span style={{ marginRight: 5 }}>Joining conversation:</span>
        <span style={{ fontWeight: "bold" }}>{conversation.name}</span>
      </div>
      <div>
        <span style={{ textDecoration: "underline" }}>Created by:</span>
        <span style={{ marginLeft: 5 }}>
          {conversation.createdBy.display_name || conversation.createdBy.email}
        </span>
      </div>
      <div style={{ marginTop: 20, marginBottom: 10 }}>Enter Email to Join</div>
      <form
        style={{ display: "flex" }}
        onSubmit={async e => {
          e.preventDefault();
          const { data, errors } = await join({
            variables: { conversation: conversation._id, email },
          });
          const id = data?.joinConversation.user_id;
          if (errors || !id) console.log(errors);
          else {
            const search = window.location.search + `&${user_key}=${id}`;
            window.location.search = search;
          }
        }}
      >
        <Input
          fill
          value={email}
          placeholder="Your email"
          onChange={v => setEmail(v)}
          rules={[required, emailRule]}
        />
        <div style={{ width: 20 }} />
        <Button text="Enter" loading={loading} />
      </form>
    </div>
  );
};
