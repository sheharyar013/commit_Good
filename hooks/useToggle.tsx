import { useState } from "react";

export const useToggle = (
  shouldToggled: boolean = false
): [toggled: boolean, switchToggle: () => void] => {
  const [toggled, setToggled] = useState<boolean>(shouldToggled);

  const switchToggle = () => setToggled((prev) => !prev);

  return [toggled, switchToggle];
};
