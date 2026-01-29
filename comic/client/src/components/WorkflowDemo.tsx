import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
  code?: string;
  duration: number;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Trigger Workflow",
    description: "User manually triggers the GitHub Actions workflow with their public IP address",
    duration: 1000,
  },
  {
    id: 2,
    title: "Authenticate to Azure",
    description: "GitHub Actions authenticates using Service Principal credentials from GitHub Secrets",
    code: `az login --service-principal \
  -u "\${{ secrets.AZURE_CLIENT_ID }}" \
  -p "\${{ secrets.AZURE_CLIENT_SECRET }}" \
  --tenant "\${{ secrets.AZURE_TENANT_ID }}"`,
    duration: 2000,
  },
  {
    id: 3,
    title: "Execute Bicep Template",
    description: "Deploy infrastructure using the win11-vm.bicep template",
    code: `az deployment group create \
  --resource-group "\${{ secrets.AZURE_RESOURCE_GROUP }}" \
  --template-file ./infra/win11-vm.bicep \
  --parameters vmName="..." location="mexicocentral"`,
    duration: 3000,
  },
  {
    id: 4,
    title: "Provision Azure Resources",
    description: "Azure creates VM, networking, storage, and security components",
    duration: 2500,
  },
  {
    id: 5,
    title: "VM Ready!",
    description: "Windows 11 VM is deployed and accessible via RDP",
    duration: 1000,
  },
];

export default function WorkflowDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runWorkflow = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    setIsRunning(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <Card className="border-4 border-foreground p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-foreground">Interactive Workflow Demo</h3>
        <div className="flex gap-3">
          <Button
            onClick={runWorkflow}
            disabled={isRunning}
            className="border-2 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "Running..." : "Run Workflow"}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            disabled={isRunning || currentStep === 0}
            className="border-2 border-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div
              key={step.id}
              className={cn(
                "relative pl-12 pb-6 border-l-4 transition-all duration-300",
                isCompleted && "border-primary",
                isActive && "border-secondary animate-pulse",
                isPending && "border-muted opacity-50"
              )}
            >
              {/* Step indicator */}
              <div className="absolute -left-6 top-0 w-12 h-12 rounded-full border-4 border-foreground flex items-center justify-center font-bold text-lg bg-background">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : isActive ? (
                  <div className="w-6 h-6 rounded-full bg-secondary animate-ping" />
                ) : (
                  <Circle className="w-6 h-6 text-muted" />
                )}
              </div>

              {/* Step content */}
              <div className={cn(
                "transition-all duration-300",
                isActive && "scale-105"
              )}>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={cn(
                    "text-xl font-bold",
                    isCompleted && "text-primary",
                    isActive && "text-secondary",
                    isPending && "text-muted-foreground"
                  )}>
                    {step.title}
                  </h4>
                  {isActive && (
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full border-2 border-foreground animate-bounce">
                      IN PROGRESS
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full border-2 border-foreground">
                      COMPLETED
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-foreground/70 mb-3",
                  isActive && "text-foreground font-medium"
                )}>
                  {step.description}
                </p>
                {step.code && (isActive || isCompleted) && (
                  <div className="bg-card border-2 border-foreground rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground/80">{step.code}</pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {currentStep === steps.length && !isRunning && (
        <div className="mt-8 p-6 bg-primary/10 border-4 border-primary rounded-lg text-center">
          <h4 className="text-2xl font-bold text-primary mb-2">🎉 Deployment Complete!</h4>
          <p className="text-foreground/80">
            Your Windows 11 VM is now ready in Azure Mexico Central region.
          </p>
        </div>
      )}
    </Card>
  );
}
