export function isDifferent<T>(obj1: T, obj2: T) {
  const newString = JSON.stringify(obj1);
  const oldString = JSON.stringify(obj2);
  return newString !== oldString;
}

export function isEqual<T>(obj1: T, obj2: T) {
  const newString = JSON.stringify(obj1);
  const oldString = JSON.stringify(obj2);
  return newString === oldString;
}
