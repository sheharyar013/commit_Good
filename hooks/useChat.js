import {
  addUsersToChatRoom,
  createChatRoom,
  getAllChatRooms,
  getChatHistory,
  getChatRoomHistory,
  getChatUsers,
  getUsersForChatRoom,
  postGroupMessage,
  sendMessage,
  removeUsersFromChatRoom,
} from "../utils/services/actions/chat";
import { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { toasterMessages } from "../constants/messages";

const useChat = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [allChatUsers, setAllChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserChat, setSelectedUserChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroupObj, setSelectedGroup] = useState({});
  const [selectedGroupChat, setSelectedGroupChat] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userType, setUserType] = useState("adduser");
  const [usersList, setUsersList] = useState([]);
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [searchText, setSearchText] = useState("");

  const toggleCreateGroupModal = () => setOpenCreateGroupModal((prev) => !prev);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  /**
   * @param {React.FormEvent | React.MouseEvent<HTMLDivElement>} e
   */
  const onCreateGroupSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) {
      toast.info("Group name is required");
      return;
    }
    try {
      const { success, ...rest } = await createChatRoom({ name: groupName });
      if (success) {
        setGroups((prev) => [...prev, { ...rest }]);
        setOpenCreateGroupModal(false);
        setGroupName("");
      }
    } catch (err) {
      console.log("chat room create error", err);
    }
  };

  /**
   *
   * @param {string} type
   */
  const onUserTypeChange = (type) => setUserType(type);

  const onModalOpen = () => setShowUserModal(true);
  const onModalClose = () => setShowUserModal(false);

  const getUserChat = async (fetching) => {
    try {
      const history = await getChatHistory(selectedUser.id);
      if (history.success && fetching) {
        setSelectedUserChat(
          history.message
            .reverse()
            .map((item) => ({
              receiver_id: item.receiver_id,
              sender_id: item.sender_id,
              message: item.message,
              time: new Date(item.created_at).toLocaleString(),
            }))
            .reverse()
        );
      }
    } catch (e) {
      console.error("get history", e);
    }
  };

  /**
   *
   * @param {any[]} data
   * @param {Record<string, string | number>} user
   */
  const setUnreadToZero = (data, user) =>
    data.map((item) => {
      if (item.id === user.id) {
        return { ...item, unread_message: 0 };
      }
      return item;
    });

  const updateSelectedUser = (user) => {
    setIsGroupChat(false);
    setSelectedGroup({});
    setSelectedUser({ ...user, unread_message: 0 });
    setChatUsers((prev) => setUnreadToZero(prev, user));
    setAllChatUsers((prev) => setUnreadToZero(prev, user));
  };

  const getChats = async (fetching) => {
    setLoading(true);
    try {
      const { users } = await getChatUsers();
      if (users && fetching) {
        if (users.length > 0) {
          setSelectedUser({ ...users[0], unread_message: 0 });
          setChatUsers(setUnreadToZero(users, users[0]));
          setAllChatUsers(setUnreadToZero(users, users[0]));
        } else {
          setChatUsers(users);
          setAllChatUsers(users);
        }
      }
    } catch (e) {
      console.error("user error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let fetching = true;
    getChats(fetching);
    setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
    return () => {
      fetching = false;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let fetching = true;
    if (selectedUser?.id) {
      getUserChat(fetching);
    }
    return () => {
      fetching = false;
    };
    // eslint-disable-next-line
  }, [selectedUser]);

  useEffect(() => {
    if (!searchText) {
      setGroups([...allGroups]);
      setChatUsers([...allChatUsers]);
    } else {
      const filterUsers = chatUsers.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      const filterGroups = groups.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setChatUsers([...filterUsers]);
      setGroups([...filterGroups]);
    }
  }, [searchText]);

  /**
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e
   */
  const onMessageChange = (e) => {
    if (disabled) return;
    if (!selectedUser?.id && !selectedGroupObj?.id) {
      return;
    }
    const { value } = e.target;
    setMessage(value);
  };

  const onMessageSend = async (e) => {
    e?.preventDefault();
    setDisabled(true);
    if (!message) return toast.info("Message can not be empty");
    if (disabled) return;
    try {
      if (isGroupChat) {
        const sent = await postGroupMessage({
          chatroom_id: selectedGroupObj.id.toString(),
          message,
        });
        if (sent?.success) {
          setSelectedGroupChat((prev) => [...prev, { ...sent.message }]);
        }
      } else {
        const sent = await sendMessage({
          receiver_id: selectedUser.id.toString(),
          message,
        });
        if (sent?.success) {
          setSelectedUserChat((prev) => [
            ...prev,
            {
              receiver_id: +selectedUser.id,
              sender_id: userInfo.id,
              message,
              time: new Date(sent.message.created_at).toLocaleString(),
            },
          ]);
        }
      }
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again");
    } finally {
      setDisabled(false);
    }
  };

  const loadGroups = useCallback(async (fetching) => {
    const { success, chatrooms } = await getAllChatRooms();
    if (success && fetching) {
      setGroups(chatrooms);
      setAllGroups(chatrooms);
    }
  }, []);

  useEffect(() => {
    let fetching = true;
    loadGroups(fetching);
    return () => {
      fetching = false;
    };
  }, [loadGroups]);

  /**
   *
   * @param {Object} group
   */
  const onGroupClick = (group) => {
    setIsGroupChat(true);
    setSelectedUser({});
    setSelectedGroup(group);
  };

  const onGroupChange = useCallback(
    async (fetching) => {
      if (selectedGroupObj?.id) {
        const { success, message: messages } = await getChatRoomHistory(
          selectedGroupObj.id
        );
        if (success && fetching) {
          setSelectedGroupChat([...messages]);
        }
      }
    },
    [selectedGroupObj]
  );

  useEffect(() => {
    let fetching = true;
    onGroupChange(fetching);
    return () => {
      fetching = false;
    };
  }, [onGroupChange]);

  const getUsers = useCallback(async (fetching) => {
    const { users } = await getUsersForChatRoom();
    if (users?.length && fetching) {
      setUsersList(users);
    }
  }, []);

  const getUsersLists = useCallback(
    (fetching) => {
      if (isGroupChat) {
        getUsers(fetching);
        setSelectedUserChat([]);
      }
    },
    [getUsers, isGroupChat]
  );

  useEffect(() => {
    let fetching = true;
    getUsersLists(fetching);
    return () => {
      fetching = false;
    };
  }, [getUsersLists]);

  /**
   *
   * @param {React.MouseEvent<HTMLDivElement>} e
   */
  const onAddUser = async (e) => {
    const { id: user_id } = e.currentTarget.dataset;
    const addedUser = await addUsersToChatRoom(selectedGroupObj.id, user_id);
    setSelectedGroup(addedUser);
    const updated = [
      ...groups.map((item) => {
        if (item.id === addedUser.id) {
          return addedUser;
        }
        return item;
      }),
    ];
    setGroups([...updated]);
    setAllGroups([...updated]);
    toast.success(toasterMessages.chatGroupUserAdded, {
      toastId: "userGroup",
    });
  };

  /**
   *
   * @param {React.MouseEvent<HTMLDivElement>} e
   */
  const onRemoveUser = async (e) => {
    const { id: user_id } = e.currentTarget.dataset;
    const removedUser = await removeUsersFromChatRoom(
      selectedGroupObj.id,
      user_id
    );
    setSelectedGroup(removedUser);
    const updated = [
      ...groups.map((item) => {
        if (item.id === removedUser.id) {
          return removedUser;
        }
        return item;
      }),
    ];
    setGroups([...updated]);
    setAllGroups([...updated]);
    toast.success(toasterMessages.chatGroupUserRemoved, {
      toastId: "userGroup",
    });
  };

  const selectedGroup = useMemo(() => selectedGroupObj, [selectedGroupObj]);

  return {
    chatUsers,
    selectedUser,
    updateSelectedUser,
    selectedUserChat,
    message,
    onMessageChange,
    onMessageSend,
    userInfo,
    loading,
    disabled,
    groups,
    selectedGroup,
    showUserModal,
    isGroupChat,
    selectedGroupChat,
    onModalOpen,
    onModalClose,
    userType,
    onUserTypeChange,
    onGroupClick,
    usersList,
    onAddUser,
    onRemoveUser,
    openCreateGroupModal,
    toggleCreateGroupModal,
    groupName,
    onGroupNameChange,
    onCreateGroupSubmit,
    searchText,
    onSearchChange,
  };
};

export { useChat };
