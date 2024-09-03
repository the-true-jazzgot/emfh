import { EMCategory, Task } from "../types";
import { Button } from "./ui_elements/Button";
import { assistant } from "../services/assistant.service";

export interface ControlsProperties {
    q1: Task[],
    q2: Task[],
    q3: Task[],
    q4: Task[]
}

export function Controls(props: ControlsProperties) {
    function isDisabled():boolean {
        if(props.q1.length < 4 && props.q2.length < 1 && props.q3.length < 1 && props.q4.length < 1) return true;
        return false;
    };

    function evaluateMatrix():void {
        const quadrantsToAssist: EMCategory[] = [];
        if(props.q1.length > 3) 
            quadrantsToAssist.push("q1");
        assistant.setTasksQuadrants(quadrantsToAssist);
    };

    return (
        <footer className="col-span-5 row-span-1">
            <Button text="Apply" fn={evaluateMatrix} disabled={isDisabled()} />
        </footer>
    );
}