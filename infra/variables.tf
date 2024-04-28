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
