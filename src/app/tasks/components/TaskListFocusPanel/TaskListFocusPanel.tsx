import { observer } from "mobx-react-lite";
import TaskListStore from "../../stores/taskListStore";
import { Box, Checkbox, Flex, Heading, Text } from "@chakra-ui/react";

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
            <Heading as="h1" size="lg" noOfLines={1}>
              {listStore.focusedTask.title}
            </Heading>
          </Flex>
          <Text className="pt-4">
            {listStore.focusedTask.description || (
              <Text className="text-gray-400">Description</Text>
            )}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default observer(TaskListFocusPanel);
