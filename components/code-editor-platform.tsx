"use client";

import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import ProblemDescription from "./problem-description";
import TestResults from "./test-results";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { executeCode } from "@/lib/code-execution";
import { ModeToggle } from "./theme-toggle";
import { formatCode } from "@/lib/code-execution";
import {
  Loader2,
  Play,
  Send,
  FileCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Define types for our problem structure
interface TestCase {
  input: any[];
  expectedOutput: string;
}

interface ProblemStarter {
  java: string;
  cpp: string;
  python: string;
  [key: string]: string;
}

interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  constraints: string[];
  examples: ProblemExample[];
  hints: string[];
  starterCode: ProblemStarter;
  testCases: TestCase[];
  hiddenTestCases: TestCase[];
  timeLimit?: string;
  memoryLimit?: string;
}

interface TestResult {
  testCaseIndex: number;
  input: any[];
  expectedOutput: string;
  actualOutput: string | null;
  error: string | null;
  passed: boolean;
}

interface CodeEditorPlatformProps {
  problem?: Problem;
}

// Sample problem for testing in competitive programming format
const sampleProblem: Problem = {
  id: "watermelon-problem",
  title: "A. Watermelon",
  description: `One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed \`w\` kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.

Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.`,
  difficulty: "Easy",
  timeLimit: "1 second",
  memoryLimit: "256 megabytes",
  constraints: ["1 ≤ w ≤ 100", "w is an integer"],
  examples: [
    {
      input: "8",
      output: "YES",
      explanation:
        "The boys can divide the watermelon into two parts of 2 and 6 kilos respectively (another variant — two parts of 4 and 4 kilos).",
    },
    {
      input: "3",
      output: "NO",
      explanation:
        "The boys cannot divide the watermelon into two parts of even weight.",
    },
  ],
  hints: [
    "Think about the parity of the number w.",
    "Consider what makes a number dividable into two even parts.",
    "Even numbers can be represented as 2k, where k is an integer.",
  ],
  starterCode: {
    java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int w = scanner.nextInt();
        
        // Solve the problem here
        
        // Output YES or NO
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int w;
    cin >> w;
    
    // Solve the problem here
    
    // Output YES or NO
    
    return 0;
}`,
    python: `# Read input
w = int(input())

# Solve the problem here

# Output YES or NO
`,
  },
  testCases: [
    {
      input: ["8"],
      expectedOutput: "YES",
    },
    {
      input: ["3"],
      expectedOutput: "NO",
    },
  ],
  hiddenTestCases: [
    {
      input: ["2"],
      expectedOutput: "NO",
    },
    {
      input: ["100"],
      expectedOutput: "YES",
    },
    {
      input: ["1"],
      expectedOutput: "NO",
    },
    {
      input: ["4"],
      expectedOutput: "YES",
    },
    {
      input: ["98"],
      expectedOutput: "YES",
    },
  ],
};

export default function CodeEditorPlatform({
  problem,
}: CodeEditorPlatformProps) {
  // Use the provided problem or fall back to the sample problem
  const currentProblem: Problem = problem || sampleProblem;

  const [language, setLanguage] = useState<string>("cpp"); // Default to C++ for competitive programming
  const [code, setCode] = useState<string>(
    currentProblem.starterCode.cpp || ""
  );
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [showProblem, setShowProblem] = useState<boolean>(true);
  const { toast } = useToast();

  // Update code when problem changes
  useEffect(() => {
    if (
      currentProblem &&
      currentProblem.starterCode &&
      currentProblem.starterCode[language]
    ) {
      setCode(currentProblem.starterCode[language]);
    }
  }, [currentProblem, language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (currentProblem.starterCode && currentProblem.starterCode[newLanguage]) {
      setCode(currentProblem.starterCode[newLanguage]);
    } else {
      // Default empty templates if no starter code is available
      const defaultTemplates: Record<string, string> = {
        java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read input and solve the problem
        
        // Output the result
    }
}`,
        cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Read input and solve the problem
    
    // Output the result
    
    return 0;
}`,
        python: `# Read input and solve the problem

