import React from "react";
import { uniqueId } from "../../../utils/functions";

export function GroupChatHeading({ selectedGroup }: { selectedGroup: any }) {
  return (
    <>
      {selectedGroup?.users?.slice(0, 4)?.map((item) => (
        <img
          src={
            item.image_url ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
          }
          alt="user_avatar"
          key={uniqueId()}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
          }}
        />
      ))}
      <p className="ml-2 text-white">{selectedGroup?.name}</p>
    </>
  );
}
