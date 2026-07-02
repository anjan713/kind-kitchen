# Reference Decisions

## Why selector-only AI

The catalogue is authored, testable, and available offline. The model adds only a bounded selection decision. This prevents the optional model from inventing quantities, ingredients, claims, or cooking instructions.

## Why three entries per flagged ingredient

Three entries demonstrate meaningful flexibility while remaining small enough to validate, test, and keep consistent between browser and service. The default fallback is still deterministic.

## Why the catalog is not displayed

The parent has one interaction concept—Swap—not a new configuration task. The app resolves a single option, immediately shows the details, and offers Undo.

## Why status and attribution are separate

Service health is not proof that the last swap came from AI. The header reports optional-service availability; the ingredients banner reports the actual source of an already-applied swap.

## Why no persistence

Immediate live swaps and Undo are the full proof-of-concept workflow. Keeping swaps in memory avoids stale family state and removes a storage dependency from the assessment path.
