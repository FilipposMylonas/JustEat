<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Code principles — non-negotiable

## SOLID
- **Single Responsibility**: Every file, function, and component does one thing. If you can't describe what it does in one sentence, split it.
- **Open/Closed**: Design for extension, not modification. New features should mean new files, not rewriting existing ones. Use props, composition, and types as extension points.
- **Liskov Substitution**: Components with the same interface must be interchangeable. Don't break contracts.
- **Interface Segregation**: Types and props should be minimal. A component should never receive data it doesn't use.
- **Dependency Inversion**: Depend on types, not implementations. The UI layer never knows where data comes from — it receives typed props.

## Clean code rules
- **Justify every line.** Before writing code, be able to explain *why* it's needed. If you can't, don't write it.
- **No speculative code.** Don't add features, helpers, abstractions, error handling, or config for things that aren't required right now.
- **No clutter.** No unnecessary comments, no redundant type annotations on obvious types, no boilerplate "just in case". Dead code gets deleted, not commented out.
- **Flat over nested.** Prefer early returns over deeply nested conditionals. Prefer composition over inheritance.
- **Minimal surface area.** Export only what's consumed. Keep types close to where they're used. Don't create a file for one constant.
- **Read before you write.** Always read existing code first. Understand the patterns already in place and follow them. Don't introduce a new pattern when one already exists.
- **Name things precisely.** Names should describe what something *is* or *does*, not how it works. If a name needs a comment to explain it, rename it.

## Workflow
- Read `Updates.md` at the start of each session to understand what's been done and why.
- Log your changes to `Updates.md` chronologically — what you did, what went wrong, how you fixed it. Write like a human, not a changelog generator.
- When in doubt, do less. A small, correct change beats a large, clever one.
