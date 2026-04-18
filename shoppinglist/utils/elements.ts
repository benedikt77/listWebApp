export function getElement<T extends HTMLElement>(query: string): T {
  const element = document.querySelector<T>(query);
  if (element === null) throw new Error(`Element not found: ${query}`);

  return element;
}

export const elements = {
  lists: getElement<HTMLUListElement>("#lists"),
  newListForm: getElement<HTMLFormElement>("#new-list-form"),
  newItemForm: getElement<HTMLFormElement>("#new-item-form"),
  items: getElement<HTMLUListElement>("#items"),
  activeListTitle: getElement<HTMLHeadingElement>("#active-list-title"),
  headlineEntries: getElement<HTMLHeadingElement>("#headline-entries"),
  activeListActions: getElement<HTMLDivElement>("#active-list-actions"),
  generatedImage: getElement<HTMLImageElement>("#generated-image"),
};
