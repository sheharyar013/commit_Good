import React from "react";
import Sidebar from "../../components/chat/sidebar";
import { useChat } from "../../hooks/useChat";
import withAuth from "../../hoc/with-auth";
import dynamic from "next/dynamic";
import { Loader } from "../../shared/Loader/Loader";

const GroupChatMessaging = dynamic(
  () => import("../../components/chat/groupchatmessaging"),
  {
    loading: () => <Loader />,
  }
);

function Chat() {
  const {
    onMessageSend,
    onMessageChange,
    chatUsers,
    message,
    selectedUser,
    updateSelectedUser,
    selectedUserChat,
    userInfo,
    loading,
    showUserModal,
    onModalClose,
    onModalOpen,
    onUserTypeChange,
    userType,
    groups,
    isGroupChat,
    onGroupClick,
    selectedGroup,
    usersList,
    onAddUser,
    onRemoveUser,
    selectedGroupChat,
    openCreateGroupModal,
    toggleCreateGroupModal,
    groupName,
    onGroupNameChange,
    onCreateGroupSubmit,
    searchText,
    onSearchChange,
  } = useChat();
  return (
    <div className="main-chat-view">
      <Sidebar
        updateSelectedUser={updateSelectedUser}
        selectedUser={selectedUser}
        chatUsers={chatUsers}
        loading={loading}
        onGroupClick={onGroupClick}
        groups={groups}
        selectedGroup={selectedGroup}
        toggleCreateGroupModal={toggleCreateGroupModal}
        searchText={searchText}
        onSearchChange={onSearchChange}
      />
      <GroupChatMessaging
        onMessageSend={onMessageSend}
        onMessageChange={onMessageChange}
        message={message}
        selectedUser={selectedUser}
        selectedUserChat={selectedUserChat}
        userInfo={userInfo}
        showUserModal={showUserModal}
        onModalClose={onModalClose}
        onModalOpen={onModalOpen}
        onUserTypeChange={onUserTypeChange}
        userType={userType}
        isGroupChat={isGroupChat}
        selectedGroup={selectedGroup}
        usersList={usersList}
        onAddUser={onAddUser}
        onRemoveUser={onRemoveUser}
        selectedGroupChat={selectedGroupChat}
        toggleCreateGroupModal={toggleCreateGroupModal}
        openCreateGroupModal={openCreateGroupModal}
        groupName={groupName}
        onGroupNameChange={onGroupNameChange}
        onCreateGroupSubmit={onCreateGroupSubmit}
      />
    </div>
  );
}

export default withAuth(Chat);
