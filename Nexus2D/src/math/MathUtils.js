export const MathUtils = Object.freeze({
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    },

    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },

    randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
});