import { Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import TaskListStore from "../../stores/taskListStore";

type TaskListFormProps = {
  store: TaskListStore;
};

const CreateTaskSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
});

const TaskListForm = ({ store }: TaskListFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      store.createTask(values.title).then(() => formik.resetForm());
    },
    validationSchema: CreateTaskSchema,
  });
  return (
    <form data-testid={`${store.listName}-form`} onSubmit={formik.handleSubmit}>
      <Input
        data-testid={`${store.listName}-new-task-title-input`}
        name="title"
        type="text"
        placeholder=" + Add task"
        onChange={formik.handleChange}
        value={formik.values.title}
        isInvalid={formik.touched.title && !!formik.errors.title}
        size="lg"
      />
      <Input
        type="submit"
        hidden
        data-testid={`${store.listName}-new-task-submit`}
      />
    </form>
  );
};

export default observer(TaskListForm);
