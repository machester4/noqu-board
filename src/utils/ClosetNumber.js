export function ClosetNumber(numbers, goal) {
  return numbers.reduce(function(prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
}
export function ClosetNumberIndex(numbers, goal) {
  const closet = ClosetNumber(numbers, goal);
  const index = numbers.findIndex(g => g === closet);
  return index;
}
