import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from '../store/formStore';
import StepIndicator from './StepIndicator';

// Import the steps
import PersonalInfo from './steps/PersonalInfo';
import AddressDetails from './steps/AddressDetails';
import AccountDetails from './steps/AccountDetails';
import ReviewStep from './steps/ReviewStep';

export default function MultiStepForm() {
  const { currentStep } = useFormStore();

  // Helper to get the correct component
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo />;
      case 1: return <AddressDetails />;
      case 2: return <AccountDetails />;
      case 3: return <ReviewStep />;
      default: return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* 1. Progress Bar */}
      <StepIndicator currentStep={currentStep} />

      {/* 2. The Form Step (with Animation) */}
      <div className="mt-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}