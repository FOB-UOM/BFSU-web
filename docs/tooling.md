# Tooling & Maintenance Guide

This project includes modern maintenance and developer quality tools.

---

## 1. Dependency Updates with `taze`

[`taze`](https://github.com/antfu-collective/taze) is installed as a first-class maintenance CLI. It provides an interactive, beautiful view of outdated packages.

```bash
# Check available minor & patch updates
pnpm taze

# Check major version upgrades
pnpm taze major

# Automatically write updates to package.json
pnpm taze -w

# Apply and install immediately
pnpm taze -w && pnpm install
```

---

## 2. Code Formatting & Linting

- **Prettier:** Code formatting across `.jsx`, `.js`, `.css`, and `.json`.
  ```bash
  pnpm prettier --write .
  ```
- **ESLint:** Code quality and import hygiene.
  ```bash
  pnpm eslint .
  ```
