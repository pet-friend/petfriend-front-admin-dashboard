function toChoices<T extends readonly string[]>(
  values: T,
): { id: string; name: string }[] {
  return values.map((value) => ({
    id: value,
    name: value.charAt(0).toUpperCase() + value.slice(1),
  }));
}

export const TICKET_STATUSES = ["open", "closed"] as const;
export const TICKET_STATUS_CHOICES = toChoices(TICKET_STATUSES);

export const USER_ADDRESS_TYPES = [
  "house",
  "apartment",
  "office",
  "other",
] as const;
export const USER_ADDRESS_TYPE_CHOICES = toChoices(USER_ADDRESS_TYPES);
