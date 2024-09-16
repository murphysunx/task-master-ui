import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
import { UserTaskList } from "../../models/userTaskList/userTaskList";
import { CreateTaskListFormFields } from "../../types/taskList";
import CreateTaskListForm from "../CreateTaskListForm/CreateTaskListForm";
import TaskListItem from "../TaskListItem/TaskListItem";

type TaskListContainerProps = {
  activeTaskList: TaskListAbs;
  taskLists: ReadonlyArray<TaskListAbs>;
  /**
   * function to handle clicking a task list
   * @param list
   * @returns
   */
  clickTaskList: (list: TaskListAbs) => void;
  /**
   * function to create a new task list
   * @param values
   * @returns
   */
  createTaskList: (
    values: CreateTaskListFormFields
  ) => Promise<TaskListResponseDto>;
};

/**
 * a container that shows all task lists of a user
 */
const TaskListContainer = ({
  activeTaskList,
  taskLists,
  clickTaskList,
  createTaskList,
}: TaskListContainerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitTaskList = useCallback(
    (values: CreateTaskListFormFields) => {
      return createTaskList(values).then((result) => {
        onClose();
        return result;
      });
    },
    [createTaskList, onClose]
  );

  return (
    <Box>
      <List spacing={1}>
        {taskLists.map((list) => (
          <ListItem
            key={list instanceof UserTaskList ? list.id : "inbox"}
            bgColor={list === activeTaskList ? "gray.100" : "transparent"}
            padding={4}
            borderRadius={"lg"}
            _hover={{
              bgColor: list === activeTaskList ? "gray.100" : "gray.50",
            }}
          >
            <TaskListItem list={list} onClick={() => clickTaskList(list)} />
          </ListItem>
        ))}
      </List>
      <Box textAlign={"center"} mt={4}>
        <IconButton
          icon={<AddIcon />}
          aria-label={"create new task list"}
          onClick={onOpen}
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateTaskListForm submit={submitTaskList} cancel={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default TaskListContainer;
