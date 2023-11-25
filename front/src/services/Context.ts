import { createContext } from "react";

export type ContextTypeProps =
  | {
      login?: { id: string; login: string; name: string; avatar: string };
      setLogin: (arg?: {
        id: string;
        login: string;
        name: string;
        avatar: string;
      }) => void;
      token?: string;
      setToken: (arg?: string) => void;
      logout: () => void;
    }
  | Record<string, never>;

const Context = createContext<ContextTypeProps>({});

export default Context;
