import { DndContext } from '@dnd-kit/core';
import { LoginForm } from './components/LoginForm'
import { Quadrant } from './components/Quadrant';
import { SidebarTasksList } from './components/SidebarTasksList'
import { addTaskToComponent } from './services/dnd.service';
import { AssistantContainer } from './components/Assistant/AssistantContainer';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-4 inset-0 m-0 p-0'>
      <LoginForm />
      <DndContext onDragEnd={addTaskToComponent}>
        <SidebarTasksList />
        <Quadrant quadrant={"q1"} />
        <Quadrant quadrant={"q2"} />
        <Quadrant quadrant={"q3"} />
        <Quadrant quadrant={"q4"} />
      </DndContext>
      <Controls q1={[]} q2={[]} q3={[]} q4={[]} />
      <AssistantContainer />
    </div>
  );
}

export default App;
