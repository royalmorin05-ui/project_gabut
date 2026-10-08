export class IdGenerator {
    static #counter = 0;

    static next(prefix = 'id') {
        IdGenerator.#counter += 1;
        return `${prefix}_${IdGenerator.#counter}`;
    }

    static reset() {
        IdGenerator.#counter = 0;
    }
}