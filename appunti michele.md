# Appunti 10 giugno 2026 da cancellare

Oggi su AniManga O-KG abbiamo lavorato soprattutto su SPARQL, LLM Results e sulla logica per usare gli archetipi come vocabolario controllato.

## SPARQL

Abbiamo aggiornato le query sui personaggi collegati alle opere aggiungendo il filtro:

```sparql
?character wdt:P31 wd:Q80447738 . # anime character
```

nei file:

- `queries/q0b_discover_characters_from_works.sparql`
- `queries/q2_characters_by_anime_union_regex.sparql`
- blocchi corrispondenti in `sparql.html`

Abbiamo poi sistemato la Query 1, mostrando tutti i 15 personaggi del campione e aggiungendo la colonna Anime. La query e stata modificata per ricavare l'opera tramite `UNION` usando:

```sparql
?character wdt:P1441 ?anime .
UNION
?character wdt:P1080 ?anime .
```

Abbiamo eliminato la vecchia Fase esplorativa 3 dalla pagina SPARQL.

Abbiamo trasformato la Query 4 in una query per estrarre gli stock character da Wikidata, cioe gli archetipi classificati come:

```sparql
?stockCharacter wdt:P31 wd:Q636497 .
```

con label e descrizione. Questa query ora serve come base per il vocabolario controllato da dare all'LLM.

Abbiamo aggiunto anche la Query 4b, cioe il contesto Wikidata da passare al prompt LLM, con proprieta come:

```text
P31, P1441, P1080, P463, P106, P170, P21, P9071, P10757
```

Infine abbiamo eliminato da `sparql.html` tutte le query dalla Query 5 in poi, lasciando la pagina piu pulita e concentrata.

## Stock character e archetipi

Abbiamo chiarito che `Q113946608` e un'entita Wikidata, non una proprieta:

```text
wd:Q113946608 = The Chosen One
```

Abbiamo visto che e collegata a:

```sparql
wd:Q113946608 wdt:P31 wd:Q636497 .
```

cioe e un esempio di stock character / personaggio tipo.

Abbiamo deciso di usare stock character come vocabolario controllato principale per l'IA, perche e piu adatto a `P9071 character type` rispetto a `narrative role`.

Gli archetipi selezionati per il progetto sono:

```text
wd:Q113946608  The Chosen One
wd:Q4904967    Big Bad
wd:Q1018644    Byronic hero
wd:Q2755065    Dark Lord
wd:Q65934439   Lone Cowboy
wd:Q17145824   Lovable rogue
wd:Q1254327    Mary Sue
```

Li abbiamo salvati anche nel frontend, cosi vengono inclusi automaticamente nei prompt come Controlled stock character candidates.

## LLM Results

In `llm-benchmark.html` abbiamo aggiunto una spiegazione metodologica prima della demo, dicendo che il modello riceve un contesto Wikidata strutturato, non solo la label del personaggio.

Abbiamo creato una nuova demo guidata chiamata:

```text
Generazione script demo: descrizione e prompt
```

Questa demo e pensata per i personaggi senza `P9071`. Ha un menu a tendina con gli 11 personaggi senza character type:

```text
Roronoa Zoro
Nami
Sanji
Nico Robin
Sakura Haruno
Kakashi Hatake
Itachi Uchiha
L
Misa Amane
Ryuk
Near
```

Quando si sceglie un personaggio, la demo compila automaticamente:

```text
Personaggio
Anime/Manga
Wikidata QID
```

Abbiamo aggiunto il recupero del contesto Wikidata con le proprieta utili per ruolo, appartenenza e caratterizzazione.

Abbiamo poi aggiunto riquadri per fonti esterne:

```text
Jikan / MyAnimeList
AniList
Wikipedia
Personality Database
```

Alla fine abbiamo deciso che questi riquadri devono mostrare solo i link, non le descrizioni testuali. Quindi ora:

- Jikan mostra il link API Jikan e il link MyAnimeList;
- AniList mostra il link al personaggio;
- Wikipedia mostra il link alla pagina;
- Personality Database mostra il link costruito da `P10757`.

Per Personality Database abbiamo chiarito che `P10757` recupera solo l'ID del profilo, non direttamente Enneagram o descrizioni. Quindi lo usiamo come link esterno, non come fonte ufficiale ne come API.

Abbiamo impostato per Zoro il profilo:

```text
Personality Database profile ID: 1117875
https://www.personality-database.com/profile/1117875
```

Abbiamo poi spostato la vecchia demo sotto questa nuova sezione e l'abbiamo rinominata:

```text
Frontend evoluzione demo
```

Questa demo e rimasta piu libera: si inseriscono manualmente personaggio, anime/manga e QID Wikidata.

## Prompt

Abbiamo aggiornato la generazione dei prompt in modo che includa automaticamente:

- contesto Wikidata;
- link Personality Database, se presente;
- vocabolario controllato degli stock character;
- richiesta esplicita di non inventare QID;
- possibilita di usare un archetipo locale `animanga:` solo se nessuno stock character e adatto.

