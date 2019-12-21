export function mathSum(endNumber, iterator) {
  let sum = 0;
  for (let i = 1; i <= endNumber; i++) {
    sum += i * iterator;
  }
  return sum;
}
