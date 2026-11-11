# SEO Action Plan — Krav Maga Putignano

**Generato:** 2026-11-12
**Strategia di riferimento:** [SEO-STRATEGY.md](./SEO-STRATEGY.md)
**Dominio:** https://www.difesapersonalekravmaga.it

---

## Fase 1: Foundation (Settimane 1–2)

### Task 1.1 — Google Business Profile (GBP)
- [ ] Verificare esistenza GBP Putignano e Conversano su [business.google.com](https://business.google.com)
- [ ] Allineare NAP esatto: `SSD Global Defender Srl`, indirizzo completo, `+39 340 710 6618`
- [ ] Categoria primaria: `Martial arts school` o `Self-defense school`
- [ ] Caricare ≥10 foto reali per sede (esterni, interni, allenamenti, istruttore Capozza)
- [ ] Orari aggiornati e coerenti con schema `openingHoursSpecification` in `src/lib/legal.ts`
- [ ] Attivare WhatsApp Business come canale messaggi
- [ ] Preparare video verification (30s: insegna esterna → interni → istruttore in azione)
- **Verifica:** Entrambe le GBP attive e verificate, NAP identico al sito
- **Owner:** Titolare / Saverio Mauro Capozza

### Task 1.2 — Schema Course per pagine corsi
- [ ] Aggiungere `Course` JSON-LD in `src/app/corsi/adulti/page.tsx`:
  - `name`, `description`, `provider` (SSD Global Defender), `instructor` (Person), `audience` (Adult), `offers.price`, `offers.currency`
- [ ] Aggiungere `Course` JSON-LD in `src/app/corsi/kids/page.tsx`:
  - `audience` (Children 6-12), stessa struttura
- [ ] Validare con [Rich Results Test](https://search.google.com/test/rich-results)
- **Verifica:** Rich Results Test mostra `Course` senza errori
- **Owner:** Dev (Claude Code)

### Task 1.3 — Schema Person per istruttore
- [ ] Creare componente `InstructorSchema` in `src/components/` con `Person` JSON-LD:
  - `name`: Saverio Mauro Capozza
  - `jobTitle`: Istruttore 4° Livello Krav Maga
  - `worksFor`: SSD Global Defender Srl
  - `sameAs`: profili social personali (se esistenti)
- [ ] Includere in `/corsi/adulti`, `/corsi/kids` e futura pagina `/istruttore`
- **Verifica:** Rich Results Test mostra `Person`
- **Owner:** Dev (Claude Code)

### Task 1.4 — Open Graph audit
- [ ] Verificare `og:image` 1200×630px su tutte le pagine (già presente? controllare metadata)
- [ ] Aggiungere `twitter:card = summary_large_image` ai metadata globali in `layout.tsx`
- [ ] Testare condivisione WhatsApp e Facebook con [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Verifica:** Preview corretta su WhatsApp, FB, Telegram
- **Owner:** Dev (Claude Code)

### Task 1.5 — Google Search Console
- [ ] Aggiungere proprietà `https://www.difesapersonalekravmaga.it` su [Search Console](https://search.google.com/search-console)
- [ ] Verificare dominio (DNS TXT o HTML tag)
- [ ] Sottomettere `sitemap.xml`
- [ ] Richiedere indicizzazione homepage
- **Verifica:** Sitemap processata senza errori, ≥1 pagina indicizzata entro 7 giorni
- **Owner:** Titolare

---

## Fase 2: Expansion (Settimane 3–8)

### Task 2.1 — Pagina FAQ
- [ ] Creare `src/app/faq/page.tsx` con 8-10 domande frequenti:
  - "Cos'è il Krav Maga?", "È adatto alle donne?", "A che età possono iniziare i bambini?", "Serve esperienza precedente?", "Quanto costa?", "Cosa porto alla prima lezione?", "Ci sono gare?", "Quanto tempo per vedere risultati?"
- [ ] Contenuto originale ≥800 parole
- [ ] Internal link a `/corsi/adulti`, `/corsi/kids`, `/sedi/putignano`, `/sedi/conversano`
- [ ] Metadata ottimizzati: title "FAQ Krav Maga Putignano | Domande Frequenti Difesa Personale"
- **Verifica:** Pagina pubblicata, indicizzata, linkata dal footer
- **Owner:** Dev + Titolare (contenuti)

### Task 2.2 — Pagina Istruttore
- [ ] Creare `src/app/istruttore/page.tsx`:
  - Bio Saverio Mauro Capozza (≥500 parole)
  - Certificazioni e percorso formativo
  - Filosofia di insegnamento
  - Foto professionali
  - Schema `Person` integrato
- [ ] E-E-A-T signals: anni di esperienza, numero allievi formati, certificazioni federative
- **Verifica:** Pagina pubblicata con schema Person valido
- **Owner:** Titolare (contenuti) + Dev (implementazione)

### Task 2.3 — Pagina Metodo
- [ ] Creare `src/app/metodo/page.tsx`:
  - Cos'è il Krav Maga (storia, origine IDF)
  - Differenze con arti marziali tradizionali
  - Principi fondamentali (semplicità, istinto naturale, stress inoculation)
  - Perché è efficace per difesa personale reale
  - ≥800 parole originali
- **Verifica:** Pagina pubblicata, linkata da homepage e corsi
- **Owner:** Titolare + Dev

### Task 2.4 — Blog launch (primo post)
- [ ] Creare struttura blog: `src/app/blog/page.tsx` (lista) + `src/app/blog/[slug]/page.tsx` (articolo)
- [ ] Primo post: "Krav Maga per donne: 5 motivi per iniziare a Putignano"
  - ≥1000 parole, keyword target: `krav maga donne putignano`, `autodifesa femminile bari`
  - Foto reali di allieve (con consenso)
  - CTA a lezione di prova
- [ ] Internal link a `/corsi/adulti`, `/faq`, `/sedi/putignano`
- **Verifica:** Post pubblicato, indicizzato, condiviso su social
- **Owner:** Titolare (contenuti) + Dev (struttura)

### Task 2.5 — Citazioni directory locali
- [ ] Registrare su PagineGialle.it con NAP identico
- [ ] Registrare su Yelp Italia
- [ ] Registrare su Apple Business Connect (Apple Maps)
- [ ] Registrare su Bing Places
- [ ] Iscrizione directory ENDAS nazionale/regionale Puglia
- [ ] Verificare coerenza NAP su Facebook e Instagram
- **Verifica:** ≥5 citazioni live con NAP identico entro 4 settimane
- **Owner:** Titolare

### Task 2.6 — Review strategy implementation
- [ ] Stampare QR code recensione Google → appendere in palestra (spogliatoi, reception)
- [ ] Preparare template SMS/email post-lezione (invio dopo 3ª lezione)
- [ ] Definire policy risposta recensioni: rispondere a tutte entro 24h
- [ ] Obiettivo: 20 recensioni Putignano + 15 Conversano entro 3 mesi
- **Verifica:** QR code appeso, primo batch di recensioni ricevuto
- **Owner:** Titolare / Staff palestra

---

## Fase 3: Scale (Settimane 9–24)

### Task 3.1 — Blog cadenza mensile
- [ ] Calendario editoriale 6 mesi:
  - Mese 2: "Difesa personale per bambini: quando iniziare"
  - Mese 3: "Differenza tra Krav Maga e arti marziali tradizionali"
  - Mese 4: "Cosa aspettarsi dalla prima lezione di Krav Maga"
  - Mese 5: "Krav Maga e fitness: quanto si brucia in una lezione"
  - Mese 6: "Storie di allievi: come il Krav Maga ha cambiato la loro vita"
- [ ] Ogni post ≥1000 parole, 1 keyword target, internal links, CTA
- **Verifica:** ≥4 post pubblicati e indicizzati entro mese 6
- **Owner:** Titolare + Dev

### Task 3.2 — Backlink building
- [ ] Contattare BariToday / PutignanoNews per articolo/sponsorizzazione → backlink
- [ ] Richiedere link da sito ENDAS nazionale (pagina affiliati/scuole)
- [ ] Sponsorizzare evento locale (sagra, fiera) → link dal sito dell'evento
- [ ] Guest post su blog arti marziali italiane (minimo 2 entro 6 mesi)
- **Verifica:** ≥5 backlink DR>20 entro mese 6
- **Owner:** Titolare (outreach) + Dev (monitoraggio)

### Task 3.3 — Performance optimization
- [ ] Audit PageSpeed Insights mobile: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Convertire tutte le immagini in WebP/AVIF via Next.js `Image`
- [ ] Lazy loading video hero e showcase
- [ ] Font display: `swap` (già configurato?)
- **Verifica:** PSI score ≥90 mobile
- **Owner:** Dev

### Task 3.4 — GEO monitoring
- [ ] Testare query "krav maga putignano" su ChatGPT, Perplexity, Gemini
- [ ] Documentare se il sito viene citato (baseline)
- [ ] Aggiungere frasi quotabili in homepage (≤30 parole, numeri concreti)
- [ ] Rivalutare ogni 2 mesi
- **Verifica:** Almeno 1 citazione AI entro mese 6
- **Owner:** Dev + Titolare

---

## Fase 4: Authority (Mesi 7–12)

### Task 4.1 — Testimonianze / Case study
- [ ] Raccogliere 5 storie allievi con foto e permesso scritto
- [ ] Creare pagina `/testimonianze` o sezione dedicata
- [ ] Video testimonianze (opzionale, 30-60s ciascuno)
- **Verifica:** ≥3 testimonianze pubblicate
- **Owner:** Titolare

### Task 4.2 — Analytics dashboard
- [ ] Configurare GA4 con eventi: `cta_click`, `phone_click`, `form_submit`, `whatsapp_click`
- [ ] Microsoft Clarity attivo per heatmap
- [ ] Report mensile: traffico organico, top keyword, conversioni, ranking locali
- **Verifica:** Dashboard funzionante, primo report mensile consegnato
- **Owner:** Dev + Titolare

### Task 4.3 — Multilingua (opzionale)
- [ ] Valutare versione inglese `/en/` per turisti/expat Puglia
- [ ] hreflang tags già predisposti in `layout.tsx`
- **Verifica:** Decisione presa entro mese 9
- **Owner:** Titolare

---

## Checklist rapida (cosa fare oggi)

1. ✅ Favicon, sitemap, robots.txt, llms.txt, migrazione dominio — **FATTO**
2. ⬜ Verificare GBP Putignano e Conversano
3. ⬜ Aggiungere Search Console + sottomettere sitemap
4. ⬜ Schema Course su `/corsi/adulti` e `/corsi/kids`
5. ⬜ Stampare QR code recensioni → appendere in palestra
6. ⬜ Pianificare primo post blog (entro 30 giorni)

---

*Questo documento è un piano operativo vivo. Aggiornare lo stato dei task man mano che vengono completati.*