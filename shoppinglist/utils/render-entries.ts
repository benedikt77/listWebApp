import { deleteEntry, deleteList, loadLists } from "../store/lists";
import { elements } from "./elements";
import { renderLists } from "./render-lists";

export async function renderEntries(listId: number): Promise<void> {
  console.log("renderEntries wird ausgeführt...")
  console.log("übergebene ID " + listId + " " + typeof listId)
elements.generatedImage.hidden = true;
elements.newItemForm.hidden = false;
elements.headlineEntries.hidden = false;

elements.activeListActions.hidden = false;
elements.activeListActions.innerHTML = "";

elements.items.innerHTML = "";

  const lists = await loadLists();
  if (!lists) return console.error("Es wurden keine Daten geladen");;

  const list = lists.find((l) => l.id === listId);
  if (!list) return console.error("Keine Liste mit dieser ID gefunden!");
  list.entries.forEach((entry) => {

    const li = document.createElement("li");
    li.dataset.itemId = entry.id.toString();

    const p = document.createElement("p");
    p.textContent = entry.title;

    if (entry.author === "bene") {
      li.classList.add("entry-bene");
    } else if (entry.author === "carina") {
      li.classList.add("entry-carina");
    } else if (entry.author === "test") {
      li.classList.add("entry-test");
    }


    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "🗑";

    button.addEventListener("click", async () => {
      await deleteEntry(listId, entry.id)
      await renderEntries(list.id);
    });

    li.appendChild(p);
    li.appendChild(button);
    elements.items.appendChild(li);
  });

  const deleteListButton = document.createElement("button");
  deleteListButton.type = "button";
  deleteListButton.textContent = "Liste komplett löschen";

  deleteListButton.addEventListener("click", async () => {
  
  const ok = window.confirm("Willst du wirklich die gesamte Liste löschen?");
  if(!ok){
    return;
  }
  await deleteList(list.id);

  elements.items.innerHTML = "";
  elements.newItemForm.hidden = true;
  elements.headlineEntries.hidden = true;
  elements.activeListActions.dataset.listId = "";
  elements.activeListActions.innerHTML = "";
  elements.activeListActions.hidden = true;

  elements.activeListTitle.textContent = "Keine Liste ausgewählt";
  elements.generatedImage.hidden = false;

  const lists = await loadLists();
  if (lists) {
    renderLists(lists);
  }
});

elements.activeListActions.appendChild(deleteListButton);
}
