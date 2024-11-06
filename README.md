# @radhirasho/latest

## Overview

`@radhirasho/latest` is a Node.js utility that checks the latest version of a given package from npm or other registries. It can be used as a CLI tool or as a library in your Node.js projects.

## Installation

### CLI

To install the CLI globally, use:

```bash
npm install -g @radhirasho/latest
```

### Library

To install the library in your project, use:

```bash
npm install @radhirasho/latest
```

## Usage

### CLI

You can use the `latest` command to check the latest version of packages. For example:

```sh
latest <package-name>
```

You can also check multiple packages at once:

```sh
latest <package-name-1> <package-name-2> ...
```

### Programmatic API

You can also use the package programmatically in your Node.js projects.

#### Importing

```typescript
import { latest, checkUpdate } from "@radhirasho/latest";
```

#### Checking the Latest Version

To check the latest version of a package:

```typescript
const { value, error } = await latest("package-name");

if (error) {
  console.error("Error fetching latest version:", error);
} else {
  console.log("Latest version:", value);
}
```

#### Checking for Updates

To check if a package needs an update:

```typescript
const pkg = {
  name: "package-name",
  version: "1.0.0"
};

const result = await checkUpdate(pkg);

console.log(result);
```

## Configuration

### LatestOptions

You can pass options to the `latest` function to customize its behavior:

- `all`: If `true`, fetches all version tags.
- `registry`: Specifies the registry to use (e.g., `npm`, `yarn`).

Example:

```typescript
const options = {
  all: true,
  registry: "yarn"
};

const { value, error } = await latest("package-name", options);
```

### CheckUpdateOptions

You can pass options to the `checkUpdate` function to customize its behavior:

- `latest`: Options to pass to the `latest` function.

Example:

```typescript
const options = {
  latest: {
    all: true,
    registry: "yarn"
  }
};

const result = await checkUpdate(pkg, options);
```

## Development

### Building the Project

To build the project, run:

```sh
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/RadhiRasho/latest).

## License

See the LICENSE file for details.

## Author

Radhi Rasho

# Inspiration
Inspired by [node-latest](https://github.com/bahamas10/node-latest) that I ran into without realizing and noticed it was dependent on npm, which wasn't really necessary so I found a way to use fetch and have similar functionality, plus some.
