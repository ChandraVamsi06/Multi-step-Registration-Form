import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react'; // Icon for completed steps

const steps = [
  { id: 0, name: "Personal" },
  { id: 1, name: "Address" },
  { id: 2, name: "Account" },
  { id: 3, name: "Review" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 z-10 bg-white",
                    isActive ? "border-blue-600 text-blue-600 shadow-md scale-110" : "border-gray-300 text-gray-400",
                    isCompleted ? "bg-blue-600 border-blue-600 text-white" : ""
                  )}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                </div>
                
                {/* Step Name (Label) */}
                <span className={cn(
                  "absolute top-12 text-xs font-medium whitespace-nowrap",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}>
                  {step.name}
                </span>
              </div>

              {/* Connecting Line (Don't show after the last step) */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-12 h-1 mx-2 rounded transition-all duration-300",
                  currentStep > index ? "bg-blue-600" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}