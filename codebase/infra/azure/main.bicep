@description('Azure region for resources')
param location string

@description('Storage account name for static website hosting')
param storageAccountName string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
  }
}

resource staticWebsite 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    isVersioningEnabled: false
    changeFeed: {
      enabled: false
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

resource websiteConfig 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: staticWebsite
  name: '$web'
  properties: {
    publicAccess: 'Container'
  }
}

output webEndpoint string = storageAccount.properties.primaryEndpoints.web
