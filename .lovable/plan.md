

## Google Search Console verificatie

**Probleem**: De HTML-bestand verificatiemethode werkt niet met Lovable's hosting.

**Oplossing**: Gebruik de **HTML-tag** verificatiemethode in Google Search Console:

1. Ga in Google Search Console naar **Instellingen → Eigendomsverificatie**
2. Kies **HTML-tag** als verificatiemethode
3. Google geeft je een meta-tag zoals:
   ```html
   <meta name="google-site-verification" content="abc123xyz..." />
   ```
4. Stuur mij die meta-tag, dan voeg ik die toe aan `index.html` in de `<head>` sectie

### Technische wijziging
- **`index.html`**: Eén `<meta name="google-site-verification" ...>` tag toevoegen in de `<head>`

Dit is de snelste en betrouwbaarste methode voor verificatie met Lovable.

