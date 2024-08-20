import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import TaskListStore from "../../stores/taskListStore";
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
          {listStore.focusedTask.description && (
            <Text className="pt-4">{listStore.focusedTask.description}</Text>
          )}
          {!listStore.focusedTask.description && (
            <Text className="text-gray-400">Description</Text>
          )}
        </Box>
      )}
    </div>
  );
};

export default observer(TaskListFocusPanel);
