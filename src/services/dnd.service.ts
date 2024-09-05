import { DragEndEvent } from "@dnd-kit/core";
import { EMCategory } from "../types";

  export const addTaskToComponent = (e: DragEndEvent) => {
    const taskId: string = e.active.id.toString();
    const task: HTMLElement | null = document.getElementById(taskId);

    if(e.over?.id && !!task) {
      const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
      const newCategory: EMCategory = e.over?.id as EMCategory;

      console.log(currCategory, newCategory);
    //   const currCatState = categoryStates[currCategory];
    //   const newCatState = categoryStates[newCategory];

    //   const taskToMove: Task | undefined = currCatState.readState.find((item: { id: string; }) => item.id === taskId);
    //   if(!!taskToMove) {
    //     currCatState.setState(currCatState.readState.filter((item: Task) => item !== taskToMove));
    //     console.log(newCatState.id);
    //     taskToMove.category = newCatState.id;
    //     newCatState.setState([...newCatState.readState,taskToMove]);
    //   }
    }
  };