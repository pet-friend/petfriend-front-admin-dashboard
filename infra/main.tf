terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
    time = {
      source = "hashicorp/time"
    }
  }
  backend "remote" {}
}

provider "azurerm" {
  features {}
}

provider "azurerm" {
  alias = "dns_sub"
  features {}

  tenant_id       = var.dns_zone_data == null ? data.azurerm_client_config.config.tenant_id : var.dns_zone_data.tenant_id
  subscription_id = var.dns_zone_data == null ? data.azurerm_client_config.config.subscription_id : var.dns_zone_data.subscription_id
  client_id       = var.dns_zone_data == null ? data.azurerm_client_config.config.client_id : var.dns_zone_data.client_id
}

data "azurerm_client_config" "config" {}

data "azurerm_resource_group" "rg" {
  name = local.resource_group_name
}

resource "azurerm_static_web_app" "web" {
  name                = "${lower(var.env)}-${lower(var.app_name)}-web"
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = local.location
  sku_tier            = "Free"
  sku_size            = "Free"
}
