export function find_top_parent(
  element: HTMLElement,
  parent_css_selector: string
): HTMLElement | null {
  let parent = element.parentElement;
  if (!parent) return null;
  if (
    parent?.classList.contains(parent_css_selector) ||
    parent?.id === parent_css_selector
  ) {
    return parent;
  }
  return find_top_parent(parent, parent_css_selector);
}
