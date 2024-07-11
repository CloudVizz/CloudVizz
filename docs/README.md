## Project documentation (architecture, guides)


root/
│
- ├── src/
│   │
- │   ├── assets/                  # Frontend assets (e.g., images, fonts)
- │   ├── components/              # Reusable UI components
- |   ├── config/                  # Configuration files (e.g., database, environment variables)
- |   |── database/
- │   |    └── schema.sql          # Database schema definition
- |   |
- |   ├── dependencies             # Dependencies related files
- |   ├── javascript               # JavaScript files
- |   ├── models/                  # Data models (e.g., cost entries,  cost calculations)
- │   ├── public/
- │   │   ├── index.html           # Entry HTML file
- │   │   └── ...                  # Other static assets
- |   |
- │   ├── services/                # Services (e.g., API calls)
- │   ├── styles/                  # CSS or styling files
- │   ├── tests/                   # Tests
- │   ├── views/                   # React or Vue components for views
- │   |── server.js                # Main frontend application file
- │   ├── node_modules/            # Node.js dependencies (generated)  
- │   └── package.json             # Node.js package file
- |    
│
- |─ docs/                        # Project documentation (architecture, guides)
- ├── .gitignore                   # Git ignore file
- ├── .env                         # Environment variables file (not committed)
- ├── README.md                    # Project README
- └── LICENSE                      #Apache Licence
