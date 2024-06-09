variable "env" {
  description = "Environment"
  default     = "dev"
  type        = string
}

variable "app_name" {
  description = "Application name, used in the resource names"
  default     = "admin-dashboard"
  type        = string
}

variable "dns_zone_data" {
  description = "DNS zone data"
  type = object({
    tenant_id       = string
    subscription_id = string
    client_id       = string
  })
  nullable = true
  default  = null
}
