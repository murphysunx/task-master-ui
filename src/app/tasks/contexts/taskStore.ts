import { createContext } from "react";
import taskStore from "../stores/taskStore";

export const TaskStoreContext = createContext(taskStore);
