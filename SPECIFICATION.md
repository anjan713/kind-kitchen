# KindKitchen — Product Specification

**Version:** 1.1 — bounded selector update  
**Primary artifact:** `demo.html`  
**Optional artifact:** `llm-server.mjs`

## Product summary

KindKitchen helps a parent adapt **Creamy Tomato Soup** on a phone. The recipe has a saved demo profile of **fat-free** and **low-sodium**. The demo never calculates nutrition totals and never treats its catalog as a medical decision. It opens unchanged, presents a deterministic ingredient scan, and updates the recipe only when the parent uses a Swap action.

## Required recipe

```json
{
  "title": "Creamy Tomato Soup",
  "servings": 4,
  "dietary_guidelines": ["fat-free", "low-sodium"],
  "ingredients": [
    { "item": "canned crushed tomatoes", "amount": "28 oz" },
    { "item": "heavy cream", "amount": "1/2 cup" },
    { "item": "onion", "amount": "1 medium, diced" },
    { "item": "garlic", "amount": "3 cloves, minced" },
    { "item": "vegetable broth", "amount": "2 cups" },
    { "item": "olive oil", "amount": "1 tbsp" },
    { "item": "salt", "amount": "1/2 tsp" },
    { "item": "black pepper", "amount": "1/4 tsp" }
  ]
}
```

## Current product decisions

- Required changes: heavy cream, olive oil, salt.
- Label checks: canned crushed tomatoes, vegetable broth.
- Every flagged ingredient has three authored substitution choices plus a deterministic fallback ID.
- The UI does not show catalog choices before a swap; the resolver chooses one.
- Live swaps and Undo are the only adaptation workflow. There is no approval, save, or browser persistence.
- The optional service can return only one substitution ID. The browser maps it to authored copy.
- AI status is visible in a header icon. AI attribution appears in the ingredients section only after an actual `llm`-sourced selection is committed.
- Service failures are quiet and resolve with fallback; they never interrupt cooking.

## Detailed documents

1. `spec/01-product-brief.md`
2. `spec/02-functional-requirements.md`
3. `spec/03-constraints.md`
4. `spec/04-data-contracts.md`
5. `spec/05-acceptance-criteria.md`
6. `spec/06-reference-decisions.md`

`MODEL_SELECTION_PROMPT.md` is the exact prompt and schema contract for the optional selector.
