<include brief description of the system>

AUTHORS: Nabil Abdel-Rahman, Francisco Cilia, Valerie Dagley, Ronan Kelly, Abhinav Palacharla

CREATED: April 11th 2024

CREATION PURPOSE: This repository will be used for the University of Oregon CS 422 Software Methodology class. In particular it will hold all relevant files developed by group 1 for the first project of the class.

SETUP INSTRUCTIONS: Please follow the setup guide (setup.pdf file) found at the project root.

DEPENDENCIES: Node.js v20.12.2 - Installation details can be found in the setup instructions file.

PROJECT STRUCTURE:

├─ README.md
├─ README.txt
├─ setup.md
├─ client (ARA CLIENT APPLICATION CODE)
│  ├─ package.json (DEFINE DEPENDENCIES AND SCRIPTS FOR ARA CLIENT)
│  ├─ node_modules (STORE DEPENDENCIES AFTER INSTALLATION)
│  │  └─ ... (SEQUENCE OF DEPENDENCY SOURCE CODE)
│  ├─ public (CLIENT SIDE STATIC ASSETS - IMAGES)
│  └─ src (SOURCE CODE)
│     ├─ assets (HOLD PRELOADED PDF FILES)
│     ├─ components (MODULAR REACT COMPONENTS FOR BUILDING PAGE VIEWS)
│     ├─ views (ROUTE VIEWS FOR PAGES)
├─ server
│  ├─ package.json (DEFINE DEPENDENCIES AND SCRIPTS FOR SQ3R SERVER)
│  ├─ node_modules (STORE DEPENDENCIES AFTER INSTALLATION)
│  │  └─ ... (SEQUENCE OF DEPENDENCY SOURCE CODE)
│  └─ drizzle (COMPILED DATABASE DRIVER AFTER `npm run schema-push`)
│  └─ migrations-folder (SQL MIGRATIONS)
│  │  └─ ... (SEQUENCE OF MIGRATIONS)
│  └─ drizzle (COMPILED DATABASE DRIVER AFTER `npm run schema-push`)
│  └─ src (SOURCE CODE)
│     └─ index.ts (MAIN SERVER FILE, HOLDS ALL API ROUTES)

