# Website Integration with App Factory

## Purpose
This repo owns public app pages and should stay synchronized with app factory registry.

## Source of truth
From apps repo:
- `config/apps_registry.yaml`
- `config/template_manifest.yaml`
- `config/metadata.yaml`

## Minimum sync workflow
1. Pick app entry from `apps_registry.yaml`.
2. Ensure app card/page exists in website content (`src/content/apps/<app_id>.md`).
3. Keep links and naming aligned with manifest/metadata.

## Ownership
- Marketing updates content and positioning.
- Admin ensures registry status is current before release.