In sintesi, oggi abbiamo reso il progetto piu coerente metodologicamente: Wikidata serve per identificare entita e proprieta, gli stock character diventano il vocabolario controllato per l'IA, e la demo LLM ora supporta meglio la scelta motivata dell'archetipo per i personaggi privi di `P9071`.

## Nota per il futuro

Valutare se inserire nel sito anche i risultati delle query, usando screenshot oppure copiando le tabelle direttamente nelle sezioni SPARQL. Questa scelta renderebbe il lavoro piu leggibile anche senza rieseguire le query su Wikidata.

Ragionare anche su dove conservare i risultati delle query in modo stabile. Possibili soluzioni:

- creare una cartella `results/` con file CSV o TSV esportati da Wikidata;
- salvare screenshot delle query piu importanti in una cartella dedicata;
- mantenere nel sito solo tabelle sintetiche, conservando i risultati completi come dati separati;
- indicare per ogni tabella la data di esecuzione della query, cosi da rendere chiaro quando il risultato e stato verificato.

## Cose eliminate o pulite

Nella pagina `sparql.html` e stata eliminata la vecchia sezione:

```text
Fase esplorativa 3: osservare le proprieta dei personaggi principali
```

Questa sezione conteneva una query di scansione generale delle proprieta di Luffy, Naruto e Light Yagami. Dopo la riorganizzazione metodologica non era piu necessaria nella pagina SPARQL.

Sempre in `sparql.html` sono state eliminate le sezioni dalla Query 5 in poi. La pagina ora termina con:

```text
Query 4b: contesto Wikidata per il prompt LLM
```

La scelta serve a rendere la sezione SPARQL piu compatta e allineata alla pipeline attuale: esplorazione delle opere, verifica del gap su P9071, vocabolario stock character e contesto Wikidata per LLM.

Nella cartella `queries/` sono stati eliminati i file non piu mostrati o non piu centrali per la versione attuale del sito:

```text
queries/q0c_initial_property_scan_main_characters.sparql
queries/q6_all_properties_single_character.sparql
queries/q7_compare_properties_sample.sparql
queries/q8_property_frequency_sample.sparql
queries/q9_main_secondary_p9071_comparison.sparql
```

E stato invece mantenuto:

```text
queries/q5_construct_validated_triples.sparql
```

perche puo ancora servire per generare le triple RDF validate.

La vecchia query:

```text
queries/q4_existing_archetypes_regex.sparql
```

e stata sostituita da:

```text
queries/q4_stock_character_vocabulary.sparql
```

perche il contenuto non usa piu una regex sulle label, ma estrae gli stock character da Wikidata tramite:

```sparql
?stockCharacter wdt:P31 wd:Q636497 .
```

Nel file `llm-benchmark.html` sono stati eliminati alcuni residui di codice rimasti dalle prove intermedie:

```text
populateFromWikidata
getContextValue
shorten()
```

Queste funzioni non servivano piu dopo aver deciso che nella Frontend evoluzione demo i campi Personaggio, Anime/Manga e Wikidata QID restano manuali e che le fonti esterne mostrano solo link, non descrizioni testuali.

E stato anche rimosso il valore hardcoded del profilo Personality Database di Zoro dal campo iniziale della demo. Ora il campo Personality Database parte vuoto e viene compilato solo dopo il recupero dei dati, se Wikidata restituisce un valore per `P10757`.


15 giugno 

Nella pagina SPARQL abbiamo:
sistemato le query salvate nella cartella queries/;
inserito le query nella pagina tramite file .sparql, evitando trascrizioni manuali inline;
aggiunto una query preliminare con REGEX per cercare le opere per nome;
aggiunto una query con REGEX sui personaggi principali: Monkey D. Luffy, Naruto Uzumaki e Light Yagami;
fatto in modo che questa query recuperi solo P9071 / character type, con descrizione del valore;
chiarito meglio l’uso di P1441, P1080, P31, P9071 e P10757;
aggiunto o migliorato tabelle di risultati, incluse quelle sui personaggi senza P9071;
commentato le query .sparql per spiegare cosa fa ogni passaggio.
Nella pagina LLM Results abbiamo:
chiarito che il menu “Personaggio senza character type” deriva dai risultati della Query 2;
rinominato prova2Characters in charactersWithoutType;
spiegato che il contesto strutturato usato dalla demo corrisponde alla Query 4;
chiarito che da Jikan/MyAnimeList, AniList, Wikipedia e Personality Database usiamo soprattutto i link, per scegliere manualmente quali parti del contenuto usare;
aggiornato il testo della pipeline LLM;
commentato il codice della demo per rendere più leggibile il recupero dati e la costruzione dei prompt.
Abbiamo anche confrontato le query con le linee guida del progetto e individuato che mancava REGEX; ora è coperto. L’unico suggerimento ancora aperto è mostrare anche la Query 5 nella pagina SPARQL, perché rappresenta il passaggio finale: dalle classificazioni validate alle triple R