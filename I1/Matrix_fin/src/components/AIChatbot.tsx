import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatbotProps {
  className?: string;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant for JacoMat Pro. I can help you with questions about mathematics, linear algebra, the Jacobi Method, matrix types, CSV input, and solution convergence. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced pattern matching for mathematics and website topics
    const lowerMessage = userMessage.toLowerCase();
    
    // Mathematics and Linear Algebra topics
    if (lowerMessage.includes('linear algebra') || lowerMessage.includes('matrix multiplication') || lowerMessage.includes('determinant')) {
      return "Linear algebra is a branch of mathematics dealing with vector spaces and linear mappings. Key concepts include:\n\n• **Matrix Operations**: Addition, multiplication, transposition\n• **Determinants**: Scalar values that determine if a matrix is invertible\n• **Eigenvalues & Eigenvectors**: Special scalars and vectors for linear transformations\n• **Vector Spaces**: Mathematical structures with vectors that can be added and scaled\n\nThe Jacobi method is particularly useful for solving large sparse linear systems!";
    }
    
    if (lowerMessage.includes('eigenvalue') || lowerMessage.includes('eigenvector')) {
      return "Eigenvalues and eigenvectors are fundamental concepts in linear algebra:\n\n• **Eigenvalue (λ)**: A scalar such that Av = λv for some non-zero vector v\n• **Eigenvector (v)**: A non-zero vector that only changes by a scalar factor when a linear transformation is applied\n\nThey're crucial for:\n- Principal Component Analysis (PCA)\n- Stability analysis of systems\n- Understanding matrix behavior\n- Spectral analysis\n\nFor the Jacobi method, the spectral radius (largest eigenvalue magnitude) determines convergence!";
    }
    
    if (lowerMessage.includes('derivative') || lowerMessage.includes('calculus') || lowerMessage.includes('integral')) {
      return "Calculus is the mathematical study of continuous change:\n\n• **Derivatives**: Measure rates of change (slopes of tangent lines)\n• **Integrals**: Measure areas under curves and accumulation\n• **Fundamental Theorem**: Links derivatives and integrals\n\n**Applications in numerical methods**:\n- Newton's method uses derivatives for root finding\n- Gradient descent uses partial derivatives for optimization\n- Numerical integration approximates definite integrals\n\nWhile the Jacobi method doesn't directly use calculus, optimization methods that improve convergence often do!";
    }
    
    if (lowerMessage.includes('gauss') || lowerMessage.includes('elimination') || lowerMessage.includes('lu decomposition')) {
      return "Gaussian elimination and LU decomposition are direct methods for solving linear systems:\n\n**Gaussian Elimination**:\n1. Forward elimination to create upper triangular matrix\n2. Back substitution to find solution\n\n**LU Decomposition**:\n- Factors matrix A = LU (Lower × Upper triangular)\n- Solve Ly = b, then Ux = y\n\n**Comparison with Jacobi**:\n- Direct methods: Exact solution (ignoring rounding errors)\n- Iterative methods (Jacobi): Approximate solution that improves over iterations\n- Jacobi is better for large sparse matrices!";
    }
    
    if (lowerMessage.includes('statistics') || lowerMessage.includes('probability') || lowerMessage.includes('normal distribution')) {
      return "Statistics and probability are essential mathematical fields:\n\n**Key Concepts**:\n• **Probability**: Measure of likelihood (0 to 1)\n• **Distributions**: Mathematical functions describing data patterns\n• **Central Limit Theorem**: Sample means approach normal distribution\n• **Correlation vs Causation**: Important distinction in data analysis\n\n**Connection to Linear Algebra**:\n- Covariance matrices in multivariate statistics\n- Principal Component Analysis for dimensionality reduction\n- Regression analysis uses matrix operations\n- Monte Carlo methods for numerical integration";
    }
    
    // Jacobi Method topics
    if (lowerMessage.includes('jacobi') || lowerMessage.includes('method')) {
      return "The Jacobi method is an iterative algorithm for solving systems of linear equations Ax = b:\n\n**Algorithm Steps**:\n1. Decompose A = D + R (diagonal + remainder)\n2. Rearrange: Dx^(k+1) = b - Rx^(k)\n3. Update: x^(k+1) = D^(-1)(b - Rx^(k))\n4. Repeat until convergence\n\n**Convergence Conditions**:\n- Diagonally dominant matrices guarantee convergence\n- Spectral radius < 1 ensures convergence\n- Positive definite matrices often converge\n\n**Advantages**: Simple, parallelizable, memory efficient for sparse matrices";
    }
    
    if (lowerMessage.includes('matrix') || lowerMessage.includes('banded') || lowerMessage.includes('diagonal')) {
      return "JacoMat Pro supports several matrix types with different mathematical properties:\n\n• **Banded Matrix**: Non-zero elements only within bandwidth k around diagonal\n  - Storage efficient: O(nk) instead of O(n²)\n  - Faster operations for many algorithms\n\n• **Positive Definite**: All eigenvalues > 0\n  - Guarantees unique solution and Jacobi convergence\n  - Often arises from physical problems\n\n• **Diagonally Dominant**: |a_ii| > Σ|a_ij| for j≠i\n  - Ensures Jacobi method convergence\n  - Common in numerical PDEs\n\n• **General Matrix**: No special structure\n  - May or may not converge\n  - Requires convergence analysis";
    }
    
    if (lowerMessage.includes('csv') || lowerMessage.includes('upload') || lowerMessage.includes('file') || lowerMessage.includes('bandwidth')) {
      return "For CSV input with mathematical matrices:\n\n**Format Requirements**:\n1. Each row represents a matrix equation\n2. Last column contains the right-hand side vector b\n3. Use underscores (_) or zeros for elements outside bandwidth\n\n**Banded Matrix Visualization**:\n- Elements within bandwidth: normal display\n- Elements outside bandwidth: grayed out (like manual input)\n- Bandwidth k means |i-j| ≤ k for non-zero elements\n\n**Example 4×4 banded matrix (bandwidth=1)**:\n```\n4,-1,0,0,5\n-1,4,-1,0,8\n0,-1,4,-1,7\n0,0,-1,4,6\n```\n\nThis creates a tridiagonal system commonly found in numerical PDEs!";
    }
    
    if (lowerMessage.includes('convergence') || lowerMessage.includes('error') || lowerMessage.includes('iteration')) {
      return "Convergence analysis is crucial for iterative methods:\n\n**Mathematical Theory**:\n- **Spectral Radius**: ρ(T) = max|λᵢ| where T is iteration matrix\n- **Convergence**: Method converges iff ρ(T) < 1\n- **Rate**: Error decreases by factor ρ(T) each iteration\n\n**Practical Indicators**:\n• **Residual**: ||Ax^(k) - b|| measures how well current solution satisfies equations\n• **Solution Change**: ||x^(k+1) - x^(k)|| measures stability\n• **Relative Error**: Normalized measures for comparison\n\n**Visualization Features**:\n- Real-time error reduction charts\n- Solution evolution plots\n- Convergence rate estimation\n\nGreen indicates successful convergence, red suggests potential divergence!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('?')) {
      return "I can help you with:\n\n🔹 **Mathematics Topics**:\n  - Linear algebra, calculus, statistics\n  - Matrix theory and operations\n  - Numerical methods and algorithms\n\n🔹 **Jacobi Method**:\n  - Theory, implementation, convergence\n  - Comparison with other methods\n  - Mathematical foundations\n\n🔹 **Matrix Types**:\n  - Mathematical properties and applications\n  - Choosing the right type for your problem\n  - Convergence guarantees\n\n🔹 **CSV Input & Visualization**:\n  - Formatting guidelines\n  - Bandwidth specification for banded matrices\n  - Error handling and validation\n\nJust ask me anything about these topics!";
    }
    
    return "I understand you're asking about mathematics or the Jacobi method. I can help with linear algebra, calculus, statistics, matrix theory, numerical methods, CSV formatting, convergence analysis, or general questions about mathematical concepts. Could you be more specific about what you'd like to learn?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await simulateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        text: "Chat history cleared. How can I help you with mathematics or JacoMat Pro?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const formatMessage = (text: string) => {
    // Basic markdown formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-2 rounded text-sm"><code>$1</code></pre>')
      .replace(/🔹/g, '•');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`w-80 sm:w-96 bg-white/95 backdrop-blur-sm shadow-2xl border-0 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-96'
        }`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          {!isMinimized && (
            <CardContent className="flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                      />
                      <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about mathematics, Jacobi method, matrices..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Clear button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear History
              </Button>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default AIChatbot;
