// src/context/UserContext.tsx
"use client";

import { createContext, type ReactNode, useContext } from "react";

type UserContextType = {
  userId: string | null;
};

const UserContext = createContext<UserContextType>({ userId: null });

export const UserProvider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) => {
  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
