
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, CheckCircle, AlertCircle, Clock, IterationCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConvergenceChart from './ConvergenceChart';

interface Matrix {
  data: number[][];
  vector: number[];
}

interface JacobiResult {
  solution: number[];
  iterations: number;
  convergenceTime: number;
  iterationHistory: number[][];
  converged: boolean;
}

interface JacobiResultsProps {
  result: JacobiResult;
  matrix: Matrix;
  epsilon: number;
  maxIterations: number;
}

const JacobiResults: React.FC<JacobiResultsProps> = ({ 
  result, 
  matrix, 
  epsilon, 
  maxIterations 
}) => {
  const [selectedIteration, setSelectedIteration] = useState(result.iterations);
  const { toast } = useToast();

  const downloadReport = () => {
    const report = generateMarkdownReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jacobi-method-report.md';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Jacobi method report has been downloaded as a Markdown file.",
    });
  };

  const generateMarkdownReport = (): string => {
    const matrixStr = matrix.data.map(row => 
      '| ' + row.map(val => val.toFixed(4)).join(' | ') + ' |'
    ).join('\n');
    
    const vectorStr = matrix.vector.map(val => val.toFixed(4)).join(', ');
    const solutionStr = result.solution.map(val => val.toFixed(6)).join(', ');

    return `# Jacobi Method Calculation Report

## Problem Setup

**Matrix A:**
${matrixStr}

**Vector b:** [${vectorStr}]

**System:** Ax = b

## Calculation Parameters

- **Epsilon (ε):** ${epsilon}
- **Maximum Iterations:** ${maxIterations}

## Results

### Solution Vector
**x = [${solutionStr}]**

### Convergence Analysis
- **Converged:** ${result.converged ? 'Yes' : 'No'}
- **Iterations Required:** ${result.iterations}
- **Computation Time:** ${result.convergenceTime.toFixed(2)} ms

### Iteration History

| Iteration | x₁ | x₂ | x₃ |
|-----------|----|----|----| 
${result.iterationHistory.map((iteration, i) => 
  `| ${i} | ${iteration.map(val => val.toFixed(6)).join(' | ')} |`
).join('\n')}

## Complexity Analysis

- **Time Complexity:** O(n²k) where n is matrix size and k is iterations
- **Space Complexity:** O(n²) for matrix storage
- **Convergence Rate:** ${result.converged ? 'Linear' : 'Did not converge'}

## Method Information

The Jacobi method is an iterative algorithm for solving systems of linear equations. It works by decomposing the matrix A into diagonal (D) and off-diagonal (L+U) components, then iteratively updating the solution using:

x^(k+1) = D⁻¹(b - (L+U)x^(k))

The method converges for diagonally dominant matrices and provides a simple parallel implementation for large sparse systems.

---
*Report generated on ${new Date().toLocaleString()}*
`;
  };

  const formatNumber = (num: number): string => {
    return Math.abs(num) < 1e-10 ? '0' : num.toFixed(6);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {result.converged ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
          Calculation Results
        </CardTitle>
        <CardDescription>
          {result.converged 
            ? `Converged in ${result.iterations} iterations` 
            : `Did not converge after ${result.iterations} iterations`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <IterationCw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{result.iterations}</div>
            <div className="text-sm text-blue-600">Iterations</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">
              {result.convergenceTime.toFixed(1)}ms
            </div>
            <div className="text-sm text-green-600">Computation Time</div>
          </div>
          
          <div className={`p-4 rounded-lg text-center ${
            result.converged ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            {result.converged ? (
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            )}
            <div className={`text-sm ${
              result.converged ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {result.converged ? 'Converged' : 'Not Converged'}
            </div>
          </div>
        </div>

        <Tabs defaultValue="solution" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="solution">Final Solution</TabsTrigger>
            <TabsTrigger value="convergence">Convergence</TabsTrigger>
            <TabsTrigger value="iterations">Iterations</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="solution" className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-3">Solution Vector (x)</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid gap-2">
                  {result.solution.map((value, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-medium">x₍{i+1}₎ =</span>
                      <span className="font-mono text-lg">{formatNumber(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="convergence" className="space-y-4">
            <ConvergenceChart
              iterationHistory={result.iterationHistory}
              converged={result.converged}
              iterations={result.iterations}
            />
          </TabsContent>
          
          <TabsContent value="iterations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Iteration History</h4>
              <select
                value={selectedIteration}
                onChange={(e) => setSelectedIteration(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                {result.iterationHistory.map((_, i) => (
                  <option key={i} value={i}>
                    Iteration {i}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                {result.iterationHistory[selectedIteration]?.map((value, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-medium">x₍{i+1}₎⁽{selectedIteration}⁾ =</span>
                    <span className="font-mono">{formatNumber(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Iteration progression visualization */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Convergence Progress</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {result.iterationHistory.slice(0, 10).map((iteration, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center space-x-2 p-2 rounded text-sm ${
                      i === selectedIteration ? 'bg-blue-100' : 'bg-gray-50'
                    }`}
                  >
                    <span className="w-8 text-center font-medium">{i}</span>
                    <div className="flex-1 flex space-x-2">
                      {iteration.map((val, j) => (
                        <span key={j} className="font-mono text-xs">
                          {formatNumber(val)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {result.iterationHistory.length > 10 && (
                  <div className="text-center text-sm text-gray-500">
                    ... and {result.iterationHistory.length - 10} more iterations
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Convergence Analysis</h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Method: Jacobi Iterative Method</li>
                  <li>• Precision: ε = {epsilon}</li>
                  <li>• Status: {result.converged ? 'Converged' : 'Maximum iterations reached'}</li>
                  <li>• Rate: Linear convergence (when applicable)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-2">Complexity Metrics</h5>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Time Complexity: O(n²k) = O({matrix.data.length}² × {result.iterations})</li>
                  <li>• Space Complexity: O(n²) = O({matrix.data.length}²)</li>
                  <li>• Iterations Required: {result.iterations}/{maxIterations}</li>
                  <li>• Computation Time: {result.convergenceTime.toFixed(2)} ms</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={downloadReport} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Markdown Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default JacobiResults;
