import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,

      setAuth: (user, token) => {
        return set(() => ({
          user: user,
          tokens: { token },
        }));
      },

      getAuth: () => {
        return get((state) => ({ user: state.user, tokens: state.tokens }));
      },

      setUser: (user) => {
        return set(() => ({ user: user }));
      },

      getUser: () => {
        return get()?.user;
      },

      setTokens: (token) => {
        return set(() => ({ tokens: { token } }));
      },

      getTokens: () => {
        return get()?.tokens;
      },

      resetAuth: () => {
        localStorage.removeItem("auth");
        return set(() => ({
          user: null,
          tokens: null,
        }));
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
