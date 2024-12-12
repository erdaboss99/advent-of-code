export const day12 = (input: string) => {
	const matrix = input.split('\n').map((row) => row.split(''));

	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];
	const getArea = (matrix: string[][], i: number, j: number, char: string): Set<string> => {
		const stack: [number, number][] = [[i, j]];
		const area = new Set<string>();
		area.add(JSON.stringify([i, j]));

		while (stack.length) {
			const [x, y] = stack.pop()!;
			directions.forEach(([dx, dy]) => {
				const [newX, newY] = [x + dx, y + dy];
				if (newX >= 0 && newY >= 0 && newX < matrix[0].length && newY < matrix.length) {
					const pos = JSON.stringify([newX, newY]);
					if (matrix[newY][newX] === char && !area.has(pos)) {
						area.add(pos);
						stack.push([newX, newY]);
					}
				}
			});
		}
		return area;
	};

	const getAreas = (matrix: string[][]): Map<string, number[][][]> => {
		const visited = new Set<string>();
		const areas = new Map<string, number[][][]>();

		matrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				const pos = JSON.stringify([i, j]);
				if (!visited.has(pos)) {
					visited.add(pos);
					const area = getArea(matrix, j, i, cell);
					areas.set(cell, [...(areas.get(cell) || []), Array.from(area).map((a) => JSON.parse(a))]);
					area.forEach((pos) => visited.add(pos));
				}
			});
		});

		return areas;
	};

	const getBorders = (matrix: string[][], area: number[][], char: string): Map<string, string[]> => {
		return area.reduce((acc, [x, y]) => {
			directions.forEach(([dx, dy]) => {
				const [newX, newY] = [x + dx, y + dy];
				if (
					newX < 0 ||
					newY < 0 ||
					newX >= matrix[0].length ||
					newY >= matrix.length ||
					matrix[newY][newX] !== char
				) {
					const key = `${x},${y}`;
					acc.set(key, [...(acc.get(key) || []), `${dx},${dy}`]);
				}
			});
			return acc;
		}, new Map<string, string[]>());
	};

	const calculatePerimeter = (matrix: string[][], area: number[][], char: string): number => {
		return Array.from(getBorders(matrix, area, char).values()).reduce((acc, curr) => acc + curr.length, 0);
	};

	const calculatePerimeterWithDiscount = (matrix: string[][], area: number[][], char: string): number => {
		const borders = getBorders(matrix, area, char);
		const similarities: string[] = [];

		borders.forEach((value, key) => {
			const [x, y] = key.split(',').map(Number);
			borders.forEach((value2, key2) => {
				const [x2, y2] = key2.split(',').map(Number);
				if (key2 !== key && Math.abs(x2 - x) + Math.abs(y2 - y) === 1) {
					similarities.push(...value.filter((key) => value2.includes(key)));
				}
			});
		});

		return Array.from(borders.values()).reduce((acc, curr) => acc + curr.length, 0) - similarities.length / 2;
	};

	const areas = getAreas(matrix);

	const partOne = Array.from(areas.entries())
		.flatMap(([char, charAreas]) => charAreas.map((area) => area.length * calculatePerimeter(matrix, area, char)))
		.reduce((acc, curr) => acc + curr, 0);

	const partTwo = Array.from(areas.entries())
		.flatMap(([char, charAreas]) =>
			charAreas.map((area) => area.length * calculatePerimeterWithDiscount(matrix, area, char)),
		)
		.reduce((acc, curr) => acc + curr, 0);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
