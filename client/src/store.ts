import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserStoreState {
  userId: number;
  setUserId: (id: number) => void;
}

export const useUserStore = create(
  persist(
    (set) => ({
      userId: -1,
      setUserId: (id: number) => set({ userId: id }),
      //   addABear: () => set({ bears: 0 }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
