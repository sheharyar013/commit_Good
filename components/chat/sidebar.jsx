import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { SearchChat } from "./components/search";

export default function Sidebar({
  updateSelectedUser,
  selectedUser,
  chatUsers,
  loading,
  onGroupClick,
  groups,
  selectedGroup,
  toggleCreateGroupModal,
  searchText,
  onSearchChange,
}) {
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 991) {
        setCollapse(false);
      } else {
        setCollapse(true);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <button
        className={
          collapse
            ? "sidebar-open sidebar-toggle"
            : "expand-sidebar sidebar-toggle"
        }
        onClick={toggle}
      >
        <img
          src={collapse ? "/images/menu.png" : "/images/close.png"}
          alt="toggle"
        />
      </button>

      <nav className="product-left-side" hidden={collapse}>
        <SearchChat onChange={onSearchChange} value={searchText} />
        <h5 className="individualchat">Individual Chats</h5>
        <div className="individual-chat-scroll">
          {(() => {
            if (loading) return <p className={"chat-loading"}>Loading....</p>;
            if (!chatUsers.length) return <p className={"no-user"}>No User</p>;
            return chatUsers.map((item) => (
              <div
                className={`sidebar ${
                  item.id === selectedUser.id ? "selected" : ""
                }`}
                onClick={() => updateSelectedUser(item)}
                key={item.id}
              >
                <span>
                  <img
                    src={item.image_url}
                    alt="user"
                    className="user-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
                    }}
                  />
                </span>
                <div className="user-name">{item.name}</div>
                {item?.unread_message ? (
                  <div className="user-name">
                    <span className="unread_count">
                      {item.unread_message > 99 ? "99+" : item.unread_message}
                    </span>
                  </div>
                ) : null}
              </div>
            ));
          })()}
        </div>
        <h5 className="individualchat">Group chats</h5>
        <div
          className="py-3 text-center text-white create-group-btn"
          onClick={toggleCreateGroupModal}
        >
          Create Group
        </div>
        <div className="group-chat-scroll">
          {(() => {
            if (loading) return <p className={"chat-loading"}>Loading....</p>;
            if (!groups.length) return <p className={"no-user"}>No Groups</p>;
            return groups.map((item) => (
              <div
                className={`sidebar ${
                  item.id === selectedGroup.id ? "selected" : ""
                }`}
                onClick={() => onGroupClick(item)}
                key={item.name}
              >
                <span>
                  <img
                    src={
                      item?.image_url ??
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                    }
                    alt="user"
                    className="user-img"
                  />
                </span>
                <div className="user-name">{item.name}</div>
              </div>
            ));
          })()}
        </div>
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  chatUsers: PropTypes.array,
  groups: PropTypes.array,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  searchText: PropTypes.string,
  selectedGroup: PropTypes.shape({
    id: PropTypes.number,
  }),
  selectedUser: PropTypes.shape({
    id: PropTypes.any,
    unread_message: PropTypes.number,
  }),
  toggleCreateGroupModal: PropTypes.func,
  updateSelectedUser: PropTypes.func,
};
