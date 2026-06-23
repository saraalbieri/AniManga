document.addEventListener('DOMContentLoaded', function() {



    // ==========================================
    // PARTE 1: GRAFO CORE (AniManga O-KG)
    // ==========================================
    
    // 1. DEFINIZIONE DEI NODI
    var nodes_core = new vis.DataSet([
        // --- SERIE (Opere) ---
        { id: 'Q462172', label: 'One Piece', group: 'series' },
        { id: 'Q81', label: 'Naruto', group: 'series' },
        { id: 'Q1834', label: 'Death Note', group: 'series' },

        // --- PERSONAGGI ---
        // One Piece
        { id: 'Q477388', label: 'Monkey D. Luffy', group: 'character' },
        { id: 'Q635674', label: 'Roronoa Zoro', group: 'character' },
        { id: 'Q836371', label: 'Nami', group: 'character' },
        { id: 'Q843825', label: 'Sanji', group: 'character' },
        { id: 'Q1048897', label: 'Nico Robin', group: 'character' },
        // Naruto
        { id: 'Q719363', label: 'Naruto Uzumaki', group: 'character' },
        { id: 'Q1622379', label: 'Sasuke Uchiha', group: 'character' },
        { id: 'Q327170', label: 'Sakura Haruno', group: 'character' },
        { id: 'Q193156', label: 'Kakashi Hatake', group: 'character' },
        { id: 'Q715694', label: 'Itachi Uchiha', group: 'character' },
        // Death Note
        { id: 'Q52989', label: 'Light Yagami', group: 'character' },
        { id: 'Q1638848', label: 'L', group: 'character' },
        { id: 'Q327572', label: 'Misa Amane', group: 'character' },
        { id: 'Q1994344', label: 'Ryuk', group: 'character' },
        { id: 'Q1197475', label: 'Near', group: 'character' },

        // --- RUOLI NARRATIVI ---
        { id: 'Q212235', label: 'Protagonista', group: 'role' },
        { id: 'Q1651815', label: 'Deuteragonista', group: 'role' },
        { id: 'Q55280287', label: 'Tritagonista', group: 'role' },
        { id: 'Q1254394', label: 'Antagonista', group: 'role' },
        { id: 'Q108035', label: 'Antieroe', group: 'role' },
        { id: 'am:MentorRole', label: 'Mentore', group: 'role' },
        { id: 'am:ObserverRole', label: 'Osservatore Neutrale', group: 'role' },

        // --- ARCHETIPI (I Tropes) ---
        { id: 'am:ShonenHero', label: 'Eroe Shonen', group: 'archetype' },
        { id: 'am:Genki', label: 'Genki (Energico)', group: 'archetype' },
        { id: 'am:LoyalCompanion', label: 'Braccio Destro', group: 'archetype' },
        { id: 'Q126315570', label: 'Kuudere (Freddo/Distaccato)', group: 'archetype' },
        { id: 'Q5356345', label: 'Tsundere (Scontroso/Dolce)', group: 'archetype' },
        { id: 'am:ChivalrousPervert', label: 'Cavaliere Pervertito', group: 'archetype' },
        { id: 'am:Underdog', label: 'Emarginato (Underdog)', group: 'archetype' },
        { id: 'am:Avenger', label: 'Vendicatore', group: 'archetype' },
        { id: 'am:TragicVillain', label: 'Cattivo Tragico', group: 'archetype' },
        { id: 'Q3101569', label: 'Genio', group: 'archetype' },
        { id: 'am:VillainProtagonist', label: 'Protagonista Malvagio', group: 'archetype' },
        { id: 'am:EccentricGenius', label: 'Genio Eccentrico', group: 'archetype' },
        { id: 'Q2281987', label: 'Yandere (Ossessivo)', group: 'archetype' },
        { id: 'am:Trickster', label: 'Trickster', group: 'archetype' },
        { id: 'am:ChildProdigy', label: 'Bambino Prodigio', group: 'archetype' }
    ]);

    // 2. DEFINIZIONE DEGLI ARCHI (Le triple RDF)
    var edges_core = new vis.DataSet([
        // --- APPARTENENZA ALLA SERIE (P1441) ---
        { from: 'Q477388', to: 'Q462172', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q635674', to: 'Q462172', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q836371', to: 'Q462172', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q843825', to: 'Q462172', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q1048897', to: 'Q462172', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        
        { from: 'Q719363', to: 'Q81', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q1622379', to: 'Q81', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q327170', to: 'Q81', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q193156', to: 'Q81', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q715694', to: 'Q81', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },

        { from: 'Q52989', to: 'Q1834', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q1638848', to: 'Q1834', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q327572', to: 'Q1834', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q1994344', to: 'Q1834', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },
        { from: 'Q1197475', to: 'Q1834', label: 'appare in', arrows: 'to', color: {color: '#BDBDBD'} },

        // --- PARENTELE (P1038) ---
        { from: 'Q1622379', to: 'Q715694', label: 'parente di', arrows: 'to, from', color: {color: '#E91E63'}, width: 2 },

        // --- RUOLI NARRATIVI (P4595) ---
        { from: 'Q477388', to: 'Q212235', label: 'ruolo', arrows: 'to' },
        { from: 'Q635674', to: 'Q1651815', label: 'ruolo', arrows: 'to' },
        { from: 'Q836371', to: 'Q55280287', label: 'ruolo', arrows: 'to' },
        { from: 'Q843825', to: 'Q212235', label: 'ruolo', arrows: 'to' },
        { from: 'Q719363', to: 'Q212235', label: 'ruolo', arrows: 'to' },
        { from: 'Q1622379', to: 'Q1651815', label: 'ruolo', arrows: 'to' },
        { from: 'Q1622379', to: 'Q1254394', label: 'ruolo', arrows: 'to' },
        { from: 'Q327170', to: 'Q55280287', label: 'ruolo', arrows: 'to' },
        { from: 'Q193156', to: 'am:MentorRole', label: 'ruolo', arrows: 'to' },
        { from: 'Q715694', to: 'Q1254394', label: 'ruolo', arrows: 'to' },
        { from: 'Q52989', to: 'Q212235', label: 'ruolo', arrows: 'to' },
        { from: 'Q52989', to: 'Q108035', label: 'ruolo', arrows: 'to' },
        { from: 'Q1638848', to: 'Q1651815', label: 'ruolo', arrows: 'to' },
        { from: 'Q1638848', to: 'Q1254394', label: 'ruolo', arrows: 'to' },
        { from: 'Q327572', to: 'Q55280287', label: 'ruolo', arrows: 'to' },
        { from: 'Q1994344', to: 'am:ObserverRole', label: 'ruolo', arrows: 'to' },
        { from: 'Q1197475', to: 'Q1651815', label: 'ruolo', arrows: 'to' },

        // --- ARCHETIPI / TROPES (P9071) ---
        { from: 'Q477388', to: 'am:ShonenHero', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q477388', to: 'am:Genki', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q635674', to: 'am:LoyalCompanion', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q635674', to: 'Q126315570', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q836371', to: 'Q5356345', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q843825', to: 'am:ChivalrousPervert', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1048897', to: 'Q126315570', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        
        { from: 'Q719363', to: 'am:ShonenHero', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q719363', to: 'am:Underdog', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1622379', to: 'am:Avenger', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1622379', to: 'Q126315570', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q327170', to: 'Q5356345', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q193156', to: 'Q126315570', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q715694', to: 'am:TragicVillain', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        
        { from: 'Q52989', to: 'Q3101569', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q52989', to: 'am:VillainProtagonist', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1638848', to: 'Q3101569', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1638848', to: 'am:EccentricGenius', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q327572', to: 'Q2281987', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1994344', to: 'am:Trickster', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1197475', to: 'Q3101569', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true },
        { from: 'Q1197475', to: 'am:ChildProdigy', label: 'archetipo', arrows: 'to', color: {color: '#FF9800'}, dashes: true }
    ]);

    // 3. CONFIGURAZIONE FISICA E VISIVA
    var container_core = document.getElementById('animanga-core-graph');
    var data_core = { nodes: nodes_core, edges: edges_core };
    var options_core = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: { size: 14, face: 'Helvetica', color: '#333' },
            borderWidth: 2
        },
        groups: {
            series: { color: { background: '#4CAF50', border: '#388E3C' }, shape: 'box', font: {size: 18, color: 'white'} },
            character: { color: { background: '#2196F3', border: '#1976D2' } },
            archetype: { color: { background: '#FFC107', border: '#FFA000' }, shape: 'ellipse' },
            role: { color: { background: '#9C27B0', border: '#7B1FA2' }, shape: 'ellipse', font: {color: 'white'} }
        },
        edges: {
            font: { align: 'middle', size: 10, color: '#666' },
            smooth: { type: 'continuous' } 
        },
        physics: {
            forceAtlas2Based: {
                gravitationalConstant: -100,
                centralGravity: 0.01,
                springLength: 200,
                springConstant: 0.08
            },
            maxVelocity: 50,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: { iterations: 150 }
        }
    };

    // 4. Inizializzazione della rete Core (SOLO se il div esiste)
    var container_core = document.getElementById('animanga-core-graph');
    if (container_core) {
        var network_core = new vis.Network(container_core, data_core, options_core);
    }

    // ==========================================
    // PARTE 2: GRAFO ONTOLOGICO (Schema)
    // ==========================================

    // 1. DEFINIZIONE DELLE CLASSI (I Nodi dello Schema)
    var nodes_onto = new vis.DataSet([
        { id: 'am:Character', label: 'am:Character\n(Personaggio Immaginario)', group: 'coreClass', shape: 'box', margin: 15 },
        { id: 'am:Series', label: 'am:Series\n(Serie/Opera)', group: 'baseClass', shape: 'ellipse' },
        { id: 'am:NarrativeRole', label: 'am:NarrativeRole\n(Ruolo Narrativo)', group: 'baseClass', shape: 'ellipse' },
        { id: 'am:Archetype', label: 'am:Archetype\n(Archetipo / Trope)', group: 'enrichedClass', shape: 'ellipse' },
        { id: 'prov:Activity', label: 'prov:Activity\n(Elaborazione LLM)', group: 'provClass', shape: 'hexagon' }
    ]);

    // 2. DEFINIZIONE DELLE PROPRIETÀ (Gli Archi dello Schema)
    var edges_onto = new vis.DataSet([
        { 
            from: 'am:Character', to: 'am:Series', 
            label: 'am:appearsIn\n(equiv: wdt:P1441)', 
            arrows: 'to', font: {align: 'horizontal'}, color: {color: '#607D8B'} 
        },
        { 
            from: 'am:Character', to: 'am:NarrativeRole', 
            label: 'am:hasNarrativeRole\n(equiv: wdt:P4595)', 
            arrows: 'to', font: {align: 'horizontal'}, color: {color: '#607D8B'} 
        },
        { 
            from: 'am:Character', to: 'am:Archetype', 
            label: 'am:hasArchetype\n(equiv: wdt:P9071)', 
            arrows: 'to', font: {align: 'horizontal', color: '#E65100'}, 
            dashes: true, color: {color: '#FF9800'}, width: 2 
        },
        { 
            from: 'am:Archetype', to: 'prov:Activity', 
            label: 'prov:wasGeneratedBy', 
            arrows: 'to', font: {align: 'horizontal', color: '#4A148C'}, 
            dashes: true, color: {color: '#9C27B0'} 
        }
    ]);

    // 3. CONFIGURAZIONE GRAFICA
    var container_onto = document.getElementById('animanga-onto-graph');
    var data_onto = { nodes: nodes_onto, edges: edges_onto };
    var options_onto = {
        nodes: {
            font: { size: 16, face: 'Courier New', multi: 'html', bold: true },
            borderWidth: 2,
            shadow: true
        },
        groups: {
            coreClass: { color: { background: '#2196F3', border: '#1565C0' }, font: { color: 'white' } },
            baseClass: { color: { background: '#E0E0E0', border: '#9E9E9E' } },
            enrichedClass: { color: { background: '#FFE082', border: '#FF8F00' } },
            provClass: { color: { background: '#E1BEE7', border: '#8E24AA' } }
        },
        edges: {
            font: { size: 12, face: 'Courier New', background: 'white' },
            length: 250,
            smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
        },
        layout: {
            hierarchical: {
                direction: 'LR',
                sortMethod: 'directed',
                levelSeparation: 300,
                nodeSpacing: 150
            }
        },
        physics: false
    };

   // 4. Inizializzazione della rete Ontologica (SOLO se il div esiste)
    var container_onto = document.getElementById('animanga-onto-graph');
    if (container_onto) {
        var network_onto = new vis.Network(container_onto, data_onto, options_onto);
    }


    // ==========================================
    // PARTE 3: TABELLE DEI RISULTATI (DINAMICO)
    // ==========================================
    // Trova tutti i bottoni che hanno un ID che inizia con "toggleBtn-"
    const toggleButtons = document.querySelectorAll('[id^="toggleBtn-"]');
    
    toggleButtons.forEach(bottone => {
        // Estrapola il numero dall'ID (es. da "toggleBtn-2" prende "2")
        const idNumber = bottone.id.split('-')[1];
        
        // Cerca la tabella corrispondente a quel numero
        const tabella = document.getElementById(`results-table-${idNumber}`);
        
        // Se la tabella non esiste, salta al prossimo bottone
        if (!tabella) return; 

        // Legge il limite impostato dallo sviluppatore nell'HTML (data-limit)
        // Se per qualche motivo ti dimentichi di metterlo nell'HTML, usa 5 come fallback di sicurezza
        const limite = parseInt(tabella.getAttribute('data-limit'), 10) || 5;
        
        const righe = tabella.querySelectorAll('tbody tr');
        let tutteVisibili = false;

        function aggiornaVista() {
            righe.forEach((riga, indice) => {
                if (tutteVisibili) {
                    riga.style.display = ''; // Mostra tutto
                } else {
                    // Nasconde le righe che superano il limite impostato nel data-limit
                    riga.style.display = indice >= limite ? 'none' : ''; 
                }
            });

            if (tutteVisibili) {
                bottone.textContent = 'Mostra meno';
            } else {
                bottone.textContent = `Mostra tutte (${righe.length})`;
            }
        }

        // 1. Inizializza la tabella al caricamento
        aggiornaVista();

        // 2. Gestisce il click sul bottone
        bottone.addEventListener('click', function() {
            tutteVisibili = !tutteVisibili;
            aggiornaVista();
        });
    });

    
    // ==========================================
    // PARTE 4: LIGHTBOX IMMAGINE GRAFICO (DINAMICO)
    // ==========================================
    
    // Trova tutti i bottoni che hanno un ID che inizia con "chartBtn-"
    const chartButtons = document.querySelectorAll('[id^="chartBtn-"]');
    
    chartButtons.forEach(chartBtn => {
        // Estrapola il numero dall'ID
        const idNumber = chartBtn.id.split('-')[1];
        
        // Cerca la lightbox corrispondente
        const lightbox = document.getElementById(`lightbox-${idNumber}`);
        
        if (chartBtn && lightbox) {
            const closeBtn = lightbox.querySelector('.lightbox-close');

            // 1. Apri la lightbox
            chartBtn.addEventListener('click', function() {
                lightbox.style.display = 'flex'; 
            });

            // 2. Chiudi cliccando sulla "X"
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
            });

            // 3. Chiudi cliccando fuori dall'immagine
            lightbox.addEventListener('click', function(event) {
                if (event.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        }
    });

    // 4. Tasto Esc globale (chiude tutte le lightbox aperte)
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const lightboxes = document.querySelectorAll('.lightbox-overlay');
            lightboxes.forEach(lb => {
                if (lb.style.display === 'flex') {
                    lb.style.display = 'none';
                }
            });
        }
    });

    // ==========================================
    // PARTE 5: GRAFO DINAMICO DA JSON (Lightbox 3)
    // ==========================================
    
    function loadGraphFromJSON() {
        // Assicurati che il percorso del json sia quello corretto rispetto alla tua cartella
        fetch('./queries/query_grafo_3.json') 
            .then(response => response.json())
            .then(data => {
                let nodesArray = [];
                let edgesArray = [];
                let addedNodes = new Set(); // Per evitare di duplicare i nodi

                data.results.bindings.forEach(row => {
                    // --- Nodo Sorgente (Es. Entità Naruto: Anime o Manga) ---
                    let sourceId = row.item.value;
                    let sourceLabel = row.itemlabel ? row.itemlabel.value : sourceId.split('/').pop();
                    
                    if (!addedNodes.has(sourceId)) {
                        nodesArray.push({ 
                            id: sourceId, 
                            label: sourceLabel, 
                            group: 'source',
                            color: { background: '#f43f5e', border: '#e11d48' },
                            font: { color: 'white' },
                            shape: 'box'
                        });
                        addedNodes.add(sourceId);
                    }

                    // --- Nodo Destinazione (Es. Personaggio, Genere, Autore) ---
                    let targetId = row.valore.value;
                    // Se non ha una label (es. un literal puro), usa l'estratto finale del valore
                    let targetLabel = row.valorelabel ? row.valorelabel.value : (targetId.includes('/') ? decodeURIComponent(targetId.split('/').pop()) : targetId);

                    if (!addedNodes.has(targetId)) {
                        nodesArray.push({ 
                            id: targetId, 
                            label: targetLabel, 
                            group: 'target',
                            color: { background: '#1e1b4b', border: '#0f172a' },
                            font: { color: 'white' }
                        });
                        addedNodes.add(targetId);
                    }

                    // --- Arco (La Proprietà Wikidata) ---
                    let edgeLabel = row.proprietalabel ? row.proprietalabel.value : row.proprieta.value.split('/').pop();
                    
                    edgesArray.push({
                        from: sourceId,
                        to: targetId,
                        label: edgeLabel,
                        arrows: 'to',
                        color: { color: '#cbd5e1', highlight: '#f43f5e' },
                        font: { align: 'middle', size: 12, color: '#334155' }
                    });
                });

                // Inizializza il grafo Vis.js
                var container = document.getElementById('mynetwork-3');
                var dataVis = {
                    nodes: new vis.DataSet(nodesArray),
                    edges: new vis.DataSet(edgesArray)
                };
                
                var options = {
                    physics: {
                        stabilization: true,
                        barnesHut: {
                            gravitationalConstant: -3000,
                            springConstant: 0.02,
                            springLength: 200 // Rende il grafo ben distanziato
                        }
                    },
                    interaction: {
                        hover: true,
                        tooltipDelay: 200
                    }
                };
                
                new vis.Network(container, dataVis, options);
            })
            .catch(error => console.error("Errore nel caricamento del JSON del grafo:", error));
    }

    // Facciamo in modo che il grafo venga generato al primo clic sul bottone per risparmiare risorse
    const btnChart3 = document.getElementById('chartBtn-3');
    if (btnChart3) {
        let isGraphLoaded = false;
        btnChart3.addEventListener('click', function() {
            if (!isGraphLoaded) {
                loadGraphFromJSON();
                isGraphLoaded = true;
            }
        });
    }

    // ==========================================
    // PARTE 6: CARICAMENTO DINAMICO QUERY SPARQL
    // ==========================================
    
    // Trova TUTTI i tag <pre> della pagina che possiedono l'attributo data-src
    const queryBlocks = document.querySelectorAll('pre[data-src]');
    
    queryBlocks.forEach(block => {
        // Per ogni blocco, legge quale file deve scaricare
        const fileUrl = block.getAttribute('data-src');
        const codeElement = block.querySelector('code');
        
        // Esegue la fetch (il download del testo) per quel file specifico
        fetch(fileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('File non trovato: ' + response.status);
                }
                return response.text();
            })
            .then(text => {
                // Inserisce il testo della query nel blocco code corrispondente
                codeElement.textContent = text;
            })
            .catch(error => {
                console.error("Impossibile caricare la query da " + fileUrl + ":", error);
                codeElement.textContent = "Errore: impossibile caricare il file " + fileUrl;
                codeElement.style.color = "#f43f5e"; // Usa il colore rosso/fucsia del tuo tema per l'errore
            });
    });

  // ==========================================
    // PARTE 7: AVVIO CARICAMENTO DATI (Query 7)
    // ==========================================
    // Assicuriamoci che il percorso sia quello corretto (./ anziché ../ se la pagina html è nella cartella principale)
    const urlFileJson = "./queries/query_7.json"; 

    function caricaDatiDaJson() {
        const tbody = document.getElementById("tbody-query7");
        if(!tbody) return; // Se la tabella non esiste nella pagina corrente, esce

        tbody.innerHTML = "<tr><td colspan='4'>Caricamento dati in corso...</td></tr>";

        fetch(urlFileJson)
            .then(response => {
                if (!response.ok) throw new Error("Errore HTTP: " + response.status);
                return response.json();
            })
            .then(data => {
                gestisciRisultatiQuery7(data); // Richiama la funzione globale definita in basso
            })
            .catch(error => {
                console.error("Si è verificato un errore durante il caricamento del JSON:", error);
                tbody.innerHTML = `<tr><td colspan='4' style='color:red;'>Errore nel caricamento dei dati: ${error.message}</td></tr>`;
            });
    }

    if (document.getElementById("tbody-query7")) {
        caricaDatiDaJson();
    }

}); // <-- QUI FINISCE IL DOMContentLoaded


