---
title: "Fixing and Testing NPM Dependencies Locally without Pain"
date: "2024-09-28"
excerpt: "Get faster feedback loop developing an npm package or fixing a dependency using npm link command."
image: ""
tags: ["npm", "software development", "open source", "testing", "github", "cli"]
---

## The problem with an external dependency from npm

Imagine you are working on a project and you have a problem with a dependency. It could be slow, or has lack of functionality. What would your approach be to make these changes?

I don't think contributing directly on GitHub is fast enough. You'll try to fix it locally first. If it's urgent, you can vendor the dependency and contribute later. After the release you can get it from the registry again.

Let's go back to the "fix it locally" approach, and I'll tell you a story of me suffering. I was working on a feature for an [open-source library for aws lambda](https://github.com/aws-powertools/powertools-lambda-typescript), I needed to make changes for one of the packages in a monorepo that is a dependency for others. This is how my workflow looked like:

- Make changes to the dependency code
- Build the dependency
- Create a package with `npm pack`
- Move the resulted package archive somewhere
- Run `npm install <path/to/somewhere/tarball.tgz>` in the project
- Look at the result

It was a nightmare. Imagine you forgot to add something, so you have to go again. The worst feedback loop ever.

## The solution was always there

At that time I didn't know about this simple command `npm link`.

Recently, I was building an app that uses my open source react component library, `spartak-ui` ([GitHub](https://github.com/shdq/spartak-ui)), as a dependency. However, it didn't have the component I needed. Sounds familiar: I have a dependency that I need to change. Even though I own the dependency code and can publish it on `npm` quickly, rushing without proper testing isn't a good idea.

But look at how my recent workflow looks like:

- Make changes to the dependency (add the component code)
- Build the dependency (library re-builds with the `--watch` option)
- Look at the result (`vite` refreshes the page with the app)

Amazing, right? Below is how to set it up, which is also pretty easy.

## Setting up the faster workflow

In the **_dependency's_** root directory run the command:

```bash
npm link
```

In the **_project's_** root directory uninstall the npm-installed version of the dependency.

```bash
npm uninstall <dependency-package-name>
```

And link the local dependency to your project:

```bash
npm link <dependency-package-name>
```

That's it! Make changes and enjoy the faster feedback loop.

## How npm link works

The dependency won't be added to the `package.json`, but it will be available in your project. `npm link` creates a symlink, not an actual installation. This means the local version of the dependency is linked directly to your project, allowing changes in real-time without modifying the actual `node_modules` structure or creating a versioned package.

## Clean up after the work

When you're done coding and testing, don't forget to unlink the local dependency.

```bash
npm unlink <dependency-package-name>
```

## How to consume the fixed dependency

If you’ve made a hotfix for the dependency and don’t have time to wait for the maintainer to merge your pull request, release, and publish it on npm, you can vendor the dependency in your project by using `npm pack` ([npm docs](https://docs.npmjs.com/cli/v10/commands/npm-pack)) and install it from the generated archive.

**_If the change in the code is something useful to others, please go and contribute!_**

Once the change is released and published to the npm registry, you can reinstall it back by simply running `npm install <dependency-package-name>`.

## Last words

If you’re building and maintaining a library or have an urge to fix something in an external dependency, I highly recommend integrating `npm link` into your development process for faster feedback loop and easier testing.

Documentation about `npm link` for the reference: [npm docs](https://docs.npmjs.com/cli/v10/commands/npm-link).

Thanks for reading!
