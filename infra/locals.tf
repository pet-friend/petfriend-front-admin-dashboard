locals {
  resource_group_name = "PRD-CENTRAL"
  location            = "eastus2"

  dns_zone             = "petfriend.delu.ar"
  subdomain            = "admin"
  env_subdomain_suffix = var.env == "prd" ? "" : "-${var.env}"
}
