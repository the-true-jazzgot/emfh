import { Observable, Subject } from 'rxjs';
import { EMCategory } from '../types';

const subject:Subject<EMCategory[]> = new Subject();

export const assistant = {
    setTasksQuadrants: (tasks: EMCategory[]):void => subject.next(tasks),
    getTasksQuadrants: ():Observable<EMCategory[]> => subject.asObservable()
};