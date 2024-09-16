import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ITask } from "../../types/task";

type TaskListFormProps = {
  createTaskForList: (taskTitle: string) => Promise<ITask>;
};

const CreateTaskSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
});

const CreateTaskForm = ({ createTaskForList }: TaskListFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      createTaskForList(values.title).then(() => formik.resetForm());
    },
    validationSchema: CreateTaskSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} role="form">
      <InputGroup size="lg">
        <Input
          name="title"
          type="text"
          placeholder=" + Add task"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={formik.touched.title && !!formik.errors.title}
          size="lg"
          disabled={formik.isSubmitting}
        />
        {formik.isSubmitting && (
          <InputRightElement width="4.5rem">
            <Spinner />
          </InputRightElement>
        )}
      </InputGroup>
      <Input type="submit" hidden role="button" />
    </form>
  );
};

export default CreateTaskForm;
