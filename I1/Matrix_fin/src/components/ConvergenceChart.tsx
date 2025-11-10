
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Target } from 'lucide-react';

interface ConvergenceChartProps {
  iterationHistory: number[][];
  converged: boolean;
  iterations: number;
}

const ConvergenceChart: React.FC<ConvergenceChartProps> = ({ 
  iterationHistory, 
  converged, 
  iterations 
}) => {
  // Calculate error between consecutive iterations
  const calculateConvergenceData = () => {
    const data = [];
    
    for (let i = 1; i < iterationHistory.length; i++) {
      const currentIteration = iterationHistory[i];
      const previousIteration = iterationHistory[i - 1];
      
      // Calculate maximum absolute difference between iterations
      let maxError = 0;
      for (let j = 0; j < currentIteration.length; j++) {
        const error = Math.abs(currentIteration[j] - previousIteration[j]);
        maxError = Math.max(maxError, error);
      }
      
      // Calculate norm of current solution for scaling
      const solutionNorm = Math.sqrt(currentIteration.reduce((sum, val) => sum + val * val, 0));
      
      data.push({
        iteration: i,
        maxError: maxError,
        solutionNorm: solutionNorm,
        // Individual variable values for the first few variables
        x1: currentIteration[0] || 0,
        x2: currentIteration[1] || 0,
        x3: currentIteration[2] || 0,
      });
    }
    
    return data;
  };

  const convergenceData = calculateConvergenceData();
  const variableCount = iterationHistory[0]?.length || 0;

  return (
    <div className="space-y-6">
      {/* Error Convergence Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-blue-600" />
            Error Convergence
          </CardTitle>
          <CardDescription>
            Maximum error between consecutive iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={convergenceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="iteration" 
                  label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  scale="log"
                  domain={['auto', 'auto']}
                  label={{ value: 'Max Error (log scale)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [value.toExponential(3), 'Max Error']}
                  labelFormatter={(label) => `Iteration ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="maxError" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#2563eb', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-900">{iterations}</div>
              <div className="text-sm text-blue-600">Total Iterations</div>
            </div>
            
            <div className={`p-3 rounded-lg text-center ${
              converged ? 'bg-green-50' : 'bg-yellow-50'
            }`}>
              <div className={`text-2xl font-bold ${
                converged ? 'text-green-900' : 'text-yellow-900'
              }`}>
                {converged ? '✓' : '○'}
              </div>
              <div className={`text-sm ${
                converged ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {converged ? 'Converged' : 'Not Converged'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-900">
                {convergenceData[convergenceData.length - 1]?.maxError.toExponential(1) || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Final Error</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution Evolution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Solution Evolution
          </CardTitle>
          <CardDescription>
            How solution variables change during iterations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={convergenceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="iteration" 
                  label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Variable Value', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [value.toFixed(4), name]}
                  labelFormatter={(label) => `Iteration ${label}`}
                />
                <Legend />
                
                {variableCount >= 1 && (
                  <Line 
                    type="monotone" 
                    dataKey="x1" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="x₁"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                )}
                
                {variableCount >= 2 && (
                  <Line 
                    type="monotone" 
                    dataKey="x2" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="x₂"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                )}
                
                {variableCount >= 3 && (
                  <Line 
                    type="monotone" 
                    dataKey="x3" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="x₃"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {variableCount > 3 && (
            <div className="mt-2 text-center text-sm text-gray-500">
              Showing first 3 variables only (x₁, x₂, x₃)
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvergenceChart;
