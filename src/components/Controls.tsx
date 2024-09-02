import { Task } from "../types";
import { Button } from "./ui_elements/Button";

export interface ControlsProperties {
    q1: Task[],
    q2: Task[],
    q3: Task[],
    q4: Task[]
}

export function Controls(props: ControlsProperties) {
    function tmpLogTasks() {
        console.log(props.q1);
        console.log(props.q2);
        console.log(props.q3);
        console.log(props.q4);
    }

    function isDisabled() {
        if(props.q1.length < 1 && props.q2.length < 1 && props.q3.length < 1 && props.q4.length < 1) return true;
    }

    return (
        <footer className="col-span-5 row-span-1">
            <Button text="Apply" fn={tmpLogTasks} disabled={isDisabled()} />
        </footer>
    );
}