function semverParser(version: string) {
	const versions = version.split(".");
	const semverCompliant = versions.length < 4;

	const [major, minor, patch, ...rest] = versions;

	if (semverCompliant) {
		return [major, minor, patch];
	}

	return [major, minor, patch, rest.join(".")];
}

enum Registries {
	npm = "https://registry.npmjs.org",
	yarn = "https://registry.yarnpkg.com",
}

type LatestOptions = {
	all?: boolean;
	registry?: keyof typeof Registries;
};

export async function latest(name: string | unknown, options?: LatestOptions) {
	const registry = Registries[options?.registry ?? "npm"];

	const res = await fetch(`${registry}/${name}`);
	const data = await res.json();

	if (data.error) {
		return { error: data.error };
	}

	if (options?.all) {
		return { name, value: data["dist-tags"] };
	}

	return { name, value: data["dist-tags"].latest };
}

type PackageJsonSchema = {
	name: string;
	/** @example "1.1.1" | "1.2.12-abc" */
	version: `${string}.${string}.${string}`;
	[key: string]: string | Map<string, string>[] | unknown[] | unknown;
};

type CheckUpdateOptions = {
	latest?: LatestOptions;
};

export async function checkUpdate(
	pkg: PackageJsonSchema,
	options?: CheckUpdateOptions,
) {
	if (pkg?.name) {
		const data = await latest(pkg?.name, options?.latest);
		const { value, error } = data;

		if (error) {
			return "Ran into an error";
		}

		if (value) {
			const versions = Object.keys(value);

			const parsedPkgVersion = semverParser(pkg.version as string);
			let allSame = false;

			if (options?.latest?.all) {
				allSame = versions.every((version) => {
					const parsedVersion = semverParser(value[version]);
					return (
						parsedVersion[0] === parsedPkgVersion[0] &&
						parsedVersion[1] === parsedPkgVersion[1] &&
						parsedVersion[2] === parsedPkgVersion[2]
					);
				});
			} else {
				const parsedVersion = semverParser(value);

				console.log(parsedPkgVersion);
				console.log(parsedVersion);

				allSame =
					parsedVersion[0] === parsedPkgVersion[0] &&
					parsedVersion[1] === parsedPkgVersion[1] &&
					parsedVersion[2] === parsedPkgVersion[2];
			}

			if (allSame) {
				return "Latest versions match, looking good";
			}

			return "Versions are different, maybe we should update";
		}
	}
}