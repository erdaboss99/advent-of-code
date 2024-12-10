export const day10 = (input: string) => {
	const matrix = input
		.trim()
		.split('\n')
		.map((row) => row.split('').map(Number));

	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

	const unrollTrail = (matrix: number[][], x: number, y: number, num: number, localCount: Set<string>) => {
		return directions.reduce((count, [dx, dy]) => {
			const newX = x + dx,
				newY = y + dy;

			if (
				newY >= 0 &&
				newY < matrix.length &&
				newX >= 0 &&
				newX < matrix[newY].length &&
				matrix[newY][newX] === num + 1
			) {
				if (matrix[newY][newX] === 9) {
					count.add(`${newY},${newX}`);
				} else {
					count = unrollTrail(matrix, newX, newY, num + 1, count);
				}
			}
			return count;
		}, localCount);
	};

	const unrollTrailRating = (matrix: number[][], x: number, y: number, num: number, trailheadsCount: number) => {
		return directions.reduce((count, [dx, dy]) => {
			const newX = x + dx,
				newY = y + dy;

			if (
				newY >= 0 &&
				newY < matrix.length &&
				newX >= 0 &&
				newX < matrix[newY].length &&
				matrix[newY][newX] === num + 1
			) {
				if (matrix[newY][newX] === 9) {
					count += 1;
				} else {
					count = unrollTrailRating(matrix, newX, newY, num + 1, count);
				}
			}
			return count;
		}, trailheadsCount);
	};

	const partOne = matrix
		.flatMap((row, y) => row.map((cell, x) => (!cell ? unrollTrail(matrix, x, y, 0, new Set<string>()).size : 0)))
		.reduce((acc, curr) => acc + curr, 0);

	const partTwo = matrix
		.flatMap((row, y) => row.map((cell, x) => (!cell ? unrollTrailRating(matrix, x, y, 0, 0) : 0)))
		.reduce((acc, curr) => acc + curr, 0);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
