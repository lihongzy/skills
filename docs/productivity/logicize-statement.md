## What it does

`logicize-statement` turns spoken Chinese, scattered requirements, or loosely phrased questions into clear and accurate Chinese. It corrects typos, word order, and logical relationships while preserving the original meaning and adding no information.

The defining constraint is fidelity: the result improves the expression, but does not expand the request or infer new requirements.

## When to reach for it

You invoke this user-invoked skill by typing `/logicize-statement`, and the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will not reach for it on its own.

Reach for it when you have a Chinese sentence or short description that is difficult to read because its wording, order, or logic is loose. Use [wait-what](https://aihero.dev/skills-wait-what) when the problem is that an agent's explanation did not land, rather than when your own source text needs editing. For choosing among the full skill set, use [ask-matt](https://aihero.dev/skills-ask-matt).

## Meaning stays fixed

The skill treats the supplied wording as the source of truth. It makes the relationships between ideas explicit and removes language errors, but it keeps the same request, scope, and intent.

## Common questions

**Does it add missing details?**

No. It repairs expression and logic only. Information that is absent from the source remains absent from the result.

**Can it rewrite a long requirement?**

Yes, when the input is still a single Chinese statement or compact description. For a larger planning or design conversation, use a skill that handles the surrounding workflow, such as [to-spec](https://aihero.dev/skills-to-spec).

## It's working if

- The revised Chinese is easier to scan and its logical relationships are unambiguous.
- Typos and awkward word order are corrected without changing the request.
- A reader cannot find new requirements, assumptions, or claims that were absent from the input.

## Where it fits

This is a reach-for-it-anytime standalone writing utility. It cleans up source wording before that wording enters a larger discussion or workflow. [ask-matt](https://aihero.dev/skills-ask-matt) is the router for the rest of the skill set.
