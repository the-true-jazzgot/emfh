import { Observable, Subject } from 'rxjs';
import { EMCategory, Task } from '../types';

export interface TasksMatrix {
  quadrants: EMCategory[],
  q1?: Task[],
  q2?: Task[],
  q3?: Task[],
  q4?: Task[]
}

const uncategorizedSubject:Subject<Task[]> = new Subject();

export const assistantUncategorized = {
  setTasksQuadrants: (tasks: Task[]):void => uncategorizedSubject.next(tasks),
  getTasksQuadrants: ():Observable<Task[]> => uncategorizedSubject.asObservable()
};

const subjectQ1:Subject<Task[]> = new Subject();

export const assistantQ1 = {
  setTasksQuadrants: (tasks: Task[]):void => subjectQ1.next(tasks),
  getTasksQuadrants: ():Observable<Task[]> => subjectQ1.asObservable()
};

const subjectQ2:Subject<Task[]> = new Subject();

export const assistantQ2 = {
  setTasksQuadrants: (tasks: Task[]):void => subjectQ2.next(tasks),
  getTasksQuadrants: ():Observable<Task[]> => subjectQ2.asObservable()
};

const subjectQ3:Subject<Task[]> = new Subject();

export const assistantQ3 = {
  setTasksQuadrants: (tasks: Task[]):void => subjectQ3.next(tasks),
  getTasksQuadrants: ():Observable<Task[]> => subjectQ3.asObservable()
};

const subjectQ4:Subject<Task[]> = new Subject();

export const assistantQ4 = {
  setTasksQuadrants: (tasks: Task[]):void => subjectQ4.next(tasks),
  getTasksQuadrants: ():Observable<Task[]> => subjectQ4.asObservable()
};

const subject:Subject<TasksMatrix> = new Subject();

export const assistant = {
  setAssistantData: (tasksMatrix: TasksMatrix):void => subject.next(tasksMatrix),
  getTasksQuadrants: ():Observable<TasksMatrix> => subject.asObservable()
};

export const assistantFactory: Record<EMCategory, (tasks: Task[]) => void> = {
  "uncategorized": assistantUncategorized.setTasksQuadrants,
  "q1": assistantQ1.setTasksQuadrants,
  "q2": assistantQ2.setTasksQuadrants,
  "q3": assistantQ3.setTasksQuadrants,
  "q4": assistantQ4.setTasksQuadrants
}