
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Users, Award, Target, User, CheckCircle } from 'lucide-react';

const About = () => {
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
                className="text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 hover:text-blue-700 hover:bg-blue-50 hover:scale-105"
              >
                Calculator
              </Link>
              <Link 
                to="/about" 
                className="text-blue-700 font-semibold px-4 py-2 rounded-lg bg-blue-100/50 transition-all duration-300 hover:bg-blue-200/70 hover:scale-105"
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
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6 animate-scale-in">
            About JacoMat Pro
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in [animation-delay:0.2s]">
            Empowering students, researchers, and professionals with advanced numerical computing solutions
            for linear algebra problems.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-slide-in-left">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-3xl mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent font-bold">
                  Our Mission
                </span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg leading-relaxed">
                Transforming complex mathematical computations into accessible, educational experiences for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100/30 to-teal-50 p-8 rounded-2xl border-2 border-blue-200/30 shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-blue-900">Democratizing Advanced Computing</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Making sophisticated mathematical computations accessible to everyone, whether you're a student 
                      learning linear algebra or a researcher solving real-world problems.
                    </p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-teal-100/30 to-emerald-50 p-8 rounded-2xl border-2 border-teal-200/30 shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-teal-500 rounded-lg shadow-md">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-teal-900">Educational Excellence</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Providing intuitive, powerful tools that transform complex mathematical algorithms into 
                      approachable learning experiences with clear visualizations.
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-sky-100/30 to-cyan-50 p-8 rounded-2xl border-2 border-sky-200/30 shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-200/20 to-cyan-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-sky-500 rounded-lg shadow-md">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-sky-900">Innovation & Accessibility</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Breaking down barriers in numerical computing through modern web technologies and 
                      user-friendly interfaces that work seamlessly across all devices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-slide-in-right">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-3xl mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent font-bold">
                  Why Us
                </span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg leading-relaxed">
                Discover what makes JacoMat Pro the preferred choice for numerical computing solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="group p-6 bg-gradient-to-r from-blue-50/70 via-white to-blue-50/30 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">Advanced Visualization</h5>
                      <p className="text-gray-700 leading-relaxed">
                        Interactive visualization of iterative processes with real-time convergence tracking and detailed analytics
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-r from-teal-50/70 via-white to-teal-50/30 rounded-xl border-2 border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-teal-900 mb-2 group-hover:text-teal-700 transition-colors">Comprehensive Analysis</h5>
                      <p className="text-gray-700 leading-relaxed">
                        Deep convergence analysis with detailed metrics and performance insights for educational purposes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-r from-purple-50/70 via-white to-purple-50/30 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors">Professional Reporting</h5>
                      <p className="text-gray-700 leading-relaxed">
                        Export-ready reports with detailed calculations and visual representations for academic use
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-r from-green-50/70 via-white to-green-50/30 rounded-xl border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors">Responsive Design</h5>
                      <p className="text-gray-700 leading-relaxed">
                        Seamless experience across desktop, tablet, and mobile devices with modern UI/UX
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-r from-orange-50/70 via-white to-orange-50/30 rounded-xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-orange-900 mb-2 group-hover:text-orange-700 transition-colors">AI-Powered Support</h5>
                      <p className="text-gray-700 leading-relaxed">
                        Intelligent chatbot assistance for mathematical concepts and platform guidance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supervised By Section */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in mb-16">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                Supervised By
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dr. Sirine Marrakchi</h3>
              <p className="text-blue-600 font-semibold mb-4">Professor at the Faculty of Sciences of Sfax (FSS)</p>
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                This project is developed under the supervision of Dr. Sirine Marrakchi, bringing academic rigor 
                and educational excellence to ensure the highest quality of numerical computing solutions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Developer Section */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in mb-16">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
                <User className="h-8 w-8 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                Developed By
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full mb-6 flex items-center justify-center shadow-xl border-4 border-white overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="https://i.imgur.com/eimPD1n.jpeg"
                  alt="Ahmed Bensalah"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ahmed Bensalah</h3>
              <p className="text-blue-600 font-semibold mb-4">1st year engineering cycle at the Faculty of Sciences of Sfax (FSS)</p>
              <p className="text-gray-600 font-medium mb-2">Data Engineering</p>
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Passionate about combining mathematical algorithms with modern web technologies to create 
                educational tools that make complex numerical methods accessible and engaging for learners worldwide.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technology Section */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">
              <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                Built with Modern Technology
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 border-2 border-blue-200 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    alt="React"
                    className="w-12 h-12"
                  />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2 text-lg">React 18</h4>
                <p className="text-sm text-blue-600">Modern UI framework</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 hover:from-sky-100 hover:to-sky-200 transition-all duration-300 hover:scale-105 border-2 border-sky-200 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
                    alt="TypeScript"
                    className="w-12 h-12"
                  />
                </div>
                <h4 className="font-semibold text-sky-800 mb-2 text-lg">TypeScript</h4>
                <p className="text-sm text-sky-600">Type-safe development</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all duration-300 hover:scale-105 border-2 border-teal-200 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                    alt="Tailwind CSS"
                    className="w-12 h-12"
                  />
                </div>
                <h4 className="font-semibold text-teal-800 mb-2 text-lg">Tailwind CSS</h4>
                <p className="text-sm text-teal-600">Utility-first styling</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105 border-2 border-purple-200 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UI</span>
                  </div>
                </div>
                <h4 className="font-semibold text-purple-800 mb-2 text-lg">Shadcn/UI</h4>
                <p className="text-sm text-purple-600">Beautiful components</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default About;
