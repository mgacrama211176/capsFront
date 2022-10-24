import { createContext, useState } from "react";

const UserContext = createContext();

export function ProfileProvider({ children }) {
  return (
    <UserContext.Provider value={{ item: 1 }}>{children}</UserContext.Provider>
  );
}

export default UserContext;
