import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Download, FileText, Share2, CheckCircle, Printer, Mail, RefreshCw } from 'lucide-react';
import { CVData } from '../App';
import { jsPDF } from 'jspdf';

interface ExportPageProps {
  cvData: CVData;
  selectedTemplate: string;
  onBack: () => void;
  onStartOver: () => void;
}

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  format: string;
  popular?: boolean;
}

const EXPORT_OPTIONS: ExportOption[] = [
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'Perfect for email and online applications',
    icon: <FileText className="h-6 w-6" />,
    format: '.pdf',
    popular: true
  },
  {
    id: 'word',
    name: 'Word Document',
    description: 'Editable format for further customization',
    icon: <FileText className="h-6 w-6" />,
    format: '.docx'
  },
  {
    id: 'print',
    name: 'Print Preview',
    description: 'Optimized for professional printing',
    icon: <Printer className="h-6 w-6" />,
    format: 'Print'
  }
];

export function ExportPage({ cvData, selectedTemplate, onBack, onStartOver }: ExportPageProps) {
  const handleExport = (format: string) => {
    const filename = `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'CV'}_${selectedTemplate}${format === 'pdf' ? '.pdf' : format === 'word' ? '.docx' : '.html'
      }`;

    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(`${cvData.personalInfo.fullName}'s CV`, 10, 10);
      // Add more CV data as needed
      doc.save(filename);
      alert(`CV exported successfully as ${filename}!`);
      return;
    }

    // ...existing code for other formats...
    const element = document.createElement('a');
    element.href = '#';
    element.download = filename;
    element.style.display = 'none';
    document.body.appendChild(element);
    // element.click(); // Uncomment in real app
    document.body.removeChild(element);
  };

  const handleShare = () => {
    // In a real application, this would generate a shareable link
    const shareUrl = `https://cvcraft.app/share/${Date.now()}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${cvData.personalInfo.fullName}'s CV`,
        text: 'Check out my professional CV created with CVCraft',
        url: shareUrl,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Shareable link copied to clipboard!');
    }
  };

  const getTemplateName = () => {
    const templateNames: Record<string, string> = {
      modern: 'Modern',
      classic: 'Classic',
      creative: 'Creative',
      minimal: 'Minimal'
    };
    return templateNames[selectedTemplate] || 'Modern';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Preview
            </Button>
            <h1>Export Your CV</h1>
            <Button variant="outline" onClick={onStartOver}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Success Message */}
        <Card className="p-6 mb-8 bg-teal-50 border-teal-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-teal-600" />
            <div>
              <h2 className="text-lg font-medium text-teal-900">Your CV is Ready!</h2>
              <p className="text-teal-700">
                Your professional CV has been created using the <strong>{getTemplateName()}</strong> template. 
                Choose your preferred export format below.
              </p>
            </div>
          </div>
        </Card>

        {/* CV Summary */}
        <Card className="p-6 mb-8">
          <h2 className="mb-4">CV Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Name:</span>
                <p className="font-medium">{cvData.personalInfo.fullName || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email:</span>
                <p className="font-medium">{cvData.personalInfo.email || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Template:</span>
                <Badge variant="secondary">{getTemplateName()}</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Work Experience:</span>
                <p className="font-medium">{cvData.experience.length} positions</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Education:</span>
                <p className="font-medium">{cvData.education.length} entries</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Skills:</span>
                <p className="font-medium">{cvData.skills.length} skills listed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-2">Choose Export Format</h2>
            <p className="text-muted-foreground">
              Select the format that best suits your needs. All formats maintain professional formatting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {EXPORT_OPTIONS.map((option) => (
              <Card key={option.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-teal-100 rounded-lg text-teal-600 group-hover:bg-teal-200 transition-colors">
                      {option.icon}
                    </div>
                    {option.popular && (
                      <Badge className="bg-teal-600 text-white">Popular</Badge>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{option.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block">
                      {option.format}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleExport(option.id)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download {option.format}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Actions */}
        <Card className="p-6 mt-8">
          <h3 className="mb-4">Additional Options</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share CV Link
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email to Yourself
            </Button>
            
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Edit CV Again
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Save your CV in multiple formats for different application requirements</li>
              <li>• PDF format is most widely accepted and preserves formatting</li>
              <li>• Word format allows for easy customization for specific roles</li>
              <li>• Keep your CV updated regularly with new experiences and skills</li>
            </ul>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <h3 className="text-blue-900 mb-3">What's Next?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Job Application Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tailor your CV for each job application</li>
                <li>• Use keywords from the job description</li>
                <li>• Keep your CV to 1-2 pages maximum</li>
                <li>• Proofread carefully before submitting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">CVCraft Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Create multiple CV versions for different roles</li>
                <li>• Track application responses</li>
                <li>• Get CV feedback from professionals</li>
                <li>• Access exclusive job opportunities</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}