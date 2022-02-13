import { task } from "./types";

type AddTaskAction = { type: "ADD_TASK"; payload: task };
type CheckTaskAction = { type: "CHECK_TASK"; payload: {id: string, done: boolean} };
export type Actions = AddTaskAction | CheckTaskAction;

export const addTask = (summary: string): AddTaskAction => ({
  type: "ADD_TASK",
  payload: {id: `${summary}${Date.now()}`, createdAt: Date.now(), done: false, summary: summary},
});

export const checkTask = (id: string, done: boolean): CheckTaskAction => ({
  type: "CHECK_TASK",
  payload: {id, done},
});
