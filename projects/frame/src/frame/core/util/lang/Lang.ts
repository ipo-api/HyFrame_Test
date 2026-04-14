export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isString(obj: any): obj is String {
  return typeof obj === 'string';
}

export function mixin(dest, src): void {
  for (let key in src) {
    dest[key] = src[key];
  }
}

