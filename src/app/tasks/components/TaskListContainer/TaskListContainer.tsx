import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
import { UserTaskList } from "../../models/userTaskList/userTaskList";
import { CreateTaskListFormFields } from "../../types/taskList";
import CreateTaskListForm from "../CreateTaskListForm/CreateTaskListForm";

type TaskListContainerProps = {
  taskLists: ReadonlyArray<TaskListAbs>;
  /**
   * function to focus a task list
   * @param list
   * @returns
   */
  focusTaskList: (list: TaskListAbs) => void;
  /**
   * function to create a new task list
   * @param values
   * @returns
   */
  createTaskList: (
    values: CreateTaskListFormFields
  ) => Promise<TaskListResponseDto>;
};

const TaskListContainer = ({
  taskLists,
  focusTaskList,
  createTaskList,
}: TaskListContainerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <IconButton
          icon={<AddIcon />}
          aria-label={"create new task list"}
          onClick={onOpen}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateTaskListForm submit={createTaskList} cancel={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </VStack>
  );
};

export default TaskListContainer;
