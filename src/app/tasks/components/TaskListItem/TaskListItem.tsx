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

type TaskListItemProps = {
  list: TaskListAbs;
  onClick: () => void;
  onEdit?: () => void;
};

const TaskListItem = ({ list, onClick, onEdit }: TaskListItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} placement="auto" onClose={onClose}>
      <MenuButton
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          onEdit && onOpen();
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
        <MenuItem onClick={onEdit}>Edit</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default observer(TaskListItem);
