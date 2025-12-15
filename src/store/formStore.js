import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialData = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const useFormStore = create(
  persist(
    (set) => ({
      currentStep: 0,
      formData: initialData,

      // Update specific fields in the form data
      updateFormData: (newData) =>
        set((state) => ({
          formData: { ...state.formData, ...newData },
        })),

      // Go to next step (max step is 3)
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 3),
        })),

      // Go to previous step (min step is 0)
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      // Jump to a specific step (used for "Edit" button)
      setStep: (step) => set({ currentStep: step }),

      // Clear everything
      resetForm: () => set({ currentStep: 0, formData: initialData }),
    }),
    {
      name: 'partnr-form-storage', // The key used in LocalStorage
    }
  )
);