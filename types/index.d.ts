declare enum Registries {
    npm = "https://registry.npmjs.org",
    yarn = "https://registry.yarnpkg.com"
}
export type LatestOptions = {
    all?: boolean;
    registry?: keyof typeof Registries;
};
export declare function latest(name: string | unknown, options?: LatestOptions): Promise<{
    error: any;
    name?: undefined;
    value?: undefined;
} | {
    name: unknown;
    value: any;
    error?: undefined;
}>;
export type PackageJsonSchema = {
    name: string;
    /** @example "1.1.1" | "1.2.12-abc" */
    version: `${string}.${string}.${string}`;
    [key: string]: string | Map<string, string>[] | unknown[] | unknown;
};
export type CheckUpdateOptions = {
    latest?: LatestOptions;
};
export declare function checkUpdate(pkg: PackageJsonSchema, options?: CheckUpdateOptions): Promise<"Ran into an error" | "Latest versions match, looking good" | "Versions are different, maybe we should update" | undefined>;
export {};
