
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Mail, Phone, MapPin, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
                className="text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 hover:text-blue-700 hover:bg-blue-50 hover:scale-105"
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
                className="text-blue-700 font-semibold px-4 py-2 rounded-lg bg-blue-100/50 transition-all duration-300 hover:bg-blue-200/70 hover:scale-105"
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in [animation-delay:0.2s]">
            Have questions about JacoMat Pro? Need support or want to collaborate? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                  Send us a Message
                </span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-blue-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Contact Details */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                    Get in Touch
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a 
                      href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=ahmed.bensalah@ieee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      ahmed.bensalah@ieee.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">(+216) 40 54 10 86</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <a 
                      href="https://maps.google.com/?q=Faculty+of+Sciences+of+Sfax"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      Faculty of Sciences of Sfax
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <span className="bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
                    Follow Us
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/AhmedBensalah8603" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Github className="h-6 w-6 text-blue-600 group-hover:text-blue-800" />
                  </a>
                  <a 
                    href="http://www.linkedin.com/in/ahmed-bensalah-fss" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Linkedin className="h-6 w-6 text-blue-600 group-hover:text-blue-800" />
                  </a>
                  <a 
                    href="https://www.facebook.com/ahmed.bensalah.8/?locale=fr_FR" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Facebook className="h-6 w-6 text-blue-600 group-hover:text-blue-800" />
                  </a>
                </div>
              </CardContent>
            </Card>
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

export default Contact;
