type Position = { x: number; y: number };

export const day15 = (input: string) => {
	const [rawMap, rawInstructions] = input.trim().split('\n\n');

	const map = rawMap.split('\n').map((row) => row.split(''));
	const moves = rawInstructions
		.split('\n')
		.map((row) => row.split(''))
		.flat();

	const directions: Record<string, Position> = {
		'<': { x: -1, y: 0 },
		v: { x: 0, y: 1 },
		'>': { x: 1, y: 0 },
		'^': { x: 0, y: -1 },
	};

	const findRobot = (map: string[][]): Position => {
		for (let j = 0; j < map.length; j++) {
			for (let i = 0; i < map[0].length; i++) {
				if (map[j][i] === '@') {
					return { x: i, y: j };
				}
			}
		}
		return { x: 0, y: 0 };
	};

	const getNextBoxes = (
		map: string[][],
		pos: Position,
		direction: Position,
		acc: Position[][],
	): Position[][] | null => {
		const boxPos: Position[] =
			map[pos.y][pos.x] === '['
				? [
						{ x: pos.x, y: pos.y },
						{ x: pos.x + 1, y: pos.y },
					]
				: [
						{ x: pos.x - 1, y: pos.y },
						{ x: pos.x, y: pos.y },
					];

		const [y, x1] = [boxPos[0].y + direction.y, boxPos[0].x];
		const x2 = x1 + 1;
		const cell1 = map[y][x1];
		const cell2 = map[y][x2];
		if (cell1 === '#' || cell2 === '#') return null;
		if (cell1 === '.' && cell2 === '.') {
			return [boxPos, ...acc];
		}
		const traverse = (nextI: number): Position[][] | null => getNextBoxes(map, { x: nextI, y }, direction, []);
		if (cell1 === '[' && cell2 === ']') {
			return traverse(pos.x) ? [...traverse(pos.x)!, boxPos] : null;
		}
		if (cell1 === ']' && cell2 === '.') {
			return traverse(pos.x - 1) ? [...traverse(pos.x - 1)!, boxPos] : null;
		}
		if (cell1 === '.' && cell2 === '[') {
			return traverse(pos.x + 1) ? [...traverse(pos.x + 1)!, boxPos] : null;
		}
		const nextBox1 = traverse(pos.x - 1);
		const nextBox2 = traverse(pos.x + 1);
		return nextBox1 && nextBox2 ? [...nextBox1, ...nextBox2, boxPos] : null;
	};

	const executeMoves = (map: string[][], moves: string[], elementsWidth: number = 1): string[][] => {
		let pos: Position = findRobot(map);
		map[pos.y][pos.x] = '.';
		moves.forEach((move) => {
			const { x: di, y: dj } = directions[move];
			const { x: i, y: j } = pos;
			const { x: newI, y: newJ } = { x: i + di, y: j + dj };
			if (elementsWidth === 1) {
				if (map[newJ][newI] === '.') {
					pos = { x: newI, y: newJ };
				} else if (map[newJ][newI] === 'O') {
					let { x: nextI, y: nextJ } = { x: newI + di, y: newJ + dj };
					while (map[nextJ][nextI] === 'O') {
						nextI += di;
						nextJ += dj;
					}
					if (map[nextJ][nextI] === '.') {
						map[nextJ][nextI] = 'O';
						map[newJ][newI] = '.';
						pos = { x: newI, y: newJ };
					}
				}
			} else {
				if (map[newJ][newI] === '.') {
					pos = { x: newI, y: newJ };
				} else if (['[', ']'].includes(map[newJ][newI])) {
					if (dj === 0) {
						let nextI = newI + di;
						while (['[', ']'].includes(map[j][nextI])) nextI += di;
						if (map[j][nextI] === '.') {
							while (nextI !== newI) {
								[map[j][nextI], map[j][nextI - di]] = [map[j][nextI - di], map[j][nextI]];
								nextI -= di;
							}
							pos = { x: newI, y: newJ };
						}
					} else {
						let boxes = getNextBoxes(map, { x: newI, y: newJ }, { x: di, y: dj }, []);
						if (boxes) {
							const uniqueBoxes = new Set<string>();
							boxes = boxes.filter(
								(box) => !uniqueBoxes.has(JSON.stringify(box)) && uniqueBoxes.add(JSON.stringify(box)),
							);
							for (const box of boxes) {
								map[box[0].y + dj][box[0].x + di] = '[';
								map[box[1].y + dj][box[1].x + di] = ']';
								map[box[0].y][box[0].x] = '.';
								map[box[1].y][box[1].x] = '.';
							}
							pos = { x: newI, y: newJ };
						}
					}
				}
			}
		});
		return map;
	};

	const calculateCoordinatesSum = (map: string[][], elementsWidth: number = 1): number => {
		return elementsWidth === 1
			? map.reduce(
					(colsAcc, currCol, colInd) =>
						colsAcc +
						currCol.reduce(
							(rowsAcc, currRow, rowInd) =>
								currRow === 'O' ? (rowsAcc += 100 * colInd + rowInd) : rowsAcc,
							0,
						),
					0,
				)
			: map.reduce(
					(colsAcc, currCol, colInd) =>
						colsAcc +
						currCol.reduce(
							(rowsAcc, currRow, rowInd) =>
								currRow === '[' ? (rowsAcc += 100 * colInd + rowInd) : rowsAcc,
							0,
						),
					0,
				);
	};
	const partOneMap = [...map.map((e) => [...e])];
	const partOne = calculateCoordinatesSum(executeMoves(partOneMap, moves));
	console.log('Part one: ', partOne);

	const partTwoMap = map.map((col) =>
		col.flatMap((row) => {
			switch (row) {
				case '#':
				case '.':
					return [row, row];
				case 'O':
					return ['[', ']'];
				default:
					return ['@', '.'];
			}
		}),
	);
	const partTwo = calculateCoordinatesSum(executeMoves(partTwoMap, moves, 2), 2);
	console.log('Part two: ', partTwo);
};
