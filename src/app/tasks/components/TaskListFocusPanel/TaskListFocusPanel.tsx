import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import TaskListStore from "../../stores/taskListStore";
import EditableTaskDescription from "../EditableTaskDescription/EditableTaskDescription";
import EditableTaskTitle from "../EditableTaskTitle/EditableTaskTitle";

type TaskListFocusPanelProps = {
  listStore: TaskListStore;
};

const TaskListFocusPanel = ({ listStore }: TaskListFocusPanelProps) => {
  return (
    <div data-testid="task-list-focus-container">
      {listStore.focusedTask && (
        <Box>
          <Flex gap="4">
            <Checkbox
              size="lg"
              isChecked={!!listStore.focusedTask!.completed}
              onChange={() => {
                listStore.focusedTask!.toggle();
              }}
            />
            <EditableTaskTitle task={listStore.focusedTask} size="xl" />
          </Flex>
          <EditableTaskDescription task={listStore.focusedTask} />
        </Box>
      )}
    </div>
  );
};

export default observer(TaskListFocusPanel);
