export const day01 = (input: string) => {
	const lines = input
		.trim()
		.split('\n')
		.map((line) => line.trim().split(/\s+/).map(Number));

	const [leftNums, rightNums] = [lines.map((line) => line[0]).sort(), lines.map((line) => line[1]).sort()];

	const partOne = leftNums.reduce((acc, curr, idx) => acc + Math.abs(curr - rightNums[idx]), 0);

	const partTwo = leftNums.reduce((acc, curr) => acc + curr * rightNums.filter((x) => x === curr).length, 0);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
