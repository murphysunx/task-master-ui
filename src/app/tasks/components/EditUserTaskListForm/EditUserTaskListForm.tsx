import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { UserTaskList } from "../../models/userTaskList/userTaskList";
import { TaskListSchema } from "../../schemas/taskList";
import { UpdateTaskListFormFields } from "../../types/taskList";

type EditUserTaskListFormProps = {
  list: UserTaskList;
  onConfirm: (values: UpdateTaskListFormFields) => Promise<void>;
  onCancel: () => void;
};

const UpdateTaskListSchema = Yup.object().shape({
  name: TaskListSchema.name,
} satisfies {
  [k in keyof UpdateTaskListFormFields]: Yup.ISchema<any> | Yup.Reference;
});

const EditUserTaskListForm = ({
  list,
  onConfirm,
  onCancel,
}: EditUserTaskListFormProps) => {
  const formik = useFormik<UpdateTaskListFormFields>({
    initialValues: {
      name: list.name,
    },
    onSubmit: (values) => {
      return onConfirm(values);
    },
    validationSchema: UpdateTaskListSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} role="form">
      <FormControl>
        <FormLabel>List Name</FormLabel>
        <Input
          name="name"
          placeholder="List Name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.touched.name && !!formik.errors.name}
          disabled={formik.isSubmitting}
        />
      </FormControl>
      <ButtonGroup variant="outline" spacing="4" mt={4}>
        <Button
          type="submit"
          isLoading={formik.isSubmitting}
          colorScheme="green"
          variant="solid"
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

export default observer(EditUserTaskListForm);
