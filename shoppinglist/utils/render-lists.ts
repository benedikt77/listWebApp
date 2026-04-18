import type { List } from "../types/List";
import { elements } from "./elements";
import { renderEntries } from "./render-entries";


export function renderLists(lists: List[]): void {
  elements.lists.innerHTML = "";

  if (!Array.isArray(lists)) {
    console.error("renderLists: lists ist kein Array", lists);
    return;
  }

  lists.forEach((list) => {
    if (!list || typeof list.id === "undefined") {
      console.error("renderLists: ungültige list", list);
      return;
    }

    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.listId = list.id.toString();
    button.textContent = list.title;

    button.addEventListener("click", () => {

      // 1. Alle anderen Buttons „entaktivieren“
      document.querySelectorAll<HTMLButtonElement>(".lists button.is-active")
        .forEach((btn) => btn.classList.remove("is-active"));

      // 2. Diesen Button aktiv machen
      button.classList.add("is-active");

      elements.activeListTitle.textContent = list.title;
      elements.activeListActions.dataset.listId = list.id.toString();
      renderEntries(list.id);
    });

    li.appendChild(button);
    elements.lists.appendChild(li);
  });
}
