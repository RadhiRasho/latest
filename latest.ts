#!/usr/bin/env node

import { latest } from ".";

const packages = process?.argv.slice(2);

const versions = new Map<string, string>();
let code = 0;

for (const pkg of packages) {
	const { value, error } = await latest(pkg);

	versions.set(pkg, value);

	if (error) {
		code++;
	}
}

process.on("exit", async () => {
	for (const pkg of packages) {
		console.log("%s: %s", pkg, versions.get(pkg));
	}
	process.exit(code);
});