"use client";

import React from "react";

const MOCK_AUTH_KEY = "yourtarot_mock_auth";

type MockUser = {
  id: string;
  name: string;
};

function readMockUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(MOCK_AUTH_KEY);
  if (raw !== "1") return null;
  return { id: "mock-user", name: "Mock User" };
}

export function setMockLoggedIn(next: boolean) {
  if (typeof window === "undefined") return;
  if (next) {
    window.localStorage.setItem(MOCK_AUTH_KEY, "1");
  } else {
    window.localStorage.removeItem(MOCK_AUTH_KEY);
  }
  window.dispatchEvent(new Event("mock-auth-changed"));
}

export function useUser() {
  const [user, setUser] = React.useState<MockUser | null>(() => readMockUser());

  React.useEffect(() => {
    const sync = () => setUser(readMockUser());
    window.addEventListener("storage", sync);
    window.addEventListener("mock-auth-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("mock-auth-changed", sync);
    };
  }, []);

  return {
    user,
    loading: false,
    loginMock: () => setMockLoggedIn(true),
    logoutMock: () => setMockLoggedIn(false),
  };
}
