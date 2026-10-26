# Super Cabs – Taxi Website (frontend only)

React (Create React App) site built on the Tourm template design.

    npm install
    npm start        # dev server
    npm run build    # production build

Pages: / , /about , /services , /fleet , /tariff , /tours , /gallery , /contact

## Things to edit
- `src/Components/data/siteConfig.js` – phone, WhatsApp, email, address, hours, years of experience, Google Maps embed URL, social links. Phone/WhatsApp links activate automatically once filled.
- `src/Components/data/cabsData.js` – services, vehicles, tours, testimonials, gallery list, and the `PRICE` placeholder (`₹ XXX`).
- `public/assets/img/cabs/` – generated placeholder vehicle images (same sizes as the template images). Replace with real Super Cabs photos using the same file names.
- `public/assets/img/logo*.svg` – text logo placeholder; replace with the real logo.

No backend, admin panel or database is included. The enquiry form validates input only; if a WhatsApp number is set it opens WhatsApp with the details pre-filled.
