# AniManga O-KG

**AniManga O-KG** è un progetto di arricchimento semantico dedicato alla mappatura degli archetipi narrativi nei personaggi di anime e manga, sviluppato per il corso di **Metodologie e tecniche di simulazione** (GEPID, Alma Mater Studiorum &ndash; Università di Bologna).

Il lavoro parte da un problema concreto osservato in Wikidata: molti personaggi sono descritti con metadati enciclopedici, identificativi esterni e collegamenti alle opere, ma gli archetipi narrativi risultano poco rappresentati, soprattutto tramite la proprietà `wdt:P9071` (*character type*).

**Autori:** Sara Albieri & Michele Franco

## Obiettivo

Il progetto propone una pipeline controllata, "human-in-the-loop", per:

- esplorare Wikidata tramite query SPARQL progressive;
- individuare e misurare il data gap sugli archetipi narrativi;
- confrontare l'uso di `wdt:P9071` con modellazioni alternative basate su `wdt:P31` e sulla classe *stock character*;
- usare gli LLM (Gemini, ChatGPT, Copilot) come strumenti di proposta interpretativa su un doppio livello &ndash; archetipo narrativo generale e archetipo culturale giapponese &ndash; non come fonte definitiva;
- validare gli archetipi proposti tramite reconciliation semantica su Wikidata;
- formalizzare i risultati validati in RDF/Turtle, riusando i QID Wikidata quando possibile e coniando risorse locali (`ex:`) per i concetti mancanti.

## Corpus

Il dominio di analisi è costruito intorno a tre franchise rappresentativi del panorama anime e manga, scelti per eterogeneità di target e struttura narrativa:

| Opera | Personaggi testati | Focus narrativo |
|---|---|---|
| **One Piece** | Monkey D. Luffy, Nami | avventura, esplorazione, lealtà, trickster benevoli |
| **Naruto** | Naruto Uzumaki, Itachi Uchiha | sacrificio, redenzione, antieroi e martiri dell'ombra |
| **Death Note** | Light Yagami, L | ambiguità morale, sfida intellettuale, genio distaccato |

La verifica del data gap su `wdt:P9071` è stata condotta su scala più ampia (oltre 1.100 personaggi recuperati tramite `wdt:P674` sulle tre opere), mentre il benchmark LLM approfondito si concentra su un campione mirato di sei personaggi, scelti per la loro ambiguità o ricchezza archetipica (in particolare Itachi Uchiha e Nami).

## Pipeline metodologica

La metodologia segue un percorso in cinque fasi:

1. **Esplorazione e scoping SPARQL** (Query 1&ndash;4)
   Le prime query disambiguano le entità Wikidata associate a "Naruto" (anime, manga, franchise, omonimi) e isolano, tramite `wdt:P674`, la lista univoca dei personaggi.

2. **Analisi delle proprietà e del gap** (Query 5&ndash;8)
   Le query successive individuano quali proprietà non sono condivise da tutti i personaggi, estendono l'analisi a One Piece, Naruto e Death Note, recuperano l'insieme completo dei personaggi delle tre opere e verificano quanti possiedono già un valore per `wdt:P9071` (*character type*).

3. **Frammentazione semantica** (Query 9 e 9bis)
   Tramite `UNION` si confronta l'uso ufficiale di `wdt:P9071` con il workaround basato su `wdt:P31` riferito alla classe *stock character*, mostrando che gli archetipi sono presenti in Wikidata in modo non standardizzato e mappando l'insieme più ampio degli stock character esistenti.

4. **Benchmark LLM su doppio livello**
   Gli LLM (Gemini, ChatGPT, Copilot) vengono interrogati con input minimo (solo nome del personaggio e opera) confrontando tre tecniche di prompting &ndash; Zero-shot, Few-shot e Zero-shot Chain-of-Thought &ndash; per proporre sia un **archetipo narrativo generale** (es. *tragic hero*) sia un **archetipo culturale giapponese** (es. *kitsune*, *sacrificial shinobi*), motivando esplicitamente la scelta.

