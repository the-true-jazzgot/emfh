import { DndContext, DragEndEvent } from '@dnd-kit/core';
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Quadrant } from './components/Quadrant';
import { SidebarTasksList } from './components/SidebarTasksList'
import { useEffect, useState } from 'react';
import { EMCategory, Task } from './types';
import { filterData, toDosQuery } from './services/todos.service';

function App() {
  const { data: allTasks, isSuccess } = toDosQuery();

  const [uncategorizedItems, setUncategorizedItems] = useState([] as Task[]);
  const [q1Items, setQ1Items] = useState([] as Task[]);
  const [q2Items, setQ2Items] = useState([] as Task[]);
  const [q3Items, setQ3Items] = useState([] as Task[]);
  const [q4Items, setQ4Items] = useState([] as Task[]);

  const categoryStates = {
    uncategorized: {
      id: "uncategorized" as EMCategory,
      readState: uncategorizedItems as Task[],                                                     
      setState: setUncategorizedItems as React.Dispatch<React.SetStateAction<Task[]>>
    },
    q1: {
      id: "q1" as EMCategory,
      readState: q1Items as Task[],                          
      setState: setQ1Items as React.Dispatch<React.SetStateAction<Task[]>>
    },
    q2: {
      id: "q2" as EMCategory,
      readState: q2Items as Task[],                          
      setState: setQ2Items as React.Dispatch<React.SetStateAction<Task[]>>
    },
    q3: {
      id: "q3" as EMCategory,
      readState: q3Items as Task[],                          
      setState: setQ3Items as React.Dispatch<React.SetStateAction<Task[]>>
    },
    q4: {
      id: "q4" as EMCategory,
      readState: q4Items as Task[],                          
      setState: setQ4Items as React.Dispatch<React.SetStateAction<Task[]>>
    }
  }

  //TODO: move to separate function in todos.service
  //TODO: check if useEffect is properly called in case of refetch
  useEffect(() => {if(isSuccess) { 
    let tasks;
    allTasks == undefined ? tasks = [] as Task[]: tasks = allTasks;
    setUncategorizedItems(filterData("uncategorized", tasks));
    setQ1Items(filterData("q1", tasks));
    setQ2Items(filterData("q2", tasks));
    setQ3Items(filterData("q3", tasks));
    setQ4Items(filterData("q4", tasks));
  }}, [allTasks]);

  //TODO: move to separate function in todos.service
  const addTaskToComponent = (e: DragEndEvent) => {
    const taskId: string = e.active.id.toString();
    const task: HTMLElement | null = document.getElementById(taskId);

    if(e.over?.id && !!task) {
      const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
      const newCategory: EMCategory = e.over?.id as EMCategory;
      if(newCategory === currCategory) return;
      const currCatState = categoryStates[currCategory];
      const newCatState = categoryStates[newCategory];

      const taskToMove: Task | undefined = currCatState.readState.find(item => item.id === taskId);
      if(!!taskToMove) {
        currCatState.setState(currCatState.readState.filter(item => item !== taskToMove));
        console.log(newCatState.id);
        taskToMove.category = newCatState.id;
        newCatState.setState([...newCatState.readState,taskToMove]);
      }
    }
  };

  return (
    <div className='grid grid-cols-5 grid-rows-11 gap-4 inset-0 m-0 p-0'>
      <LoginForm />
      <DndContext onDragEnd={addTaskToComponent}>
        <SidebarTasksList tasks={uncategorizedItems} />
        <Quadrant quadrant={"q1"} tasks={q1Items} />
        <Quadrant quadrant={"q2"} tasks={q2Items} />
        <Quadrant quadrant={"q3"} tasks={q3Items} />
        <Quadrant quadrant={"q4"} tasks={q4Items} />
      </DndContext>
    </div>
  );
}

export default App;
