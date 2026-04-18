import { type List } from "../types/List";

export async function createList(title: string) {
  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title}),
  });
  if (!res.ok) {
    console.error('Fehler beim POST /api/items', res.status);
    return;
  }
  const item = await res.json();
  console.log('Neu angelegtes Item:', item);
  return item.id;
}


export async function loadLists(): Promise<List[]> {
  const res = await fetch('/api/items');
  if (!res.ok) {
    console.error('Fehler beim GET /api/items', res.status);
    return [];
  }

  const lists = await res.json();
  console.log('Alle Items aus /api/items:', lists);

  if (!Array.isArray(lists)) {
    console.error('Unerwartetes Format von /api/items', lists);
    return [];
  }

  return lists as List[];
}

export async function deleteList(listID: number): Promise<boolean> {
  const res = await fetch(`/api/items/${listID}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Fehler beim DELETE /api/items', res.status);
    return false;
  }

  return true; 
}

export async function setEntrie(listId: number, entry: string) {
  const res = await fetch(`/api/items/${listId}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entry: entry}),
  });
  if (!res.ok) {
    console.error(`Fehler beim POST /api/items/${listId}/entries`, res.status);
    return;
  }
  await res.json();
}

export async function deleteEntry(listId: number, entryId: number): Promise<boolean> {
  const res = await fetch(`/api/items/${listId}/entries/${entryId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Fehler beim DELETE', res.status);
    return false;
  }

  return true; 
}