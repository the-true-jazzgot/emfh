import { DragEndEvent } from "@dnd-kit/core";
import { EMCategory } from "../../lib/types";
import { moveTask, TasksListAction } from "@/lib/subjects";

export const addTaskToComponent = (e: DragEndEvent) => {
  const taskId: string = e.active.id.toString();
  const task: HTMLElement | null = document.getElementById(taskId);

  if(e.over?.id && !!task) {
    const currCategory:EMCategory = task.dataset.category as EMCategory || "uncategorized";
    const newCategory: EMCategory = e.over?.id as EMCategory;

    if(currCategory !== newCategory) {
      const move: TasksListAction = { taskId: taskId, action: "move", moveTo: newCategory };
    
      moveTask.dispatch(move);
    }
  }
}
