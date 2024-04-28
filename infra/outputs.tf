output "tenant_id" {
  value = data.azurerm_client_config.config.tenant_id
}

output "subscription_id" {
  value = data.azurerm_client_config.config.subscription_id
}

output "client_id" {
  value = data.azurerm_client_config.config.client_id
}

output "site_url" {
  value = azurerm_static_web_app_custom_domain.domain.domain_name
}

output "site_name" {
  value = azurerm_static_web_app.web.name
}
