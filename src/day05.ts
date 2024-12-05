export const day05 = (input: string) => {
	const isUpdateCorrect = (rules: number[][], update: number[]): boolean => {
		return !rules.some(([a, b]) => {
			const idxA = update.indexOf(a);
			const idxB = update.indexOf(b);
			return idxA > -1 && idxB > -1 && idxA > idxB;
		});
	};

	const updateOrder = (rules: number[][], update: number[]): number[] => {
		while (!isUpdateCorrect(rules, update)) {
			rules.forEach(([a, b]) => {
				const indexA = update.indexOf(a);
				const indexB = update.indexOf(b);
				if (indexA > -1 && indexB > -1 && indexA > indexB) {
					[update[indexA], update[indexB]] = [update[indexB], update[indexA]];
				}
			});
		}
		return update;
	};

	const getMiddleValue = (update: number[]): number => update[Math.floor(update.length / 2)];

	const [rules, updates] = input
		.split('\n\n')
		.map((section, i) => section.split('\n').map((line) => line.trim().split(['|', ','][i]).map(Number)));

	const partOne = updates.reduce((acc, curr) => acc + (isUpdateCorrect(rules, curr) ? getMiddleValue(curr) : 0), 0);

	const partTwo = updates.reduce(
		(acc, curr) => acc + (isUpdateCorrect(rules, curr) ? 0 : getMiddleValue(updateOrder(rules, curr))),
		0,
	);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
