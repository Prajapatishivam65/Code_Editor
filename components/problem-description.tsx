import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  timeLimit?: string;
  memoryLimit?: string;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({
  problem,
}: ProblemDescriptionProps) {
  // Map difficulty to color
  const difficultyColor =
    {
      Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
      Medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
      Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
    }[problem.difficulty] ||
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{problem.title}</h2>
          <Badge className={difficultyColor}>{problem.difficulty}</Badge>
        </div>
        {(problem.timeLimit || problem.memoryLimit) && (
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            {problem.timeLimit && <p>Time Limit: {problem.timeLimit}</p>}
            {problem.memoryLimit && <p>Memory Limit: {problem.memoryLimit}</p>}
          </div>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: problem.description.replace(
              /`([^`]+)`/g,
              "<code>$1</code>"
            ),
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Constraints</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {problem.constraints.map((constraint, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{
                __html: constraint.replace(/`([^`]+)`/g, "<code>$1</code>"),
              }}
            />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Examples</h3>
        <div className="space-y-4">
          {problem.examples.map((example, index) => (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Input:</h4>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    {example.input}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Output:</h4>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    {example.output}
                  </pre>
                </div>
              </div>
              {example.explanation && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Explanation:</h4>
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: example.explanation.replace(
                        /`([^`]+)`/g,
                        "<code>$1</code>"
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {problem.hints && problem.hints.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="hints">
            <AccordionTrigger className="text-lg font-semibold">
              Hints
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2 pl-2">
                {problem.hints.map((hint, index) => (
                  <li key={index} className="text-sm">
                    {hint}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
