export const day11 = (input: string) => {
	const stones: number[] = input.trim().split(' ').map(Number);

	const engrave = (stone: number): number[] => {
		if (stone === 0) return [1];

		if (stone.toString().length % 2 === 0) {
			return [
				Number(stone.toString().slice(0, stone.toString().length / 2)),
				Number(stone.toString().slice(stone.toString().length / 2)),
			];
		} else return [stone * 2024];
	};

	const blink = (stones: number[], iterations: number): number => {
		let currentMap = new Map(stones.map((stone) => [stone, 1]));

		for (let _ = 0; _ < iterations; _++) {
			const nextMap = new Map<number, number>();

			for (const [stone, count] of currentMap) {
				for (const engraved of engrave(stone)) {
					nextMap.set(engraved, (nextMap.get(engraved) ?? 0) + count);
				}
			}

			currentMap = nextMap;
		}

		return Array.from(currentMap.values()).reduce((acc, curr) => acc + curr, 0);
	};

	const partOne = blink(stones, 25);
	const partTwo = blink(stones, 75);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
