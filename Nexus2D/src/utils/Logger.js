export const LogLevel = Object.freeze({
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4
});

export class Logger {
    static #level = LogLevel.INFO;
    static #prefix = '[Nexus2D]';

    static setLevel(level) {
        Logger.#level = level;
    }

    static debug(...args) {
        if (Logger.#level <= LogLevel.DEBUG) console.debug(Logger.#prefix, ...args);
    }

    static info(...args) {
        if (Logger.#level <= LogLevel.INFO) console.info(Logger.#prefix, ...args);
    }

    static warn(...args) {
        if (Logger.#level <= LogLevel.WARN) console.warn(Logger.#prefix, ...args);
    }

    static error(...args) {
        if (Logger.#level <= LogLevel.ERROR) console.error(Logger.#prefix, ...args);
    }
}