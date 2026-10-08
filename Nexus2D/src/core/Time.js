export class Time {
    constructor() {
        this.deltaTime = 0;
        this.elapsedTime = 0;
        this.frameCount = 0;
    }

    tick(deltaTime) {
        this.deltaTime = deltaTime;
        this.elapsedTime += deltaTime;
        this.frameCount += 1;
    }

    reset() {
        this.deltaTime = 0;
        this.elapsedTime = 0;
        this.frameCount = 0;
    }
}