import { semverParser } from "./utils";

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
		return data.error;
	}

	if (options?.all) {
		return data["dist-tags"];
	}

	return data["dist-tags"].latest;
}

type PackageJsonSchema = {
	[key: string]: string | Map<string, string>[] | unknown;
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

		if (data) {
			const versions = Object.keys(data);

			const parsedPkgVersion = semverParser(pkg.version as string);
			let allSame = false;

			if (options?.latest?.all) {
				allSame = versions.every((version) => {
					const parsedVersion = semverParser(data[version]);
					return (
						parsedVersion[0] === parsedPkgVersion[0] &&
						parsedVersion[1] === parsedPkgVersion[1] &&
						parsedVersion[2] === parsedPkgVersion[2]
					);
				});
			} else {
				const parsedVersion = semverParser(data);

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

console.log(await checkUpdate(await Bun.file("./package.json").json()));
