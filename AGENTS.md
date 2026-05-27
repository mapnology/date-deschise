# AI Agent Rules of Engagement

This project is actively developed using multiple AI tools (Claude Code, Cursor, Antigravity) alongside a human developer. To maintain a clean codebase and prevent conflicting changes, all agents must follow these protocols.

## 1. Multi-Agent Hygiene
- **No Style Wars:** Never rewrite existing, working code just to change stylistic preferences (e.g., switching between arrow functions and function declarations, or changing object destructuring styles) unless explicitly commanded by the user.
- **Leave No Trace:** Do not leave behind commented-out dead code, temporary debugging logs (`console.log`), or AI-specific comments like `// Written by Cursor`.
- **Imports:** Keep imports organized. Remove unused imports immediately.

## 2. Technical Stack Boundaries (caen-web)
- This is a decoupled frontend repository utilizing **React, Vite, and Tailwind CSS**.
- The API is an external, online service (CAEN API). Do not attempt to run Python or write backend logic within this repository scope.
- State management relies on standard React hooks (`useState`, `useContext`). Do not introduce third-party state managers (Redux, Zustand) without confirmation.

## 3. Communication & State
- If a task is partially complete, document the remaining steps clearly in the code or a tracking file so the next agent can seamlessly pick it up.