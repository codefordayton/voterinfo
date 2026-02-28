# Ohio Voter Registration Info — Code for Dayton (CfD)

Static micro-site distributed via QR code at events. Walks Ohio voters through checking their registration status, understanding how registrations can be challenged, and knowing exactly what to do if challenged at the polls.

**Live site:** https://voterinfo-six.vercel.app

Covers the **May 5, 2026 Ohio Primary** and **November 3, 2026 General Election**.

---

## File structure

```
voterinfo/
├── index.html          # Single-page app — all content lives here
├── css/style.css       # Mobile-first styles (no build step)
├── js/main.js          # Accordion toggle, countdown, smooth scroll
├── img/
│   ├── cfd-gem.svg     # CfD logo (used in hero header)
│   └── favicon-180.png # Apple touch icon
└── favicon.ico         # Browser tab icon
```

No build step. Open `index.html` directly in a browser or deploy any static host.

---

## Before each event

1. **Verify registration deadlines** at [ohiosos.gov/elections/voters](https://www.ohiosos.gov/elections/voters/) — update the dates in:
   - `index.html` lines ~60–61 (banner) and ~130–138 (deadline pills)
   - `js/main.js` lines ~75–78 (countdown `deadlines` array)

2. **Update the event name** in the `index.html` footer (search for `[Event Name]`)

3. Test at 375px viewport width (Chrome DevTools → mobile) before printing QR codes

---

## Key links used in the site

| Resource | URL |
|---|---|
| Ohio Voter Lookup | https://voterlookup.ohiosos.gov/ |
| Ohio Online Voter Registration | https://olvr.ohiosos.gov/ |
| Polling place finder | https://www.ohiosos.gov/elections/voters/find-my-ohio-polling-place-and-elected-officials/ |
| ACLU of Ohio | https://www.acluohio.org/ |
| Election Protection hotline | 1-866-OUR-VOTE (1-866-687-8683) |

---

## Deploying

The site deploys automatically from the `main` branch via Vercel.

To deploy manually:
```bash
vercel --prod --scope dave-bests-projects
```
