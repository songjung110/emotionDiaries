import { useContext } from "react";
import UserContext from "../context/UserContext";

function useUser() {
    const value = useContext(UserContext)

    if(value === null) {
        throw new Error('useUser must be used within context.')
    }

    return value;
}

export default useUser;