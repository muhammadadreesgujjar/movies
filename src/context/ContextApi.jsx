import { createContext } from "react";

const ContextApi = createContext({
    state : [],
    setState : ()=>{}
});

export default ContextApi;