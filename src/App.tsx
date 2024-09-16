import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AuthData } from './types';
import { AuthContext } from './services/authentification.service';
import { addTaskToComponent } from './services/dnd.service';
import { LoginForm } from './components/LoginForm';
import { SidebarTasksList } from './components/SidebarTasksList';
import { Quadrant } from './components/Quadrant';
import { Controls } from './components/Controls';
import { AssistantContainer } from './components/Assistant/AssistantContainer';


function App() {
  const [authData,setAuthData] = useState<AuthData>();
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
          <AssistantContainer />
        </>}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
