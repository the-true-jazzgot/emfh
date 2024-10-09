import { Observable, ReplaySubject, Subject } from "rxjs";
import { EMCategory, Task, UserCredentials } from "./types";


/*****************************
** Login and authentication **
*****************************/
export const getCredentials:Subject<UserCredentials> = new ReplaySubject<UserCredentials>(1);
export const updateCredentials = (credentials: UserCredentials):void => getCredentials.next(credentials);


/*****************************
******** Categories **********
*****************************/
const uncategorizedSubject:Subject<Task[]> = new Subject();

export const tasksUncategorized = {
  dispatch: (tasks: Task[]):void => uncategorizedSubject.next(tasks),
  receive: ():Observable<Task[]> => uncategorizedSubject.asObservable()
};

const subjectQ1:Subject<Task[]> = new Subject();

export const tasksQ1 = {
  dispatch: (tasks: Task[]):void => subjectQ1.next(tasks),
  receive: ():Observable<Task[]> => subjectQ1.asObservable()
};

const subjectQ2:Subject<Task[]> = new Subject();

export const tasksQ2 = {
  dispatch: (tasks: Task[]):void => subjectQ2.next(tasks),
  receive: ():Observable<Task[]> => subjectQ2.asObservable()
};

const subjectQ3:Subject<Task[]> = new Subject();

export const tasksQ3 = {
  dispatch: (tasks: Task[]):void => subjectQ3.next(tasks),
  receive: ():Observable<Task[]> => subjectQ3.asObservable()
};

const subjectQ4:Subject<Task[]> = new Subject();

export const tasksQ4 = {
  dispatch: (tasks: Task[]):void => subjectQ4.next(tasks),
  receive: ():Observable<Task[]> => subjectQ4.asObservable()
};

export const getTasksFactory: Record<EMCategory, () => Observable<Task[]>> = {
  "uncategorized": tasksUncategorized.receive,
  "q1": tasksQ1.receive,
  "q2": tasksQ2.receive,
  "q3": tasksQ3.receive,
  "q4": tasksQ4.receive
}


/*****************************
******** Assistant ***********
*****************************/
export interface TasksMatrix {
  quadrants: EMCategory[],
  q1?: Task[],
  q2?: Task[],
  q3?: Task[],
  q4?: Task[]
};

const taskMatrix:Subject<TasksMatrix> = new ReplaySubject<TasksMatrix>(1);

export const assistant = {
  setAssistantData: (tasksMatrix: TasksMatrix):void => taskMatrix.next(tasksMatrix),
  getAssistantData: ():Observable<TasksMatrix> => taskMatrix.asObservable()
};


/*****************************
****** Category change *******
*****************************/
export interface TasksListAction {
  taskId: string,
  action: "add" | "move",
  moveTo: EMCategory
}

const taskListAction:Subject<TasksListAction> = new Subject();

export const moveTask = {
  dispatch: (tasksListAction: TasksListAction):void => taskListAction.next(tasksListAction),
  receive: ():Observable<TasksListAction> => taskListAction.asObservable()
};


/*****************************
******** Update task ********
*****************************/
const taskUpdate:Subject<Task> = new Subject<Task>();

export const updateTask = {
  dispatch: (task: Task):void => taskUpdate.next(task),
  receive: ():Observable<Task> => taskUpdate.asObservable()
};