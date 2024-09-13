import { AddIcon } from "@chakra-ui/icons";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { TaskListAbs } from "../../abstracts/taskList";
import { UserTaskList } from "../../models/userTaskList";

type TaskListContainerProps = {
  taskLists: ReadonlyArray<TaskListAbs>;
  /**
   *
   * @param list
   * @returns
   */
  focusTaskList: (list: TaskListAbs) => void;
};

const TaskListContainer = ({
  taskLists,
  focusTaskList,
}: TaskListContainerProps) => {
  return (
    <VStack>
      {taskLists.map((list) => (
        <Box
          key={list instanceof UserTaskList ? list.id : "inbox"}
          onClick={() => focusTaskList(list)}
        >
          {list.name}
        </Box>
      ))}
      <Box>
        <IconButton icon={<AddIcon />} aria-label={"create new task list"} />
      </Box>
    </VStack>
  );
};

export default TaskListContainer;
