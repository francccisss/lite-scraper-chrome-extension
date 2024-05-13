export function find_top_parent(element, parent_css_selector) {
    let parent = element.parentElement;
    if (!parent)
        return null;
    if (parent?.classList.contains(parent_css_selector) ||
        parent?.id === parent_css_selector) {
        return parent;
    }
    return find_top_parent(parent, parent_css_selector);
}
