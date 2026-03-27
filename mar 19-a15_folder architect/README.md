# Folder Architect — Team Dashboard

A project demonstrating proper folder architecture with separated frontend and backend, JSON data storage, and API-based data retrieval.

## Project Structure

```
folder-architect/
├── client/                 (Frontend)
│   ├── index.html          Dashboard page
│   ├── style.css           Styles
│   └── app.js              Fetch & render logic
├── server/                 (Backend)
│   ├── controllers/
│   │   └── teamController.js   Data logic
│   ├── routes/
│   │   └── teamRoutes.js       Route handling
│   ├── data/
│   │   └── team.json           Sample data
│   └── server.js               HTTP server
├── package.json
└── README.md
```

## How to Run

1. Start the server:
   ```
   npm start
   ```
2. Open `client/index.html` in your browser
3. Click "Fetch Team" to retrieve data from the API

## API Endpoints

- `GET /` — Welcome message
- `GET /api/team` — All team members
- `GET /api/team/:id` — Member by ID
