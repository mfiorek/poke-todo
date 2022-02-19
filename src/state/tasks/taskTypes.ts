export interface TasksReducerState {
    tasks: task[];
}

export interface task {
  id: string;
  createdAt: number;
  done: boolean;
  summary: string;
}
