import React from "react";
import { IUser } from "../../../interfaces/user";
import { uniqueId } from "../../../utils/functions";
export const RenderMessages = ({
  messages,
  userInfo,
}: {
  messages: any[];
  userInfo: IUser;
}) => {
  return (
    <>
      {messages.map((item, idx) => (
        <div
          key={uniqueId(idx)}
          className={`message ${
            userInfo?.id === item?.sender_id ? "my-message" : ""
          }`}
        >
          <div className="sender receiver">
            <p className="sender-msg">{item.message}</p>
            <p className="sender-time">{item?.time}</p>
          </div>
        </div>
      ))}
    </>
  );
};