// =========================================================================
// PARTE 8: LOGICA DI IMPAGINAZIONE QUERY 7 (GLOBALE)
// Queste funzioni devono stare FUORI dal DOMContentLoaded per poter essere 
// chiamate dai pulsanti "onclick" presenti nel tuo file HTML.
// =========================================================================

let tuttiIResultati = []; 
let paginaCorrente = 1;
const righePerPagina = 25; 

function gestisciRisultatiQuery7(data) {
    if (data && data.results && data.results.bindings) {
        tuttiIResultati = data.results.bindings; 
        paginaCorrente = 1; 
        renderizzaTabella();
    } else {
        console.error("Il file JSON non ha la struttura SPARQL prevista.");
    }
}

function renderizzaTabella() {
    const tbody = document.getElementById("tbody-query7");
    const indicator = document.getElementById("page-indicator");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (!tbody) return;

    tbody.innerHTML = "";

    const indiceInizio = (paginaCorrente - 1) * righePerPagina;
    const indiceFine = Math.min(indiceInizio + righePerPagina, tuttiIResultati.length);
    const totalePagine = Math.ceil(tuttiIResultati.length / righePerPagina);

    const righeDaMostrare = tuttiIResultati.slice(indiceInizio, indiceFine);

    righeDaMostrare.forEach(row => {
        const tr = document.createElement("tr");

        const opera = row.opera ? row.opera.value : (row.opera ? row.opera.value : "-");
        const personaggio = row.personaggio ? row.personaggio.value : (row.personaggio ? row.personaggio.value : "-");
        const totalePersonaggi = row.totalePersonaggi ? row.totalePersonaggi.value : "0";
        const operaLabel = row.operaLabel ? row.operaLabel.value : "-";
        const personaggioLabel = row.personaggioLabel ? row.personaggioLabel.value : "-";
        const tipoPersonaggioLabel = row.tipoPersonaggioLabel ? row.tipoPersonaggioLabel.value : "-";

        /* 
            {"opera":{"type":"uri","value":"http://www.wikidata.org/entity/Q718624"},
            "personaggio":{"type":"uri","value":"http://www.wikidata.org/entity/Q843545"},
            "totalePersonaggi":{"datatype":"http://www.w3.org/2001/XMLSchema#integer","type":"literal","value":"9"},
            "operaLabel":{"xml:lang":"en","type":"literal","value":"Death Note"},
            "personaggioLabel":{"xml:lang":"en","type":"literal","value":"Light Yagami"},
            "tipoPersonaggioLabel":{"xml:lang":"en","type":"literal","value":"villain"}},
        */

        tr.innerHTML = `
            <td>${opera}</td>
            <td>${personaggio}</td>
            <td>${totalePersonaggi}</td>
            <td>${operaLabel}</td>
            <td>${personaggioLabel}</td>
            <td>${tipoPersonaggioLabel}</td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrente} di ${totalePagine} (${tuttiIResultati.length} elementi)`;
    if (btnPrev) btnPrev.disabled = (paginaCorrente === 1);
    if (btnNext) btnNext.disabled = (paginaCorrente === totalePagine);
}

function paginaPrecedente() {
    if (paginaCorrente > 1) {
        paginaCorrente--;
        renderizzaTabella();
        scrollareAInizioTabella();
    }
}

function paginaSuccessiva() {
    const totalePagine = Math.ceil(tuttiIResultati.length / righePerPagina);
    if (paginaCorrente < totalePagine) {
        paginaCorrente++;
        renderizzaTabella();
        scrollareAInizioTabella();
    }
}

function scrollareAInizioTabella() {
    // Scrolla la pagina verso la tabella quando si cambia pagina
    const tabella = document.getElementById("tbody-query7");
    if(tabella) {
        tabella.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}