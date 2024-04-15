const fs = require("fs");
const path = require("path");

const directoriesToIgnore = ["node_modules", ".git", ".next", ".husky"];
const acceptedFileExtensions = [".js", ".jsx", ".ts", ".tsx"];
const defaultRootDirectory = "./";

function removeWhiteSpaceFromJSX(jsxString) {
  const regex = /\s+/g;
  return jsxString.replace(regex, " ").trim();
}

function shouldIgnoreDirectory(directoryName) {
  return directoriesToIgnore.includes(directoryName);
}

function processDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          if (!shouldIgnoreDirectory(file)) {
            processDirectory(filePath);
          }
        } else if (acceptedFileExtensions.includes(path.extname(file))) {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }

            const modifiedContent = data.replace(
              /className={"(.*?)"}|className="(.*?)"|className={\s*"(.*?)"\s*}|className={`(.*?)`}/gs,
              (
                match,
                classNameWithBraces,
                classNameWithoutBraces,
                classNameWithBrackets,
                classNameWithBackticks,
              ) => {
                let className =
                  classNameWithBraces ||
                  classNameWithoutBraces ||
                  classNameWithBrackets ||
                  classNameWithBackticks;
                if (classNameWithBackticks) {
                  // Check if there is a variable inside the backticks
                  if (/\${.*?}/.test(classNameWithBackticks)) {
                    // Handle class name with backticks containing a variable
                    // You can replace this logic with your specific handling
                    return `className={\`${removeWhiteSpaceFromJSX(classNameWithBackticks).trim()}\`}`;
                  } else {
                    // Handle class name with backticks without a variable
                    return `className="${removeWhiteSpaceFromJSX(classNameWithBackticks).trim()}"`;
                  }
                } else {
                  // Handle other cases where className is enclosed in quotes or braces
                  const compactedClassName = removeWhiteSpaceFromJSX(className);
                  return `className={"${compactedClassName}"}`;
                }
              },
            );

            fs.writeFile(filePath, modifiedContent, "utf8", (err) => {
              if (err) {
                console.error("Error writing file:", err);
              }
            });
          });
        }
      });
    });
  });
}

const rootDirectory = process.argv[2] || defaultRootDirectory;

processDirectory(rootDirectory);
console.log("🧹...");
