import * as Yup from "yup";

export const TaskListSchema = {
  name: Yup.string().trim().required("List name is required"),
};
