import React from "react";

interface ISendMessage {
  message: string;
  onMessageSend: (e: React.FormEvent) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SendMessageComponent({
  message,
  onMessageChange,
  onMessageSend,
}: ISendMessage): React.ReactElement {
  return (
    <form onSubmit={onMessageSend}>
      <div className="p-2 row send-input">
        <input
          type="text"
          className=""
          placeholder="Type a message here"
          value={message}
          onChange={onMessageChange}
        />
        <img
          src={"/images/sendIcon.png"}
          alt=""
          onClick={onMessageSend}
          className="ml-2"
        />
      </div>
    </form>
  );
}
