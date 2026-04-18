const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

const DATA_FILE = path.join(__dirname, 'data.json');

const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`API listening on http://${HOST}:${PORT}`);
});


app.use(express.json());

app.use((req, _res, next) => {
  const user = req.header("x-remote-user") || null;
  console.log("Angemeldet ist: " + user)
  req.authUser = user; 
  next();
});


function loadItems() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return raw ? JSON.parse(raw) : [];
}

function saveItems(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
}

// Listen abrufen;
app.get('/api/items', (req, res) => {
  const items = loadItems();
  res.json(items);
});

// Listen um eine Liste erweitern:
app.post('/api/items', (req, res) => {
  const items = loadItems();
  const title = (req.body && req.body.title) || '';
  const newItem = { id: Date.now(), title, entries: [] };
  items.push(newItem);
  saveItems(items);
  res.status(201).json(newItem);
});

// Eine Liste löschen:
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const items = loadItems();
  const filtered = items.filter((item) => item.id !== id);
  saveItems(filtered);
  res.status(204).end();
});

// Eintrag in einer Liste hinzufügen
app.post('/api/items/:listId/entries', (req, res) => {
  const { listId } = req.params;
  const { entry } = req.body || {};
  if (typeof entry !== 'string' || !entry.trim()) {
    return res.status(400).json({ error: 'entry fehlt' });
  }
  const lists = loadItems();
  const list = lists.find((l) => String(l.id) === String(listId));

  if (!list) {
    return res.status(404).json({ error: 'Liste nicht gefunden' });
  }
  const newEntry = {
    id: Date.now(),
    title: entry,
    author: req.authUser,
    completed: false
  };
  console.log("Das entry obj" + JSON.stringify(newEntry))
  list.entries.push(newEntry);
  saveItems(lists);
  res.status(201).json(newEntry);
});

// Einen Eintrag einer Liste löschen
app.delete('/api/items/:listId/entries/:entryId', (req, res) => {
  const { listId, entryId } = req.params;

  const lists = loadItems();
  const list = lists.find((l) => String(l.id) === String(listId));

  if (!list) {
    return res.status(404).json({ error: 'Liste nicht gefunden' });
  }

  // Index des Eintrags in dieser Liste finden
  const index = list.entries.findIndex(
    (e) => String(e.id) === String(entryId)
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Eintrag nicht gefunden' });
  }

  // Eintrag aus dem entries-Array dieser Liste entfernen
  list.entries.splice(index, 1);

  // Gesamte Listenstruktur speichern
  saveItems(lists);

  // 204 = "No Content" ist bei DELETE üblich
  return res.sendStatus(204);
});


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

