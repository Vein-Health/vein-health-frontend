# Waitlist storage with Google Sheets

The public waitlist form sends one URL-encoded field, `email`, to the Google Apps Script Web App URL configured as `VITE_WAITLIST_ENDPOINT`. The browser uses a simple `POST` request with `mode: no-cors`, which avoids a CORS preflight for Apps Script. The request is treated as successful when the browser accepts it; Apps Script should validate the email and append it to the sheet.

## 1. Create the sheet

Create a Google Sheet and add a sheet tab named `Waitlist`. Add these headers in row 1:

| A | B |
|---|---|
| Timestamp | Email |

## 2. Add the Apps Script

Open **Extensions → Apps Script**, replace the default code, and save:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Waitlist');
  const email = String(e?.parameter?.email || '').trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!sheet || !isValidEmail) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([new Date(), email]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy it

In Apps Script select **Deploy → New deployment**:

1. Type: **Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Authorize the deployment and copy the URL ending in `/exec`

Do not put the URL directly in committed source. Set it in the deployment environment as:

```text
VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then rebuild and deploy the frontend. The email field is the only visitor-provided value; the timestamp is created by the Apps Script server. For production, protect the sheet itself and monitor the Apps Script execution log for abuse or unexpected traffic.
