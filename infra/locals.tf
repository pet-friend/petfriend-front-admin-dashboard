locals {
  resource_group_name = "${upper(var.env)}-CENTRAL"
  location            = "eastus2"

  dns_zone_resource_group = "PRD-CENTRAL"
  dns_zone                = "petfriend.delu.ar"
  subdomain               = "admin"
  env_subdomain_suffix    = var.env == "prd" ? "" : "-${var.env}"
}
