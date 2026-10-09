# Trip content data

`trip-content.json` holds sanitized itinerary text extracted from PDF brochures (no Fernway branding).

## Regenerate (optional)

If you still have PDFs locally:

```bash
# Default source: D:\ITINERARIES
npm run data:extract-itineraries

# Load into database (matches trips by code)
npm run data:import-trip-content
```

After extraction, the external `ITINERARIES` folder can be deleted; the app uses this JSON and the database.
