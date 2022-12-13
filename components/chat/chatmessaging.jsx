import React, { useEffect, useRef } from "react";

export default function ChatMessaging({
  onMessageSend,
  onMessageChange,
  message,
  selectedUserChat,
  userInfo,
  selectedUser,
}) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUserChat]);

  return (
    <div className="chat-messaging">
      <h1 className="chat-head">Chat</h1>
      <div className="chat-msg-box">
        <div className="user-info">
          <div className="w-50">
            <div className="row d-flex align-items-center">
              <img
                src={selectedUser?.image}
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
                }}
              />
              <p className="ml-2 text-white">
                {!selectedUser.hasOwnProperty("id")
                  ? "Select User"
                  : selectedUser?.name}
              </p>
            </div>
          </div>
          <div className="w-50 d-flex align-items-center justify-content-end ">
            <img
              src={"/images/attach.svg"}
              alt=""
              className="p-2 bg-white"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="chat-box">
            <div className="sender-box">
              {selectedUserChat.map((item, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    +userInfo.id === +item.sender_id ? "my-message" : ""
                  }`}
                >
                  <div className="sender receiver">
                    <p className="sender-msg">{item.message}</p>
                    <p className="sender-time">{item?.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
