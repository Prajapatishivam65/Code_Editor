import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface TestResult {
  input: any[]
  expectedOutput: string
  actualOutput: string
  passed: boolean
  error?: string
}

interface TestResultsProps {
  results: TestResult[] | null
  isLoading: boolean
}

export default function TestResults({ results, isLoading }: TestResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Running your code...</p>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p>Run your code to see results</p>
      </div>
    )
  }

  const passedCount = results.filter((result) => result.passed).length
  const totalCount = results.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Test Results</h3>
        <div className="text-sm">
          Passed:{" "}
          <span className="font-medium">
            {passedCount}/{totalCount}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-3 rounded-md border ${
              result.passed
                ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
                : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-2 mt-0.5">
                {result.passed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex-1 text-sm">
                <div className="font-medium mb-1">Test Case {index + 1}</div>
                <div className="font-mono text-xs space-y-1">
                  <div>
                    <span className="text-muted-foreground">Input:</span> {JSON.stringify(result.input)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected:</span> {result.expectedOutput}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Actual:</span> {result.actualOutput}
                  </div>
                  {result.error && <div className="text-red-500">{result.error}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

