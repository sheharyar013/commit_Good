import React from "react";
const Custom404Page = () => {
  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>404</h1>
      <h2>
        <a style={{ color: "blue", textDecoration: "underline" }} href="/">
          Go To Home Page
        </a>
      </h2>
      <p>Sorry, the content you are looking for could not be found.</p>
    </div>
  );
};

export default Custom404Page;
