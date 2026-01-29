# Automated Azure Windows 11 VM Deployment

This repository automates the deployment of a Windows 11 Virtual Machine in Azure's Mexico Central region using GitHub Actions and Bicep infrastructure-as-code.

## Overview

This project demonstrates how to combine GitHub Actions workflows with Azure Bicep templates to create a fully automated, repeatable, and secure VM deployment pipeline. With a single manual trigger, you can deploy a complete Windows 11 environment including networking, security, and remote access configuration.

## What This Code Does

The automation workflow performs the following steps:

1. **Authenticates to Azure** using a Service Principal stored securely in GitHub Secrets
2. **Deploys infrastructure** using a Bicep template that defines all required Azure resources
3. **Creates a Windows 11 VM** with the following components:
   - Virtual Machine (Standard_D4s_v3) running Windows 11 23H2 Pro
   - Public IP address with DNS label for easy access
   - Network Security Group (NSG) configured to allow RDP access only from your IP
   - Network Interface (NIC) connected to an existing Virtual Network
   - OS Disk (128GB Premium SSD) and Data Disk (256GB Premium SSD)
4. **Configures security** by restricting RDP access to your specified public IP address
5. **Returns connection details** including the FQDN and RDP command for immediate access

## Key Features

- **Infrastructure as Code**: All resources are defined declaratively in Bicep, ensuring consistent and repeatable deployments
- **Secure Credential Management**: Azure credentials are stored as encrypted GitHub Secrets, never exposed in code
- **IP-Restricted Access**: RDP access is automatically restricted to your public IP address for enhanced security
- **Existing Network Integration**: Connects to an existing Azure Virtual Network, maintaining network isolation
- **Mexico Region Deployment**: Optimized for deployment in Azure's Mexico Central region with appropriate timezone configuration

## Architecture

The deployment creates the following Azure resources:

| Resource Type | Name Pattern | Purpose |
|--------------|--------------|---------|
| Virtual Machine | `{vmName}` | Windows 11 23H2 Pro VM |
| Public IP | `{vmName}-pip` | Static public IP with DNS label |
| Network Security Group | `{vmName}-nsg` | Firewall rules for RDP access |
| Network Interface | `{vmName}-nic` | VM network connectivity |
| OS Disk | `{vmName}-osdisk` | 128GB Premium SSD |
| Data Disk | `{vmName}-datadisk1` | 256GB Premium SSD |

## Prerequisites

Before using this workflow, you need to configure the following GitHub Secrets:

- `AZURE_CLIENT_ID` - Service Principal Application ID
- `AZURE_CLIENT_SECRET` - Service Principal Password
- `AZURE_TENANT_ID` - Azure Active Directory Tenant ID
- `AZURE_SUBSCRIPTION_ID` - Target Azure Subscription ID
- `AZURE_RESOURCE_GROUP` - Resource Group for deployment
- `AZURE_VM_NAME` - Desired VM name
- `AZURE_LOCATION` - Azure region (e.g., mexicocentral)
- `AZURE_ADMIN_USERNAME` - VM administrator username
- `AZURE_ADMIN_PASSWORD` - VM administrator password
- `AZURE_DNS_NAME` - DNS label for public IP
- `AZURE_VNET_NAME` - Existing Virtual Network name
- `AZURE_VNET_RG` - Resource Group containing the VNet
- `AZURE_SUBNET_NAME` - Subnet name within the VNet

## Usage

1. Navigate to the **Actions** tab in this repository
2. Select the **Create Windows 11 VM in MX** workflow
3. Click **Run workflow**
4. Enter your public IP address (get it from https://api.ipify.org)
5. Click **Run workflow** to start the deployment
6. Wait approximately 5-10 minutes for the VM to be provisioned
7. Use the provided RDP connection details to access your new VM

## Security Best Practices

This project implements several security best practices:

- **Service Principal Authentication**: Uses dedicated service accounts instead of personal credentials
- **Encrypted Secrets**: All sensitive information is stored in GitHub Secrets with encryption at rest
- **IP Whitelisting**: RDP access is restricted to a single IP address, reducing attack surface
- **Secure Parameters**: Bicep uses `@secure()` decorator for sensitive parameters
- **Network Isolation**: VM connects to existing VNet for proper network segmentation
- **Least Privilege**: Service Principal should be granted only necessary permissions

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── create-win11-vm.yml    # GitHub Actions workflow definition
├── infra/
│   └── win11-vm.bicep             # Bicep infrastructure template
└── README.md                       # This file
```

## Learn More

For a detailed explanation of how this automation works, check out the accompanying blog post and infographics in the repository.

## Author

Created by **Roberto** ([@soyroberto](https://github.com/soyroberto))

## License

This project is open source and available for use and modification.
