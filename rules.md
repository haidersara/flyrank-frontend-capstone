Stack: Next.js, Tailwind CSS, React

Conventions: functional components, Conventional Commits for all commits, mobile-first responsive design
- Forms must use react-hook-form + zod -- never rely on native HTML validation as the source of truth.
- Every form field must have inline, app-rendered error text, not just an aria/browser-native tooltip.
- No new fields may be added beyond what's explicitly requested in a task -- vague prompts default to scope creep.