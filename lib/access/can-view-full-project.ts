/**
 * Check whether the current user has full (paid) access to a project.
 * Currently a simple boolean check on project.is_paid.
 * Kept as a separate module so future access rules (trial, subscription tier, etc.)
 * can be added without touching UI code.
 */
export function canViewFullProject(isPaid: boolean): boolean {
  return isPaid;
}
