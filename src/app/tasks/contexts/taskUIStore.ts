import { createContext } from "react";
import taskUIStore from "../stores/taskUIStore";

export const TaskUIStoreContext = createContext(taskUIStore);
