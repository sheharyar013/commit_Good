import { useEffect } from "react";

export const ErrorsWrapper = ({ errors = {} }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, [errors]);

  if (!Object.values(errors).length) {
    return null;
  }
  return (
    <div className={"container errors alert-danger"}>
      <ul>
        {Object.values(errors).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
