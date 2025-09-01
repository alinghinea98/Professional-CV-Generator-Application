import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowRight, Plus, X, User, Briefcase, GraduationCap, Award, Target } from 'lucide-react';
import { CVData } from '../App';

interface InputFormProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  onNext: () => void;
  onBack: () => void;
}

type FormStep = 'personal' | 'summary' | 'experience' | 'education' | 'skills';

const STEPS: Array<{ id: FormStep; title: string; icon: React.ReactNode }> = [
  { id: 'personal', title: 'Personal Info', icon: <User className="h-4 w-4" /> },
  { id: 'summary', title: 'Professional Summary', icon: <Target className="h-4 w-4" /> },
  { id: 'experience', title: 'Work Experience', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'education', title: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'skills', title: 'Skills & Achievements', icon: <Award className="h-4 w-4" /> },
];

export function InputForm({ cvData, setCVData, onNext, onBack }: InputFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [...cvData.experience, {
        id: Date.now().toString(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setCVData({
      ...cvData,
      education: [...cvData.education, {
        id: Date.now().toString(),
        degree: '',
        school: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setCVData({
      ...cvData,
      education: cvData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setCVData({
        ...cvData,
        skills: [...cvData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index)
    });
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setCVData({
        ...cvData,
        achievements: [...cvData.achievements, newAchievement.trim()]
      });
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setCVData({
      ...cvData,
      achievements: cvData.achievements.filter((_, i) => i !== index)
    });
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    } else {
      onNext();
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={cvData.personalInfo.fullName}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, fullName: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={cvData.personalInfo.email}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, email: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, phone: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  value={cvData.personalInfo.location}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, location: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/johndoe"
                  value={cvData.personalInfo.linkedin}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, linkedin: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  placeholder="johndoe.com"
                  value={cvData.personalInfo.website}
                  onChange={(e) => setCVData({
                    ...cvData,
                    personalInfo: { ...cvData.personalInfo, website: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                rows={6}
                placeholder="Describe yourself professionally. Tell us about your career highlights, key skills, and what makes you unique. For example: 'Experienced software engineer with 5 years in full-stack development, specializing in React and Node.js. Led a team of 4 developers and increased application performance by 40%...'"
                value={cvData.summary}
                onChange={(e) => setCVData({ ...cvData, summary: e.target.value })}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>💡 <strong>Tip:</strong> Write 3-4 sentences about your professional background, key achievements, and career goals. Keep it concise but impactful.</p>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3>Work Experience</h3>
              <Button onClick={addExperience} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
            
            {cvData.experience.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No work experience added yet</p>
                <Button onClick={addExperience} variant="outline" className="mt-4">
                  Add Your First Job
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cvData.experience.map((exp) => (
                  <Card key={exp.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4>Job {cvData.experience.indexOf(exp) + 1}</h4>
                        <Button 
                          onClick={() => removeExperience(exp.id)}
                          variant="ghost" 
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title *</Label>
                          <Input
                            placeholder="Software Engineer"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company *</Label>
                          <Input
                            placeholder="Google Inc."
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-transparent">Current</Label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm">Current position</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea
                          rows={4}
                          placeholder="Describe your responsibilities, achievements, and impact in this role. Use specific examples and metrics when possible..."
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3>Education</h3>
              <Button onClick={addEducation} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
            
            {cvData.education.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No education added yet</p>
                <Button onClick={addEducation} variant="outline" className="mt-4">
                  Add Education
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <Card key={edu.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4>Education {cvData.education.indexOf(edu) + 1}</h4>
                        <Button 
                          onClick={() => removeEducation(edu.id)}
                          variant="ghost" 
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree/Qualification *</Label>
                          <Input
                            placeholder="Bachelor of Science in Computer Science"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>School/University *</Label>
                          <Input
                            placeholder="Stanford University"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            disabled={edu.current}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-transparent">Current</Label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={edu.current}
                              onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm">Currently studying</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Additional Details (Optional)</Label>
                        <Textarea
                          rows={3}
                          placeholder="Relevant coursework, honors, GPA, thesis title, etc..."
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            {/* Skills Section */}
            <div className="space-y-4">
              <h3>Skills</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Project Management)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {cvData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="space-y-4">
              <h3>Achievements & Awards</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an achievement (e.g., Employee of the Year 2023)"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                />
                <Button onClick={addAchievement} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {cvData.achievements.length > 0 && (
                <div className="space-y-2">
                  {cvData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span>{achievement}</span>
                      <button
                        onClick={() => removeAchievement(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
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
              Back to Home
            </Button>
            <h1>Create Your CV</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Step {currentStepIndex + 1} of {STEPS.length}</h2>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-6" />
          
          {/* Step Navigation */}
          <div className="flex gap-2 overflow-x-auto">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  currentStep === step.id
                    ? 'bg-teal-600 text-white'
                    : index <= currentStepIndex
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.icon}
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h2>{STEPS.find(s => s.id === currentStep)?.title}</h2>
              <p className="text-muted-foreground">
                {currentStep === 'personal' && 'Let\'s start with your basic information.'}
                {currentStep === 'summary' && 'Write a compelling summary that highlights your professional strengths.'}
                {currentStep === 'experience' && 'Add your work experience, starting with your most recent position.'}
                {currentStep === 'education' && 'Include your educational background and qualifications.'}
                {currentStep === 'skills' && 'List your key skills and notable achievements.'}
              </p>
            </div>

            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {currentStepIndex === STEPS.length - 1 ? 'Preview CV' : 'Next Step'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}