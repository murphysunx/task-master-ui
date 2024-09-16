import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ISchema } from "yup";
import { TaskListResponseDto } from "../../dtos/taskList.dto";
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
  name: Yup.string().trim().required("List name is required"),
} satisfies {
  [k in keyof CreateTaskListFormFields]: ISchema<any> | Yup.Reference;
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
      <ButtonGroup variant="outline" spacing="6">
        <Button type="submit" isLoading={formik.isSubmitting}>
          Save
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

export default CreateTaskListForm;
