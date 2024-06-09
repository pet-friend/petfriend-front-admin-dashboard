data "azurerm_dns_zone" "dns" {
  provider = azurerm.dns_sub

  name                = local.dns_zone
  resource_group_name = local.dns_zone_resource_group
}

resource "azurerm_dns_cname_record" "cname" {
  provider = azurerm.dns_sub

  name                = "${local.subdomain}${local.env_subdomain_suffix}"
  zone_name           = data.azurerm_dns_zone.dns.name
  resource_group_name = data.azurerm_dns_zone.dns.resource_group_name
  ttl                 = 3600
  record              = azurerm_static_web_app.web.default_host_name
}

resource "time_sleep" "dns_propagation" {
  create_duration = "30s"

  triggers = {
    domain_name  = "${azurerm_dns_cname_record.cname.name}.${azurerm_dns_cname_record.cname.zone_name}"
    cname_record = azurerm_dns_cname_record.cname.record
  }
}

resource "azurerm_static_web_app_custom_domain" "domain" {
  static_web_app_id = azurerm_static_web_app.web.id
  domain_name       = time_sleep.dns_propagation.triggers.domain_name
  validation_type   = "cname-delegation"
}
