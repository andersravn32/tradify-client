import { createContext } from "react";

const UserContext = createContext(null);

export default () => {
    return UserContext;
};