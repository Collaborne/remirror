# Config Files

All files in this folder will be symlinked to the root of the repository in the npm `preinstall`
hook. This is to remove clutter when browsing the code on GitHub or other online tools.

This readme file is ignored though.

## Why

Personally I find it intimidating when I open an interesting project only to be bombarded with a
long list of files in the root directory. I think this is an elegant solution way of avoiding that
problem while retaining the functionality provided by these files.

By using symlinks we can continue editing and updating files in our usual way once the installation
completes. Prior to installation the superfluous implementation is hidden.

## Content

- `.changeset/` - A folder which contains the changeset information, responsible for releases and
  versioning the project. [`changesets`](https://github.com/atlassian/changesets) is an amazing
  project and I encourage you to take a look.
- `.vscode/` - A folder which contains the vscode settings for the project.
- `.eslintignore` - The patterns to ignore when running `eslint` on the project.
- `.eslintrc.js` - The eslint rules for the whole project.
- `.huskyrc` - The git hooks for the project which add a precommit and a prepush hook. You can learn
  more [here](https://github.com/typicode/husky). In order to make things easier for contributors,
  this file is ignored by default. To turn it on run the following command from the root directory.

```bash
pnpm start:checks
```

And to turn it back off again.

```bash
pnpm stop:checks
```

- `.lintagedrc` - Runs on every commit (see previous point) to make sure files are linted,
  prettified and don't fail any tests.
- `.npmrc` - Checked by [`pnpm`](https://pnpm.js.org/en/npmrc) and
  [`npm`](https://docs.npmjs.com/configuring-npm/npmrc.html) for configuration options.
- `.prettierrc` - The configuration for [prettier](https://prettier.io/) which is responsible for
  formatting the project.
- `.size-limit.json` - This file is generated by running `pnpm generate:config` in the root
  directory. It is possible
- `.stylelintignore` - The files to ignore when linting the styles within the project.
- `.stylelintrc.json` - The configuration for linting styles.
- `babel.config.js` - The main babel config for the project.
- `globals.d.ts` - The global types that should be available in the project.
- `jest.config.js` - The jest configuration for running project wide testing.
- `linaria.config.js` - The linaria (styles) configuration - which sets the naming convention for
  the classnames generated by this project.
- `lingui.config.js` - The configuration for the `i18n` framework being used by `remirror`.
- `pnpmfile.js` - The pnpm file for adding hooks to the project. This is useful for patching
  packages, and setting resolutions for different
