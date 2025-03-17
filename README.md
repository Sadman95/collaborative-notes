# **Collaborative Notes App**

This monorepo is set up using **Lerna** and **npm workspaces** to manage multiple packages within the repository.

## **Getting Started**

### **Initial Setup**

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd your-repo-directory
   ```

2. Install dependencies across all packages:

   ```bash
   npm install
   ```


### **Running the Application**

- To run the **web** application from the root:

  ```bash
  cd apps/web
  yarn run dev
  ```

- To run the **server** application from the root:

  ```bash
  cd apps/server
  npm run dev
  ```

### **Running Both Applications**

You can also run both applications simultaneously:

```bash
npm run dev
```

## **Directory Structure**

```bash
collaborative-notes/
│
├── apps/
│   ├── web/                # web
│   └── server/             # server
│
├── lerna.json              # Lerna configuration file
├── package.json            # Root package.json with npm workspaces
└── README.md               # Project documentation
```

## **Swagger API Spec For Testing**
- [API](http://localhost:4000/docs/api/v1)



## **License**

This project is licensed under the MIT License.