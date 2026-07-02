# Data Contracts

## Request

```json
{
  "recipeId": "creamy-tomato-soup-v1",
  "ingredientId": "heavy-cream",
  "preferenceCategory": ["fat-free", "low-sodium"]
}
```

No raw utterance or free text is allowed.

## Selector response

```json
{
  "ingredientId": "heavy-cream",
  "substitutionId": "fat-free-evaporated-milk",
  "source": "llm"
}
```

`ingredientId` must equal the request. `substitutionId` must exist in the matching frontend and server catalog. `source` is `llm` only after an accepted model selection; all other paths use `fallback`.

## Frontend catalog entry

```js
{
  fallbackId: "fat-free-evaporated-milk",
  choices: {
    "fat-free-evaporated-milk": {
      id: "fat-free-evaporated-milk",
      useInstead: "...",
      amount: "...",
      why: "...",
      cookingNote: "...",
      rowText: "...",
      stepText: "..."
    }
  }
}
```

## Model schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "substitutionId": { "type": "string", "enum": ["approved-id-a", "approved-id-b", "approved-id-c"] }
  },
  "required": ["substitutionId"]
}
```
