# AniManga O-KG

Progetto di arricchimento semantico di Wikidata dedicato agli archetipi narrativi
dei personaggi di anime e manga.

## Corpus

Il campione iniziale contiene 15 personaggi, 5 per ciascuna opera:

- One Piece: Monkey D. Luffy, Roronoa Zoro, Nami, Sanji, Nico Robin
- Naruto: Naruto Uzumaki, Sasuke Uchiha, Sakura Haruno, Kakashi Hatake, Itachi Uchiha
- Death Note: Light Yagami, L, Misa Amane, Ryuk, Near

## Risultato SPARQL preliminare

Alla verifica del 8 giugno 2026:

- 15 personaggi analizzati
- 4 personaggi con almeno un valore `wdt:P9071`
- 11 personaggi senza valori `wdt:P9071`

Questo conferma il data gap scelto: Wikidata contiene i personaggi, ma non
codifica in modo sistematico i loro archetipi narrativi.

## File principali

| Percorso | Descrizione |
|---|---|
| `queries/` | Query SPARQL usate per esplorare Wikidata |
| `data/animanga_archetypes.ttl` | Triple RDF proposte e vocabolario locale |
| `validation/shapes.ttl` | Bozza di vincoli SHACL per validare le proposte |
| `index.html` | Home e abstract |
| `metodologia.html` | Pipeline e identificazione del gap |
| `sparql.html` | Query SPARQL commentate |
| `llm-benchmark.html` | Prompt e confronto tra LLM |
| `conclusioni.html` | Sfide, risultati e sviluppi futuri |
