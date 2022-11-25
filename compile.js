import { resolve } from 'path';
import { readFileSync } from 'fs';
import solc from 'solc';

const { compile } = solc;

const inboxPath = resolve('contracts', 'Inbox.sol');
const source = readFileSync(inboxPath, 'utf8');

const input = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

export const { abi, evm } = JSON.parse(compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
