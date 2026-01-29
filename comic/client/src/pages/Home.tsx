/*
Design Style: Tech Zine / Digital Comic Book
- Bold comic panel layouts with diagonal sections
- Purple/orange/blue/green color scheme from infographics
- Dashed borders, thick outlines, playful animations
- Roberto character integrated throughout
*/

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Rocket, Shield, Code2, Zap, Terminal, FileCode } from "lucide-react";
import WorkflowDemo from "@/components/WorkflowDemo";
import { TabCodeViewer } from "@/components/CodeViewer";

const yamlCode = `name: Create Windows 11 VM in MX
on:
  workflow_dispatch:
    inputs:
      sourceRdpIP:
        description: 'Your Public IP (get with: curl https://api.ipify.org)'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Azure Login
        run: |
          az login --service-principal \\
            -u "\${{ secrets.AZURE_CLIENT_ID }}" \\
            -p "\${{ secrets.AZURE_CLIENT_SECRET }}" \\
            --tenant "\${{ secrets.AZURE_TENANT_ID }}"
          
          az account set --subscription "\${{ secrets.AZURE_SUBSCRIPTION_ID }}"

      - name: Deploy Windows 11 VM
        run: |
          az deployment group create \\
            --resource-group "\${{ secrets.AZURE_RESOURCE_GROUP }}" \\
            --template-file ./infra/win11-vm.bicep \\
            --parameters \\
              vmName="\${{ secrets.AZURE_VM_NAME }}" \\
              location="\${{ secrets.AZURE_LOCATION }}" \\
              sourceRdpIP="\${{ github.event.inputs.sourceRdpIP }}"`;

