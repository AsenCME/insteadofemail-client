import React, { useEffect, useMemo, useState } from "react";
import { useMessageSubscription, useRoomQuery } from "./core/graphql/generated";

type Message = {
  content: string;
  sender: string;
  createdAt: number;
};
export const App: React.FC = () => {
  const { data: roomData, loading, error } = useRoomQuery({
    variables: { id: "5f9b28facc903841f0fa122a" },
  });
  const { data: subData } = useMessageSubscription({
    variables: { room: "5f9b28facc903841f0fa122a" },
  });

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!subData) return;
    const msg: Message = {
      content: subData.newMessage.content,
      sender: subData.newMessage.sender.email,
      createdAt: subData.newMessage.createdAt,
    };
    setNewMessages(prevMessages => [msg, ...prevMessages]);
  }, [subData]);

  const room = useMemo(() => {
    return roomData?.room;
  }, [roomData]);

  const messages = useMemo(() => {
    const roomMessages =
      roomData?.room?.messages.map(
        x =>
          ({
            content: x.content,
            sender: x.sender.email,
            createdAt: x.createdAt,
          } as Message),
      ) || [];
    return [...newMessages, ...roomMessages].sort(
      (a, b) => b.createdAt - a.createdAt,
    );
  }, [newMessages, roomData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return (
    <div style={{ padding: 20 }}>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>{room?.name}</div>
      <div>{room?.createdBy.email}</div>
      {messages.map((m, i) => (
        <div
          key={i}
          style={{
            padding: "10px 20px",
            border: "1px solid black",
            marginTop: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
            {m.sender}
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
  );
};
