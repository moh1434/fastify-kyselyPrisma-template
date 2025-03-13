import fs from "fs";
import path from "path";
import { removeNullable } from "../src/utils/helpers/removeNullable.ts";

import { ObjectKeys } from "../src/utils/helpers/objects.ts";
// Directory to search for use case files
const scanDir = path.resolve("src/module");
const outputFile = path.resolve("src/utils/generated/di.generated.ts"); // Path to the output file

type DynamicDependenciesToAdd = {
  UploadFileService: "S3UploadService" | "LocalUploadService";
};

const dynamicDependenciesToAdd: DynamicDependenciesToAdd = {
  UploadFileService: "LocalUploadService",
};

function getFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  // Iterate over each item in the directory
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    // If it's a directory, recurse into it; otherwise, check if it's a command or query file
    if (stat.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (
      item.endsWith(".command.ts") ||
      item.endsWith(".query.ts") ||
      item.endsWith(".service.ts")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function toCamelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function generateModuleDeclaration(
  files: string[],
  dynamicDependenciesToAdd: DynamicDependenciesToAdd,
): string {
  // Extract class names and file paths from each file
  const filesWithClasses = removeNullable(
    files.map((file) => {
      const content = fs.readFileSync(file, "utf-8");
      const classMatch = content.match(/export default class (\w+)/);
      const class2Match = content.match(/export class (\w+)/);
      const classPath = path
        .relative(outputFile, file)
        .replace(".ts", ".js")
        .slice(3);

      if (classMatch) {
        const className = classMatch[1];
        return {
          className: className,
          filePath: classPath,
          importStatement: `import ${className} from "${classPath}";`,
        };
      }
      if (class2Match) {
        const className = class2Match[1];
        return {
          className: className,
          filePath: classPath,
          importStatement: `import { ${className} } from "${classPath}";`,
        };
      }

      return null;
    }),
  );

  // Create import statements for each class
  const imports = filesWithClasses
    .map(({ className, filePath, importStatement }) => importStatement)
    .join("\n");

  const filesWithClassesAndAliases = filesWithClasses.map((f) => ({
    className: toCamelCase(f.className),
    classValue: f.className,
  }));

  filesWithClasses.forEach((fileWithClass) => {
    ObjectKeys(dynamicDependenciesToAdd).forEach((dependencyName) => {
      const dependencyValue = dynamicDependenciesToAdd[dependencyName];
      if (fileWithClass.className === dependencyValue) {
        filesWithClassesAndAliases.push({
          className: toCamelCase(dependencyName),
          classValue: dependencyValue,
        });
      }
    });
  });
  // Create interface entries for each class
  const interfaceEntries = filesWithClassesAndAliases
    .map((dependency) => {
      return `  ${dependency.className}: ${dependency.classValue};`;
    })
    .join("\n");

  // Create object entries for each class
  const objectEntries = filesWithClassesAndAliases
    .map((dependency) => {
      return `  ${dependency.className}: ${dependency.classValue},`;
    })
    .join("\n");

  const listEntries = `export const diList = {
${objectEntries}
};`;
  return `// Auto-generated DI type

${imports}

export interface DiCradle {
${interfaceEntries}
}

${listEntries}
`;
}

// Main logic
const files = getFiles(scanDir); // Get all use case files
const moduleDeclaration = generateModuleDeclaration(
  files,
  dynamicDependenciesToAdd,
); // Generate the module declaration

// Write the result to the output file
fs.writeFileSync(outputFile, moduleDeclaration, "utf-8");
console.log(`Module declaration written to: ${outputFile}`);
