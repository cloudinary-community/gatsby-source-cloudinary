# Contributing to Gatsby Source Cloudinary Plugin

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues
> - Create content about it, make sure to tag [@cloudinary](https://twitter.com/cloudinary) on Twitter

## 📖 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Additional Notes](#additional-notes)

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

[Read the full code of conduct](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/CODE_OF_CONDUCT.md).

## I Have a Question

> If you want to ask a question, we assume that you have read the plugin's [README](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/README.md) and the Cloudinary [Documentation](https://cloudinary.com/documentation).

For questions specifically about the use of this plugin, use the [discussion board](discussions).

For questions about Cloudinary in general you'll get faster results by asking in the [Cloudinary Community](https://community.cloudinary.com/).

## I Want To Contribute

> ### Legal Notice
>
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

This section guides you through submitting a **bug report** for Gatsby Source Cloudinary Plugin. Following these guidelines will help maintainers and the community to understand the problem and come up with a fix.

#### Before Submitting a Bug Report

- Make sure you are using the [latest version](https://github.com/cloudinary-devs/gatsby-source-cloudinary/releases).
- Look over the [README](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/README.md) once more.
- Go to ["I Have a Question"](#i-have-a-question) if you are looking for help/support.
- Check if there is already a bug report existing for your bug or error in the [bug tracker](https://github.com/cloudinary-devs/gatsby-source-cloudinary/issues?q=label%3Abug). If it does, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit a Good Bug Report?

> Make sure not to include your Cloudinary API Secret or other sensitive information in your bug report

Bug reports are tracked as [GitHub issues](https://github.com/cloudinary-devs/issues).

- Open an [Issue](https://github.com/cloudinary-devs/gatsby-source-cloudinary/issues/new).
- Use a **clear and descriptive title** for the issue to identify the bug report.
- Provide a **step-by-step description on how to reproduce the problem** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the problem is related to.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Gatsby Source Cloudinary Plugin, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Look over the [README](https://github.com/cloudinary-devs/gatsby-source-cloudinary/blob/main/README.md) once more to find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/cloudinary-devs/gatsby-source-cloudinary/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/cloudinary-devs/gatsby-source-cloudinary//issues).

- Open an [Issue](https://github.com/cloudinary-devs/gatsby-source-cloudin ary/issues/new).
- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to.
- **Explain why this enhancement would be useful** to most Gatsby Source Cloudinary Plugin users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

[TODO] This chapter and its sub-chapters

This section guides you through submitting your first Pull Request for Gatsby Source Cloudinary Plugin. Following these guidelines will increase the chance of getting your contribution all the way to release.

If you are new to open source code contributions, here are some links to get you started:

- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

#### Before Starting on Your Contribution

You may either solve an exciting [issue](https://github.com/cloudinary-devs/gatsby-source-cloudinary/issues), or create a new [issue](https://github.com/cloudinary-devs/gatsby-source-cloudinary/issues/new) to indicate what you'll be working on.

Either way, make sure to outline your plan of action and get some feedback before spending too much time on your solution in case its not within the scope/goals of this plugin.

#### Fork, Clone and Install

1. [Fork the repository](https://github.com/cloudinary-devs/gatsby-source-cloudinary/fork)
2. Clone the fork to your local machine: `git clone /git@github.com:<username>/gatsby-plugin-starter.git`
3. Move into repo folder: `cd gatsby-plugin-starter`
4. Install packages: `yarn install`

##### Project structure

##### Yarn Workspace

The project uses [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to host the plugin and demo codes in one repository.

When installing dependencies, make sure to include `workspace plugin` or `workspace demo` to the command so that dependencies are added to the correct workspace: `yarn workspace plugin add lodash`.

Important note from the yarn workspace docs:

> Be careful when publishing packages in a workspace. If you are preparing your next release and you decided to use a new dependency but forgot to declare it in the package.json file, your tests might still pass locally if another package already downloaded that dependency into the workspace root. However, it will be broken for consumers that pull it from a registry, since the dependency list is now incomplete so they have no way to download the new dependency. Currently, there is no way to throw a warning in this scenario.

#### Develop

Run demo: `yarn develop`

#### Test

Run all test: `yarn test`
Run jest in watch mode: `yarn watch`

#### Pull Request

Before making a Pull Request make sure:

When finished with the changes, create a pull request.

- Fill in the title and description according to the **conventional commit** rules
- Do not worry about your individual commits as they will be squashed into one commit with the above as the commit message

A memember of the team will review your Pull Request in the style of [Conventional Comments](https://conventionalcomments.org/)

- When your Pull Request is (squash-)merged a new version of the plugin will be released

#### Semantic Release

The project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [semantic versioning](https://semver.org/) to automate releases by utalizing the [semantic-release](https://semantic-release.gitbook.io/) project.

## Attribution

This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!

---

## [TODO] Remove below

#### Table Of Contents 🧶

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

[How Can I Contribute?](#how-can-i-contribute)

[Styleguides](#styleguides)

[Additional Notes](#additional-notes)

## Code of Conduct 💀👍

These plugins and everyone participating in them are governed by our [Cloudinary plugins Code of Conduct](https://www.gatsbyjs.com/contributing/code-of-conduct/). By participating, you are agreeing to uphold our Code of Conduct.

### Our Pledge 🤜 🤛

To make people feel welcome, we as contributors pledge to not harass anybody for their body size, skill level, disability, ethnicity, age, gender identity and expression, nationality, the way they look, race, religion, or sexual identity and orientation. Please report bad behavior to our cloudinaryGal@cloudinary.com.

[Read the full code of conduct](https://www.gatsbyjs.com/contributing/code-of-conduct/).

✅ Cloudinary email adress to report unacceptable behavior \_ \_ \_ \_ _@cloudinary.com.

## I don't want to read this whole thing, I just have a question!!! 🙋‍♀️

Please don't file an issue to ask a question. You'll get faster results by using the resources below.

We have [an official message board](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/discussions) and a [Cloudinary discord](https://community.cloudinary.com/) where the community chimes in with helpful advice if you have questions.

- [Github Discussions, the official Cloudinary plugins message board](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/discussions)
- [Cloudinary discord](https://community.cloudinary.com/)

## What should I know before I get started? 🚀

- Cloudinary plugins
  ✅ an into text

## How Can I Contribute? 🏴‍☠️

### Reporting Bugs 🐛

Here we guide you in submitting a bug report. If you follow these guidelines you will help maintainers understand your report 📝, reproduce the behavior 💻 💻, and find related reports 🔎.

When you write your bug report, please write up as many details as you can.

#### How Do I Submit A Good Bug Report? 🐞

Bugs are tracked as [GitHub issues](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/issues). Create an issue and provide the following information.

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** include as many details as you can. For example, start by explaining how you \_ \_ \_ \_ _ When listing steps, don't just say what you did, but explain how you did it. For example, if you _ \_ \_ _, explain if you used the _ \_ \_ \_?
  ✅ more here
- **Provide an example to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks).
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which demonstrate the problem and shows you following the described steps. If you use the keyboard while following the steps, record the GIF with the Keybinding Resolver shown. You can use [Licecap](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows.

- **If the problem is related to performance or memory**, include a CPU profile capture with your report.

### Suggesting Enhancements 💅

Here is a guide to explain your idea for a new feature or an idea for a minor improvement. If you follow these guidelines you will help maintainers understand your idea better 📝.

- check if you're using the latest version of Cloudinary plugin and if you can get the desired behavior by changing your plugin's config.

### How Do I Submit A Good Enhancement Suggestion? 🧚‍♀️

Enhancement suggestions are tracked as GitHub issues. Create a GitHub issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify your suggestion.
- **Please describe your idea step-by-step** and write up as many details as you can.
- **Write an example to show the steps**. Include copy/pasteable snippets which you use in your example, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
- **Write up the current behavior and explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** to show the steps. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows.
- **Explain why this enhancement would be useful** to Cloudinary plugin users.
- **List another Gatsby plugin where this enhancement exists.**
- **Specify which version of our Cloudinary plugin you're using**. You can get the exact version by \_ \_ \_ \_ \_ \_.
  ✅ more here
- **Specify the version of Gatsby you're using.**

### Your First Code Contribution 🧙‍♀️

Unsure where to begin contributing to Cloudinary plugin? You can start by looking through these [beginner issues](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/issues?q=is%3Aissue+is%3Aopen+label%3Abeginner):

### Local development 🐬

Cloudinary plugins can be developed locally.
more info needed here \_ \_ \_ \_
✅ more here

### Semantic release 🐳

✅ more here

### Test 🧪

✅ more here

### Pull Requests 📩

The process described here has several goals:

- Maintain our plugin's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible plugins
- Have a good system for maintainers to review contributions
- Please follow the styleguides so your contribution is easy for the maintainers to understand:

## Styleguides 🦮

#### Git Commit Messages 💌

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- When only changing documentation, include \_ \_ \_ \_ \_ in the commit title
  ✅ more on documentation here

### JavaScript Styleguide 🦮

more info needed here \_ \_ \_ \_
✅ more here

### Documentation Styleguide 🧐

more info needed here \_ \_ \_ \_
✅ more here

## Additional Notes

#### Issue and Pull Request Labels 🎟️

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue and Issue State 🎫

| Label name                | Description                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `enhancement`             | Feature requests.                                                                           |
| `bug`                     | Confirmed bugs or reports that are very likely to be bugs.                                  |
| `question`                | Questions more than bug reports or feature requests (e.g. how do I do X).                   |
| `feedback`                | General feedback more than bug reports or feature requests.                                 |
| `help-wanted`             | We would appreciate help from the community with these issues.                              |
| `beginner`                | Less complex issues, good first issues.                                                     |
| `more-information-needed` | More information needed about these problems or feature requests (e.g. steps to reproduce). |
| `documentation`           | Related to documentation.                                                                   |

#### Pull Request Labels 🏷️

| Label name         | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `work-in-progress` | Pull requests which are still being worked on.                                           |
| `needs-review`     | Pull requests which need code review from the Cloudinary plugin team.                    |
| `under-review`     | Pull requests being reviewed by the Cloudinary plugin team.                              |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again. |
| `needs-testing`    | Pull requests which need manual testing.                                                 |
