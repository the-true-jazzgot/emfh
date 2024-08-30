import { DndContext } from '@dnd-kit/core';
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Quadrant } from './components/Quadrant';
import { SidebarTasksList } from './components/SidebarTasksList'

function App() {

  return (
    <div className='grid grid-cols-5 grid-rows-11 gap-4 inset-0 m-0 p-0'>
      <LoginForm />
      <DndContext>
        <SidebarTasksList />
        <Quadrant quadrant={"q1"} />
        <Quadrant quadrant={"q2"} />
        <Quadrant quadrant={"q3"} />
        <Quadrant quadrant={"q4"} />
      </DndContext>
    </div>
  );
}

export default App;
