import * as fs from 'fs';

import {
	day01,
	day02,
	day03,
	day04,
} from './src';

require('dotenv').config();

const dayArg = process.argv[2];

if (!dayArg) {
	console.error('Please provide a day argument');
	process.exit(1);
}

const paddedDayArg = dayArg.padStart(2, '0');

const getInput = async () => {
	if (fs.existsSync(`./inputs/day-${paddedDayArg}.txt`))
		return fs.readFileSync(`./inputs/day-${paddedDayArg}.txt`, 'utf8');

	const input = await fetch(`https://adventofcode.com/2024/day/${dayArg}/input`, {
		method: 'GET',
		headers: {
			Cookie: `session=${process.env.SESSION_TOKEN}`,
		},
	});
	const body = await input.text();
	fs.writeFileSync(`./inputs/day-${paddedDayArg}.txt`, body);

	return body;
};

const input = await getInput();
const dayFunctions: Record<string, (input: string) => void> = {
	'01': day01,
	'02': day02,
	'03': day03,
	'04': day04,
};

const dayFunction = dayFunctions[paddedDayArg];
if (dayFunction) {
	dayFunction(input);
} else {
	console.log('Day not implemented yet');
}
