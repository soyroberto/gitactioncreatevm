param vmName string
param location string
param adminUsername string
@secure()
param adminPassword string
param dnsName string
param existingVnetName string
param existingSubnetName string
param sourceRdpIP string = '*'

// Get existing VNet
resource existingVnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: existingVnetName
}

resource publicIP 'Microsoft.Network/publicIPAddresses@2023-05-01' = {
  name: '${vmName}-pip'
  location: location
  sku: { name: 'Standard' }
  properties: {
    publicIPAllocationMethod: 'Static'
    dnsSettings: { domainNameLabel: dnsName }
  }
}

resource networkSecurityGroup 'Microsoft.Network/networkSecurityGroups@2023-05-01' = {
  name: '${vmName}-nsg'
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

resource networkInterface 'Microsoft.Network/networkInterfaces@2023-05-01' = {
  name: '${vmName}-nic'
  location: location
  properties: {
    ipConfigurations: [{
      name: 'ipconfig1'
      properties: {
        privateIPAllocationMethod: 'Dynamic'
        subnet: { id: existingVnet::subnets[existingSubnetName].id }
        publicIPAddress: { id: publicIP.id }
      }
    }]
    networkSecurityGroup: { id: networkSecurityGroup.id }
  }
}

resource virtualMachine 'Microsoft.Compute/virtualMachines@2023-03-01' = {
  name: vmName
  location: location
  properties: {
    hardwareProfile: { vmSize: 'Standard_D4s_v3' }
    storageProfile: {
      imageReference: {
        publisher: 'MicrosoftWindowsDesktop'
        offer: 'Windows-11'
        sku: 'win11-23h2-pro'
        version: 'latest'
      }
      osDisk: {
        createOption: 'FromImage'
        diskSizeGB: 128
        managedDisk: { storageAccountType: 'Premium_LRS' }
      }
    }
    osProfile: {
      computerName: vmName
      adminUsername: adminUsername
      adminPassword: adminPassword
      windowsConfiguration: {
        provisionVMAgent: true
        enableAutomaticUpdates: true
        timeZone: 'Central Standard Time (Mexico)'
      }
    }
    networkProfile: {
      networkInterfaces: [{ id: networkInterface.id }]
    }
    licenseType: 'Windows_Client'
  }
}

output fqdn string = publicIP.properties.dnsSettings.fqdn
output publicIP string = publicIP.properties.ipAddress
