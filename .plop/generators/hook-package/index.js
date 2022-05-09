const { execSync } = require("child_process");

const tryExecSync = (cmd) => {
  try {
    return execSync(cmd).toString("utf-8").trim();
  } catch {
    return undefined;
  }
};

module.exports = async function (plop) {
  plop.setGenerator("hook-package", {
    description: "A new hook package",
    prompts: [
      {
        type: "input",
        name: "authorName",
        message: "What is your name?",
        default: tryExecSync("git config user.name"),
      },
      {
        type: "input",
        name: "authorEmail",
        message: "What is your E-mail Address?",
        default: tryExecSync("git config user.email"),
      },
      {
        type: "input",
        name: "packageName",
        message: "What's the name of the package (without vendor scope)?",
      },
      {
        type: "input",
        name: "packageDescription",
        message: "Finally, what does the new package do?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../packages/{{packageName}}/.gitignore",
        templateFile: "./generators/hook-package/template/.gitignore.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/AUTHORS",
        templateFile: "./generators/hook-package/template/AUTHORS.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/hooks.svg",
        templateFile: "./generators/hook-package/template/hooks.svg.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/jest.config.js",
        templateFile: "./generators/hook-package/template/jest.config.js.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/LICENSE",
        templateFile: "./generators/hook-package/template/LICENSE.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/package.json",
        templateFile: "./generators/hook-package/template/package.json.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/README.md",
        templateFile: "./generators/hook-package/template/README.md.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/tsconfig.cjs.json",
        templateFile:
          "./generators/hook-package/template/tsconfig.cjs.json.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/tsconfig.json",
        templateFile: "./generators/hook-package/template/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/src/{{camelCase packageName}}.ts",
        templateFile:
          "./generators/hook-package/template/src/__hookName__.ts.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/src/{{camelCase packageName}}.spec.ts",
        templateFile:
          "./generators/hook-package/template/src/__hookName__.spec.ts.hbs",
      },
      {
        type: "add",
        path: "../packages/{{packageName}}/src/index.ts",
        templateFile: "./generators/hook-package/template/src/index.ts.hbs",
      },
    ],
  });
};
