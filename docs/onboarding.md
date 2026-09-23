# Developer Onboarding Guide

Welcome to the **BFSU-web** project! This guide will help any student, union member, or contributor get the development environment running in under 5 minutes.

---

## 1. Prerequisites

You need **Node.js** and **pnpm** installed on your computer.

### Recommended Setup (Using `mise`)
If you use [mise](https://mise.jdx.dev):
```bash
# 1. Clone the repo and enter the folder
cd BFSU-web

# 2. Trust the directory config
mise trust

# 3. Install the exact Node & pnpm versions
mise install
```

### Alternative Setup (Without `mise`)
If you don't use `mise`, simply ensure you have:
- **Node.js**: >= 20.x or 22.x
- **pnpm**: 12.x (or install via `npm install -g pnpm`)

---

## 2. Install Dependencies

Install all project packages using `pnpm`:

```bash
pnpm install
```

> [!WARNING]
> Always use `pnpm install`. Do **NOT** use `npm install` or `yarn install`, as that will generate conflicting lockfiles.

---

## 3. Run the Development Server

Start the local development server:

```bash
pnpm dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`** (or `http://localhost:5173` if running Vite preview)

Changes made to files in `src/` will instantly update in the browser via Fast Refresh.

---

## 4. Useful Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts local development server with Hot Module Replacement |
| `pnpm build` | Compiles the production build |
| `pnpm start` | Runs the compiled production build locally |
