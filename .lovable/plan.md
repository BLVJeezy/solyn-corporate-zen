

## Google Search Console verificatie

De HTML-bestand methode werkt niet met Lovable's hosting — je kunt geen losse bestanden uploaden naar de root.

**Oplossing**: Gebruik de **HTML-tag** verificatiemethode:

1. Ga in Google Search Console naar **Instellingen → Eigendomsverificatie**
2. Kies **HTML-tag** als methode
3. Je krijgt een meta-tag zoals:
   ```html
   <meta name="google-site-verification" content="abc123xyz..." />
   ```
4. Stuur mij die meta-tag, dan voeg ik die toe aan `index.html`

### Technische wijziging
- **`index.html`**: Eén `<meta name="google-site-verification" ...>` tag toevoegen in de `<head>` sectie

