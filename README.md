This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Git Command Cheat Sheet

| **Action** | **Command** | **Description** |
|------------|-------------|-----------------|
| **Set name and email (only once)** | `git config --global user.name "Your Name"`<br>`git config --global user.email "your.email@example.com"` | Configures your identity in Git. |
| **Check current branch** | `git branch` | Shows the current branch and all local branches. |
| **Switch to main branch** | `git checkout main` | Switches to the `main` branch. |
| **Switch to develop branch** | `git checkout develop` | Switches to the `develop` branch. |
| **Pull latest changes (main)** | `git pull origin main` | Fetches and merges the latest changes from the `main` branch. |
| **Pull latest changes (develop)** | `git pull origin develop` | Fetches and merges the latest changes from the `develop` branch. |
| **Check file status** | `git status` | Shows modified, new, or deleted files that are not committed yet. |
| **Stage all changes** | `git add .` | Stages all changes for commit. |
| **Stage a specific file** | `git add file.txt` | Stages a specific file for commit. |
| **Commit changes** | `git commit -m "Message"` | Creates a commit with the staged changes. |
| **Push changes to main** | `git push origin main` | Pushes your commits to the `main` branch in remote. |
| **Push changes to develop** | `git push origin develop` | Pushes your commits to the `develop` branch in remote. |
| **Create and switch to a new branch** | `git checkout -b branch-name` | Creates and switches to a new local branch. |
| **Stash changes temporarily** | `git stash` | Saves changes without committing and cleans the working directory. |
| **Retrieve stashed changes** | `git stash pop` | Restores the most recently stashed changes. |
| **Discard changes in a file** | `git checkout -- file.txt` | Reverts a file to the last commit. |
| **Discard all local changes** | `git reset --hard` | Deletes all uncommitted changes. |
| **Fetch changes without merging** | `git fetch origin` | Downloads changes from remote without merging them. |

---

## Recommended Workflow

1. **Check current branch**  
   ```bash
   git branch
   ```

2. **Switch to the correct branch** (`main` or `develop`)  
   ```bash
   git checkout develop
   ```

3. **Update your repo with the latest changes from remote**  
   ```bash
   git pull origin develop
   ```

4. **Make your changes** (edit, create, or delete files).

5. **Check what has changed**  
   ```bash
   git status
   ```

6. **Stage changes**  
   ```bash
   git add .
   ```

7. **Commit changes**  
   ```bash
   git commit -m "Brief description of changes"
   ```

8. **Push changes to remote**  
   ```bash
   git push origin develop
   ```

**Tip:** Always `git pull` before `git push` to avoid conflicts.
