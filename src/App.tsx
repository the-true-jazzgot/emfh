import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AuthData } from './types';
import { AuthContext } from './lib/authentification';
import { addTaskToComponent } from './components/containers/dnd.lib';
import { LoginForm } from './components/login/LoginForm';
import { SidebarTasksList } from './components/containers/SidebarTasksList';
import { Quadrant } from '@/components/containers/Quadrant'
import { Controls } from './components/Controls';
import { useSessionState } from './hooks/use-session-state';


function App() {
  const [authData,setAuthData] = useSessionState<AuthData | undefined>("emfh", undefined);
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
        <LoginForm setAuthData={setAuthData} />
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
