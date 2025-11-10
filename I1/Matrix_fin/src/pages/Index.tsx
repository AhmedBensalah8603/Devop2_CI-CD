
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MatrixInput from '@/components/MatrixInput';
import JacobiResults from '@/components/JacobiResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Upload, Download, Info, User, BookOpen, Award } from 'lucide-react';

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

const Index = () => {
  const [matrix, setMatrix] = useState<Matrix | null>(null);
  const [result, setResult] = useState<JacobiResult | null>(null);
  const [epsilon, setEpsilon] = useState(1e-6);
  const [maxIterations, setMaxIterations] = useState(100);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleMatrixSubmit = (matrixData: Matrix) => {
    setMatrix(matrixData);
    setResult(null);
    
    // Auto-scroll to results section after matrix is loaded
    setTimeout(() => {
      const resultsSection = document.querySelector('[data-results]');
      if (resultsSection) {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const calculateJacobi = () => {
    if (!matrix) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const result = performJacobiMethod(matrix, epsilon, maxIterations);
      setResult(result);
      setIsCalculating(false);
      
      // Auto-scroll to results section after calculation
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results]');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }, 1000);
  };

  const performJacobiMethod = (matrix: Matrix, epsilon: number, maxIter: number): JacobiResult => {
    const A = matrix.data;
    const b = matrix.vector;
    const n = A.length;
    let x = new Array(n).fill(0);
    let xNew = new Array(n).fill(0);
    const iterationHistory: number[][] = [];
    let iterations = 0;
    let converged = false;
    const startTime = performance.now();

    for (let iter = 0; iter < maxIter; iter++) {
      iterations++;
      iterationHistory.push([...x]);

      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            sum += A[i][j] * x[j];
          }
        }
        xNew[i] = (b[i] - sum) / A[i][i];
      }

      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
        maxDiff = Math.max(maxDiff, Math.abs(xNew[i] - x[i]));
      }

      x = [...xNew];

      if (maxDiff < epsilon) {
        converged = true;
        break;
      }
    }

    const endTime = performance.now();
    iterationHistory.push([...x]);

    return {
      solution: x,
      iterations,
      convergenceTime: endTime - startTime,
      iterationHistory,
      converged
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 animate-fade-in">
      {/* Header with enhanced styling */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                JacoMat Pro
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-blue-700 font-semibold px-4 py-2 rounded-lg bg-blue-100/50 transition-all duration-300 hover:bg-blue-200/70 hover:scale-105"
              >
                Calculator
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 hover:text-blue-700 hover:bg-blue-50 hover:scale-105"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 hover:text-blue-700 hover:bg-blue-50 hover:scale-105"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with enhanced animations */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6 animate-scale-in">
            Jacobi Method Matrix Solver
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in [animation-delay:0.2s]">
            Solve systems of linear equations using the iterative Jacobi method. 
            Input your matrix manually or upload a CSV file for instant calculations with beautiful visualizations.
          </p>
          
          <div className="max-w-6xl mx-auto mb-12 animate-fade-in [animation-delay:0.4s]">
            <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
                    <Info className="h-8 w-8 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                    What is the Jacobi Method?
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
                        <img 
                          src="https://i.imgur.com/eimPD1n.jpeg"
                          alt="Carl Gustav Jacob Jacobi"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full p-3">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Carl Gustav Jacob Jacobi</h3>
                      <p className="text-blue-600 font-semibold mb-2">(1804 - 1851)</p>
                      <p className="text-gray-600 text-sm max-w-xs">
                        German mathematician who made fundamental contributions to elliptic functions, 
                        dynamics, differential equations, and number theory.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-semibold text-gray-800">The Method Explained</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg mb-4">
                        The Jacobi method is an iterative algorithm for solving systems of linear equations Ax = b. 
                        It decomposes the matrix A into diagonal and off-diagonal components, then iteratively updates 
                        the solution vector until convergence.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/70 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">∞</div>
                          <div className="text-sm text-gray-600">Iterative Process</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-teal-600 mb-1">⚡</div>
                          <div className="text-sm text-gray-600">Fast Convergence</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Applications</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Large sparse matrix systems</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Parallel computing applications</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Numerical linear algebra</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Grid - Centered Layout */}
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Input Section - Enhanced */}
              <div className="space-y-8 animate-slide-in-left">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-5 w-5 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                        Matrix Input
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Enter your matrix and vector data manually or upload a CSV file
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MatrixInput onMatrixSubmit={handleMatrixSubmit} />
                  </CardContent>
                </Card>

                {/* Enhanced Calculation Parameters */}
                {matrix && (
                  <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-xl bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                        Calculation Parameters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                          Epsilon Precision
                        </label>
                        <input
                          type="number"
                          value={epsilon}
                          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                          step="1e-10"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                          placeholder="1e-6"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                          Maximum Iterations
                        </label>
                        <input
                          type="number"
                          value={maxIterations}
                          onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                          placeholder="100"
                        />
                      </div>
                      <Button 
                        onClick={calculateJacobi} 
                        disabled={isCalculating}
                        className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 relative overflow-hidden group"
                      >
                        <span className="relative z-10">
                          {isCalculating ? 'Calculating...' : 'Solve with Jacobi Method'}
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Section - Enhanced with data attribute for scroll targeting */}
              <div className="animate-slide-in-right results-section" data-results>
                {result ? (
                  <div className="animate-fade-in">
                    <JacobiResults 
                      result={result} 
                      matrix={matrix!}
                      epsilon={epsilon}
                      maxIterations={maxIterations}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/60 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full mb-4">
                          <Calculator className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Calculate</h3>
                        <p className="text-gray-500">Enter your matrix data to see results here</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">JacoMat Pro</span>
            </div>
            <p className="text-blue-200 mb-4">Advanced numerical computing made simple</p>
            <p className="text-blue-300">&copy; 2024-2025 JacoMat Pro. Developed By Ahmed Bensalah.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
