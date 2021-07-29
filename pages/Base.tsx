import React from "react";
import Header from "../components/Header";
import { SignoutButtonContainer } from "../containers/UserInfo";

const Base: React.FC = ({ children }) => {
  return (
    <>
      <Header title="Header AAAAAAAA">
        <SignoutButtonContainer />
      </Header>
      {children}
    </>
  );
};

export default Base;
