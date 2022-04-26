import React from "react";

function Title({ title }) {
  return <div>{title}</div>;
}

Title.defaultProps = {
  title: "Wahyu",
};
export default Title;
