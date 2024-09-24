import { AddIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
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
import { useCallback, useRef, useState } from "react";
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
  deleteUserTaskList: (userTaskList: UserTaskList) => Promise<void>;
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
  deleteUserTaskList,
}: TaskListContainerProps) => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const [focusedList, setFocusedList] = useState<UserTaskList | null>(null);

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const deleteAlertCancelRef = useRef<HTMLButtonElement | null>(null);
  const submitTaskListCreation = useCallback(
    (values: CreateTaskListFormFields) => {
      return createTaskList(values).then((result) => {
        onCreateModalClose();
        return result;
      });
    },
    [createTaskList, onCreateModalClose]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitUserTaskListUpdate = useCallback(
    (userTaskList: UserTaskList, values: UpdateTaskListFormFields) => {
      return updateUserTaskList(userTaskList, values).then((result) => {
        onEditModalClose();
        return result;
      });
    },
    [updateUserTaskList, onEditModalClose]
  );

  const submitUserTaskListDelete = useCallback(
    (userTaskList: UserTaskList) => {
      return deleteUserTaskList(userTaskList).then((result) => {
        onDeleteAlertClose();
        return result;
      });
    },
    [deleteUserTaskList, onDeleteAlertClose]
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
                      setFocusedList(list);
                      onEditModalOpen();
                    }
                  : void 0
              }
              onDelete={
                list instanceof UserTaskList
                  ? () => {
                      setFocusedList(list);
                      onDeleteAlertOpen();
                    }
                  : void 0
              }
            />
          </ListItem>
        ))}
      </List>

      <Box textAlign={"center"} mt={4}>
        <IconButton
          icon={<AddIcon />}
          aria-label={"create new task list"}
          onClick={onCreateModalOpen}
        />

        <Modal isOpen={isCreateModalOpen} onClose={onCreateModalClose}>
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

      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditUserTaskListForm
              list={focusedList as UserTaskList}
              onConfirm={async (values) => {
                await submitUserTaskListUpdate(focusedList!, values);
                onEditModalClose();
              }}
              onCancel={onEditModalClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {focusedList && (
        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={deleteAlertCancelRef}
          onClose={onDeleteAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Task List
              </AlertDialogHeader>

              <AlertDialogBody>
                {focusedList!.tasks.length === 0
                  ? "Are you sure? You can't undo this action afterwards."
                  : `Are you sure? This list contains ${focusedList!.tasks.length === 1 ? "1 task" : `${focusedList!.tasks.length} tasks`}. You can't undo this action afterwards.`}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={deleteAlertCancelRef}
                  onClick={onDeleteAlertClose}
                  isDisabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    setIsSubmitting(true);
                    await submitUserTaskListDelete(focusedList!);
                    setIsSubmitting(false);
                  }}
                  ml={3}
                  isLoading={isSubmitting}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Box>
  );
};

export default TaskListContainer;
