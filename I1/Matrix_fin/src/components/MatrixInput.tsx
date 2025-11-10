import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Upload, Plus, Minus, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Matrix {
  data: number[][];
  vector: number[];
}

interface MatrixInputProps {
  onMatrixSubmit: (matrix: Matrix) => void;
}

type MatrixType = 'banded' | 'positive-definite' | 'diagonally-dominant' | 'general';

const MatrixInput: React.FC<MatrixInputProps> = ({ onMatrixSubmit }) => {
  const [size, setSize] = useState(3);
  const [matrixData, setMatrixData] = useState<number[][]>(
    Array(3).fill(null).map(() => Array(3).fill(0))
  );
  const [vectorData, setVectorData] = useState<number[]>(Array(3).fill(0));
  const [csvMatrix, setCsvMatrix] = useState<Matrix | null>(null);
  const [matrixType, setMatrixType] = useState<MatrixType>('general');
  const [bandwidth, setBandwidth] = useState(1);
  const [csvBandwidth, setCsvBandwidth] = useState(1);
  const [showConvergenceDialog, setShowConvergenceDialog] = useState(false);
  const { toast } = useToast();

  const matrixTypes = [
    { value: 'banded', label: 'Banded Matrix (Matrice Bande)', autoConvergent: false },
    { value: 'positive-definite', label: 'Positive Definite Matrix (Matrice Définie Positive)', autoConvergent: true },
    { value: 'diagonally-dominant', label: 'Diagonally Dominant Matrix (Matrice Diagonale Dominante)', autoConvergent: true },
    { value: 'general', label: 'General Matrix (Matrice Générale)', autoConvergent: false },
  ];

  const updateMatrixSize = (newSize: number) => {
    if (newSize < 2 || newSize > 10) return;
    
    setSize(newSize);
    
    const newMatrix = Array(newSize).fill(null).map((_, i) => 
      Array(newSize).fill(null).map((_, j) => 
        matrixData[i] && matrixData[i][j] !== undefined ? matrixData[i][j] : 0
      )
    );
    
    const newVector = Array(newSize).fill(null).map((_, i) => 
      vectorData[i] !== undefined ? vectorData[i] : 0
    );
    
    setMatrixData(newMatrix);
    setVectorData(newVector);
  };

  const isInBand = (i: number, j: number): boolean => {
    if (matrixType !== 'banded') return true;
    return Math.abs(i - j) <= bandwidth;
  };

  const isCsvInBand = (i: number, j: number): boolean => {
    if (matrixType !== 'banded') return true;
    return Math.abs(i - j) <= csvBandwidth;
  };

  const updateMatrixCell = (i: number, j: number, value: string) => {
    if (!isInBand(i, j)) return;
    
    const newMatrix = [...matrixData];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrixData(newMatrix);
  };

  const updateVectorCell = (i: number, value: string) => {
    const newVector = [...vectorData];
    newVector[i] = parseFloat(value) || 0;
    setVectorData(newVector);
  };

  const generateRandomMatrix = (type: MatrixType): { matrix: number[][], vector: number[] } => {
    const matrix = Array(size).fill(null).map(() => Array(size).fill(0));
    const vector = Array(size).fill(null).map(() => Math.random() * 10 - 5);

    switch (type) {
      case 'banded':
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (Math.abs(i - j) <= bandwidth) {
              if (i === j) {
                matrix[i][j] = Math.random() * 8 + 2;
              } else {
                matrix[i][j] = Math.random() * 4 - 2;
              }
            }
          }
        }
        break;

      case 'diagonally-dominant':
        for (let i = 0; i < size; i++) {
          let sumOffDiagonal = 0;
          for (let j = 0; j < size; j++) {
            if (i !== j) {
              matrix[i][j] = Math.random() * 2 - 1;
              sumOffDiagonal += Math.abs(matrix[i][j]);
            }
          }
          matrix[i][i] = sumOffDiagonal + Math.random() * 5 + 1;
        }
        break;

      case 'positive-definite':
        const temp = Array(size).fill(null).map(() => 
          Array(size).fill(null).map(() => Math.random() * 2 - 1)
        );
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
              sum += temp[k][i] * temp[k][j];
            }
            matrix[i][j] = sum;
          }
        }
        for (let i = 0; i < size; i++) {
          matrix[i][i] += 0.1;
        }
        break;

      case 'general':
        for (let i = 0; i < size; i++) {
          let sumOffDiagonal = 0;
          for (let j = 0; j < size; j++) {
            if (i !== j) {
              matrix[i][j] = Math.random() * 2 - 1;
              sumOffDiagonal += Math.abs(matrix[i][j]);
            }
          }
          matrix[i][i] = sumOffDiagonal + Math.random() * 2 + 0.5;
        }
        break;
    }

    return { matrix, vector };
  };

  const validateBandedMatrix = (matrix: number[][], bandwidth: number): boolean => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (Math.abs(i - j) > bandwidth && matrix[i][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  const checkConvergence = (matrix?: number[][]): boolean => {
    const checkMatrix = matrix || matrixData;
    
    if (matrixType === 'positive-definite' || matrixType === 'diagonally-dominant') {
      return true;
    }

    for (let i = 0; i < size; i++) {
      let diagonalElement = Math.abs(checkMatrix[i][i]);
      let sumOffDiagonal = 0;
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          sumOffDiagonal += Math.abs(checkMatrix[i][j]);
        }
      }
      if (diagonalElement <= sumOffDiagonal) {
        return false;
      }
    }
    return true;
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const resultsSection = document.querySelector('.results-section') || 
                           document.querySelector('[data-results]') ||
                           document.querySelector('main > div:last-child');
      if (resultsSection) {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleManualSubmit = () => {
    const isConvergent = checkConvergence();
    
    if (!isConvergent && matrixType !== 'positive-definite' && matrixType !== 'diagonally-dominant') {
      setShowConvergenceDialog(true);
      return;
    }

    onMatrixSubmit({
      data: matrixData,
      vector: vectorData
    });

    toast({
      title: "Matrix Loaded",
      description: `Matrix (${matrixTypes.find(t => t.value === matrixType)?.label}) and vector data has been successfully loaded.`,
    });

    scrollToResults();
  };

  const handleForceSubmit = () => {
    setShowConvergenceDialog(false);
    onMatrixSubmit({
      data: matrixData,
      vector: vectorData
    });

    toast({
      title: "Matrix Loaded with Warning",
      description: "Matrix loaded despite convergence concerns. Results may not be reliable.",
      variant: "destructive",
    });

    scrollToResults();
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.trim().split('\n');
        
        const parsedData: number[][] = [];
        const parsedVector: number[] = [];
        
        for (let i = 0; i < lines.length; i++) {
          const values = lines[i].split(',').map(val => {
            const trimmed = val.trim();
            if (trimmed === '_' || trimmed === '' || trimmed === '0') return 0;
            return parseFloat(trimmed);
          });
          if (values.length < 2) continue;
          
          parsedVector.push(values[values.length - 1]);
          parsedData.push(values.slice(0, -1));
        }

        if (parsedData.length !== parsedData[0].length) {
          throw new Error('Matrix must be square');
        }

        if (matrixType === 'banded' && !validateBandedMatrix(parsedData, csvBandwidth)) {
          toast({
            title: "Banded Matrix Validation Failed",
            description: `The uploaded matrix doesn't match the specified bandwidth (${csvBandwidth}). Elements outside the band should be 0 or marked with "_".`,
            variant: "destructive",
          });
          return;
        }

        const csvMatrixData = {
          data: parsedData,
          vector: parsedVector
        };

        setCsvMatrix(csvMatrixData);

        const newSize = parsedData.length;
        setSize(newSize);
        setMatrixData(parsedData);
        setVectorData(parsedVector);

        const isConvergent = checkConvergence(parsedData);
        
        if (!isConvergent && matrixType !== 'positive-definite' && matrixType !== 'diagonally-dominant') {
          setShowConvergenceDialog(true);
          return;
        }

        onMatrixSubmit(csvMatrixData);

        toast({
          title: "CSV Loaded Successfully",
          description: `Loaded ${newSize}x${newSize} matrix with vector from CSV file.`,
        });

        scrollToResults();

      } catch (error) {
        toast({
          title: "CSV Parse Error",
          description: "Please ensure your CSV has the format: matrix rows with vector as last column.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const clearCSV = () => {
    setCsvMatrix(null);
    const resetSize = 3;
    setSize(resetSize);
    setMatrixData(Array(resetSize).fill(null).map(() => Array(resetSize).fill(0)));
    setVectorData(Array(resetSize).fill(0));
    
    const fileInput = document.getElementById('csv-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    toast({
      title: "CSV Cleared",
      description: "Matrix data has been reset.",
    });
  };

  const setExampleMatrix = () => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const generateUntilConvergent = () => {
      const { matrix, vector } = generateRandomMatrix(matrixType);
      const isConvergent = checkConvergence(matrix);
      
      if (isConvergent || matrixType === 'positive-definite' || matrixType === 'diagonally-dominant' || attempts >= maxAttempts) {
        setMatrixData(matrix);
        setVectorData(vector);
        
        toast({
          title: "Example Matrix Generated",
          description: `Generated a ${matrixTypes.find(t => t.value === matrixType)?.label.toLowerCase()} example.`,
        });
      } else {
        attempts++;
        generateUntilConvergent();
      }
    };
    
    generateUntilConvergent();
  };

  const selectedMatrixType = matrixTypes.find(t => t.value === matrixType);

  return (
    <>
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Matrix Type
            </label>
            <Select value={matrixType} onValueChange={(value: MatrixType) => setMatrixType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select matrix type" />
              </SelectTrigger>
              <SelectContent>
                {matrixTypes.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className={type.autoConvergent ? "bg-green-50 text-green-800" : ""}
                  >
                    <div className="flex items-center gap-2">
                      {type.autoConvergent && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {matrixType === 'banded' && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Bandwidth
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBandwidth(Math.max(0, bandwidth - 1))}
                    disabled={bandwidth <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-4 py-2 border rounded">
                    {bandwidth}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBandwidth(Math.min(size - 1, bandwidth + 1))}
                    disabled={bandwidth >= size - 1}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Cells outside the band will be disabled (bandwidth = {bandwidth})
                </p>
              </div>
            )}
            
            {selectedMatrixType?.autoConvergent && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Auto-Convergent Matrix Type</AlertTitle>
                <AlertDescription className="text-green-700">
                  This matrix type guarantees convergence for the Jacobi method. No additional verification needed.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMatrixSize(size - 1)}
                disabled={size <= 2}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">Size: {size}×{size}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMatrixSize(size + 1)}
                disabled={size >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={setExampleMatrix}>
              Load Example
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Matrix A</h4>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {matrixData.map((row, i) =>
                  row.map((cell, j) => {
                    const isDisabled = !isInBand(i, j);
                    return (
                      <input
                        key={`${i}-${j}`}
                        type="number"
                        value={isDisabled ? 0 : cell}
                        onChange={(e) => updateMatrixCell(i, j, e.target.value)}
                        className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isDisabled 
                            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300'
                        }`}
                        step="any"
                        disabled={isDisabled}
                      />
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Vector b</h4>
              <div className="space-y-1">
                {vectorData.map((cell, i) => (
                  <input
                    key={i}
                    type="number"
                    value={cell}
                    onChange={(e) => updateVectorCell(i, e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    step="any"
                  />
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleManualSubmit} className="w-full">
            Load Matrix
          </Button>
        </TabsContent>

        <TabsContent value="csv" className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Matrix Type
            </label>
            <Select value={matrixType} onValueChange={(value: MatrixType) => setMatrixType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select matrix type" />
              </SelectTrigger>
              <SelectContent>
                {matrixTypes.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className={type.autoConvergent ? "bg-green-50 text-green-800" : ""}
                  >
                    <div className="flex items-center gap-2">
                      {type.autoConvergent && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {matrixType === 'banded' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Expected Bandwidth
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCsvBandwidth(Math.max(0, csvBandwidth - 1))}
                  disabled={csvBandwidth <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-4 py-2 border rounded">
                  {csvBandwidth}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCsvBandwidth(csvBandwidth + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                CSV should have zeros or "_" outside bandwidth {csvBandwidth}
              </p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                CSV Upload & Matrix Visualization
                {csvMatrix && (
                  <Button variant="outline" size="sm" onClick={clearCSV}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Upload a CSV file and preview your matrix data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  Click to upload CSV file or drag and drop
                </label>
              </div>
              
              <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                <strong>CSV Format Example:</strong><br />
                4,-1,0,1<br />
                -1,4,-1,2<br />
                0,-1,4,3
                {matrixType === 'banded' && (
                  <>
                    <br /><br />
                    <strong>For banded matrices:</strong> Use "_" or 0 for elements outside the band
                  </>
                )}
              </div>

              {csvMatrix && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Matrix Preview</h4>
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-gray-700">Matrix A</h5>
                        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
                          {csvMatrix.data.length}×{csvMatrix.data.length}
                        </span>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-lg border-2 border-blue-200">
                        <div className="overflow-auto">
                          <div className="grid gap-1 min-w-max" style={{ 
                            gridTemplateColumns: `repeat(${csvMatrix.data.length}, minmax(60px, 1fr))` 
                          }}>
                            {csvMatrix.data.map((row, i) =>
                              row.map((cell, j) => {
                                const isOutsideBand = !isCsvInBand(i, j);
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`border border-blue-300 rounded px-2 py-2 text-center text-sm font-mono shadow-sm hover:shadow-md transition-shadow ${
                                      isOutsideBand 
                                        ? 'bg-gray-200 border-gray-300 text-gray-400' 
                                        : 'bg-white hover:bg-blue-50'
                                    }`}
                                  >
                                    {cell.toFixed(2)}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-gray-700">Vector b</h5>
                        <span className="text-xs text-gray-500 bg-teal-100 px-2 py-1 rounded">
                          {csvMatrix.vector.length}×1
                        </span>
                      </div>
                      <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-4 rounded-lg border-2 border-teal-200">
                        <div className="flex flex-col items-center space-y-1">
                          {csvMatrix.vector.map((value, i) => (
                            <div
                              key={i}
                              className="bg-white border border-teal-300 rounded px-3 py-2 text-center text-sm font-mono shadow-sm hover:shadow-md transition-shadow w-full"
                            >
                              {value.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg">
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-800">System</div>
                        <div className="text-blue-600">Ax = b</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-teal-800">Size</div>
                        <div className="text-teal-600">{csvMatrix.data.length} equations</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">Variables</div>
                        <div className="text-gray-600">{csvMatrix.data.length} unknowns</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showConvergenceDialog} onOpenChange={setShowConvergenceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Convergence Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              The matrix you entered may not converge using the Jacobi method. This could result in:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>No solution or divergent results</li>
                <li>Excessive computation time</li>
                <li>Unreliable numerical results</li>
              </ul>
              <br />
              <strong>Recommendations:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Modify your matrix to be diagonally dominant</li>
                <li>Select "Diagonally Dominant" or "Positive Definite" matrix type if applicable</li>
                <li>Use a different numerical method</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel & Modify</AlertDialogCancel>
            <AlertDialogAction onClick={handleForceSubmit} className="bg-yellow-600 hover:bg-yellow-700">
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MatrixInput;
