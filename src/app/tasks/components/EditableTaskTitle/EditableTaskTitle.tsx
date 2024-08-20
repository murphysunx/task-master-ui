import { Input, InputProps } from "@chakra-ui/react";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import Task from "../../models/task";

type EditableTaskTitleProps = {
  task: Task;
  size?: InputProps["size"];
};

const EditableTaskTitle = ({ task, size }: EditableTaskTitleProps) => {
  const input = useRef<HTMLInputElement>(null);

  if (input.current) {
    input.current.value = task.title;
  }

  return (
    <Input
      data-testid={`editable-task-title-${task.id}`}
      ref={input}
      className="bg-transparent"
      defaultValue={task.title}
      size={size}
      variant="custom"
      onChange={debounce(($event) => {
        const newTitle = $event.target.value;
        task.updateTitle(newTitle);
      }, 500)}
    />
  );
};

export default observer(EditableTaskTitle);
