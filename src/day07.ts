export const day07 = (input: string) => {
	const executeOperation = (a: number, b: number, symbol: string): number => {
		switch (symbol) {
			case '*':
				return a * b;
			case '+':
				return a + b;
			case '||':
				return Number(String(a) + String(b));
			default:
				throw new Error(`unsupported operation: ${symbol}`);
		}
	};

	const generateSolutions = (input: number[], symbols: string[]): number[] => {
		let solutions: number[] = [];

		for (let i = 0; i < input.length - 1; i++) {
			if (solutions.length === 0) {
				solutions = symbols.map((symbol) => executeOperation(input[i], input[i + 1], symbol));
			} else {
				const newSolutions: number[] = [];
				symbols.forEach((symbol) => {
					solutions.forEach((prevSolution) => {
						newSolutions.push(executeOperation(prevSolution, input[i + 1], symbol));
					});
				});
				solutions = newSolutions;
			}
		}

		return solutions;
	};

	const calculateSum = (rows: string[], symbols: string[]): number => {
		return rows.reduce((acc, curr) => {
			const [targetString, inputString] = curr.split(': ');

			const target = Number(targetString);
			const input = inputString.split(' ').map((x) => Number(x));

			const solutions = generateSolutions(input, symbols);

			if (solutions.includes(target)) {
				return acc + target;
			}

			return acc;
		}, 0);
	};

	const rows = input.trim().split('\n');

	const partOne = calculateSum(rows, ['*', '+']);
	const partTwo = calculateSum(rows, ['*', '+', '||']);

	console.log('Part one: ', partOne);
	console.log('Part two: ', partTwo);
};
