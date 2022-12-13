import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import CreateGroupModal from "./create-group-modal";
import DropdownUserSelection from "./dropdownuserselection";
import { GroupChatHeading } from "./components/group-chat-heading";
import { RenderMessages } from "./components/render-messages";
import { SendMessageComponent } from "./send-message-component";
import UserModal from "./usermodal";

export default function GroupChatMessaging({
  onMessageSend,
  onMessageChange,
  message,
  selectedUserChat,
  userInfo,
  selectedUser,
  showUserModal,
  onModalClose,
  onModalOpen,
  onUserTypeChange,
  userType,
  usersList,
  isGroupChat,
  selectedGroup,
  onAddUser,
  onRemoveUser,
  selectedGroupChat,
  openCreateGroupModal,
  groupName,
  onGroupNameChange,
  onCreateGroupSubmit,
  toggleCreateGroupModal,
}) {
  const bottomRef = useRef();

  useEffect(() => {
    if (selectedUserChat.length || selectedGroupChat.length) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUserChat, selectedGroupChat]);

  return (
    <>
      <UserModal
        userType={userType}
        usersList={userType === "adduser" ? usersList : selectedGroup.users}
        modalShow={showUserModal}
        modalHandleClose={onModalClose}
        modalHandleShow={onModalOpen}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
      />
      <CreateGroupModal
        openCreateGroupModal={openCreateGroupModal}
        groupName={groupName}
        onGroupNameChange={onGroupNameChange}
        onSubmit={onCreateGroupSubmit}
        toggleCreateGroupModal={toggleCreateGroupModal}
      />
      <div className="chat-messaging">
        <h1 className="chat-head">Chats</h1>
        <div className="chat-msg-box">
          <div className="user-info user-group-info">
            <div className="ml-3 w-50">
              <div className="row d-flex align-items-center">
                {!isGroupChat ? (
                  <>
                    <img
                      src={
                        selectedUser?.image ??
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                      }
                      alt=""
                    />
                    <p className="ml-2 text-white">{selectedUser?.name}</p>
                  </>
                ) : (
                  <GroupChatHeading selectedGroup={selectedGroup} />
                )}
              </div>
            </div>
            <div className="w-50 d-flex align-items-center justify-content-end ">
              {/* <img
                src={'/images/attach.svg'}
                alt=""
                className="p-2 mr-3 bg-white"
                style={{ width: '40px', height: '40px' }}
              /> */}
              {isGroupChat ? (
                <DropdownUserSelection
                  modalHandleShow={onModalOpen}
                  setUserType={onUserTypeChange}
                />
              ) : null}
            </div>
          </div>
          <div className="p-3">
            <div className="chat-box">
              <div className="sender-box">
                <RenderMessages
                  messages={isGroupChat ? selectedGroupChat : selectedUserChat}
                  userInfo={userInfo}
                />
                <div ref={bottomRef} />
              </div>
            </div>
            <SendMessageComponent
              message={message}
              onMessageChange={onMessageChange}
              onMessageSend={onMessageSend}
            />
          </div>
        </div>
      </div>
    </>
  );
}

GroupChatMessaging.propTypes = {
  groupName: PropTypes.string,
  isGroupChat: PropTypes.bool,
  message: PropTypes.string,
  onAddUser: PropTypes.func,
  onCreateGroupSubmit: PropTypes.func,
  onGroupNameChange: PropTypes.func,
  onMessageChange: PropTypes.func,
  onMessageSend: PropTypes.func,
  onModalClose: PropTypes.func,
  onModalOpen: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onUserTypeChange: PropTypes.func,
  openCreateGroupModal: PropTypes.bool,
  selectedGroup: PropTypes.shape({
    users: PropTypes.any,
  }),
  selectedGroupChat: PropTypes.any,
  selectedUser: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.any,
    unread_message: PropTypes.number,
  }),
  selectedUserChat: PropTypes.any,
  showUserModal: PropTypes.any,
  toggleCreateGroupModal: PropTypes.any,
  userInfo: PropTypes.any,
  userType: PropTypes.string,
  usersList: PropTypes.array,
};
