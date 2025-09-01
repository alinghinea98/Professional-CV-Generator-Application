import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Download, FileText, Layout, Palette } from 'lucide-react';
import { CVData } from '../App';

interface CVPreviewProps {
  cvData: CVData;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  onBack: () => void;
  onExport: () => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
}

const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design', color: 'bg-blue-500' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout', color: 'bg-gray-600' },
  { id: 'creative', name: 'Creative', description: 'Bold and innovative design', color: 'bg-purple-500' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant format', color: 'bg-teal-500' },
];

export function CVPreview({ cvData, selectedTemplate, setSelectedTemplate, onBack, onExport }: CVPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderModernTemplate = () => (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-sm border min-h-[842px]">
      {/* Header */}
      <div className="border-b-2 border-blue-500 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          {cvData.personalInfo.email && <div>{cvData.personalInfo.email}</div>}
          {cvData.personalInfo.phone && <div>{cvData.personalInfo.phone}</div>}
          {cvData.personalInfo.location && <div>{cvData.personalInfo.location}</div>}
          {cvData.personalInfo.linkedin && <div>{cvData.personalInfo.linkedin}</div>}
          {cvData.personalInfo.website && <div>{cvData.personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-blue-600 mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Education</h2>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-blue-600">{edu.school}</p>
                {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {cvData.achievements.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Achievements</h2>
          <ul className="space-y-1">
            {cvData.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700 text-sm">• {achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-sm border min-h-[842px]">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{cvData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm text-gray-600 space-x-3">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>•</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.location && <span>•</span>}
          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
        </div>
        {(cvData.personalInfo.linkedin || cvData.personalInfo.website) && (
          <div className="text-sm text-gray-600 mt-1">
            {cvData.personalInfo.linkedin && <span>{cvData.personalInfo.linkedin}</span>}
            {cvData.personalInfo.website && cvData.personalInfo.linkedin && <span> • </span>}
            {cvData.personalInfo.website && <span>{cvData.personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>
          <div className="space-y-4">
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p className="text-gray-700 text-sm mt-2 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills and Achievements */}
      <div className="grid md:grid-cols-2 gap-6">
        {cvData.skills.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">Skills</h2>
            <div className="space-y-1">
              {cvData.skills.map((skill, index) => (
                <div key={index} className="text-gray-700 text-sm">• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {cvData.achievements.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">Achievements</h2>
            <div className="space-y-1">
              {cvData.achievements.map((achievement, index) => (
                <div key={index} className="text-gray-700 text-sm">• {achievement}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-sm border min-h-[842px]">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="bg-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-xl font-bold mb-4">{cvData.personalInfo.fullName || 'Your Name'}</h1>
          
          {/* Contact */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-purple-200">Contact</h3>
            <div className="text-sm space-y-1">
              {cvData.personalInfo.email && <div>{cvData.personalInfo.email}</div>}
              {cvData.personalInfo.phone && <div>{cvData.personalInfo.phone}</div>}
              {cvData.personalInfo.location && <div>{cvData.personalInfo.location}</div>}
              {cvData.personalInfo.linkedin && <div>{cvData.personalInfo.linkedin}</div>}
              {cvData.personalInfo.website && <div>{cvData.personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-purple-200">Skills</h3>
              <div className="space-y-2">
                {cvData.skills.map((skill, index) => (
                  <div key={index} className="text-sm bg-purple-500 px-2 py-1 rounded">{skill}</div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {cvData.achievements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-purple-200">Achievements</h3>
              <div className="space-y-1">
                {cvData.achievements.map((achievement, index) => (
                  <div key={index} className="text-sm">• {achievement}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {cvData.summary && (
            <div>
              <h2 className="text-lg font-bold text-purple-600 mb-3">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-600 mb-3">Experience</h2>
              <div className="space-y-4">
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-purple-300 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-purple-600 mb-2">{exp.company}</p>
                    {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-600 mb-3">Education</h2>
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-purple-300 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-purple-600">{edu.school}</p>
                    {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-sm border min-h-[842px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{cvData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-gray-600 text-sm">
          {[
            cvData.personalInfo.email,
            cvData.personalInfo.phone,
            cvData.personalInfo.location,
            cvData.personalInfo.linkedin,
            cvData.personalInfo.website
          ].filter(Boolean).join(' • ')}
        </div>
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="mb-8">
          <div className="border-l-2 border-teal-500 pl-4">
            <p className="text-gray-700 leading-relaxed italic">{cvData.summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-teal-600 mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-teal-600">{edu.school}</p>
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills and Achievements */}
      {(cvData.skills.length > 0 || cvData.achievements.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8">
          {cvData.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-light text-gray-900 mb-3">Skills</h2>
              <div className="text-gray-700">
                {cvData.skills.join(' • ')}
              </div>
            </div>
          )}

          {cvData.achievements.length > 0 && (
            <div>
              <h2 className="text-xl font-light text-gray-900 mb-3">Achievements</h2>
              <div className="space-y-1">
                {cvData.achievements.map((achievement, index) => (
                  <div key={index} className="text-gray-700">• {achievement}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
            <h1>CV Preview</h1>
            <Button onClick={onExport} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export CV
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Template Selector */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="space-y-6">
                <div>
                  <h2 className="flex items-center gap-2 mb-4">
                    <Palette className="h-5 w-5" />
                    Choose Template
                  </h2>
                  <div className="space-y-3">
                    {TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedTemplate === template.id
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-border hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${template.color}`}></div>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="flex items-center gap-2 mb-3">
                    <Layout className="h-4 w-4" />
                    Preview Tips
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Switch between templates to find your style</li>
                    <li>• All information updates in real-time</li>
                    <li>• Perfect for both digital and print</li>
                    <li>• ATS-friendly formatting</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* CV Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="transform scale-90 origin-top">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}