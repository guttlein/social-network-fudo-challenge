# GitHub Actions - Simple Configuration

## What does this workflow do?

This file `.github/workflows/ci-cd.yml` configures GitHub Actions to:

1. **Run automatically** every time you:
   - Push to the `main` branch
   - Create a Pull Request to `main`

2. **Execute these steps**:
   - Install dependencies (`npm ci`)
   - Run ESLint (`npm run lint`)
   - Run tests (`npm run test:run`)
   - Build the application (`npm run build`)

## How does it work?

- **Push to main**: Executes the complete workflow
- **Pull Request**: Executes the workflow to verify everything works before merging

## What do you need to do?

**Nothing else** - just push this code to GitHub and it will work automatically.

## Official Documentation

This workflow is based on the official GitHub Actions documentation:

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js with GitHub Actions](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
