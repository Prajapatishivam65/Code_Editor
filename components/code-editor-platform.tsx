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
import { formatCode } from "@/lib/code-formatter";
import { Loader2, Play, Send, FileCode } from "lucide-react";

// Sample problem data
const sampleProblem = {
  id: "two-sum",
  title: "Two Sum",
  description:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n" +
    "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  difficulty: "Easy",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists",
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
  hints: [
    "Can you use a hash map to solve this problem?",
    "For each element, check if the target minus the current element exists in the array.",
    "A brute force approach would be O(n²), but there's a more efficient O(n) solution.",
  ],
  starterCode: {
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}`,
    cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {0, 0};
}`,
    python: `def two_sum(nums, target):
    # Your code here
    return [0, 0]`,
  },
  testCases: [
    { input: [[2, 7, 11, 15], 9], expectedOutput: "[0, 1]" },
    { input: [[3, 2, 4], 6], expectedOutput: "[1, 2]" },
    { input: [[3, 3], 6], expectedOutput: "[0, 1]" },
  ],
  hiddenTestCases: [
    { input: [[1, 2, 3, 4, 5], 9], expectedOutput: "[3, 4]" },
    { input: [[5, 25, 75], 100], expectedOutput: "[1, 2]" },
    { input: [[-1, -2, -3, -4, -5], -8], expectedOutput: "[2, 4]" },
    { input: [[0, 4, 3, 0], 0], expectedOutput: "[0, 3]" },
  ],
};

export default function CodeEditorPlatform() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(sampleProblem.starterCode.python);
  const [results, setResults] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(
      sampleProblem.starterCode[
        newLanguage as keyof typeof sampleProblem.starterCode
      ] || ""
    );
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

  const runCode = async () => {
    setIsExecuting(true);
    setResults(null);

    try {
      const executionResults = await executeCode(
        code,
        language,
        sampleProblem.testCases
      );
      setResults(executionResults);
    } catch (error) {
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
        ...sampleProblem.testCases,
        ...sampleProblem.hiddenTestCases,
      ];
      const executionResults = await executeCode(code, language, allTestCases);
      setResults(executionResults);

      // Check if all test cases passed
      const allPassed = executionResults.every((result: any) => result.passed);

      toast({
        title: allPassed ? "All tests passed!" : "Some tests failed",
        description: allPassed
          ? "Congratulations! Your solution passed all test cases."
          : "Your solution didn't pass all test cases. Please review and try again.",
        variant: allPassed ? "default" : "destructive",
      });
    } catch (error) {
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

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold">Code Challenge Platform</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
        <Card className="p-4 lg:col-span-1 overflow-auto">
          <ProblemDescription problem={sampleProblem} />
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="p-4 flex-grow flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  defaultValue="python"
                  onValueChange={handleLanguageChange}
                  value={language}
                >
                  <SelectTrigger className="w-[180px]">
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
                  Run Code
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

            <div className="flex-grow">
              <CodeEditor code={code} language={language} onChange={setCode} />
            </div>
          </Card>

          <Card className="p-4 h-1/3 overflow-auto">
            <TestResults results={results} isLoading={isExecuting} />
          </Card>
        </div>
      </div>
    </div>
  );
}
