import { createContext } from "react";

type UserContextValue = {
    username?: string; 
    setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export default UserContext;