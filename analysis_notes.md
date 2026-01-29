# Repository Analysis: gitactioncreatevm

## Overview
This repository automates Windows 11 VM deployment in Azure's Mexico region using GitHub Actions and Bicep infrastructure-as-code.

## Key Components

### 1. GitHub Actions Workflow (.github/workflows/create-win11-vm.yml)
- **Trigger**: Manual workflow_dispatch with user IP input
- **Runner**: ubuntu-latest
- **Steps**:
  1. Checkout repository
  2. Azure login using Service Principal credentials
  3. Deploy VM using Bicep template
  4. Wait for VM provisioning (timeout: 600s)
  5. Retrieve connection info (FQDN, RDP command)

### 2. Bicep Template (infra/win11-vm.bicep)
- **Resources Created**:
  - Public IP with DNS label (Standard SKU, Static)
  - Network Security Group (NSG) with RDP rule (port 3389)
  - Network Interface (NIC) attached to existing VNet
  - Virtual Machine (Windows 11 23H2 Pro)
    - Size: Standard_D4s_v3
    - OS Disk: 128GB Premium_LRS
    - Data Disk: 256GB Premium_LRS
    - Timezone: Central Standard Time (Mexico)

### 3. Secrets Used
- AZURE_CLIENT_ID - Service Principal App ID
- AZURE_CLIENT_SECRET - Service Principal password
- AZURE_TENANT_ID - Azure AD tenant
- AZURE_SUBSCRIPTION_ID - Target subscription
- AZURE_RESOURCE_GROUP - Deployment resource group
- AZURE_VM_NAME - VM name
- AZURE_LOCATION - Azure region (Mexico Central)
- AZURE_ADMIN_USERNAME - VM admin username
- AZURE_ADMIN_PASSWORD - VM admin password
- AZURE_DNS_NAME - DNS label for public IP
- AZURE_VNET_NAME - Existing VNet name
- AZURE_VNET_RG - VNet resource group
- AZURE_SUBNET_NAME - Subnet name

## Automation Flow
1. User triggers workflow with their public IP
2. GitHub Actions runner authenticates to Azure
3. Bicep template deploys infrastructure
4. NSG restricts RDP access to user's IP only
5. VM provisions with Windows 11 Pro
6. Connection details returned as output

## Security Features
- Service Principal authentication (no user credentials)
- IP-restricted RDP access
- Secrets stored in GitHub Secrets (encrypted)
- Secure parameter handling in Bicep (@secure())
- Existing VNet integration (network isolation)