5. **Reconciliation semantica e generazione RDF** (Query 10)
   Gli output dell'LLM non vengono accettati ciecamente: le proposte vengono normalizzate manualmente (raggruppando varianti lessicali diverse in un'unica etichetta controllata) e verificate su Wikidata come *stock character*. Solo dopo questa validazione vengono trasformate in triple Turtle, tramite template dedicati e una query SPARQL `CONSTRUCT`.

## Risultati principali

- Wikidata contiene molti dati strutturati su opere, personaggi e identificativi esterni, ma la proprietà `wdt:P9071` è pressoché inutilizzata nel dominio anime/manga analizzato.
- Alcuni archetipi compaiono comunque in Wikidata tramite modellazioni alternative (es. `wdt:P31` &rarr; classe *stock character*), a conferma di una frammentazione semantica più che di un'assenza totale del concetto.
- Tra le tre tecniche di prompting testate, lo **Zero-shot Chain-of-Thought** è risultato il metodo più utile per personaggi ambigui (es. Itachi Uchiha), perché rende esplicito il percorso interpretativo prima della validazione; il **Few-shot** rischia invece di orientare il modello verso gli archetipi presenti negli esempi (es. Luffy classificato come *The Chosen One*).
- Gli LLM sono utili per proporre classificazioni narrative su due livelli, ma non sono affidabili per generare QID o triple senza controllo umano: nessun identificativo Wikidata viene accettato senza una verifica SPARQL dedicata (Query 10).
- Il progetto distingue formalmente tra archetipi già riusabili da Wikidata (`wd:`) e archetipi locali definiti nel namespace `ex:`/`animanga:`, ancorando la classe `am:Character` come sottoclasse di `wd:Q95074` (*personaggio immaginario*) per garantire interoperabilità con il resto del Web Semantico.

## Struttura del repository

| Percorso | Descrizione |
|---|---|
| `index.html` | Home del progetto, abstract e statistiche riassuntive |
| `metodologia.html` | Pipeline metodologica, corpus, modello RDF e allineamento ontologico |
| `sparql.html` | Query SPARQL commentate (1&ndash;10) con risultati e spiegazione del loro scopo |
| `llm-benchmark.html` | Prompt, benchmark tra Zero-shot / Few-shot / Zero-shot CoT, doppio livello archetipico e template RDF finale |
| `conclusioni.html` | Discussione critica dei risultati, sfide affrontate e modellazione ontologica finale |
| `grafo.html` | Visualizzazione interattiva (vis-network) del grafo Wikidata e del grafo AniManga O-KG per Itachi e Nami |
| `grafo_metamodello.html` | Visualizzazione del metamodello ontologico (`am:Character`, `am:GenArchetype`, `am:JapArchetype`) |
| `queries/` | Query SPARQL e template Turtle usati nel progetto |
| `queries_results/` | Risultati delle query esportati in JSON, caricati dinamicamente dalle pagine tramite `script/script.js` |
| `img/` | Immagini e grafici usati nel sito |
| `script/script.js` | Logica JavaScript per il caricamento dinamico di query/risultati, tabelle con paginazione e grafi interattivi |
| `style/` | Foglio di stile del sito |

## Query SPARQL

