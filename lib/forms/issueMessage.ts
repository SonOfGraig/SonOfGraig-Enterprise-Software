// Client-safe (no zod). Turns server validation issues into the form's banner
// text. If an issue belongs to a field the person cannot see (hidden fields,
// or a field added on the server only), the banner says so plainly instead of
// pointing at "highlighted fields" when nothing on screen is highlighted.
export function issueMessage(issues: Record<string, string[] | undefined>, visibleFields: readonly string[], contactEmail: string): string {
  const hidden = Object.keys(issues).filter((k) => !visibleFields.includes(k));
  if (hidden.length === 0) return 'Please check the highlighted fields.';
  return `We could not accept the form (${hidden.join(', ')}). Please try again, or email ${contactEmail} and we will pick it up from there.`;
}
