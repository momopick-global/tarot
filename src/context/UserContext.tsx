"use client";

import { createContext } from "react";

export const UserContext = createContext({
  user: null as null | { id: string },
});

