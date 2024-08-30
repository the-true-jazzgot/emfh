import { useDroppable } from "@dnd-kit/core";
import { EMCategory } from "../types";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  const {setNodeRef} = useDroppable({
    id: quadrant+"droppable"
  });

  return (
    <section ref={setNodeRef} className={"jst-" + quadrant + " col-span-2 row-span-5"} >

    </section>
  );
}