const bicepCode = `param vmName string
param location string
param adminUsername string
@secure()
param adminPassword string
param sourceRdpIP string = '*'
param vmSize string = 'Standard_D4s_v3'

resource publicIP 'Microsoft.Network/publicIPAddresses@2023-05-01' = {
  name: '\${vmName}-pip'
  location: location
  sku: { name: 'Standard' }
  properties: {
    publicIPAllocationMethod: 'Static'
    dnsSettings: { domainNameLabel: vmName }
  }
}

resource networkSecurityGroup 'Microsoft.Network/networkSecurityGroups@2023-05-01' = {
  name: '\${vmName}-nsg'
  location: location
  properties: {
    securityRules: [{
      name: 'AllowRDP'
      properties: {
        priority: 1000
        protocol: 'Tcp'
        access: 'Allow'
        direction: 'Inbound'
        sourceAddressPrefix: sourceRdpIP
        destinationPortRange: '3389'
      }
    }]
  }
}

resource virtualMachine 'Microsoft.Compute/virtualMachines@2023-03-01' = {
  name: vmName
  location: location
  properties: {
    hardwareProfile: { vmSize: vmSize }
    storageProfile: {
      imageReference: {
        publisher: 'MicrosoftWindowsDesktop'
        offer: 'Windows-11'
        sku: 'win11-23h2-pro'
        version: 'latest'
      }
    }
  }
}`;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-4 border-primary">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
              R
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary leading-none">Roberto's Tech Blog</h1>
              <p className="text-sm text-muted-foreground">@soyroberto</p>
            </div>
          </div>
          <Button variant="outline" className="border-2 border-foreground" asChild>
            <a href="https://github.com/soyroberto/gitactioncreatevm" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section with Diagonal Cut */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 -mt-5 pt-8">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
          }}
        />
        <div className="container py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-6 py-2 bg-secondary text-secondary-foreground rounded-full font-bold text-sm border-4 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-2">
              🚀 AUTOMATION TUTORIAL
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              Automating Azure VM Deployment
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/80 mb-8 font-medium">
              with GitHub Actions + Bicep
            </p>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl">
              Learn how to automate the creation of a Windows 11 Virtual Machine in Azure's Mexico region using a powerful combination of GitHub Actions and Bicep infrastructure-as-code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="border-4 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-lg">
                <Rocket className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-4 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-lg" asChild>
                <a href="https://github.com/soyroberto/gitactioncreatevm" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)' }} />
      </section>

      {/* Main Infographic Section */}
      <section className="container py-16">
        <Card className="border-4 border-dashed border-primary p-8 shadow-[8px_8px_0_0_rgba(139,92,246,0.3)]">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
            The Complete Automation Workflow
          </h2>
          <div className="relative">
            <img 
              src="/images/main_infographic_complete.png" 
              alt="Complete GitHub Actions + Bicep automation workflow showing Roberto and the deployment process"
              className="w-full h-auto rounded-lg border-4 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            />
          </div>
        </Card>
      </section>

      {/* Interactive Demo Section */}
      <section className="bg-gradient-to-br from-accent/10 to-primary/10 py-16 -mx-4 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1 bg-accent text-accent-foreground rounded-full font-bold text-xs border-2 border-foreground">
              INTERACTIVE DEMO
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Watch the automation workflow execute step-by-step
            </p>
          </div>
          <WorkflowDemo />
        </div>
      </section>

      {/* What are GitHub Actions */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-accent text-accent-foreground rounded-full font-bold text-xs border-2 border-foreground">
              CONCEPT #1
            </div>
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              What are GitHub Actions?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground/80 mb-4">
                GitHub Actions is a <strong>CI/CD platform</strong> that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository or deploy merged pull requests to production.
              </p>
              <p className="text-lg text-foreground/80">
                In our case, we're using it to orchestrate the deployment of our Azure VM. Think of it as your automation command center that runs in the cloud!
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-primary/10 border-2 border-primary rounded-lg font-semibold text-sm">
                <Code2 className="w-4 h-4 inline mr-2" />
                Automate workflows
              </div>
              <div className="px-4 py-2 bg-secondary/10 border-2 border-secondary rounded-lg font-semibold text-sm">
                <Zap className="w-4 h-4 inline mr-2" />
                Deploy infrastructure
              </div>
              <div className="px-4 py-2 bg-accent/10 border-2 border-accent rounded-lg font-semibold text-sm">
                <Shield className="w-4 h-4 inline mr-2" />
                Run tests automatically
              </div>
            </div>
          </div>
          <Card className="border-4 border-dashed border-accent p-6 shadow-[6px_6px_0_0_rgba(59,130,246,0.3)]">
            <img 
              src="/images/01_github_actions_overview.png" 
              alt="GitHub Actions overview infographic"
              className="w-full h-auto rounded-lg border-2 border-foreground"
            />
          </Card>
        </div>
      </section>

      {/* YML + Bicep Workflow */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-16 -mx-4 px-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="border-4 border-dashed border-secondary p-6 shadow-[6px_6px_0_0_rgba(249,115,22,0.3)] order-2 md:order-1">
              <img 
                src="/images/02_yml_bicep_workflow.png" 
                alt="YML and Bicep workflow infographic"
                className="w-full h-auto rounded-lg border-2 border-foreground"
              />
            </Card>
            <div className="order-1 md:order-2">
              <div className="inline-block mb-4 px-4 py-1 bg-secondary text-secondary-foreground rounded-full font-bold text-xs border-2 border-foreground">
                CONCEPT #2
              </div>
              <h2 className="text-5xl font-bold mb-6 text-foreground">
                The Dynamic Duo: YML + Bicep
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground/80 mb-4">
                  Our automation is driven by two key files working together:
                </p>
                <div className="bg-card border-4 border-foreground p-4 rounded-lg mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold text-primary mb-2">create-win11-vm.yml</h3>
                  <p className="text-foreground/80">
                    This is our GitHub Actions workflow file. It defines the steps to be executed, such as logging into Azure, and then triggers the Bicep deployment.
                  </p>
                </div>
                <div className="bg-card border-4 border-foreground p-4 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold text-accent mb-2">win11-vm.bicep</h3>
                  <p className="text-foreground/80">
                    This is our Bicep file, which declaratively defines all the Azure resources needed for our VM, including the virtual machine itself, networking components, and security rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-primary text-primary-foreground rounded-full font-bold text-xs border-2 border-foreground">
            CODE EXAMPLES
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Explore the Code
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Dive into the actual YAML and Bicep files that power this automation
          </p>
        </div>
        <TabCodeViewer
          files={[
            {
              name: "create-win11-vm.yml",
              language: "yaml",
              code: yamlCode,
              description: "GitHub Actions workflow that orchestrates the entire deployment process"
            },
            {
              name: "win11-vm.bicep",
              language: "bicep",
              code: bicepCode,
              description: "Bicep template defining Azure infrastructure resources"
            }
          ]}
        />
      </section>

      {/* Infrastructure as Code */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-primary text-primary-foreground rounded-full font-bold text-xs border-2 border-foreground">
              CONCEPT #3
            </div>
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Infrastructure as Code Superpowers
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground/80 mb-6">
                By combining YAML for our workflow definition and Bicep for our infrastructure definition, we are embracing the concept of <strong>Infrastructure as Code (IaC)</strong>. This approach provides several key advantages:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 border-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Declarative</h3>
                    <p className="text-foreground/80">We define <em>what</em> we want, and the tools figure out <em>how</em> to make it happen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 border-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Repeatable</h3>
                    <p className="text-foreground/80">We can deploy the exact same infrastructure configuration multiple times with no variations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 border-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Version Controlled</h3>
                    <p className="text-foreground/80">All our infrastructure definitions are stored in a Git repository, allowing us to track changes and collaborate effectively.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card className="border-4 border-dashed border-primary p-6 shadow-[6px_6px_0_0_rgba(139,92,246,0.3)]">
            <img 
              src="/images/03_automation_power.png" 
              alt="Infrastructure as Code superpowers infographic"
              className="w-full h-auto rounded-lg border-2 border-foreground"
            />
          </Card>
        </div>
      </section>

      {/* Secrets Security */}
      <section className="bg-gradient-to-br from-destructive/10 to-accent/10 py-16 -mx-4 px-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="border-4 border-dashed border-destructive p-6 shadow-[6px_6px_0_0_rgba(220,38,38,0.3)] order-2 md:order-1">
              <img 
                src="/images/04_secrets_security.png" 
                alt="Secrets and security best practices infographic"
                className="w-full h-auto rounded-lg border-2 border-foreground"
              />
            </Card>
            <div className="order-1 md:order-2">
              <div className="inline-block mb-4 px-4 py-1 bg-destructive text-destructive-foreground rounded-full font-bold text-xs border-2 border-foreground">
                CONCEPT #4
              </div>
              <h2 className="text-5xl font-bold mb-6 text-foreground">
                Keeping Secrets Safe
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground/80 mb-4">
                  Our workflow requires sensitive information, such as Azure credentials and passwords. It is <strong>absolutely critical</strong> to handle these secrets securely. We use GitHub Secrets to store this information, which encrypts the secrets and makes them available only to the workflow.
                </p>
                <div className="bg-destructive/10 border-4 border-destructive p-6 rounded-lg mb-4">
                  <p className="text-xl font-bold text-destructive mb-2">⚠️ Never, ever, hardcode secrets!</p>
                  <p className="text-foreground/80">
                    Exposing credentials in a public repository is a major security risk that can lead to unauthorized access, data breaches, and financial loss.
                  </p>
                </div>
                <p className="text-lg text-foreground/80">
                  By following these principles, we can automate our infrastructure deployments in a way that is not only efficient but also secure and reliable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-20">
        <Card className="border-4 border-foreground bg-gradient-to-br from-primary to-secondary p-12 text-center shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Automate?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Check out the complete code on GitHub and start automating your Azure infrastructure deployments today!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xl px-8 py-6"
            asChild
          >
            <a href="https://github.com/soyroberto/gitactioncreatevm" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 mr-3" />
              View Repository
            </a>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-primary bg-muted py-12">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl border-4 border-foreground">
              R
            </div>
          </div>
          <p className="text-xl font-bold text-foreground mb-2">Created by Roberto</p>
          <p className="text-muted-foreground mb-4">@soyroberto</p>
          <p className="text-sm text-muted-foreground">
            © 2026 Roberto. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
