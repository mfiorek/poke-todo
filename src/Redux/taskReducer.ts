import { AddTaskAction } from "./taskActions"
import { task } from "./types"

const initialState: task[] = []

export const taskReducer = (state: task[] = initialState, action: AddTaskAction) => {
  switch(action.type){
    case "ADD_TASK": {
      return [...state, action.payload]
    }
    default:
      return state
  }
}