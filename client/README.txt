FOLDER DESCRIPTION: The client folder holds all relevant code related to the display layer. This includes the Login, PDF Menu, PDF Viewer, and Note Taking Editor components. 
It's also important to note that some of these components can perform calls that connect to the code in the server folder.

EXECUTION: The execution of this folder falls on main.tsx and index.tsx, they handle the interactions between the components and perform the actual rendering.

FOLDER STRUCTURE:

├─ client (ARA CLIENT APPLICATION CODE)
│  ├─ package.json (DEFINE DEPENDENCIES AND SCRIPTS FOR ARA CLIENT)
│  ├─ node_modules (STORE DEPENDENCIES AFTER INSTALLATION)
│  │  └─ ... (SEQUENCE OF DEPENDENCY SOURCE CODE)
│  ├─ public (CLIENT SIDE STATIC ASSETS - IMAGES)
│  └─ src (SOURCE CODE)
│     ├─ assets (HOLD PRELOADED PDF FILES)
│     ├─ components (MODULAR REACT COMPONENTS FOR BUILDING PAGE 
