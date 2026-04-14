
export class Util {
    static isObject(value): boolean {
        if (Array.isArray(value)) {
            return false;
        } else {
            return value !== null && typeof value === 'object';
        }
    }

    static isArray(value): boolean {
        return Array.isArray(value);
    }

    static isString(value): boolean {
        return typeof value === 'string' && value.length > 0;
    }

    static isBoolean(value): boolean {
        return value instanceof Boolean;
    }

    static isNullOrUndefinedOrEmpty(value) {
        return value === undefined || value === null || value === '';
    }
}
