import { IdGenerator } from '../utils/IdGenerator.js';

export class Component {
    constructor() {
        this.id = IdGenerator.next('comp');
        this.type = this.constructor.name;
        this.entityId = null;
    }

    onAttach(_entity) {}
    onDetach() {}
}