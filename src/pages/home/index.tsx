import React, { useState } from "react";
import { useCreateConversationMutation } from "../../core/graphql/generated";
import { Button } from "../../core/ui/Button";
import { Input } from "../../core/ui/Input";
import { conv_key, user_key } from "../../core/utils/constants";
import { required, email as emailRule } from "../../core/utils/validators";

export const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createConversation, { loading }] = useCreateConversationMutation();

  return (
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column", padding: 50 }}
    >
      <form
        onSubmit={async e => {
          e.preventDefault();
          const { data, errors } = await createConversation({
            variables: { name, createdBy: email },
          });
          const conv_id = data?.createConversation._id;
          const user_id = data?.createConversation.createdBy._id;
          if (errors || !conv_id || !user_id) console.log(errors);
          else {
            const search = `${conv_key}=${conv_id}&${user_key}=${user_id}`;
            window.location.search = search;
          }
        }}
      >
        <Input
          value={name}
          onChange={v => setName(v)}
          rules={[required]}
          placeholder="Conversation Name"
        />
        <div className="spacer" />
        <Input
          value={email}
          placeholder="Your Email"
          onChange={v => setEmail(v)}
          rules={[required, emailRule]}
        />
        <div className="spacer" />
        <Button fullWidth text="Start Conversation" loading={loading} />
      </form>
    </div>
  );
};
