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

  useEffect(() => {if(isSuccess) { //move to separate function in todos.service
    let tasks;
    allTasks == undefined ? tasks = [] as Task[]: tasks = allTasks;
    console.log(tasks);
    setUncategorizedItems(filterData("uncategorized", tasks));
    setQ1Items(filterData("q1", tasks));
    setQ2Items(filterData("q2", tasks));
    setQ3Items(filterData("q3", tasks));
    setQ4Items(filterData("q4", tasks));
  }}, [allTasks]);

  const addTaskToComponent = (e: DragEndEvent) => {
    const taskId = e.active.id;

    if(e.over?.id) {
      console.log(taskId);
      console.log(e.over?.id);
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
