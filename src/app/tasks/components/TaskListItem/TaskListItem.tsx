import { Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { TaskListAbs } from "../../abstracts/taskList";

type TaskListItemProps = {
  list: TaskListAbs;
  onClick: () => void;
};

const TaskListItem = ({ list, onClick }: TaskListItemProps) => {
  return (
    <Flex justifyContent={"space-between"} role="button" onClick={onClick}>
      <Text>{list.name}</Text>
      <Text>{list.tasks.length}</Text>
    </Flex>
  );
};

export default observer(TaskListItem);
