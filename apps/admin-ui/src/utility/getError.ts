/**
 * Get nested error message from RHF without lodash
 * @param errors - form.formState.errors
 * @param path - "general.firstName" | "parent.father.phone"
 * @returns string | null
 */
export const getError = (errors: any, path: string): string | null => {
  const keys = path.split("."); // ["general", "firstName"]

  let current = errors;
  for (const key of keys) {
    if (!current || !current[key]) return null;
    current = current[key];
  }

  return current?.message || null;
};
