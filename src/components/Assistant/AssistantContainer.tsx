import { assistant } from "../../services/assistant.service";
import { EMCategory, Task } from "../../types";

export function AssistantContainer() {
  assistant.getTasksQuadrants().subscribe(
    (quadrants:EMCategory[]) => console.log(quadrants)
  );

  return (
    <div className="fixed_center bg-white">
    </div>
  )
}
