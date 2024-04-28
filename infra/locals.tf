locals {
  resource_group_name = "PRD-CENTRAL"

  dns_zone             = "petfriend.delu.ar"
  subdomain            = "admin"
  env_subdomain_suffix = var.env == "prd" ? "" : "-${var.env}"
}
