import { ITask } from "./interfaces/task.interface";

export default function TaskCard(props: {
  task: ITask;
  showDescription?: boolean;
}) {
  const { task, showDescription } = props;
  const { title, description } = task;

  return (
    <div className="flex-col">
      <div className="text-lg">
        <span>{title}</span>
      </div>
      {showDescription && <div className="text-base">{description}</div>}
    </div>
  );
}
