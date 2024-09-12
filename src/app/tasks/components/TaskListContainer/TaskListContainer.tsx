import { Box, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { TaskStoreContext } from "../../contexts/taskStore";
import { TaskUIStoreContext } from "../../contexts/taskUIStore";
import { UserTaskList } from "../../models/userTaskList";

const TaskListContainer = () => {
  const taskStore = useContext(TaskStoreContext);
  const taskUIStore = useContext(TaskUIStoreContext);

  return (
    <VStack>
      {taskStore.taskLists.map((list) => (
        <Box
          key={list instanceof UserTaskList ? list.id : "inbox"}
          onClick={() => (taskUIStore.focusedTaskList = list)}
        >
          {list.name}
        </Box>
      ))}
    </VStack>
  );
};

export default observer(TaskListContainer);
