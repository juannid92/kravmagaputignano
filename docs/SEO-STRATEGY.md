# SEO Strategy — Krav Maga Putignano (difesapersonalekravmaga.it)

**Data:** 2026-11-12
**Dominio:** https://www.difesapersonalekravmaga.it
**Business type:** Local service (scuola di Krav Maga, 2 sedi: Putignano + Conversano)
**Stack:** Next.js statico su Cloudflare Workers
**Federazione:** ENDAS / FederKravMaga — Istruttore Saverio Mauro Capozza, 4° Livello

---

## 1. Stato attuale (completato)

| Item | Status | Note |
|------|--------|------|
| Favicon (logo federazione) | ✅ | `/favicon.jpg`, `apple` icon |
| Migrazione dominio | ✅ | Tutti i `kravmagaputignano.it` → `www.difesapersonalekravmaga.it` |
| Sitemap.xml | ✅ | Nuovo dominio, `lastmod` aggiornati, rimossi `changefreq`/`priority` (deprecati) |
| robots.txt | ✅ | `Content-Signal: search=yes, ai-input=yes, ai-train=no` |
| llms.txt | ✅ | Creato con H1, summary `>`, link Markdown |
| Schema LocalBusiness (layout.tsx) | ✅ | `SportsActivityLocation` |
| Schema LocalBusiness per sede | ✅ | In `src/app/sedi/[slug]/page.tsx` |
| BreadcrumbList schema | ✅ | Dominio allineato |
| Accessibilità agent-ready | ✅ | 100/100 su `agent_ux_check.py` |
| Server-rendered (no JS) | ✅ | 1102 parole renderizzate senza JavaScript |
| 404 reale | ✅ | URL inesistenti restituiscono 404 vero |

---

## 2. Gap e priorità (cosa manca)

### P0 — Critici (da risolvere entro 2 settimane)

#### 2.1 Google Business Profile (GBP)
- [ ] Verificare che esistano **2 GBP separate** (Putignano e Conversano)
- [ ] Allineare NAP (Name, Address, Phone) esatti tra sito, GBP, PagineGialle, Facebook, Instagram
- [ ] Categoria primaria: `Martial arts school` / `Self-defense school`
- [ ] Caricare ≥10 foto reali per sede (esterni, interni, allenamenti, istruttore)
- [ ] Orari aggiornati: top-5 ranking factor locale (Whitespark 2026)
- [ ] Attivare WhatsApp Business come canale primario (Google Chat deprecato)
- [ ] Video verification pronto (Google non usa più cartolina postale)

#### 2.2 Schema mancanti
- [ ] **Course schema** per `/corsi/adulti` e `/corsi/kids` (prezzo, durata, istruttore, audience)
- [ ] **Person schema** per Saverio Mauro Capozza (certificazione, sameAs social)
- [ ] **FAQPage schema** rimosso da Google il 7 maggio 2026 — non aggiungerlo (nessun rich result)
- [ ] **AggregateRating** quando avremo ≥10 recensioni verificabili su GBP

#### 2.3 Open Graph / Social
- [ ] Verificare `og:image` su tutte le pagine (1200x630px minimo)
- [ ] Twitter Card: `summary_large_image`
- [ ] WhatsApp preview: testare condivisione link su WhatsApp

### P1 — Importanti (entro 1 mese)

#### 2.4 Content Strategy
- [ ] **Pagina FAQ** (anche senza schema, per UX e long-tail)
- [ ] **Pagina "Istruttore"** dedicata a Saverio Mauro Capozza (E-E-A-T: esperienza, expertise)
- [ ] **Pagina "Metodo"** — cos'è il Krav Maga, differenze da altre arti marziali
- [ ] **Blog** con cadenza mensile (prima uscita entro 30 giorni):
  - "Krav Maga per donne: 5 motivi per iniziare"
  - "Difesa personale per bambini: quando iniziare"
  - "Differenza tra Krav Maga e arti marziali tradizionali"
  - "Cosa aspettarsi dalla prima lezione"
- [ ] **Case study / testimonianze** (3-5 allievi con foto e storia)

#### 2.5 Local SEO off-page
- [ ] Citazioni su directory locali italiane:
  - PagineGialle / PagineBianche
  - Yelp Italia
  - Apple Maps (Apple Business Connect)
  - Bing Places
  - Infobel, Cylex, Hotfrog
  - Directory ENDAS / FederKravMaga
