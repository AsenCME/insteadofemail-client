import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  useMessageSubscription,
  useConversationQuery,
  useMessagesQuery,
  useUserQuery,
} from "../../core/graphql/generated";
import {
  Conversation as ConversationType,
  Message,
  User,
} from "../../core/types";
import { JoinConversation } from "./components/JoinConversation";
import { MessageInput } from "./components/MessageInput";

type Props = {
  conversation_id: string;
  user_id?: string;
};
export const Conversation: React.FC<Props> = ({ conversation_id, user_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Queries + Mutations
  const { data: conversationData, loading, error } = useConversationQuery({
    variables: { id: conversation_id },
  });
  const { data: userData } = useUserQuery({ variables: { id: user_id } });
  const {
    data: messagesData,
    // loading: getting,
    // refetch: getMessages,
  } = useMessagesQuery({
    variables: { conversation: conversation_id },
  });
  const { data: subData } = useMessageSubscription({
    variables: { conversation: conversation_id },
  });

  // Effects
  useEffect(() => {
    if (messagesData?.messages) {
      const retrievedMessages = messagesData.messages.map(
        x =>
          ({
            sender: x.sender,
            content: x.content,
            createdAt: x.createdAt,
          } as Message),
      );
      setMessages(prevMessages => [...retrievedMessages, ...prevMessages]);
    }
  }, [messagesData]);

  useEffect(() => {
    if (subData) {
      const msg: Message = {
        content: subData.newMessage.content,
        createdAt: subData.newMessage.createdAt,
        sender: subData.newMessage.sender as User,
      };
      setMessages(prevMessages => [...prevMessages, msg]);
    }
  }, [subData]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    window.onscroll = () => {
      const offset = window.pageYOffset;
      console.log(offset);
    };
  }, []);

  // Shortcuts
  const conversation = useMemo(
    () => conversationData?.conversation as ConversationType,
    [conversationData],
  );
  const createdAt = useMemo(() => {
    const date_iso = conversationData?.conversation?.createdAt;
    if (!date_iso) return null;
    const date = new Date(date_iso);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  }, [conversationData]);
  const participants = useMemo(() => {
    const joined = conversationData?.conversation?.participants
      .map(p => p.email)
      .join(", ");
    return `Participants: ${joined}`;
  }, [conversationData]);

  const currentUser = useMemo(() => {
    return userData?.user as User | undefined;
  }, [userData]);

  // Render States
  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!conversation) return <div>No Such Conversation found</div>;
  if (!currentUser) return <JoinConversation conversation={conversation} />;

  return (
    <div>
      <div style={{ paddingBottom: 150 }}>
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          {conversation?.name}
        </div>
        <div>{createdAt}</div>
        <div>
          <span>
            {conversation.createdBy.display_name ||
              conversation.createdBy.email}
          </span>
        </div>
        <div>{participants}</div>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginTop: 10,
              padding: "10px 20px",
              border: "1px solid black",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
              {m.sender.display_name || m.sender.email}
            </div>
            <div style={{ marginTop: 5, marginBottom: 5 }}>{m.content}</div>
            <div style={{ fontSize: 14, fontWeight: 300 }}>
              <span>{new Date(m.createdAt).toLocaleDateString()}</span>
              <span> at </span>
              <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <MessageInput user={currentUser} conversation_id={conversation_id} />
    </div>
  );
};
