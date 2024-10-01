export function semverParser(version: string) {
	const versions = version.split(".");
	const semverCompliant = versions.length < 4;

	const [major, minor, patch, ...rest] = versions;

	if (semverCompliant) {
		return [major, minor, patch];
	}

	return [major, minor, patch, rest.join(".")];
}
