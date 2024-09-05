import { DragEndEvent } from "@dnd-kit/core";
import { EMCategory, Task } from "../types";
import { Observable, Subject } from 'rxjs';

export interface TasksListAction {
  taskId: string,
  action: "add" | "move",
  moveTo?: EMCategory,
  task?: Task
}

const uncategorizedSubject:Subject<TasksListAction> = new Subject();
const uncategorizedDispatch = (task: TasksListAction):void => uncategorizedSubject.next(task);
const uncategorizedAction = ():Observable<TasksListAction> => uncategorizedSubject.asObservable();

const q1Subject:Subject<TasksListAction> = new Subject();
const q1Dispatch = (task: TasksListAction):void => q1Subject.next(task);
const q1Action = ():Observable<TasksListAction> => q1Subject.asObservable();

const q2Subject:Subject<TasksListAction> = new Subject();
const q2Dispatch = (task: TasksListAction):void => q2Subject.next(task);
const q2Action = ():Observable<TasksListAction> => q2Subject.asObservable();

const q3Subject:Subject<TasksListAction> = new Subject();
const q3Dispatch = (task: TasksListAction):void => q3Subject.next(task);
const q3Action = ():Observable<TasksListAction> => q3Subject.asObservable();

const q4Subject:Subject<TasksListAction> = new Subject();
const q4Dispatch = (task: TasksListAction):void => q4Subject.next(task);
const q4Action = ():Observable<TasksListAction> => q4Subject.asObservable();

export const addTaskToComponent = (e: DragEndEvent) => {
  const taskId: string = e.active.id.toString();
  const task: HTMLElement | null = document.getElementById(taskId);

  if(e.over?.id && !!task) {
    const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
    const newCategory: EMCategory = e.over?.id as EMCategory
    const move: TasksListAction = { taskId: taskId, action: "move", moveTo: newCategory };
    
    switch(currCategory) {
      case "uncategorized":
        console.log("Move task: "+taskId+" from: "+currCategory+" to: "+ newCategory);
        uncategorizedDispatch(move);
        break;
      case "q1":
        q1Dispatch(move);
        break;
      case "q2":
        q2Dispatch(move);
        break;
      case "q3":
        q3Dispatch(move);
        break;
      case "q4":
        q4Dispatch(move);
        break;
    }

    // switch(newCategory) {
    //   case "uncategorized":
    //     uncategorizedDispatch(add);
    //     break;
    //   case "q1":
    //     q1Dispatch(add);
    //     break;
    //   case "q2":
    //     q2Dispatch(add);
    //     break;
    //   case "q3":
    //     q3Dispatch(add);
    //     break;
    //   case "q4":
    //     q4Dispatch(add);
    //     break;
    // }
  }
};

export const TasksActionsFactory: Record<EMCategory, () => Observable<TasksListAction>> = {
  "uncategorized": uncategorizedAction,
  "q1": q1Action,
  "q2": q2Action,
  "q3": q3Action,
  "q4": ():Observable<TasksListAction> => q4Subject.asObservable()
}

export const TasksDispatchFactory: Record<EMCategory, (task: TasksListAction) => void> = {
  "uncategorized": uncategorizedDispatch,
  "q1": q1Dispatch,
  "q2": q2Dispatch,
  "q3": q3Dispatch,
  "q4": q4Dispatch
}