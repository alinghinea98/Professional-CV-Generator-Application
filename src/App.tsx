import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InputForm } from './components/InputForm';
import { CVPreview } from './components/CVPreview';
import { ExportPage } from './components/ExportPage';

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: string[];
  achievements: string[];
}

export type Screen = 'landing' | 'form' | 'preview' | 'export';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    achievements: []
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentScreen('form')} />;
      case 'form':
        return (
          <InputForm
            cvData={cvData}
            setCVData={setCVData}
            onNext={() => setCurrentScreen('preview')}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'preview':
        return (
          <CVPreview
            cvData={cvData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            onBack={() => setCurrentScreen('form')}
            onExport={() => setCurrentScreen('export')}
          />
        );
      case 'export':
        return (
          <ExportPage
            cvData={cvData}
            selectedTemplate={selectedTemplate}
            onBack={() => setCurrentScreen('preview')}
            onStartOver={() => setCurrentScreen('landing')}
          />
        );
      default:
        return <LandingPage onGetStarted={() => setCurrentScreen('form')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}