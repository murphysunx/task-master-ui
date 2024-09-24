import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { TaskListAbs } from "../../abstracts/taskList";
import { UserTaskList } from "../../models/userTaskList/userTaskList";

type TaskListItemProps = {
  list: TaskListAbs;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const TaskListItem = ({
  list,
  onClick,
  onEdit,
  onDelete,
}: TaskListItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} placement="auto" onClose={onClose}>
      <MenuButton
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          if (list instanceof UserTaskList) {
            onOpen();
          }
        }}
        w={"100%"}
        padding={4}
      >
        <Flex justifyContent={"space-between"} flexGrow={1}>
          <Text>{list.name}</Text>
          <Text>{list.tasks.length}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        {onEdit && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {onDelete && (
          <MenuItem onClick={onDelete} textColor="red.400">
            Delete
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default observer(TaskListItem);
