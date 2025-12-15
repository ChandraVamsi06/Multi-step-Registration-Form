import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/formStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AccountDetails() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [isChecking, setIsChecking] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError, // We need this to manually set the "Username Taken" error
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  // Save data while typing
  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  const onSubmit = async (data) => {
    // 1. Start the "Fake" Server Check
    setIsChecking(true);

    // 2. Wait 500ms (Requirement)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Check if username is "admin" (Simulation)
    if (data.username.toLowerCase() === "admin") {
      setError("username", { 
        type: "manual", 
        message: "This username is already taken. Try another." 
      });
      setIsChecking(false);
      return; // Stop here, don't go to next step
    }

    // 4. If valid, save and go to Review
    setIsChecking(false);
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <Input
        label="Username"
        id="username"
        placeholder="Choose a username"
        error={errors.username}
        {...register('username')}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="Min 8 chars, 1 Upper, 1 Lower, 1 Special"
        error={errors.password}
        {...register('password')}
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        error={errors.confirmPassword}
        {...register('confirmPassword')}
      />

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep} disabled={isChecking}>
          Previous
        </Button>
        
        <Button type="submit" disabled={isChecking}>
          {isChecking ? "Checking availability..." : "Review Details"}
        </Button>
      </div>
    </form>
  );
}