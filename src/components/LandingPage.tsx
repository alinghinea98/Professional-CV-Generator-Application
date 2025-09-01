import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight, FileText, Users, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-teal-600" />
              <span className="text-lg font-medium">CVCraft</span>
            </div>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl tracking-tight text-foreground">
                Turn Your Story into a{' '}
                <span className="text-teal-600">Professional CV</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Create a standout CV in minutes. Simply describe your experience in your own words, 
                and we'll transform it into a polished, professional document that gets you noticed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={onGetStarted}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Sample CVs
              </Button>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="relative">
              <Card className="p-6 shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587287720754-94bac45f0bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBkb2N1bWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NTU4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional CV document"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </Card>
              <div className="absolute -bottom-4 -right-4 bg-teal-600 text-white p-3 rounded-full shadow-lg">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl text-foreground">
              Why Choose CVCraft?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform transforms your experiences into compelling narratives 
              that showcase your unique value to employers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-foreground">Smart Formatting</h3>
              <p className="text-muted-foreground">
                Automatically formats your information into professional, ATS-friendly layouts 
                that pass screening systems.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-foreground">Multiple Templates</h3>
              <p className="text-muted-foreground">
                Choose from various professional templates designed by hiring experts 
                to match different industries and roles.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-foreground">Instant Preview</h3>
              <p className="text-muted-foreground">
                See your CV come to life in real-time as you input your information, 
                with instant formatting and layout adjustments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl text-foreground">
              Ready to Create Your Professional CV?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of job seekers who have landed their dream jobs with CVs created using our platform.
            </p>
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={onGetStarted}
            >
              Start Building Your CV <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <span className="text-muted-foreground">CVCraft</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}