- [ ] **NAP consistency**: stesso formato indirizzo ovunque (via, CAP, città, BA)
- [ ] Iscrizione a "Best of" list locali (Bari e provincia): factor #1 per AI visibility (Whitespark 2026)

#### 2.6 Review strategy
- [ ] QR code in palestra → link diretto recensione Google
- [ ] SMS/email post-lezione con richiesta recensione (dopo 3° lezione)
- [ ] Rispondere a **tutte** le recensioni entro 24h
- [ ] Obiettivo: 20 recensioni 4.8+ nei prossimi 3 mesi

### P2 — Ottimizzazioni (entro 3 mesi)

#### 2.7 Performance & CWV
- [ ] LCP < 2.5s su mobile (verificare con PageSpeed Insights)
- [ ] INP < 200ms (già buono con Next.js statico)
- [ ] CLS < 0.1 (già 0 su sito statico)
- [ ] WebP/AVIF per tutte le immagini (Next.js `Image` component)

#### 2.8 GEO / AI Search
- [ ] Monitorare citazioni in ChatGPT/Perplexity per query "krav maga Putignano"
- [ ] Frasi quotabili in homepage e pagine corsi (≤30 parole, numeri concreti)
- [ ] `llms-full.txt` con contenuti estesi (opzionale)

#### 2.9 Backlink building
- [ ] Link da sito ENDAS nazionale / regionale
- [ ] Link da blog sportivi locali (BariToday, PutignanoNews)
- [ ] Sponsorizzazione eventi locali → link in cambio
- [ ] Guest post su blog di arti marziali italiane

### P3 — Nice-to-have

#### 2.10 Analytics & Tracking
- [ ] Google Analytics 4 con eventi custom: `cta_click`, `form_submit`, `phone_click`
- [ ] Google Search Console verificato su `www.difesapersonalekravmaga.it`
- [ ] Microsoft Clarity per heatmap sessioni
- [ ] Dashboard mensile: traffico organico, ranking keyword locali, conversioni

#### 2.11 Multilingua (futuro)
- [ ] Versione inglese `/en/` per turisti e expat in Puglia
- [ ] hreflang tags già predisposti in layout.tsx

---

## 3. Keyword target (da validare con Search Console dopo 30 giorni)

| Keyword | Intento | Priorità |
|---------|---------|----------|
| `krav maga putignano` | Locale diretto | 🔥 P0 |
| `krav maga conversano` | Locale diretto | 🔥 P0 |
| `difesa personale putignano` | Locale servizio | 🔥 P0 |
| `corso autodifesa bari` | Regionale | 🟡 P1 |
| `krav maga bambini putignano` | Locale kids | 🟡 P1 |
| `corsi difesa personale femminile bari` | Segmentato | 🟡 P1 |
| `cosa è il krav maga` | Informativo | 🟢 P2 (blog) |
| `differenza krav maga e karate` | Comparativo | 🟢 P2 (blog) |

---

## 4. KPI e timeline

| Metrica | Baseline | 3 mesi | 6 mesi | 12 mesi |
|---------|----------|--------|--------|---------|
| Traffico organico/mese | ~0 (sito nuovo) | 150 | 400 | 800 |
| Keyword top-10 | 0 | 5 | 15 | 30 |
| Recensioni GBP Putignano | TBD | 20 | 40 | 80 |
| Recensioni GBP Conversano | TBD | 15 | 30 | 60 |
| Citazioni AI (ChatGPT/Perplexity) | 0 | 2 | 5 | 10 |
| Backlink DR>20 | TBD | 5 | 15 | 30 |
| Conversioni (chiamate/form) | TBD | 20/mese | 50/mese | 100/mese |

---

## 5. Rischi

1. **Cannibalizzazione** tra Putignano e Conversano: mitigare con schema geo distinti e contenuti 60%+ unici per pagina sede
2. **Dominio nuovo** senza storia: serve tempo (3-6 mesi) prima di ranking significativi
3. **GBP sospesi** se video verification fallisce: preparare video di 30s con insegna, interni, istruttore
4. **Competitor Bari**: palestre grandi con 100+ recensioni — differenziare con nicchia Krav Maga + certificazione

---

## 6. Prossimi passi operativi

Vedi `docs/SEO-ACTION-PLAN.md` (generato da `/superpowers:writing-plans`).