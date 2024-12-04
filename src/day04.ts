export const day04 = (input: string) => {
	const searchWord = (matrix: string[][], row: number, col: number, word: string): number => {
		const directions = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];

		const m = matrix.length;
		const n = matrix[0].length;

		if (matrix[row][col] !== word[0]) return 0;

		return directions.reduce((count, [dx, dy]) => {
			let x = row + dx,
				y = col + dy,
				k = 1;

			while (k < word.length && x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] === word[k]) {
				x += dx;
				y += dy;
				k++;
			}

			return count + (k === word.length ? 1 : 0);
		}, 0);
	};

	const searchXShapes = (matrix: string[][], row: number, col: number): boolean => {
		if (row < 1 || row >= matrix[0].length - 1 || col < 1 || col >= matrix.length - 1 || matrix[row][col] !== 'A')
			return false;

		const diagonals = [
			matrix[row - 1][col - 1],
			matrix[row - 1][col + 1],
			matrix[row + 1][col - 1],
			matrix[row + 1][col + 1],
		].join('');

		const variants = ['MSMS', 'MMSS', 'SSMM', 'SMSM'];

		return variants.includes(diagonals);
	};

	const matrix = input
		.trim()
		.split('\n')
		.map((line) => line.split(''));

	const partOne = matrix.reduce(
		(acc, curr, idx, arr) =>
			acc + curr.reduce((rowAcc, _, rowIdx) => rowAcc + searchWord(arr, idx, rowIdx, 'XMAS'), 0),
		0,
	);

	const partTwo = matrix.reduce(
		(acc, curr, idx, arr) => acc + curr.reduce((rowAcc, _, rowIdx) => rowAcc + +searchXShapes(arr, idx, rowIdx), 0),
		0,
	);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
