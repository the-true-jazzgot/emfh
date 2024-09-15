import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { LoginForm } from './components/LoginForm'
import { Quadrant } from './components/Quadrant';
import { SidebarTasksList } from './components/SidebarTasksList'
import { addTaskToComponent } from './services/dnd.service';
import { AssistantContainer } from './components/Assistant/AssistantContainer';
import { Controls } from './components/Controls';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: { 
          delay: 100,
          tolerance: 10
        }
    })
  );

  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-4 inset-0 m-0 p-0'>
      <LoginForm />
      <DndContext onDragEnd={addTaskToComponent} sensors={sensors}>
        <SidebarTasksList />
        <Quadrant quadrant={"q1"} />
        <Quadrant quadrant={"q2"} />
        <Quadrant quadrant={"q3"} />
        <Quadrant quadrant={"q4"} />
      </DndContext>
      <Controls />
      <AssistantContainer />
    </div>
  );
}

export default App;
