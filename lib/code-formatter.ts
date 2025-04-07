import prettier from "prettier";
import parserJava from "prettier-plugin-java";

export async function formatCode(
  code: string,
  language: string
): Promise<string> {
  // Handle empty code case
  if (!code || code.trim() === "") {
    return code;
  }

  try {
    if (language === "java") {
      const formattedCode = await prettier.format(code, {
        parser: "java",
        plugins: [parserJava],
        tabWidth: 4,
        useTabs: false,
      });
      return formattedCode;
    } else if (language === "cpp") {
      // Simple indentation-based formatter for C++
      return formatCpp(code);
    } else if (language === "python") {
      // Python formatting - could use Black.js or simple indentation
      // For now, just return the original code
      return code;
    } else {
      // For unsupported languages, return the original code instead of throwing
      console.warn(`Formatting not supported for language: ${language}`);
      return code;
    }
  } catch (error) {
    console.error(`Error formatting ${language} code:`, error);
    // Return original code instead of throwing to avoid breaking the editor
    return code;
  }
}

function formatCpp(code: string): string {
  const lines = code.split("\n");
  let indentLevel = 0;
  const formattedLines = lines.map((line) => {
    // Preserve empty lines
    if (line.trim() === "") {
      return "";
    }

    // Handle opening braces on their own line
    if (line.trim() === "{") {
      const indentedLine = "    ".repeat(indentLevel) + "{";
      indentLevel++;
      return indentedLine;
    }

    // Handle closing braces
    if (line.trim().startsWith("}")) {
      indentLevel = Math.max(0, indentLevel - 1);
      return "    ".repeat(indentLevel) + line.trim();
    }

    // Handle lines with both opening and closing braces
    if (line.trim().endsWith("{")) {
      const indentedLine = "    ".repeat(indentLevel) + line.trim();
      indentLevel++;
      return indentedLine;
    }

    // Regular lines
    return "    ".repeat(indentLevel) + line.trim();
  });

  return formattedLines.join("\n");
}
