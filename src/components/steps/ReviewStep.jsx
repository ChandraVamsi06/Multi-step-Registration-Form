import React, { useState } from 'react';
import { useFormStore } from '../../store/formStore';
import Button from '../ui/Button';
import { Pencil, CheckCircle } from 'lucide-react'; // Icons

export default function ReviewStep() {
  const { formData, prevStep, setStep, resetForm } = useFormStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to render a section
  const ReviewSection = ({ title, stepIndex, children }) => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <button 
          onClick={() => setStep(stepIndex)} // Jump to specific step
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
        >
          <Pencil className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        {children}
      </div>
    </div>
  );

  // Helper for individual rows
  const Row = ({ label, value }) => (
    <div className="flex justify-between">
      <span className="font-medium text-gray-500">{label}:</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );

  const handleFinalSubmit = () => {
    // Here you would normally send data to a real backend API
    console.log("Form Submitted:", formData);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitted(true);
      resetForm(); // Clear the data from LocalStorage
    }, 500);
  };

  // If submitted, show Success Message
  if (isSubmitted) {
    return (
      <div className="text-center py-10 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for signing up. Your details have been successfully submitted.
        </p>
        <Button onClick={() => window.location.reload()}>
          Start New Form
        </Button>
      </div>
    );
  }

  // Normal Review View
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Review your details</h2>

      <ReviewSection title="Personal Information" stepIndex={0}>
        <Row label="Full Name" value={formData.fullName} />
        <Row label="Email" value={formData.email} />
        <Row label="Phone" value={formData.phone} />
        <Row label="Age" value={formData.age} />
      </ReviewSection>

      <ReviewSection title="Address Details" stepIndex={1}>
        <Row label="Street" value={formData.street} />
        <Row label="City" value={formData.city} />
        <Row label="State" value={formData.state} />
        <Row label="Zip Code" value={formData.zipCode} />
      </ReviewSection>

      <ReviewSection title="Account Security" stepIndex={2}>
        <Row label="Username" value={formData.username} />
        <Row label="Password" value="••••••••" /> {/* Hide password */}
      </ReviewSection>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        
        <Button onClick={handleFinalSubmit} className="bg-green-600 hover:bg-green-700">
          Submit Registration
        </Button>
      </div>
    </div>
  );
}