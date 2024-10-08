import { Observable, Subject } from 'rxjs';
import { EMCategory, Task } from '../../lib/types';

export interface TasksMatrix {
  quadrants: EMCategory[],
  q1?: Task[],
  q2?: Task[],
  q3?: Task[],
  q4?: Task[]
};

export interface AssistantAction {
  value: string,
  message: string, 
  action: (task:Task) => void,
  performed?: boolean
}

const subject:Subject<TasksMatrix> = new Subject();

export const assistant = {
  setAssistantData: (tasksMatrix: TasksMatrix):void => subject.next(tasksMatrix),
  getAssistantData: ():Observable<TasksMatrix> => subject.asObservable()
};




