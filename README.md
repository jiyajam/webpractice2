# README

This repository walks you through building a **full‑stack application** for managing jobs data. Each branch introduces new functionality, starting from a basic setup and gradually adding CRUD operations, routing, authentication, and route protection.

<!-- Main entry: [week7-fepp-en](https://github.com/tx00-resources-en/week7-fepp-en) -->

---

## Branch Overview

| Branch                                                                                                 | Description                                                                                              |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [branch0-starter-code](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch0-starter-code)   | Starter code for frontend and backend. Use this as the base for your full‑stack app.                     |
| [branch1-get-post](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post)           | Implements **GET all jobs** and **POST (add one job)** in backend + frontend integration.                |
| [branch2-getone-delete](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch2-getone-delete) | Adds **GET one job** and **DELETE one job** functionality.                                               |
| [branch3-update-router](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch3-update-router) | Adds **UPDATE one job** functionality. Frontend switches to **RouterProvider** instead of BrowserRouter. |
| [branch6-auth](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth)                   | Implements **user registration and login** functionality.                                                |
| [branch7-protect-jobs](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs)   | Adds **route protection** in backend and frontend.                                                       |

---

## Step‑by‑Step Learning Path

1. **Branch 0 – Starter Code**

   - Basic frontend + backend setup.
   - Use this as your foundation.

2. **Branch 1 – GET & POST Jobs**

   - Backend: Implement endpoints to fetch all jobs and add a new job.
   - Frontend: Add forms and UI logic to display and create jobs.

3. **Branch 2 – GET One & DELETE Job**

   - Backend: Add endpoints to fetch a single job and delete a job.
   - Frontend: Add UI for viewing job details and deleting jobs.

4. **Branch 3 – UPDATE Job + RouterProvider**

   - Backend: Implement update job endpoint.
   - Frontend: Add edit job form and refctor `App.jsx` to use `RouterProvider` for routing.

5. **Branch 6 – Authentication**

   - Backend: Add user registration and login functionalities.
   - Frontend: Add login/register forms and store JWT tokens.

6. **Branch 7 – Protect Routes**
   - Backend: Protect job routes so only authenticated users can access them.
   - Frontend: Add logic to restrict access to protected pages.

---

## Final Notes

- Each branch builds on the previous one.
- You can check out any branch to explore the code at that stage.
