import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
import { TaskListSchema } from "../../schemas/taskList";
import { CreateTaskListFormFields } from "../../types/taskList";

type CreateTaskListFormProps = {
  /**
   * function to create a task list
   * @param dto dto for creating a task list
   * @returns created task list dto
   */
  submit: (dto: CreateTaskListFormFields) => Promise<TaskListResponseDto>;
  /**
   * function to cancel task list creation
   * @returns
   */
  cancel: () => void;
};

const CreateTaskListSchema = Yup.object().shape({
  name: TaskListSchema.name,
} satisfies {
  [k in keyof CreateTaskListFormFields]: Yup.ISchema<any> | Yup.Reference;
});

const CreateTaskListForm = ({ submit, cancel }: CreateTaskListFormProps) => {
  const formik = useFormik<CreateTaskListFormFields>({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      return submit(values);
    },
    validationSchema: CreateTaskListSchema,
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
        <Button onClick={cancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

export default CreateTaskListForm;
