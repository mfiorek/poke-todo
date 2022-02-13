import { task } from "./types";

export type AddTaskAction = { type: "ADD_TASK"; payload: task };

export const addTask = (summary: string): AddTaskAction => ({
  type: "ADD_TASK",
  payload: {id: `${summary}${Date.now()}`, createdAt: Date.now(), done: false, summary: summary},
});