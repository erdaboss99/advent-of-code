export const day03 = (input: string) => {
	const matcher1 = /mul\((\d{1,3}),(\d{1,3})\)/g;

	const partOne = [...input.matchAll(matcher1)].reduce(
		(acc, curr) => acc + parseInt(curr[1], 10) * parseInt(curr[2], 10),
		0,
	);

	const matcher2 = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

	const handlers = {
		mul: (match: RegExpMatchArray, enabled: boolean, sumOfMultiplications: number) => {
			if (match[1] && match[2] && enabled) {
				return sumOfMultiplications + parseInt(match[1], 10) * parseInt(match[2], 10);
			}
			return sumOfMultiplications;
		},
		do: () => true,
		dont: () => false,
	};

	const partTwo = [...input.matchAll(matcher2)].reduce(
		({ sumOfMultiplications, enabled }, curr) => {
			const fullMatch = curr[0];
			if (fullMatch.startsWith('mul')) {
				sumOfMultiplications = handlers.mul(curr, enabled, sumOfMultiplications);
			} else if (fullMatch === 'do()') {
				enabled = handlers.do();
			} else if (fullMatch === "don't()") {
				enabled = handlers.dont();
			}
			return { sumOfMultiplications, enabled };
		},
		{ sumOfMultiplications: 0, enabled: true },
	).sumOfMultiplications;

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
