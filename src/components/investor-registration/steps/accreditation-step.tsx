"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type AccreditationStepProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function AccreditationStep({ onNext, onBack }: AccreditationStepProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Accreditation Self-Certification</h3>
        <p className="text-sm text-muted-foreground">
          Please confirm your status as an accredited investor.
        </p>
      </div>
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <p className="text-xs text-muted-foreground">
          By checking the box below, you hereby certify that you meet the requirements of an "accredited investor" as defined in Rule 501(a) of Regulation D under the Securities Act of 1933. This is a self-certification and may be subject to further verification.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="accreditation-agree" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            aria-label="I certify that I am an accredited investor"
          />
          <Label htmlFor="accreditation-agree" className="text-sm font-medium leading-none cursor-pointer">
            I certify that I am an accredited investor.
          </Label>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!agreed}>
          Continue
        </Button>
      </div>
    </div>
  );
}
