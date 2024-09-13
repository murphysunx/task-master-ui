import { Input, InputProps } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useRef } from "react";
import { ITask } from "../../types/task";

type EditableTaskTitleProps = {
  task: ITask;
  size?: InputProps["size"];
  /**
   * update a task's title
   * @param title new title
   * @param task a task
   * @returns
   */
  updateTaskTitle: (newTitle: string, task: ITask) => Promise<void>;
};

const EditableTaskTitle = ({
  task,
  size,
  updateTaskTitle,
}: EditableTaskTitleProps) => {
  const input = useRef<HTMLInputElement>(null);

  if (input.current) {
    input.current.value = task.title;
  }

  return (
    <Input
      ref={input}
      className="bg-transparent"
      defaultValue={task.title}
      size={size}
      variant="custom"
      onChange={debounce(($event) => {
        const newTitle = $event.target.value;
        updateTaskTitle(newTitle, task);
      }, 500)}
    />
  );
};

export default EditableTaskTitle;
