# Contributing to Mlima Connect

First off, thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to Mlima Connect. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/yourusername/mlima-connect/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/yourusername/mlima-connect/issues/new). Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior.

### Suggesting Enhancements

- Open a new GitHub issue with the label "enhancement".
- Provide a clear title and description with as much context as possible.
- Explain why this enhancement would be useful to most Mlima Connect users.
- Include any relevant screenshots or mockups.

### Your First Code Contribution

1. Fork the repository.
2. Create a new branch with a descriptive name: `git checkout -b my-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-branch-name`
5. Submit a pull request to the `main` branch.

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. Your pull request will be reviewed by the maintainers and merged if it meets the project's standards.

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Installation

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/mlima-connect.git`
3. Navigate to the project directory: `cd mlima-connect`
4. Install dependencies: `npm install`
5. Create a `.env` file: `cp .env.example .env`
6. Start the development server: `npm run dev`

### Testing

Run the test suite:

```bash
npm test
```

### Linting

Check for linting errors:

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

## Style Guide

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use 2 spaces for indentation.
- Use single quotes for strings.
- Use template literals for string interpolation.
- Use meaningful variable and function names.
- Write comments to explain complex logic.
- Keep functions small and focused on a single responsibility.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