# Output the result
`,
      };
      setCode(defaultTemplates[newLanguage] || "");
    }
    setResults(null);
  };

  const handleFormatCode = async () => {
    setIsFormatting(true);
    try {
      const formattedCode = await formatCode(code, language);
      setCode(formattedCode);
      toast({
        title: "Code formatted",
        description: "Your code has been formatted successfully.",
      });
    } catch (error) {
      toast({
        title: "Formatting Error",
        description:
          error instanceof Error ? error.message : "Failed to format code",
        variant: "destructive",
      });
    } finally {
      setIsFormatting(false);
    }
  };

  // Add keyboard shortcut for formatting (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleFormatCode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [code, language]);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowProblem(false);
      } else {
        setShowProblem(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const runCode = async () => {
    setIsExecuting(true);
    setResults(null);

    try {
      const executionResults = await executeCode(
        code,
        language,
        currentProblem.testCases
      );
      setResults(executionResults);
    } catch (error) {
      console.error("Error executing code:", error);
      toast({
        title: "Execution Error",
        description:
          error instanceof Error ? error.message : "Failed to execute code",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const submitCode = async () => {
    setIsExecuting(true);
    setResults(null);

    try {
      // Combine visible and hidden test cases for submission
      const allTestCases = [
        ...currentProblem.testCases,
        ...currentProblem.hiddenTestCases,
      ];
      const executionResults = await executeCode(code, language, allTestCases);
      setResults(executionResults);

      // Check if all test cases passed
      const allPassed = executionResults.every((result) => result.passed);

      toast({
        title: allPassed ? "All tests passed!" : "Some tests failed",
        description: allPassed
          ? "Congratulations! Your solution passed all test cases."
          : "Your solution didn't pass all test cases. Please review and try again.",
        variant: allPassed ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error submitting code:", error);
      toast({
        title: "Submission Error",
        description:
          error instanceof Error ? error.message : "Failed to submit code",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const toggleProblemView = () => {
    setShowProblem(!showProblem);
  };

  return (
    <div className="container mx-auto p-2 md:p-4 space-y-4 h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <h1 className="text-xl md:text-2xl font-bold">
          Competitive Coding Platform
        </h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-hidden">
        {/* Mobile toggle for problem view */}
        <div className="lg:hidden w-full flex justify-end mb-2">
          <Button
            variant="outline"
            onClick={toggleProblemView}
            className="flex items-center gap-1"
          >
            {showProblem ? (
              <>
                <span>Hide Problem</span>
                <ChevronLeft className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show Problem</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        {/* Problem description panel */}
        {(showProblem || window.innerWidth >= 1024) && (
          <Card className="p-4 lg:col-span-4 overflow-auto max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-180px)]">
            <ProblemDescription problem={currentProblem} />
          </Card>
        )}
        {/* Editor and test results panel */}
        {/* // Update only the editor and test results panel section in
        CodeEditorPlatform */}
        {/* Editor and test results panel */}
        <div
          className={`${showProblem ? "lg:col-span-8" : "col-span-12"} flex flex-col gap-4 max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-180px)]`}
        >
          {/* Code Editor Card */}
          <Card className="p-4 flex-grow flex flex-col h-[60%]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  defaultValue={language}
                  onValueChange={handleLanguageChange}
                  value={language}
                >
                  <SelectTrigger className="w-[140px] md:w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFormatCode}
                  disabled={isFormatting}
                  title="Format Code (Ctrl+S / Cmd+S)"
                >
                  {isFormatting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileCode className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={runCode}
                  disabled={isExecuting || isFormatting}
                  className="flex-1 sm:flex-none"
                >
                  {isExecuting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  Run
                </Button>
                <Button
                  onClick={submitCode}
                  disabled={isExecuting || isFormatting}
                  className="flex-1 sm:flex-none"
                >
                  {isExecuting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Submit
                </Button>
              </div>
            </div>

            <div className="flex-grow min-h-[200px] overflow-hidden">
              <CodeEditor code={code} language={language} onChange={setCode} />
            </div>
          </Card>

          {/* Test Results Card */}
          <Card className="p-4 h-[40%] overflow-auto">
            <TestResults
              results={results}
              isLoading={isExecuting}
              language={language}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
