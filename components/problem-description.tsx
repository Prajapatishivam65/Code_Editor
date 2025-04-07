import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  hints?: string[];
  starterCode: Record<string, string>;
  testCases: Array<{ input: any[]; expectedOutput: string }>;
  hiddenTestCases: Array<{ input: any[]; expectedOutput: string }>;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({
  problem,
}: ProblemDescriptionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600";
      case "hard":
        return "bg-rose-500 hover:bg-rose-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight">{problem.title}</h2>
        <Badge
          variant="outline"
          className={`${getDifficultyColor(problem.difficulty)} text-white px-3 py-1`}
        >
          {problem.difficulty}
        </Badge>
      </div>

      <Separator />

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
          {problem.description}
        </p>
      </div>

      {problem.constraints && problem.constraints.length > 0 && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Constraints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-sm">
                  <code className="text-foreground font-mono">
                    {constraint}
                  </code>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {problem.examples && problem.examples.length > 0 && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="rounded-md border">
                  <div className="bg-muted px-4 py-2 rounded-t-md border-b">
                    <span className="text-xs font-medium">
                      Example {index + 1}
                    </span>
                  </div>
                  <div className="p-4 space-y-3 text-sm font-mono">
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground mb-1">
                        Input
                      </span>
                      <div className="bg-muted/50 p-2 rounded-md overflow-x-auto">
                        {example.input}
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground mb-1">
                        Output
                      </span>
                      <div className="bg-muted/50 p-2 rounded-md overflow-x-auto">
                        {example.output}
                      </div>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="block text-xs font-medium text-muted-foreground mb-1">
                          Explanation
                        </span>
                        <div className="text-sm">{example.explanation}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {problem.testCases.map((testCase, index) => (
              <div
                key={index}
                className="text-sm font-mono rounded-md border overflow-hidden"
              >
                <div className="bg-muted px-3 py-1.5 border-b">
                  <span className="text-xs font-medium">Test {index + 1}</span>
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <span className="block text-xs font-medium text-muted-foreground mb-1">
                      Input
                    </span>
                    <div className="bg-muted/50 p-2 rounded-md overflow-x-auto">
                      {JSON.stringify(testCase.input)}
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted-foreground mb-1">
                      Expected
                    </span>
                    <div className="bg-muted/50 p-2 rounded-md overflow-x-auto">
                      {testCase.expectedOutput}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {problem.hints && problem.hints.length > 0 && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {problem.hints.map((hint, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start p-3 bg-muted/40 rounded-md"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
