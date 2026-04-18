import './style.css'
import '../utils/elements'
import { elements } from '../utils/elements'
import { renderLists } from '../utils/render-lists'
import { renderEntries } from '../utils/render-entries'
import { setEntrie } from '../store/lists'
import { createList, loadLists } from '../store/lists'


// eine neue Liste anlegen und rendern
elements.newListForm.onsubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;
  const data = new FormData(form);

  const listTitle = data.get("name") as string | null;

  if (!listTitle) return;

  const createdListId: number = await createList(listTitle);
  console.log("Created List: " + JSON.stringify(createdListId))
  renderEntries(createdListId)
  elements.activeListTitle.textContent = listTitle;
  elements.activeListActions.dataset.listId = createdListId.toString();

  const lists = await loadLists();
  if (lists) {
    renderLists(lists);
  }
  form.reset();
};

// einen neuen Listeneintrag erstellen und diese rendern
elements.newItemForm.onsubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;
  const data = new FormData(form);

  const entryText = data.get("text") as string | null;

  // Die ID der aktuell ausgewählten Liste
  const rawId = elements.activeListActions.dataset.listId;
  if (rawId === undefined) {
    console.error("Keine aktive Liste gesetzt");
    return;
  }

  const listId = parseInt(rawId, 10);
  if (Number.isNaN(listId)) {
    console.error("listId ist keine gültige Zahl:", rawId);
    return;
  }

  if (!entryText || !listId) {
    console.error("entryText oder listId fehlt");
    return;
  }

  await setEntrie(listId, entryText);
  await renderEntries(listId);

  form.reset();
};

elements.headlineEntries.hidden = true;
elements.newItemForm.hidden = true;

const lists = await loadLists()
if (lists) {
  renderLists(lists);
}


