export class StringUtil {
    static replaceAll(str,from, to, ignoreCase?) {
      if (!RegExp.prototype.isPrototypeOf(from)) {
        return str.replace(new RegExp(from, (ignoreCase ? 'gi' : 'g')), to);
      } else {
        return str.replace(from, to);
      }
    }

}
