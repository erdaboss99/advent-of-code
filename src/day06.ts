export const day06 = (input: string) => {
	const findGuardPosition = (matrix: string[][]): number[] => {
		const guardRow = matrix.findIndex((row) => row.includes('^'));
		const guardCol = matrix[guardRow].indexOf('^');
		return [guardRow, guardCol];
	};

	const simulateMovement = (matrix: string[][], start: number[], directions: number[][]): Set<string> => {
		let dirIdx = 0;
		let pos = [...start];
		const visited = new Set([JSON.stringify(pos)]);

		const isOutOfBounds = ([row, col]: number[]): boolean =>
			row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length;

		while (true) {
			const [row, col] = pos;
			const [dirRow, dirCol] = directions[dirIdx];
			const nextPos: number[] = [row + dirRow, col + dirCol];

			if (isOutOfBounds(nextPos)) break;

			if (matrix[nextPos[0]][nextPos[1]] === '#') {
				dirIdx = (dirIdx + 1) % directions.length;
				continue;
			}

			pos = nextPos;
			visited.add(JSON.stringify(pos));
		}

		return visited;
	};

	const countObstructions = (matrix: string[][], directions: number[][]): number => {
		const guardPosition = findGuardPosition(matrix);
		let obstructionCount = 0;

		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				if (!['#', '^'].includes(matrix[i][j])) {
					let dirIdx = 0;
					let pos = [...guardPosition];
					const visited = new Set([JSON.stringify([...pos, ...directions[dirIdx]])]);
					const modifiedMatrix = matrix.map((row) => [...row]);
					modifiedMatrix[i][j] = '#';

					while (true) {
						const [row, col] = pos;
						const [dirRow, dirCol] = directions[dirIdx];
						const nextPos = [row + dirRow, col + dirCol];

						if (
							nextPos[0] < 0 ||
							nextPos[0] >= modifiedMatrix.length ||
							nextPos[1] < 0 ||
							nextPos[1] >= modifiedMatrix[0].length
						)
							break;

						if (modifiedMatrix[nextPos[0]][nextPos[1]] === '#') {
							dirIdx = (dirIdx + 1) % directions.length;
							continue;
						}

						pos = nextPos;

						if (visited.has(JSON.stringify([...pos, ...directions[dirIdx]]))) {
							obstructionCount += 1;
							break;
						}

						visited.add(JSON.stringify([...pos, ...directions[dirIdx]]));
					}
				}
			}
		}

		return obstructionCount;
	};

	const matrix = input
		.trim()
		.split('\n')
		.map((row) => row.split(''));

	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];

	const visited = simulateMovement(matrix, findGuardPosition(matrix), directions);
	const partOne = visited.size;
	const partTwo = countObstructions(matrix, directions);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
