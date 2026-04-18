# Listenverwaltung

Kleine WebApp zur Verwaltung von Listen.
Listen lassen sich anlegen und entfernen. Einträge lassen sich hinzufügen und entfernen.

## Setup

### Frontend
```bash
cd shoppinglist
npm install
npm run dev
```

Vite startet damit den lokalen Entwicklungsserver.

### Backend
```bash
cd backend
node server.js
```

## Technisches

- Frontend basiert auf **Vite**
- Backend läuft über einen einfachen **Node-Server**
- Der Server kann Nutzerinformationen über den Header `x-remote-user` auslesen

## Zweck

Das syncen der Einkaufsliste mit meiner Frau ;)
