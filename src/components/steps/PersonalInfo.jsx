import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/formStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function PersonalInfo() {
  // 1. Get current data and functions from the Store
  const { formData, updateFormData, nextStep } = useFormStore();

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
    },
  });

  // 3. (Optional Requirement) Save data to store on every keystroke
  // This ensures if they refresh the page while typing, data isn't lost.
  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  // 4. Handle "Next" Button Click
  const onSubmit = (data) => {
    updateFormData(data); // Double check everything is saved
    nextStep();           // Move to Step 2
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid gap-4">
        <Input
          label="Full Name"
          id="fullName"
          placeholder="e.g. John Doe"
          error={errors.fullName}
          {...register('fullName')}
        />
        
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="john@example.com"
          error={errors.email}
          {...register('email')}
        />

        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="1234567890"
          error={errors.phone}
          {...register('phone')}
        />

        <Input
          label="Age"
          id="age"
          type="number"
          placeholder="Must be 18+"
          error={errors.age}
          {...register('age')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          Next Step
        </Button>
      </div>
    </form>
  );
}