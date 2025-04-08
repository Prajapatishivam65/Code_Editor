import { toast } from "@/hooks/use-toast";

interface TestCase {
  input: any[];
  expectedOutput: string;
}

interface TestResult {
  testCaseIndex: number;
  input: any[];
  expectedOutput: string;
  actualOutput: string | null;
  error: string | null;
  passed: boolean;
}

interface ExecutionResponse {
  results: TestResult[];
  error?: string;
}

/**
 * Execute code against test cases
 * @param code The code to execute
 * @param language The programming language
 * @param testCases Test cases to run against the code
 * @returns Results of the code execution
 */
export async function executeCode(
  code: string,
  language: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  try {
    const response = await fetch("/api/execute-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        testCases,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to execute code");
    }

    const data: ExecutionResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.results;
  } catch (error) {
    console.error("Error executing code:", error);
    if (error instanceof Error) {
      toast({
        title: "Execution Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } else {
      const genericError = new Error(
        "An unknown error occurred during code execution"
      );
      toast({
        title: "Execution Error",
        description: "An unknown error occurred during code execution",
        variant: "destructive",
      });
      throw genericError;
    }
  }
}

/**
 * Format code using Prettier
 * @param code The code to format
 * @param language The programming language
 * @returns Formatted code
 */
export async function formatCode(
  code: string,
  language: string
): Promise<string> {
  try {
    const languageMap: Record<string, string> = {
      cpp: "cpp",
      java: "java",
      python: "python",
    };

    const formatterLanguage = languageMap[language] || language;

    // Return unformatted code for now since we're not actually formatting in this version
    return code;
  } catch (error) {
    console.error("Error formatting code:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during code formatting");
    }
  }
}
