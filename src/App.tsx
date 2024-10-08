import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AuthContext } from './components/login/lib/authentication';
import { addTaskToComponent } from './components/containers/dnd.lib';
import { LoginForm } from './components/login/LoginForm';
import { SidebarTasksList } from './components/containers/SidebarTasksList';
import { Quadrant } from '@/components/containers/Quadrant'
import { Controls } from './components/Controls';
import { useAuthData } from './components/login/lib/use-auth-data';


function App() {
  const {authData} = useAuthData();
  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: { 
          delay: 50,
          tolerance: 18
        }
    })
  );

  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-4 inset-0 m-0 p-0'>
      <AuthContext.Provider value={authData}>
        <LoginForm />
        {!!authData && <>
          <DndContext onDragEnd={addTaskToComponent} sensors={sensors}>
            <SidebarTasksList />
            <Quadrant quadrant={"q1"} />
            <Quadrant quadrant={"q2"} />
            <Quadrant quadrant={"q3"} />
            <Quadrant quadrant={"q4"} />
          </DndContext>
          <Controls />
        </>}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
