# WORKFLOW.md

## The drill
I built the same settings form feature twice: once with a single vague prompt ("add a settings form to my app"), and once with a precise, constrained prompt specifying exact fields, validation rules, accessibility requirements, and a verification step.

## Correctness
Round 1 had no real validation. The email field only triggered the browser's native type="email" tooltip -- an empty Display Name field saved successfully with no error at all (confirmed by screenshot: empty name submitted, "Settings saved successfully" displayed). Round 2 used react-hook-form + zod with actual app-level validation: empty name, invalid email, and over-length bio were all rejected with specific inline messages, and the Save button stayed disabled until the form was valid. I confirmed this manually and via 4 passing automated tests.

## Accessibility
Round 1 never confirmed label associations -- I didn't check, and given how little else was specified, I doubt it was intentional. Round 2 explicitly required htmlFor/id-matched labels and noValidate so all validation feedback lives in the app UI rather than relying on inconsistent native browser behavior.

## Edge cases
The diff (git diff round-1-vague round-2-precise -- app/components/settings-form.tsx) shows the difference wasn't just missing validation -- it was a different data model entirely. Round 1's Settings type carried 7 fields (displayName, email, timezone, language, emailAlerts, weeklyDigest, apiKey), none of them validated. Round 2's settingsSchema (zod) has exactly the 3 fields I asked for, each with an explicit validation rule and message. Round 1 didn't just under-deliver on validation -- it over-delivered on scope, inventing four unrequested settings groups. Round 2, constrained to Name/Email/Bio, correctly rejected an empty name, an email missing "@", and a bio over 200 characters -- verified with 4 passing automated tests, not just eyeballing the UI.

## Review effort
Round 1 felt fast to prompt (one sentence) but expensive to trust -- I had to manually poke every field to discover what wasn't validated, since nothing was documented or tested. Round 2 took longer to write the prompt, but review was nearly instant: the tests already proved the four cases I cared about, so I only needed to sanity-check the UI, not hunt for silent gaps.

## Mistake I caught
Round 1's email field appeared to work because of the browser's native tooltip -- but that's not app-level validation. It's not something my own code enforces; it can be bypassed if type="email" isn't rendered as expected, or in any context without native browser validation. I only caught this because I manually typed "asdf" into the field and inspected whether the message came from my app or the browser.

## Rules learned (added to rules.md)
1. Forms must use react-hook-form + zod -- never rely on native HTML validation as the source of truth.
2. Every form field must have inline, app-rendered error text, not just an aria/browser-native tooltip.
3. No new fields may be added beyond what's explicitly requested -- round 1 proved that vague prompts default to scope creep.
