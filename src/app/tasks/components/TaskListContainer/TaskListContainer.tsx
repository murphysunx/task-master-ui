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
import { useCallback, useState } from "react";
import { TaskListAbs } from "../../abstracts/taskList";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
import { UserTaskList } from "../../models/userTaskList/userTaskList";
import {
  CreateTaskListFormFields,
  UpdateTaskListFormFields,
} from "../../types/taskList";
import CreateTaskListForm from "../CreateTaskListForm/CreateTaskListForm";
import EditUserTaskListForm from "../EditUserTaskListForm/EditUserTaskListForm";
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
  /**
   * function to update a task list
   * @param userTaskList task list to update
   * @param values updated task list values
   * @returns
   */
  updateUserTaskList: (
    userTaskList: UserTaskList,
    values: UpdateTaskListFormFields
  ) => Promise<void>;
};

/**
 * a container that shows all task lists of a user
 */
const TaskListContainer = ({
  activeTaskList,
  taskLists,
  clickTaskList,
  createTaskList,
  updateUserTaskList,
}: TaskListContainerProps) => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const [editingList, setEditingList] = useState<UserTaskList | null>(null);

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const submitTaskListCreation = useCallback(
    (values: CreateTaskListFormFields) => {
      return createTaskList(values).then((result) => {
        onCreateModalClose();
        return result;
      });
    },
    [createTaskList, onCreateModalClose]
  );

  const submitUserTaskListUpdate = useCallback(
    (userTaskList: UserTaskList, values: UpdateTaskListFormFields) => {
      return updateUserTaskList(userTaskList, values).then((result) => {
        onEditModalClose();
        return result;
      });
    },
    [updateUserTaskList, onEditModalClose]
  );

  return (
    <Box>
      <List spacing={1}>
        {taskLists.map((list) => (
          <ListItem
            key={list instanceof UserTaskList ? list.id : "inbox"}
            bgColor={list === activeTaskList ? "gray.100" : "transparent"}
            borderRadius={"lg"}
            _hover={{
              bgColor: list === activeTaskList ? "gray.100" : "gray.50",
            }}
          >
            <TaskListItem
              list={list}
              onClick={() => clickTaskList(list)}
              onEdit={
                list instanceof UserTaskList
                  ? () => {
                      setEditingList(list);
                      onEditModalOpen();
                    }
                  : void 0
              }
            />
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditUserTaskListForm
              list={editingList as UserTaskList}
              onConfirm={async (values) => {
                await submitUserTaskListUpdate(editingList!, values);
                onEditModalClose();
              }}
              onCancel={onEditModalClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box textAlign={"center"} mt={4}>
        <IconButton
          icon={<AddIcon />}
          aria-label={"create new task list"}
          onClick={onCreateModalOpen}
        />

        <Modal
          isOpen={isCreateModalOpen}
          onClose={onCreateModalClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateTaskListForm
                submit={submitTaskListCreation}
                cancel={onCreateModalClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default TaskListContainer;
