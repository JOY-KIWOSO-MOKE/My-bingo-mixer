# AGENTS.md

Purpose: Short, actionable instructions for AI coding agents to be productive in this repository.

Quick commands
- Install: npm install
- Dev server: npm run dev (Vite at http://localhost:5173/)
- Tests: npm run test (Vitest)
- Lint: npm run lint (ESLint)
- Build: npm run build (tsc -b && vite build)

Project entry points and important files
- App root: src/App.tsx
- Main UI components: src/components/
- Game logic & hooks: src/hooks/useBingoGame.ts
- Utils & tests: src/utils/ (see src/utils/bingoLogic.ts and src/utils/bingoLogic.test.ts)
- Questions data: src/data/questions.ts
- TypeScript config: tsconfig.json and tsconfig.app.json
- Vite config: vite.config.ts

Agent-related resources
- Agent prompts and helper files: .github/agents/ (example: quiz-master.agent.md)
- Workshop / multi-agent guide: workshop/04-multi-agent.md and workshop/GUIDE.md
- Additional instructions and prompts: .github/instructions/ and .github/prompts/
- Devcontainer available: .devcontainer/devcontainer.json

Conventions & best practices for agents
- Run tests and lint (npm run test and npm run lint) before proposing or applying changes.
- Prefer small, focused edits and include tests for behaviour changes.
- Link to existing docs rather than copying them. Use repository paths when referencing files.
- Use minimal changes needed to fix root causes, avoid broad refactors without tests.
- When adding or changing features, update workshop/ notes or README.md if user-facing behavior changes.

What to do first (recommended)
1. Run npm install then npm run test and npm run lint.
2. Start dev server npm run dev and open http://localhost:5173/ to verify UI.
3. Inspect src/hooks/useBingoGame.ts for game flow and src/utils/bingoLogic.ts for core logic.

If you need to add agent prompts or helpers
- Add new prompt under .github/agents/ and reference it from workshop/04-multi-agent.md.
- Keep prompts concise and include examples of expected input/output.

Links
- README: [README.md](README.md)
- Workshop guide: [workshop/GUIDE.md](workshop/GUIDE.md)
- Agents folder: [.github/agents/](.github/agents/)
