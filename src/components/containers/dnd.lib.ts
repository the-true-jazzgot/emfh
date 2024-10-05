import { DragEndEvent } from "@dnd-kit/core";
import { EMCategory } from "../../types";
import { Observable, Subject } from 'rxjs';

export interface TasksListAction {
  taskId: string,
  action: "add" | "move",
  moveTo: EMCategory,
  moveFrom: EMCategory
}

const subject:Subject<TasksListAction> = new Subject();

export const moveTask = {
  dispatch: (tasksListAction: TasksListAction):void => subject.next(tasksListAction),
  receive: ():Observable<TasksListAction> => subject.asObservable()
};

export const addTaskToComponent = (e: DragEndEvent) => {
  const taskId: string = e.active.id.toString();
  const task: HTMLElement | null = document.getElementById(taskId);

  if(e.over?.id && !!task) {
    const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
    const newCategory: EMCategory = e.over?.id as EMCategory;

    if(currCategory !== newCategory) {
      const move: TasksListAction = { taskId: taskId, action: "move", moveFrom: currCategory, moveTo: newCategory };
    
      moveTask.dispatch(move);
    }
  }
}
