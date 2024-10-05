import { useEffect, useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AuthData } from './types';
import { AuthContext, getSessionAuthData } from './lib/authentification';
import { addTaskToComponent } from './components/containers/dnd.lib';
import { LoginForm } from './components/login/LoginForm';
import { SidebarTasksList } from './components/containers/SidebarTasksList';
import { Quadrant } from '@/components/containers/Quadrant'
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

  useEffect(() => {
    const sessionAuthData = getSessionAuthData();
    if(!!sessionAuthData) setAuthData(sessionAuthData);
  }, []);

  useEffect(() => {
    if(!!authData)
      window.sessionStorage.setItem("emfh", JSON.stringify(authData));
  }, [authData]);

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
