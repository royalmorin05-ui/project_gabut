export class System {
    constructor() {
        this.enabled = true;
        this.priority = 0;
    }

    onAttach(_scene) {}
    onDetach() {}
    update(_deltaTime, _scene) {}
}