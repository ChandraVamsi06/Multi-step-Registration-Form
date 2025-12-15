import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/formStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AddressDetails() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
  });

  // Save data while typing
  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <Input
        label="Street Address"
        id="street"
        placeholder="123 Main St"
        error={errors.street}
        {...register('street')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          id="city"
          placeholder="New York"
          error={errors.city}
          {...register('city')}
        />
        
        <Input
          label="State"
          id="state"
          placeholder="NY"
          error={errors.state}
          {...register('state')}
        />
      </div>

      <Input
        label="Zip Code"
        id="zipCode"
        placeholder="10001"
        error={errors.zipCode}
        {...register('zipCode')}
      />

      <div className="flex justify-between pt-4">
        {/* Previous Button added here */}
        <Button type="button" variant="outline" onClick={prevStep}>
          Previous
        </Button>
        
        <Button type="submit">
          Next Step
        </Button>
      </div>
    </form>
  );
}