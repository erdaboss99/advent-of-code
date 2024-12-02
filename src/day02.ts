export const day02 = (input: string) => {
	const reports = input
		.trim()
		.split('\n')
		.map((line) => line.trim().split(/\s+/).map(Number));

	const isSafeReport = (levels: number[]): boolean => {
		if (levels.length < 2) return true;

		const isValidDiff = (diff: number): boolean => Math.abs(diff) >= 1 && Math.abs(diff) <= 3;

		return levels.slice(1).reduce(
			({ isSafe, prevDiff }, curr, idx) => {
				if (!isSafe) return { isSafe, prevDiff };

				const diff = curr - levels[idx];
				if (!isValidDiff(diff) || (idx > 0 && diff * prevDiff < 0)) {
					return { isSafe: false, prevDiff };
				}

				return { isSafe: true, prevDiff: diff };
			},
			{ isSafe: true, prevDiff: 0 },
		).isSafe;
	};

	const partOne = reports.reduce((acc, curr) => acc + Number(isSafeReport(curr)), 0);

	const partTwo = reports.reduce(
		(acc, curr) =>
			acc +
			(curr.some((_, i) => {
				const modifiedReport = [...curr.slice(0, i), ...curr.slice(i + 1)];
				return isSafeReport(modifiedReport);
			})
				? 1
				: 0),
		0,
	);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
