import { Observable, Subject } from 'rxjs';
import { EMCategory, Task } from '../types';

export interface TasksMatrix {
  quadrants: EMCategory[],
  q1?: Task[],
  q2?: Task[],
  q3?: Task[],
  q4?: Task[]
};

const subject:Subject<TasksMatrix> = new Subject();

export const assistant = {
  setAssistantData: (tasksMatrix: TasksMatrix):void => subject.next(tasksMatrix),
  getAssistantData: ():Observable<TasksMatrix> => subject.asObservable()
};




