import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type CompletionStepProps = {
  closeModal: () => void;
};

export default function CompletionStep({ closeModal }: CompletionStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Application Submitted</h3>
        <p className="text-muted-foreground">
          Thank you for your interest in Baalvion. Our team will review your application and contact you within 5-7 business days.
        </p>
      </div>
      <Button onClick={closeModal} className="w-full sm:w-auto">
        Close
      </Button>
    </div>
  );
}
