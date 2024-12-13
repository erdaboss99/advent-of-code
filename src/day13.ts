type System = {
	a: number;
	b: number;
	c: number;
	d: number;
	x: number;
	y: number;
};

type MatcherKey = 'buttonA' | 'buttonB' | 'prize';

export const day13 = (input: string) => {
	const matchers: Record<MatcherKey, RegExp> = {
		buttonA: /Button A: X\+(\d+), Y\+(\d+)/,
		buttonB: /Button B: X\+(\d+), Y\+(\d+)/,
		prize: /Prize: X=(\d+), Y=(\d+)/,
	} as const;

	const match = (matcherKey: MatcherKey, str: string) => matchers[matcherKey].exec(str)?.slice(1).map(Number) || [];

	const systems = input
		.split('\n')
		.filter(Boolean)
		.reduce<System[]>((acc, _, idx, arr) => {
			if (idx % 3 === 0) {
				const [buttonA, buttonB, prize] = arr.slice(idx, idx + 3);
				const [a, b, c, d, x, y] = [
					...match('buttonA', buttonA),
					...match('buttonB', buttonB),
					...match('prize', prize),
				];
				acc.push({ a, b, c, d, x, y });
			}
			return acc;
		}, []);

	const solveSystem = (sys: System): { x: number; y: number } | null => {
		const determinant = sys.a * sys.d - sys.b * sys.c;
		if (!determinant) return null;

		const x = (sys.x * sys.d - sys.y * sys.c) / determinant;
		const y = (sys.a * sys.y - sys.b * sys.x) / determinant;

		return [x, y].every(Number.isInteger) ? { x, y } : null;
	};

	const calculatePart = (systems: System[], transformationFn: (sys: System) => System): number => {
		return systems.map(transformationFn).reduce((acc, curr) => {
			const solution = solveSystem(curr);
			return solution ? acc + 3 * solution.x + solution.y : acc;
		}, 0);
	};

	const partOne = calculatePart(systems, (sys) => sys);
	const partTwo = calculatePart(systems, (sys) => ({
		...sys,
		x: sys.x + 10_000_000_000_000,
		y: sys.y + 10_000_000_000_000,
	}));

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