| Query | File | Funzione |
|---|---|---|
| Query 1 | `queries/q1_Q-ta_entita_Naruto.sparql` | Disambiguazione delle entità con label "Naruto" |
| Query 2 | `queries/q2_confronto_proprietà_Naruto.sparql` | Confronto delle proprietà tra anime, manga e franchise |
| Query 3 | `queries/q3_dichiar_dirette.sparql` | Elenco di tutte le dichiarazioni dirette delle tre entità |
| Query 4 | `queries/q4_characters_univoci_Naruto.sparql` | Estrazione dei personaggi univoci tramite `wdt:P674` |
| Query 5 | `queries/q5_prop_non_universali.sparql` | Proprietà non condivise da tutti i personaggi analizzati |
| Query 6 | `queries/q6_analisi_3_manga.sparql` | Estensione dell'analisi a One Piece, Naruto e Death Note |
| Query 7 | `queries/q7_all_character.sparql` | Elenco completo dei personaggi delle tre opere tramite `wdt:P674` |
| Query 8 | `queries/q8_P9071.sparql` | Verifica di `wdt:P9071` (*character type*) sulle opere selezionate |
| Query 9 | `queries/q9_stock_character.sparql` | Confronto `UNION` tra *stock character* e *character type* |
| Query 9bis | `queries/q9bis_all_stock_character.sparql` | Elenco completo degli *stock character* presenti in Wikidata |
| Query 10 | `queries/q10_verify_archetype_qid.sparql` | Verifica di un archetipo proposto dall'LLM come *stock character* Wikidata |

## File RDF/Turtle e generazione del knowledge graph

| File | Contesto | Funzione |
|---|---|---|
| `queries/q12_template_turtle.ttl` | LLM Results | Template Turtle di esempio per l'archetipo di Itachi Uchiha |
| `queries/q13_riuso_qID.ttl` | LLM Results | Template Turtle di esempio per Nami, con riuso di QID Wikidata |
| `queries/q14_allineamento_nami.ttl` | Metodologia | Allineamento ontologico (T-Box/A-Box) applicato a Nami |
| `queries/q15_kg.ttl` | Metodologia | Struttura complessiva del knowledge graph proposto |
| `queries/q16_construct_rdf.sparql` | LLM Results | Query SPARQL `CONSTRUCT` per la generazione automatica delle triple validate |
| `queries/q17_concl.ttl` | Conclusioni | Esempio finale di formalizzazione RDF, con riuso di QID e risorse locali |

## Modello RDF

Il progetto mantiene i QID Wikidata quando esistono entità già stabili e verificabili. Quando un archetipo è assente o troppo specifico per Wikidata, viene creato un identificativo locale nel namespace `ex:`. Ogni personaggio viene collegato a **due livelli** di archetipo: uno narrativo generale e uno culturale giapponese.

Esempio:

```ttl
wd:Q1043344
    a am:Character ;
    animanga:hasGeneralArchetype wd:Q1969230 ;
    animanga:hasJapaneseArchetype ex:sacrificial-shinobi .
```

In questo caso:

- `wd:Q1043344` identifica Itachi Uchiha;
- `wd:Q1969230` identifica *tragic hero*, già classificato come *stock character* in Wikidata e quindi riusato;
- `ex:sacrificial-shinobi` è una normalizzazione locale, ottenuta raggruppando le proposte convergenti dei tre LLM (es. *antieroe sacrificiale*, *martire dell'ombra*, *giseisha*, *shinobi nell'ombra*) in un'unica etichetta controllata.

A livello ontologico (T-Box), la classe `am:Character` è dichiarata come `rdfs:subClassOf wd:Q95074` (*personaggio immaginario*), creando un ponte formale tra il modello locale e la gerarchia globale di Wikidata senza isolare il dominio anime/manga dai dati enciclopedici già esistenti.

## Come consultare il progetto

Il sito è statico. Per consultarlo è sufficiente aprire `index.html` nel browser e navigare tra le sezioni:

- **Metodologia** per il flusso di lavoro, il corpus e il modello RDF;
- **SPARQL** per le query commentate e i risultati;
- **LLM Results** per prompt, benchmark tra tecniche/modelli e template RDF finale;
- **Conclusioni** per la discussione critica, le sfide affrontate e la modellazione ontologica;
- **Grafo** e **Grafo Metamodello** per l'esplorazione visuale interattiva del knowledge graph.

## Contesto accademico

Progetto realizzato da Sara Albieri e Michele Franco per il corso di **Metodologie e tecniche di simulazione**, percorso GEPID, Alma Mater Studiorum &ndash; Università di Bologna.