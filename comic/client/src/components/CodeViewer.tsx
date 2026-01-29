import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  title: string;
  language: string;
  code: string;
  description?: string;
}

export default function CodeViewer({ title, language, code, description }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-4 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between border-b-4 border-foreground">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
        <Button
          onClick={copyToClipboard}
          variant="secondary"
          size="sm"
          className="border-2 border-foreground"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="bg-card p-6 overflow-x-auto">
        <pre className="font-mono text-sm text-foreground/90">
          <code>{code}</code>
        </pre>
      </div>
    </Card>
  );
}

interface TabCodeViewerProps {
  files: Array<{
    name: string;
    language: string;
    code: string;
    description?: string;
  }>;
}

export function TabCodeViewer({ files }: TabCodeViewerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(files[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-4 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-muted border-b-4 border-foreground flex items-center justify-between">
        <div className="flex">
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-6 py-3 font-bold text-sm border-r-4 border-foreground transition-colors",
                activeTab === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {file.name}
            </button>
          ))}
        </div>
        <div className="px-4">
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="sm"
            className="border-2 border-foreground"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      {files[activeTab].description && (
        <div className="bg-accent/10 px-6 py-3 border-b-2 border-foreground">
          <p className="text-sm text-foreground/80">{files[activeTab].description}</p>
        </div>
      )}
      <div className="bg-card p-6 overflow-x-auto max-h-[600px]">
        <pre className="font-mono text-sm text-foreground/90">
          <code>{files[activeTab].code}</code>
        </pre>
      </div>
    </Card>
  );
}
