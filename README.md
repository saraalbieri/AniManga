# AniManga O-KG

**AniManga O-KG** è un progetto di arricchimento semantico dedicato alla mappatura degli archetipi narrativi nei personaggi di anime e manga.

Il lavoro parte da un problema concreto osservato in Wikidata: molti personaggi sono descritti con metadati enciclopedici, identificativi esterni e collegamenti alle opere, ma gli archetipi narrativi risultano poco rappresentati, soprattutto tramite la proprietà `wdt:P9071` (*character type*).

## Obiettivo

Il progetto propone una pipeline controllata per:

- esplorare Wikidata tramite query SPARQL;
- individuare il data gap sugli archetipi narrativi;
- confrontare l'uso di `wdt:P9071` con modellazioni alternative basate su `wdt:P31`;
- usare gli LLM come strumenti di proposta interpretativa, non come fonte definitiva;
- validare gli archetipi tramite Wikidata e SPARQL;
- formalizzare i risultati in RDF/Turtle con un piccolo vocabolario locale.

## Corpus

Il dominio di analisi è costruito intorno a tre franchise rappresentativi del panorama anime e manga:

- **One Piece**
- **Naruto**
- **Death Note**

Il progetto considera personaggi centrali di queste opere, tra cui Monkey D. Luffy, Nami, Naruto Uzumaki, Itachi Uchiha, Light Yagami e L. Il campione viene usato per verificare se Wikidata descrive soltanto l'appartenenza alle opere oppure anche la funzione narrativa dei personaggi.

## Pipeline metodologica

La metodologia segue un percorso in cinque passaggi:

1. **Esplorazione SPARQL**
   Le prime query individuano le entità corrette su Wikidata, distinguendo manga, anime, franchise e omonimi.

2. **Analisi delle proprietà**
   Le query successive osservano quali proprietà descrivono le opere e i personaggi, evidenziando la prevalenza di dati tecnici rispetto a dati narratologici.

3. **Verifica del data gap**
   Le query su `wdt:P9071` controllano quanti personaggi possiedono già un `character type`.

4. **Frammentazione semantica**
   La query con `UNION` confronta l'uso ufficiale di `wdt:P9071` con workaround basati su `wdt:P31`, mostrando che gli archetipi sono presenti in modo non standardizzato.

5. **LLM, reconciliation e RDF**
   Gli LLM propongono archetipi generali e archetipi più specifici del contesto giapponese. Le proposte vengono normalizzate, verificate tramite SPARQL e infine trasformate in triple RDF solo dopo validazione.

## Risultati principali

- Wikidata contiene molti dati strutturati su opere, personaggi e identificativi esterni.
- La proprietà `wdt:P9071` è poco usata nel dominio anime/manga analizzato.
- Alcuni archetipi compaiono tramite modellazioni alternative, per esempio usando `wdt:P31`.
- Gli LLM sono utili per proporre classificazioni narrative, ma non sono affidabili per generare QID o triple senza controllo.
- Il progetto distingue tra archetipi già riusabili da Wikidata e archetipi locali definiti nel namespace `animanga:`.

## Struttura del repository

| Percorso | Descrizione |
|---|---|
| `index.html` | Home del progetto e abstract |
| `metodologia.html` | Pipeline metodologica, modello RDF e scelte di validazione |
| `sparql.html` | Query SPARQL commentate e risultati principali |
| `llm-benchmark.html` | Prompt, benchmark LLM e demo di classificazione |
| `conclusioni.html` | Discussione dei risultati, criticità e sviluppi futuri |
| `grafo.html` | Visualizzazione del grafo di esempio |
| `grafo_metamodello.html` | Visualizzazione del metamodello ontologico |
| `queries/` | Query SPARQL e template Turtle usati nel progetto |
| `queries_results/` | Risultati esportati in JSON per alcune query |
| `data/` | File RDF/Turtle dell'ontologia e dei dati locali |
| `validation/` | Bozza di vincoli SHACL |
| `img/` | Immagini e grafici usati nel sito |
| `script/` | Logica JavaScript per tabelle, paginazione e grafi |
| `style/` | Foglio di stile del sito |

## Query principali

| Query | File | Funzione |
|---|---|---|
| Query 1 | `queries/q1_Q-ta_entita_Naruto.sparql` | Disambiguazione delle entità con label "Naruto" |
| Query 2 | `queries/q2_confronto_proprietà_Naruto.sparql` | Confronto delle proprietà tra anime, manga e franchise |
| Query 3 | `queries/q3_dichiar_dirette.sparql` | Elenco delle dichiarazioni dirette |
| Query 4 | `queries/q4_characters_univoci_Naruto.sparql` | Estrazione dei personaggi tramite `P674` |
| Query 5 | `queries/q5_prop_non_universali.sparql` | Analisi delle proprietà non condivise da tutti i personaggi |
| Query 6 | `queries/q6_analisi_3_manga.sparql` | Estensione dell'analisi a One Piece, Naruto e Death Note |
| Query 7 | `queries/q7_P9071.sparql` | Verifica di `P9071` sulle opere selezionate |
| Query 8 | `queries/q8_all_character_P9071.sparql` | Controllo globale dei character type nel campione |
| Query 9 | `queries/q9_stock_character.sparql` | Analisi della frammentazione tramite `UNION` |
| Query 10 | `queries/q10_verify_archetype_qid.sparql` | Verifica di un archetipo LLM come stock character Wikidata |

## Modello RDF

Il progetto mantiene i QID Wikidata quando esistono entità già stabili e verificabili. Quando un archetipo è assente o troppo specifico per Wikidata, viene creato un identificativo locale.

Esempio:

```ttl
wd:Q1043344
    animanga:hasGeneralArchetype wd:Q1969230 ;
    animanga:hasJapaneseArchetype ex:sacrificial-shinobi .
```

In questo caso:

- `wd:Q1043344` identifica Itachi Uchiha;
- `wd:Q1969230` identifica *tragic hero* in Wikidata;
- `ex:sacrificial-shinobi` è una normalizzazione locale del progetto.

## Come consultare il progetto

Il sito è statico. Per consultarlo è sufficiente aprire `index.html` nel browser e navigare tra le sezioni:

- **Metodologia** per il flusso di lavoro;
- **SPARQL** per query e risultati;
- **LLM Results** per prompt e confronto tra modelli;
- **Conclusioni** per discussione critica e formalizzazione RDF.

## Contesto accademico

Progetto realizzato per il corso di **Metodologie e tecniche di simulazione** nel percorso GEPID, Università di Bologna.
