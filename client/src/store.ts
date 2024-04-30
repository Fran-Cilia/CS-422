/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: store.ts: describes interface for client-server communications and persistent client data.
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for the user store state
export interface UserStoreState {
  userId: number;
  setUserId: (id: number) => void;
}

// Create and export the user store using Zustand
export const useUserStore = create(
  persist(
    (set) => ({
      userId: -1,
      setUserId: (id: number) => set({ userId: id }),
    }),
    {
      name: "user-storage",
    }
  )
);
