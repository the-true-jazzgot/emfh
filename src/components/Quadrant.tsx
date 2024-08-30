import { EMCategory } from "../types";

export function Quadrant({quadrant}:{quadrant: EMCategory}) {
  return (
    <section className={"jst-" + quadrant + " col-span-2 row-span-5"}>

    </section>
  );
}