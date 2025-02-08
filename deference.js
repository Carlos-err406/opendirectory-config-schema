#!/usr/bin/env node
//@ts-nocheck
import { $RefParser } from '@apidevtools/json-schema-ref-parser';
import fs from 'fs';
import path from 'path';

async function dereference(inputPath, outputPath) {
	try {
		const inputFile = path.resolve(inputPath);
		const outputFile = path.resolve(outputPath);

		const parser = new $RefParser();
		const schema = await parser.dereference(inputFile);
		const data = JSON.stringify(schema, null, 2);
		if (outputPath) fs.writeFileSync(outputFile, data);
		else console.log(data);
		console.log(`Dereferenced ${inputPath} and wrote to ${outputPath}`);
	} catch (err) {
		console.error(err);
	}
}

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath) {
	console.error('Usage: node deference.js <inputPath> [<outputPath>]');
	process.exit(1);
}

dereference(inputPath, outputPath);
