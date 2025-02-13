import fs from "fs";
import path from "path";

// Directory to search for controllers
const MODULE_DIR = path.resolve("src/module");
// src/utils/generated
const OUTPUT_FILE = path.resolve("src/utils/generated/controller.generated.ts");

// Helper function to get all files recursively
function getAllFiles(dir, ext) {
  let files: string[] = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, ext));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  });
  return files;
}

// Main function to generate controller list
function generateControllerList() {
  const controllerFiles = getAllFiles(MODULE_DIR, ".controller.ts");

  const imports: string[] = [];
  const controllers: string[] = [];

  controllerFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, "utf-8");

    // Match controller name and ensure it uses `baseController`
    const match = fileContent.match(/export const (\w+) = baseController/);
    if (match) {
      const controllerName = match[1];
      const relativePath = path
        .relative(OUTPUT_FILE, file)
        .replace(".ts", ".js")
        .slice(3);
      // `./${path.relative(MODULE_DIR, file).replace(/\\/g, "/")}`;

      // Add import and controller name to respective arrays
      imports.push(
        `import { ${controllerName} } from "${relativePath.replace(/\.ts$/, "")}";`,
      );
      controllers.push(controllerName);
    }
  });

  // Generate content for the controller list file
  const fileContent = `// Auto-generated controller list

${imports.join("\n")}

export const controllers = [
  ${controllers.join(",\n  ")},
];
`;

  // Ensure the shared directory exists
  const sharedDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir, { recursive: true });
  }

  // Write to the output file
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`Controller list generated at ${OUTPUT_FILE}`);
}

// Run the script
generateControllerList();
