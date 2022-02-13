import { task } from "./types";

type AddTaskAction = { type: "ADD_TASK"; payload: task };
type CheckTaskAction = { type: "CHECK_TASK"; payload: {id: string, done: boolean} };
type DeleteTaskAction = { type: "DELETE_TASK"; payload: string };
export type Actions = AddTaskAction | CheckTaskAction | DeleteTaskAction;

export const addTask = (summary: string): AddTaskAction => ({
  type: "ADD_TASK",
  payload: {id: `${summary}${Date.now()}`, createdAt: Date.now(), done: false, summary: summary},
});

export const checkTask = (id: string, done: boolean): CheckTaskAction => ({
  type: "CHECK_TASK",
  payload: {id, done},
});

export const deleteTask = (id: string): DeleteTaskAction => ({
  type: "DELETE_TASK",
  payload: id,
});
