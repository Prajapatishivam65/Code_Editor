import { NextResponse } from "next/server";

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

// Map of language names to Piston API language identifiers
const LANGUAGE_MAP: Record<string, string> = {
  java: "java",
  cpp: "cpp",
  python: "python3",
};

// Helper function to prepare code for execution based on language
function prepareCodeForExecution(
  language: string,
  code: string,
  input: any[]
): { code: string; stdin: string } {
  // Normalize input to ensure consistency
  const normalizedInput = formatInputAsString(input);

  switch (language) {
    case "java":
      // For Java, we don't need to modify the code if it already has a main method
      return {
        code: code,
        stdin: normalizedInput,
      };

    case "cpp":
      // For C++, we don't need to modify the code if it already has a main function
      return {
        code: code,
        stdin: normalizedInput,
      };

    case "python":
      return {
        code: code,
        stdin: normalizedInput,
      };

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

// Helper function to format input as a string for stdin
function formatInputAsString(input: any[]): string {
  if (!input || input.length === 0) return "";

  // Convert input array to appropriate string format
  return input
    .map((item) => {
      if (Array.isArray(item)) {
        // Handle arrays (like arrays of numbers)
        return item.join(" ");
      } else if (typeof item === "object" && item !== null) {
        // Handle objects by converting to JSON
        return JSON.stringify(item);
      } else {
        // Handle primitives
        return String(item);
      }
    })
    .join("\n");
}

// Helper function to normalize output for comparison
function normalizeOutput(output: string): string {
  if (!output) return "";

  // Remove whitespace, convert to lowercase for case-insensitive comparison
  return output.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const { language, code, testCases } = await request.json();

    // Validate input
    if (!language || !code || !Array.isArray(testCases)) {
      return NextResponse.json(
        {
          error: "Invalid request. Required fields: language, code, testCases",
        },
        { status: 400 }
      );
    }

    // Check if the language is supported
    const pistonLanguage = LANGUAGE_MAP[language];
    if (!pistonLanguage) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Process each test case individually to avoid timeout issues
    const results = [];

    for (let index = 0; index < testCases.length; index++) {
      const testCase = testCases[index];
      const { input, expectedOutput } = testCase;

      try {
        // Prepare code with the specific test case input
        const { code: preparedCode, stdin } = prepareCodeForExecution(
          language,
          code,
          input
        );

        // Execute the code using Piston API
        const response = await fetch(PISTON_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: pistonLanguage,
            version: "*",
            files: [{ content: preparedCode }],
            stdin: stdin,
            args: [],
            compile_timeout: 10000,
            run_timeout: 5000,
            compile_memory_limit: -1,
            run_memory_limit: -1,
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Extract output and error information
        let output = "";
        let error = "";
        let compileError = "";

        if (data.compile && data.compile.stderr) {
          compileError = data.compile.stderr;
        }

        if (data.run) {
          output = data.run.output || "";
          error = data.run.stderr || "";
        } else if (!compileError) {
          error = "Execution failed";
        }

        // If there was a compile error, prioritize that
        const finalError = compileError || error;

        // Compare output with expected output (case-insensitive, trimmed)
        const normalizedOutput = normalizeOutput(output);
        const normalizedExpected = normalizeOutput(expectedOutput);
        const passed = normalizedOutput === normalizedExpected;

        results.push({
          testCaseIndex: index,
          input,
          expectedOutput,
          actualOutput: output,
          error: finalError || null,
          passed,
        });
      } catch (err) {
        console.error(`Error executing test case ${index}:`, err);
        results.push({
          testCaseIndex: index,
          input,
          expectedOutput,
          actualOutput: null,
          error: err instanceof Error ? err.message : "Unknown error",
          passed: false,
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
