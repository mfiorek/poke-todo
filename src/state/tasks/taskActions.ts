import { task } from "./taskTypes";

type ClearTasksAction = { type: "CLEAR_TASKS" };
type AddTaskAction = { type: "ADD_TASK"; payload: task };
type CheckTaskAction = { type: "CHECK_TASK"; payload: {id: string, done: boolean} };
type DeleteTaskAction = { type: "DELETE_TASK"; payload: string };
export type Actions = ClearTasksAction | AddTaskAction | CheckTaskAction | DeleteTaskAction;

export const clearTasks = (): ClearTasksAction => ({
  type: "CLEAR_TASKS",
});

export const addTask = (task: task): AddTaskAction => ({
  type: "ADD_TASK",
  payload: task,
});

export const checkTask = (id: string, done: boolean): CheckTaskAction => ({
  type: "CHECK_TASK",
  payload: {id, done},
});

export const deleteTask = (id: string): DeleteTaskAction => ({
  type: "DELETE_TASK",
  payload: id,
});
