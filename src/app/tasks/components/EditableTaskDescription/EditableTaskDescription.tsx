import { Textarea } from "@chakra-ui/react";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useRef } from "react";
import { ITask } from "../../types/task";

type EditableTaskDescriptionProps = {
  task: ITask;
  /**
   * update a task's description
   * @param newDescription text
   * @param task a task
   * @returns
   */
  updateTaskDescription: (newDescription: string, task: ITask) => Promise<void>;
};

const EditableTaskDescription = ({
  task,
  updateTaskDescription,
}: EditableTaskDescriptionProps) => {
  const textboxRef = useRef<HTMLTextAreaElement>(null);

  if (textboxRef.current) {
    textboxRef.current.value = task.description || "";
  }

  return (
    <Textarea
      ref={textboxRef}
      placeholder="Description"
      defaultValue={task.description || ""}
      variant="unstyled"
      resize="none"
      onChange={debounce(($event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = $event.target.value;
        updateTaskDescription(value, task);
      }, 500)}
    ></Textarea>
  );
};

export default EditableTaskDescription;
