export const day08 = (input: string) => {
	const matrix = input
		.trim()
		.split('\n')
		.map((row) => row.split(''));

	const isValidAntinode = (x: number, y: number, matrix: string[][]): boolean =>
		x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length;

	const getAntinodes = (matrix: string[][]): Set<string> => {
		const antinodes = new Set<string>();

		matrix.forEach((row, j) =>
			row.forEach((cell, i) => {
				if (cell === '.') return;

				matrix.forEach((otherRow, l) =>
					otherRow.forEach((otherCell, k) => {
						if (cell === otherCell && (k !== i || l !== j)) {
							const dx = k - i;
							const dy = l - j;

							[
								[i - dx, j - dy],
								[k + dx, l + dy],
							]
								.filter(([x, y]) => isValidAntinode(x, y, matrix))
								.forEach((antinode) => antinodes.add(JSON.stringify(antinode)));
						}
					}),
				);
			}),
		);

		return antinodes;
	};

	const getAntinodesUpdated = (matrix: string[][]): Set<string> => {
		const antinodes = new Set<string>();

		matrix.forEach((row, j) =>
			row.forEach((cell, i) => {
				if (cell === '.') return;

				matrix.forEach((otherRow, l) =>
					otherRow.forEach((otherCell, k) => {
						if (cell === otherCell && (k !== i || l !== j)) {
							antinodes.add(JSON.stringify([k, l]));

							const dx = k - i;
							const dy = l - j;
							let lineIdx = 1;

							while (true) {
								const possibleAntinodes = [
									[i - lineIdx * dx, j - lineIdx * dy],
									[k + lineIdx * dx, l + lineIdx * dy],
								];

								const validAntinodes = possibleAntinodes.filter(([x, y]) =>
									isValidAntinode(x, y, matrix),
								);

								if (validAntinodes.length === 0) break;

								validAntinodes.forEach((antinode) => antinodes.add(JSON.stringify(antinode)));
								lineIdx++;
							}
						}
					}),
				);
			}),
		);

		return antinodes;
	};

	const partOne = getAntinodes(matrix).size;
	console.log('Part one: ', partOne);

	const partTwo = getAntinodesUpdated(matrix).size;
	console.log('Part two: ', partTwo);
};
