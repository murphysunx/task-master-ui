import { Textarea } from "@chakra-ui/react";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useRef } from "react";
import Task from "../../models/task";

type EditableTaskDescriptionProps = {
  task: Task;
};

const EditableTaskDescription = ({ task }: EditableTaskDescriptionProps) => {
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
        task.updateDescription(value);
      }, 500)}
    ></Textarea>
  );
};

export default observer(EditableTaskDescription);
