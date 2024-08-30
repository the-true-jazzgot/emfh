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

  //TODO: move to separate function in todos.service
  useEffect(() => {if(isSuccess) { 
    let tasks;
    allTasks == undefined ? tasks = [] as Task[]: tasks = allTasks;
    setUncategorizedItems(filterData("uncategorized", tasks));
    setQ1Items(filterData("q1", tasks));
    setQ2Items(filterData("q2", tasks));
    setQ3Items(filterData("q3", tasks));
    setQ4Items(filterData("q4", tasks));
  }}, [allTasks]);

  const addTaskToComponent = (e: DragEndEvent) => {
    const taskId: string = e.active.id.toString();
    const task: HTMLElement | null = document.getElementById(taskId);

    if(e.over?.id && !!task) {
      console.log(taskId);
      console.log(e.over?.id);

      const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
      const newCategory: EMCategory = e.over?.id as EMCategory;
      let taskToMove: Task | undefined;

      switch (currCategory) {
        case "uncategorized":
          taskToMove = uncategorizedItems.find(item => item.id === taskId);
          setUncategorizedItems(uncategorizedItems.filter(item => item !== taskToMove));
          break;
        case "q1":
          taskToMove = q1Items.find(item => item.id === taskId);
          setQ1Items(q1Items.filter(item => item !== taskToMove));
          break;
        case "q2":
          taskToMove = q2Items.find(item => item.id === taskId);
          setQ2Items(q2Items.filter(item => item !== taskToMove));
          break;
        case "q3":
          taskToMove = q3Items.find(item => item.id === taskId);
          setQ3Items(q3Items.filter(item => item !== taskToMove));
          break;
        case "q4":
          taskToMove = q4Items.find(item => item.id === taskId);
          setQ4Items(q4Items.filter(item => item !== taskToMove));
      }

      switch (newCategory) {
        case "uncategorized":
          taskToMove.category = "uncategorized";
          setUncategorizedItems([...uncategorizedItems,taskToMove]);
          break;
        case "q1":
          taskToMove.category = "q1";
          setQ1Items([...q1Items,taskToMove]);
          break;
        case "q2":
          taskToMove.category = "q2";
          setQ2Items([...q2Items,taskToMove]);
          break;
        case "q3":
          taskToMove.category = "q3";
          setQ3Items([...q3Items,taskToMove]);
          break;
        case "q4":
          taskToMove.category = "q4";
          setQ4Items([...q4Items,taskToMove]);
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
