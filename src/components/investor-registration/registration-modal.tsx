"use client";

import { useState } from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CreateAccountStep from "./steps/create-account-step";
import VerifyEmailStep from "./steps/verify-email-step";
import MfaStep from "./steps/mfa-step";
import ProfileStep from "./steps/profile-step";
import KycAmlStep from "./steps/kyc-aml-step";
import AccreditationStep from "./steps/accreditation-step";
import NdaStep from "./steps/nda-step";
import CompletionStep from "./steps/completion-step";
import ProgressIndicator from "./progress-indicator";

type RegistrationModalProps = {
  closeModal: () => void;
};

const TOTAL_STEPS = 8;

export default function RegistrationModal({ closeModal }: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data?: any) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
    }
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold">
          Become an Investor
        </DialogTitle>
        <DialogDescription className="text-center">
          Complete the steps below to apply for investment access.
        </DialogDescription>
        <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      </DialogHeader>
      <div className="py-4">
        {step === 1 && <CreateAccountStep onNext={handleNext} />}
        {step === 2 && <VerifyEmailStep onNext={handleNext} />}
        {step === 3 && <MfaStep onNext={handleNext} />}
        {step === 4 && <ProfileStep onNext={handleNext} onBack={handleBack} />}
        {step === 5 && <KycAmlStep onNext={handleNext} onBack={handleBack} />}
        {step === 6 && <AccreditationStep onNext={handleNext} onBack={handleBack} />}
        {step === 7 && <NdaStep onNext={handleNext} onBack={handleBack} />}
        {step === 8 && <CompletionStep closeModal={closeModal} />}
      </div>
    </>
  );
}
