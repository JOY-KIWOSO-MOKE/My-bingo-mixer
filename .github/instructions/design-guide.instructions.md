---
name: design-guide
summary: Design guide for UI changes — concise rules, examples, and checklist for PRs.
---

Purpose
- Provide a short, actionable design instructions file for contributors and agents when modifying UI or creating new components. Keep it prescriptive, example-driven, and easy to follow.

When to use
- New UI components, pages, theme changes, or animations.
- Any PR that touches src/components/, src/index.css, or Tailwind config.

Core rules
- Use CSS variables for tokens (colors, spacing, radii, fonts). Persist tokens in src/index.css and reference them in Tailwind via @theme or config.
- Keep changes small and focused; split large design work into multiple PRs.
- Always run `npm run lint`, `npm run test`, and `npm run build` before opening a PR.
- Prefer CSS-only animations; add JavaScript-based motion only when necessary. Respect `prefers-reduced-motion`.
- Avoid copy-paste styles across components; extract shared utilities to src/index.css or a utility file.
- Provide visual regression notes in PR description for non-trivial visual changes.

Accessibility checklist (required)
- Ensure text contrast meets AA for normal text (WCAG 2.1). Run the repository contrast script or check manually.
- Verify keyboard focus order and visible focus indicators.
- Respect `prefers-reduced-motion` and provide non-animated alternatives.
- Add `aria-*` attributes for interactive elements when appropriate.

Examples
- Theme token:
  - Add `--color-accent: oklch(...)` to src/index.css and use `bg-[--color-accent]` in components.
- Animation:
  - Use `@keyframes subtle-glow` in src/index.css and add `animate-subtle-glow` utility.

PR notes (template)
- Summary: one-liner of intent.
- Visual changes: list screenshots, pages affected, and steps to reproduce locally.
- Testing: include `npm run test` output and any manual checks performed.
- Accessibility: list checks performed (contrast ratios, keyboard navigation).

Iterate & clarify
- If a rule is ambiguous, open a small discussion issue and link it from the PR.
- For major design shifts, create a design spike PR and request feedback before polishing.

Next steps
- Add example prompts under .github/agents/ that show how to implement tokens, animations, and accessibility checks.
- Consider adding a visual regression CI job for future PRs.
