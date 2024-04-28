terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
  backend "remote" {}
}

provider "azurerm" {
  features {}
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
