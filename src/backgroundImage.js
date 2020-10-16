import React from "react";

export default function BackgroundImage(props) {
  const { children, image } = props;

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: "url(" + image + ")",
      }}
    >
      {children}
    </div>
  );
}
