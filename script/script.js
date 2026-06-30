// ==========================================
// 0. STATO GLOBALE DELL'APPLICAZIONE (In cima per lo Scope)
// ==========================================

// Stato per la Query 2
let datiQuery2 = [];
let paginaCorrenteQ2 = 1;
const righePerPaginaQ2 = 10; 

// Stato per la Query 3
let datiQuery3 = [];
let paginaCorrenteQ3 = 1;
const righePerPaginaQ3 = 10; 

// Stato per la Query 7
let tuttiIResultatiQ7 = []; 
let paginaCorrenteQ7 = 1;
const righePerPaginaQ7 = 25; 

// Stato per la Query 8
let datiQuery8 = [];
let paginaCorrenteQ8 = 1;
const righePerPaginaQ8 = 15; 

// Stato per la Query 9bis
let datiQuery9bis = [];
let paginaCorrenteQ9bis = 1;
const righePerPaginaQ9bis = 10; 


// ==========================================
// 1. DEFINIZIONE DELLE FUNZIONI (Globali)
// ==========================================

// --- Grafo Dinamico (Query 3 - Lightbox 3) ---
function loadGraphFromJSON() {
    fetch('./queries_results/query_3.json') //"./queries_results/query_3.json"
        .then(response => response.json())
        .then(data => {
            let nodesArray = [];
            let edgesArray = [];
            let addedNodes = new Set();

            data.results.bindings.forEach(row => {
                let sourceId = row.item.value;
                let sourceLabel = row.itemlabel ? row.itemlabel.value : sourceId.split('/').pop();

                if (!addedNodes.has(sourceId)) {
                    nodesArray.push({
                        id: sourceId,
                        label: sourceLabel,
                        color: { background: '#10b981', border: '#047857' }, 
                        font: { color: 'white', face: 'Arial', bold: true },
                        shape: 'box'
                    });
                    addedNodes.add(sourceId);
                }

                let targetId = row.valore.value;
                let targetLabel = row.valorelabel ? row.valorelabel.value : (targetId.includes('/') ? decodeURIComponent(targetId.split('/').pop()) : targetId);

                if (!addedNodes.has(targetId)) {
                    let bgColor = '#3b82f6'; 
                    let borderColor = '#1e40af';
                    let fontSettings = { color: 'white', face: 'Arial' };
                    
                    let proprieta = row.proprieta ? row.proprieta.value : "";
                    
                    if (proprieta.includes('P50') || targetLabel.toLowerCase().includes('autore')) {
                        bgColor = '#eab308'; 
                        borderColor = '#854d0e';
                        fontSettings = { color: 'black', face: 'Arial', bold: true }; 
                    }

                    nodesArray.push({
                        id: targetId,
                        label: targetLabel,
                        color: { background: bgColor, border: borderColor },
                        font: fontSettings,
                        shape: 'ellipse'
                    });
                    addedNodes.add(targetId);
                }

                let edgeLabel = row.proprietalabel ? row.proprietalabel.value : row.proprieta.value.split('/').pop();
                edgesArray.push({
                    from: sourceId,
                    to: targetId,
                    label: edgeLabel,
                    arrows: 'to',
                    color: { color: '#94a3b8', highlight: '#f43f5e' },
                    font: { align: 'middle', size: 11, color: '#475569', background: 'rgba(255,255,255,0.8)' }
                });
            });

            var container = document.getElementById('mynetwork-3');
            if (!container) return;

            var dataVis = {
                nodes: new vis.DataSet(nodesArray),
                edges: new vis.DataSet(edgesArray)
            };

            var options = {
                physics: {
                    stabilization: { iterations: 150 },
                    forceAtlas2Based: {
                        gravitationalConstant: -120,
                        centralGravity: 0.01,
                        springLength: 200,
                        springConstant: 0.05
                    },
                    solver: 'forceAtlas2Based'
                },
                interaction: { hover: true, tooltipDelay: 200 }
            };

            new vis.Network(container, dataVis, options);
        })
        .catch(error => console.error("Errore nel caricamento della Query 3:", error));
}

// --- Grafo Dinamico (Query 7 - Lightbox 7) ---
function loadGraph7FromJSON() {
    fetch('./queries_results/query_7.json')//"./queries_results/query_3.json"
        .then(response => response.json())
        .then(data => {
            let nodesArray = [];
            let edgesArray = [];
            let addedNodes = new Set();

            data.results.bindings.forEach(row => {
                let operaId = row.opera.value;
                let operaLabel = row.operaLabel ? row.operaLabel.value : operaId.split('/').pop();
                let totalePersonaggi = row.totalePersonaggi ? row.totalePersonaggi.value : "";
                
                let finalOperaLabel = totalePersonaggi ? `${operaLabel}\n(${totalePersonaggi})` : operaLabel;

                if (!addedNodes.has(operaId)) {
                    nodesArray.push({
                        id: operaId,
                        label: finalOperaLabel,
                        color: { background: '#10b981', border: '#047857' }, 
                        font: { color: 'white', size: 16, bold: true, face: 'Arial' },
                        shape: 'box'
                    });
                    addedNodes.add(operaId);
                }

                let charId = row.personaggio.value;
                let charLabel = row.personaggioLabel ? row.personaggioLabel.value : charId.split('/').pop();
                let ruolo = row.tipoPersonaggioLabel ? row.tipoPersonaggioLabel.value.toLowerCase() : "";

                if (!addedNodes.has(charId)) {
                    let bgColor = '#3b82f6'; 
                    let borderColor = '#1e40af';
                    let fontSettings = { color: 'white', face: 'Arial' };
                    
                    if (ruolo.includes('villain') || ruolo.includes('antagonist')) {
                        bgColor = '#ef4444'; 
                        borderColor = '#991b1b';
                        fontSettings = { color: 'white', face: 'Arial' };
                    } else if (ruolo.includes('protagonist') || ruolo.includes('hero')) {
                        bgColor = '#eab308'; 
                        borderColor = '#854d0e';
                        fontSettings = { color: 'black', face: 'Arial', bold: true }; 
                    }

                    nodesArray.push({
                        id: charId,
                        label: charLabel,
                        color: { background: bgColor, border: borderColor },
                        font: fontSettings,
                        shape: 'ellipse'
                    });
                    addedNodes.add(charId);
                }

                let edgeLabel = row.tipoPersonaggioLabel ? row.tipoPersonaggioLabel.value : 'appare in';
                edgesArray.push({
                    from: charId,
                    to: operaId,
                    label: edgeLabel,
                    arrows: 'to',
                    color: { color: '#94a3b8', highlight: '#f43f5e' },
                    font: { align: 'middle', size: 11, color: '#475569', background: 'rgba(255,255,255,0.8)' }
                });
            });

            var container = document.getElementById('mynetwork-7');
            if (!container) return;

            var dataVis = {
                nodes: new vis.DataSet(nodesArray),
                edges: new vis.DataSet(edgesArray)
            };

            var options = {
                physics: {
                    stabilization: { iterations: 150 },
                    forceAtlas2Based: {
                        gravitationalConstant: -120,
                        centralGravity: 0.01,
                        springLength: 200,
                        springConstant: 0.05
                    },
                    solver: 'forceAtlas2Based'
                },
                interaction: { hover: true, tooltipDelay: 200 }
            };

            new vis.Network(container, dataVis, options);
        })
        .catch(error => console.error("Errore nel caricamento del JSON della Query 7:", error));
}

// --- Logica Caricamento e Impaginazione Query 2 ---
function caricaDatiQuery2(urlFile) {
    const tbody = document.getElementById("tbody-query2");
    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='3'>Caricamento dati in corso...</td></tr>";

    fetch(urlFile) 
        .then(response => {
            if (!response.ok) throw new Error("Errore HTTP: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.bindings) {
                datiQuery2 = data.results.bindings;
                paginaCorrenteQ2 = 1;
                renderizzaTabellaQ2();
                configuraControlliQ2();
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON della Query 2:", error);
            tbody.innerHTML = `<tr><td colspan='3' style='color:red;'>Errore: ${error.message}</td></tr>`;
        });
}

function renderizzaTabellaQ2() {
    const tbody = document.getElementById("tbody-query2");
    const indicator = document.getElementById("page-indicator-q2");
    const btnPrev = document.getElementById("btn-prev-q2");
    const btnNext = document.getElementById("btn-next-q2");

    if (!tbody) return;
    tbody.innerHTML = "";

    const inizio = (paginaCorrenteQ2 - 1) * righePerPaginaQ2;
    const fine = Math.min(inizio + righePerPaginaQ2, datiQuery2.length);
    const totalePagine = Math.ceil(datiQuery2.length / righePerPaginaQ2);

    const righeMostrate = datiQuery2.slice(inizio, fine);

    righeMostrate.forEach(row => {
        const tr = document.createElement("tr");

        const propUri = row.proprieta ? row.proprieta.value : "#";
        const propQID = propUri.split('/').pop();
        const desc = row.proprietalabel ? row.proprietalabel.value : "";
        const numero = row.numeroDiProprieta ? row.numeroDiProprieta.value : "1";

        tr.innerHTML = `
            <td><a href="${propUri}" target="_blank" class="item-link">${propQID}</a></td>
            <td><span>${desc}</span></td>
            <td><span>${numero}</span></td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrenteQ2} di ${totalePagine} (${datiQuery2.length} elementi)`;
    if (btnPrev) btnPrev.disabled = (paginaCorrenteQ2 === 1);
    if (btnNext) btnNext.disabled = (paginaCorrenteQ2 === totalePagine || totalePagine === 0);
}

function configuraControlliQ2() {
    const btnPrev = document.getElementById("btn-prev-q2");
    const btnNext = document.getElementById("btn-next-q2");

    if (btnPrev && !btnPrev.dataset.listener) {
        btnPrev.addEventListener('click', () => {
            if (paginaCorrenteQ2 > 1) {
                paginaCorrenteQ2--;
                renderizzaTabellaQ2();
            }
        });
        btnPrev.dataset.listener = "true";
    }

    if (btnNext && !btnNext.dataset.listener) {
        btnNext.addEventListener('click', () => {
            const totalePagine = Math.ceil(datiQuery2.length / righePerPaginaQ2);
            if (paginaCorrenteQ2 < totalePagine) {
                paginaCorrenteQ2++;
                renderizzaTabellaQ2();
            }
        });
        btnNext.dataset.listener = "true";
    }
}

// --- Logica Caricamento e Impaginazione Query 3 ---
function caricaDatiQuery3(urlFile) {
    const tbody = document.getElementById("tbody-query3");
    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='3'>Caricamento dati in corso...</td></tr>";

    fetch(urlFile) 
        .then(response => {
            if (!response.ok) throw new Error("Errore HTTP: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.bindings) {
                datiQuery3 = data.results.bindings;
                paginaCorrenteQ3 = 1;
                renderizzaTabellaQ3();
                configuraControlliQ3();
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON della Query 3:", error);
            tbody.innerHTML = `<tr><td colspan='3' style='color:red;'>Errore: ${error.message}</td></tr>`;
        });
}

function renderizzaTabellaQ3() {
    const tbody = document.getElementById("tbody-query3");
    const indicator = document.getElementById("page-indicator-q3");
    const btnPrev = document.getElementById("btn-prev-q3");
    const btnNext = document.getElementById("btn-next-q3");

    if (!tbody) return;
    tbody.innerHTML = "";

    const inizio = (paginaCorrenteQ3 - 1) * righePerPaginaQ3;
    const fine = Math.min(inizio + righePerPaginaQ3, datiQuery3.length);
    const totalePagine = Math.ceil(datiQuery3.length / righePerPaginaQ3);

    const righeMostrate = datiQuery3.slice(inizio, fine);

    righeMostrate.forEach(row => {
        const tr = document.createElement("tr");

        const item = row.item ? row.item.value : "#";
        const itemQID = item.split('/').pop();
        const itemlabel = row.itemlabel ? row.itemlabel.value : "";
        const propUri = row.proprieta ? row.proprieta.value : "#";
        const propQID = propUri.split('/').pop();
        const proprietalabel = row.proprietalabel ? row.proprietalabel.value : "";
        const objUri = row.valore ? row.valore.value : "#";
        const objQID = objUri.split('/').pop();
        const objlabel = row.valorelabel ? row.valorelabel.value : "";

        tr.innerHTML = `
            <td><a href="${item}" target="_blank" class="item-link">${itemQID}</a></td>
            <td><span>${itemlabel}</span></td>
            <td><a href="${propUri}" target="_blank" class="item-link">${propQID}</a></td>
            <td><span>${proprietalabel}</span></td>
            <td><a href="${objUri}" target="_blank" class="item-link">${objQID}</a></td>
            <td><span>${objlabel}</span></td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrenteQ3} di ${totalePagine} (${datiQuery3.length} elementi)`;
    if (btnPrev) btnPrev.disabled = (paginaCorrenteQ3 === 1);
    if (btnNext) btnNext.disabled = (paginaCorrenteQ3 === totalePagine || totalePagine === 0);
}

function configuraControlliQ3() {
    const btnPrev = document.getElementById("btn-prev-q3");
    const btnNext = document.getElementById("btn-next-q3");

    if (btnPrev && !btnPrev.dataset.listener) {
        btnPrev.addEventListener('click', () => {
            if (paginaCorrenteQ3 > 1) {
                paginaCorrenteQ3--;
                renderizzaTabellaQ3();
            }
        });
        btnPrev.dataset.listener = "true";
    }

    if (btnNext && !btnNext.dataset.listener) {
        btnNext.addEventListener('click', () => {
            const totalePagine = Math.ceil(datiQuery3.length / righePerPaginaQ3);
            if (paginaCorrenteQ3 < totalePagine) {
                paginaCorrenteQ3++;
                renderizzaTabellaQ3();
            }
        });
        btnNext.dataset.listener = "true";
    }
}

// --- Logica Caricamento e Impaginazione Query 7 ---
function caricaDatiQuery7(urlFile) {
    const tbody = document.getElementById("tbody-query7");
    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='3'>Caricamento dati in corso...</td></tr>";

    fetch(urlFile) 
        .then(response => {
            if (!response.ok) throw new Error("Errore HTTP: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.bindings) {
                datiQuery7 = data.results.bindings;
                paginaCorrenteQ7 = 1;
                renderizzaTabellaQ7();
                configuraControlliQ7();
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON della Query 7:", error);
            tbody.innerHTML = `<tr><td colspan='3' style='color:red;'>Errore: ${error.message}</td></tr>`;
        });
}

function renderizzaTabellaQ7() {
    const tbody = document.getElementById("tbody-query7");
    const indicator = document.getElementById("page-indicator-q7");
    const btnPrev = document.getElementById("btn-prev-q7");
    const btnNext = document.getElementById("btn-next-q7");

    if (!tbody) return;
    tbody.innerHTML = "";

    const inizio = (paginaCorrenteQ7 - 1) * righePerPaginaQ7;
    const fine = Math.min(inizio + righePerPaginaQ7, datiQuery7.length);
    const totalePagine = Math.ceil(datiQuery7.length / righePerPaginaQ7);

    const righeMostrate = datiQuery7.slice(inizio, fine);

    righeMostrate.forEach(row => {
        const tr = document.createElement("tr"); /*"proprieta","proprietalabel","valore","valorelabel"]*/

        const propUri = row.proprieta ? row.proprieta.value : "#";
        const propQID = propUri.split('/').pop();
        const proprietalabel = row.proprietalabel ? row.proprietalabel.value : "";
        const objUri = row.valore ? row.valore.value : "#";
        const objQID = objUri.split('/').pop();
        const objlabel = row.valorelabel ? row.valorelabel.value : "";

        tr.innerHTML = `
            <td><a href="${propUri}" target="_blank" class="item-link">${propQID}</a></td>
            <td><span>${proprietalabel}</span></td>
            <td><a href="${objUri}" target="_blank" class="item-link">${objQID}</a></td>
            <td><span>${objlabel}</span></td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrenteQ7} di ${totalePagine} (${datiQuery7.length} elementi)`;
    if (btnPrev) btnPrev.disabled = (paginaCorrenteQ7 === 1);
    if (btnNext) btnNext.disabled = (paginaCorrenteQ7 === totalePagine || totalePagine === 0);
}

function configuraControlliQ7() {
    const btnPrev = document.getElementById("btn-prev-q7");
    const btnNext = document.getElementById("btn-next-q7");

    if (btnPrev && !btnPrev.dataset.listener) {
        btnPrev.addEventListener('click', () => {
            if (paginaCorrenteQ7 > 1) {
                paginaCorrenteQ7--;
                renderizzaTabellaQ7();
            }
        });
        btnPrev.dataset.listener = "true";
    }

    if (btnNext && !btnNext.dataset.listener) {
        btnNext.addEventListener('click', () => {
            const totalePagine = Math.ceil(datiQuery7.length / righePerPaginaQ7);
            if (paginaCorrenteQ7 < totalePagine) {
                paginaCorrenteQ7++;
                renderizzaTabellaQ7();
            }
        });
        btnNext.dataset.listener = "true";
    }
}

// --- Logica Caricamento e Impaginazione Query 8 ---
function caricaDatiQuery8(urlFile) {
    const tbody = document.getElementById("tbody-query8");
    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='3'>Caricamento dati in corso...</td></tr>";

    fetch(urlFile) 
        .then(response => {
            if (!response.ok) throw new Error("Errore HTTP: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.bindings) {
                datiQuery8 = data.results.bindings;
                paginaCorrenteQ8 = 1;
                renderizzaTabellaQ8();
                configuraControlliQ8();
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON della Query 8:", error);
            tbody.innerHTML = `<tr><td colspan='3' style='color:red;'>Errore: ${error.message}</td></tr>`;
        });
}

function renderizzaTabellaQ8() {
    const tbody = document.getElementById("tbody-query8");
    const indicator = document.getElementById("page-indicator-q8");
    const btnPrev_8 = document.getElementById("btn-prev-q8");
    const btnNext_8 = document.getElementById("btn-next-q8");

    if (!tbody) return;
    tbody.innerHTML = "";

    const inizio = (paginaCorrenteQ8 - 1) * righePerPaginaQ8;
    const fine = Math.min(inizio + righePerPaginaQ8, datiQuery8.length);
    const totalePagine8 = Math.ceil(datiQuery8.length / righePerPaginaQ8);

    const righeMostrate = datiQuery8.slice(inizio, fine);

    righeMostrate.forEach(row => {
        const tr = document.createElement("tr");

        const opera = row.opera ? row.opera.value : "";
        const opera_soloQ = opera !== "-" ? opera.split('/').pop() : "-";
        const personaggio = row.personaggio ? row.personaggio.value : "";
        const personaggio_soloQ = personaggio !== "-" ? personaggio.split('/').pop() : "";
        const totalePersonaggi = row.totalePersonaggi ? row.totalePersonaggi.value : "0";
        const operaLabel = row.operaLabel ? row.operaLabel.value : "";
        const personaggioLabel = row.personaggioLabel ? row.personaggioLabel.value : "";
        const tipoPersonaggioLabel = row.tipoPersonaggioLabel ? row.tipoPersonaggioLabel.value : "";

        tr.innerHTML = `
            <td><a href="${opera}" title="opera" target="_blank">${opera_soloQ}</a></td>
            <td>${operaLabel}</td>
            <td>${totalePersonaggi}</td>
            <td><a href="${personaggio}" title="personaggio" target="_blank">${personaggio_soloQ}</a></td>
            <td>${personaggioLabel}</td>
            <td>${tipoPersonaggioLabel}</td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrenteQ8} di ${totalePagine8} (${datiQuery8.length} elementi)`;
    if (btnPrev_8) btnPrev_8.disabled = (paginaCorrenteQ8 === 1);
    if (btnNext_8) btnNext_8.disabled = (paginaCorrenteQ8 === totalePagine8 || totalePagine8 === 0);
}

function configuraControlliQ8() {
    const btnPrev_8 = document.getElementById("btn-prev-q8");
    const btnNext_8 = document.getElementById("btn-next-q8");

    if (btnPrev_8 && !btnPrev_8.dataset.listener) {
        btnPrev_8.addEventListener('click', () => {
            if (paginaCorrenteQ8 > 1) {
                paginaCorrenteQ8--;
                renderizzaTabellaQ8();
            }
        });
        btnPrev_8.dataset.listener = "true";
    }

    if (btnNext_8 && !btnNext_8.dataset.listener) {
        btnNext_8.addEventListener('click', () => {
            const totalePagine8 = Math.ceil(datiQuery8.length / righePerPaginaQ8);
            if (paginaCorrenteQ8 < totalePagine8) {
                paginaCorrenteQ8++;
                renderizzaTabellaQ8();
                scrollareAInizioTabellaQ8()
            }
        });
        btnNext_8.dataset.listener = "true";
    }
}

function scrollareAInizioTabellaQ8() {
    const tabella = document.getElementById("tbody-query8");
    if(tabella) {
        tabella.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- Logica Caricamento e Impaginazione Query 9bis ---
function caricaDatiQuery7(urlFile) {
    const tbody = document.getElementById("tbody-query9bis");
    if (!tbody) return;

    tbody.innerHTML = "<tr><td colspan='3'>Caricamento dati in corso...</td></tr>";

    fetch(urlFile) 
        .then(response => {
            if (!response.ok) throw new Error("Errore HTTP: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data && data.results && data.results.bindings) {
                datiQuery9bis = data.results.bindings;
                paginaCorrenteQ9bis = 1;
                renderizzaTabellaQ9bis();
                configuraControlliQ9bis();
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON della Query 9bis:", error);
            tbody.innerHTML = `<tr><td colspan='3' style='color:red;'>Errore: ${error.message}</td></tr>`;
        });
}

function renderizzaTabellaQ9bis() {
    const tbody = document.getElementById("tbody-query9bis");
    const indicator = document.getElementById("page-indicator-q9bis");
    const btnPrev = document.getElementById("btn-prev-q9bis");
    const btnNext = document.getElementById("btn-next-q9bis");

    if (!tbody) return;
    tbody.innerHTML = "";

    const inizio = (paginaCorrenteQ9bis - 1) * righePerPaginaQ9bis;
    const fine = Math.min(inizio + righePerPaginaQ9bis, datiQuery9bis.length);
    const totalePagine = Math.ceil(datiQuery9bis.length / righePerPaginaQ9bis);

    const righeMostrate = datiQuery9bis.slice(inizio, fine);

    righeMostrate.forEach(row => {
        const tr = document.createElement("tr"); /*"stockCharacter","stockCharacterLabel","description"*/

        const stockCharacterUri = row.stockCharacter ? row.stockCharacter.value : "#";
        const stockCharacterQID = stockCharacterUri.split('/').pop();
        const stockCharacterlabel = row.stockCharacterLabel ? row.stockCharacterLabel.value : "";
        const description = row.description ? row.description.value : "";

        tr.innerHTML = `
            <td><a href="${stockCharacterUri}" target="_blank" class="item-link">${stockCharacterQID}</a></td>
            <td><span>${stockCharacterlabel}</span></td>
            <td><span>${description}</span></td>
        `;
        tbody.appendChild(tr);
    });

    if (indicator) indicator.textContent = `Pagina ${paginaCorrenteQ9bis} di ${totalePagine} (${datiQuery9bis.length} elementi)`;
    if (btnPrev) btnPrev.disabled = (paginaCorrenteQ9bis === 1);
    if (btnNext) btnNext.disabled = (paginaCorrenteQ9bis === totalePagine || totalePagine === 0);
}

function configuraControlliQ9bis() {
    const btnPrev = document.getElementById("btn-prev-q9bis");
    const btnNext = document.getElementById("btn-next-q9bis");

    if (btnPrev && !btnPrev.dataset.listener) {
        btnPrev.addEventListener('click', () => {
            if (paginaCorrenteQ9bis > 1) {
                paginaCorrenteQ9bis--;
                renderizzaTabellaQ9bis();
            }
        });
        btnPrev.dataset.listener = "true";
    }

    if (btnNext && !btnNext.dataset.listener) {
        btnNext.addEventListener('click', () => {
            const totalePagine = Math.ceil(datiQuery9bis.length / righePerPaginaQ9bis);
            if (paginaCorrenteQ9bis < totalePagine) {
                paginaCorrenteQ9bis++;
                renderizzaTabellaQ9bis();
            }
        });
        btnNext.dataset.listener = "true";
    }
}

// ==========================================
// 2. INIZIALIZZAZIONE E EVENT LISTENERS (DOM Content Loaded)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // --- GRAFO CORE (AniManga O-KG) ---
    var nodes_core = new vis.DataSet([
        { id: 'Q462172', label: 'One Piece', group: 'series' },
        { id: 'Q81', label: 'Naruto', group: 'series' },
        { id: 'Q1834', label: 'Death Note', group: 'series' },
        { id: 'Q477388', label: 'Monkey D. Luffy', group: 'character' },
        { id: 'Q635674', label: 'Roronoa Zoro', group: 'character' },
        { id: 'Q836371', label: 'Nami', group: 'character' },
        { id: 'Q843825', label: 'Sanji', group: 'character' },
        { id: 'Q1048897', label: 'Nico Robin', group: 'character' },
        { id: 'Q719363', label: 'Naruto Uzumaki', group: 'character' },
        { id: 'Q1622379', label: 'Sasuke Uchiha', group: 'character' },
        { id: 'Q327170', label: 'Sakura Haruno', group: 'character' },
        { id: 'Q193156', label: 'Kakashi Hatake', group: 'character' },
        { id: 'Q715694', label: 'Itachi Uchiha', group: 'character' },
        { id: 'Q52989', label: 'Light Yagami', group: 'character' },
        { id: 'Q1638848', label: 'L', group: 'character' },
        { id: 'Q327572', label: 'Misa Amane', group: 'character' },
        { id: 'Q1994344', label: 'Ryuk', group: 'character' },
        { id: 'Q1197475', label: 'Near', group: 'character' },
        { id: 'Q212235', label: 'Protagonista', group: 'role' },
        { id: 'Q1651815', label: 'Deuteragonista', group: 'role' },
        { id: 'Q55280287', label: 'Tritagonista', group: 'role' },
        { id: 'Q1254394', label: 'Antagonista', group: 'role' },
        { id: 'Q108035', label: 'Antieroe', group: 'role' },
        { id: 'am:MentorRole', label: 'Mentore', group: 'role' },
        { id: 'am:ObserverRole', label: 'Osservatore Neutrale', group: 'role' },
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

    var edges_core = new vis.DataSet([
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
        { from: 'Q1622379', to: 'Q715694', label: 'parente di', arrows: 'to, from', color: {color: '#E91E63'}, width: 2 },
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

    var container_core = document.getElementById('animanga-core-graph');
    if (container_core) {
        var data_core = { nodes: nodes_core, edges: edges_core };
        var options_core = {
            nodes: { shape: 'dot', size: 20, font: { size: 14, face: 'Helvetica', color: '#333' }, borderWidth: 2 },
            groups: {
                series: { color: { background: '#4CAF50', border: '#388E3C' }, shape: 'box', font: {size: 18, color: 'white'} },
                character: { color: { background: '#2196F3', border: '#1976D2' } },
                archetype: { color: { background: '#FFC107', border: '#FFA000' }, shape: 'ellipse' },
                role: { color: { background: '#9C27B0', border: '#7B1FA2' }, shape: 'ellipse', font: {color: 'white'} }
            },
            edges: { font: { align: 'middle', size: 10, color: '#666' }, smooth: { type: 'continuous' } },
            physics: {
                forceAtlas2Based: { gravitationalConstant: -100, centralGravity: 0.01, springLength: 200, springConstant: 0.08 },
                maxVelocity: 50, solver: 'forceAtlas2Based', timestep: 0.35, stabilization: { iterations: 150 }
            }
        };
        new vis.Network(container_core, data_core, options_core);
    }

    // --- GRAFO FINALE ---

    // Esempio di aggiornamento nodi e archi nel tuo script.js
    var nodes_final = new vis.DataSet([
        { id: 'wd:Q1043344', label: 'Itachi Uchiha', group: 'character' },
        { id: 'wd:Q81', label: 'Naruto (Opera)', group: 'series' },
        { id: 'wd:Q1969230', label: 'Tragic Hero', group: 'generalArchetype' }, // QID Wikidata
        { id: 'ex:sacrificial-shinobi', label: 'Sacrificial Shinobi', group: 'japaneseArchetype' } // Risorsa locale
    ]);

    var edges_final = new vis.DataSet([
        // Relazione base (Wikidata)
        { from: 'wd:Q1043344', to: 'wd:Q81', label: 'appare in', color: {color: '#BDBDBD'} },
        
        // Relazione Archetipo Generale (Tratteggiata)
        { from: 'wd:Q1043344', to: 'wd:Q1969230', label: 'hasGeneralArchetype', dashes: true, color: {color: '#f43f5e'} },
        
        // Relazione Archetipo Giapponese (Nuova - es. Colore diverso o freccia specifica)
        { from: 'wd:Q1043344', to: 'ex:sacrificial-shinobi', label: 'hasJapaneseArchetype', color: {color: '#9C27B0'}, width: 2 }
      ]);    

    var container_final = document.getElementById('animanga-final-graph');
    if (container_final) {
        var data_final = { nodes: nodes_core, edges: edges_core };
        var options_final = {
            nodes: { shape: 'dot', size: 20, font: { size: 14, face: 'Helvetica', color: '#333' }, borderWidth: 2 },
            groups: {
                series: { color: { background: '#4CAF50', border: '#388E3C' }, shape: 'box', font: {size: 18, color: 'white'} },
                character: { color: { background: '#2196F3', border: '#1976D2' } },
                archetype: { color: { background: '#FFC107', border: '#FFA000' }, shape: 'ellipse' },
                role: { color: { background: '#9C27B0', border: '#7B1FA2' }, shape: 'ellipse', font: {color: 'white'} }
            },
            edges: { font: { align: 'middle', size: 10, color: '#666' }, smooth: { type: 'continuous' } },
            physics: {
                forceAtlas2Based: { gravitationalConstant: -100, centralGravity: 0.01, springLength: 200, springConstant: 0.08 },
                maxVelocity: 50, solver: 'forceAtlas2Based', timestep: 0.35, stabilization: { iterations: 150 }
            }
        };
        new vis.Network(container_final, data_final, options_final);
    }


    // --- GRAFO ONTOLOGICO (Schema) ---
    var container_onto = document.getElementById('animanga-onto-graph');

    if (container_onto) {
        var nodes_onto = new vis.DataSet([
            { id: 'am:Character', label: 'am:Character\n(Personaggio Immaginario)', group: 'coreClass', shape: 'box', margin: 15 },
            { id: 'am:Series', label: 'am:Series\n(Serie/Opera)', group: 'baseClass', shape: 'ellipse' },
            { id: 'am:NarrativeRole', label: 'am:NarrativeRole\n(Ruolo Narrativo)', group: 'baseClass', shape: 'ellipse' },
            { id: 'am:Archetype', label: 'am:Archetype\n(Archetipo / Trope)', group: 'enrichedClass', shape: 'ellipse' },
            { id: 'prov:Activity', label: 'prov:Activity\n(Elaborazione LLM)', group: 'provClass', shape: 'hexagon' }
        ]);

        var edges_onto = new vis.DataSet([
            { from: 'am:Character', to: 'am:Series', label: 'am:appearsIn\n(equiv: wdt:P1441)', arrows: 'to', font: {align: 'horizontal'}, color: {color: '#607D8B'} },
            { from: 'am:Character', to: 'am:NarrativeRole', label: 'am:hasNarrativeRole\n(equiv: wdt:P4595)', arrows: 'to', font: {align: 'horizontal'}, color: {color: '#607D8B'} },
            { from: 'am:Character', to: 'am:Archetype', label: 'am:hasArchetype\n(equiv: wdt:P9071)', arrows: 'to', font: {align: 'horizontal', color: '#E65100'}, dashes: true, color: {color: '#FF9800'}, width: 2 },
            { from: 'am:Archetype', to: 'prov:Activity', label: 'prov:wasGeneratedBy', arrows: 'to', font: {align: 'horizontal', color: '#4A148C'}, dashes: true, color: {color: '#9C27B0'} }
        ]);

        var options_onto = {
            nodes: { font: { size: 16, face: 'Courier New', multi: 'html', bold: true }, borderWidth: 2, shadow: true },
            groups: {
                coreClass: { color: { background: '#2196F3', border: '#1565C0' }, font: { color: 'white' } },
                baseClass: { color: { background: '#E0E0E0', border: '#9E9E9E' } },
                enrichedClass: { color: { background: '#FFE082', border: '#FF8F00' } },
                provClass: { color: { background: '#E1BEE7', border: '#8E24AA' } }
            },
            edges: { font: { size: 12, face: 'Courier New', background: 'white' }, length: 250, smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 } },
            layout: { hierarchical: { direction: 'LR', sortMethod: 'directed', levelSeparation: 300, nodeSpacing: 150 } },
            physics: false
        };
        var data_onto = { nodes: nodes_onto, edges: edges_onto };
        new vis.Network(container_onto, data_onto, options_onto);
    }

    // --- STRUTTURA LOGICA: MOSTRA TUTTO / MENO (Esclude le Box con JSON dinamico) ---
    const toggleButtons = document.querySelectorAll('[id^="toggleBtn-"]');
    toggleButtons.forEach(bottone => {
        const idNumber = bottone.id.split('-')[1];
        const tabella = document.getElementById(`results-table-${idNumber}`);
        if (!tabella) return; 

        const limite = parseInt(tabella.getAttribute('data-limit'), 10) || 5;
        const righe = tabella.querySelectorAll('tbody tr');
        let tutteVisibili = false;

        function aggiornaVista() {
            righe.forEach((riga, indice) => {
                riga.style.display = tutteVisibili ? '' : (indice >= limite ? 'none' : '');
            });
            bottone.textContent = tutteVisibili ? 'Mostra meno' : `Mostra tutte (${righe.length})`;
        }
        aggiornaVista();

        bottone.addEventListener('click', function() {
            tutteVisibili = !tutteVisibili;
            aggiornaVista();
        });
    });

    // --- GESTIONE DELLE LIGHTBOX DI IMMAGINI STATICHE ---
    const chartButtons = document.querySelectorAll('[id^="chartBtn-"]');
    chartButtons.forEach(chartBtn => {
        const idNumber = chartBtn.id.split('-')[1];
        const lightbox = document.getElementById(`lightbox-${idNumber}`);
        
        if (chartBtn && lightbox) {
            const closeBtn = lightbox.querySelector('.lightbox-close');

            chartBtn.addEventListener('click', function() {
                lightbox.style.display = 'flex'; 
            });

            if(closeBtn) {
                closeBtn.addEventListener('click', function() {
                    lightbox.style.display = 'none';
                });
            }

            lightbox.addEventListener('click', function(event) {
                if (event.target === lightbox) lightbox.style.display = 'none';
            });
        }
    });

    // --- Tasto Esc globale per chiudere overlay ---
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            document.querySelectorAll('.lightbox-overlay').forEach(lb => {
                lb.style.display = 'none';
            });
        }
    });

    // --- Event Listener Grafi Dinamici dei Lightbox (Async) ---
    const btnChart3 = document.getElementById('chartBtn-3');
    const lightbox3 = document.getElementById('lightbox-3');
    let isGraph3Loaded = false;
    if (btnChart3) {
        btnChart3.addEventListener('click', function() {
            if(lightbox3) lightbox3.style.display = 'flex';
            if (!isGraph3Loaded) {
                loadGraphFromJSON();
                isGraph3Loaded = true;
            }
        });
    }

    const btnChart7 = document.getElementById('chartBtn-7');
    const lightbox7 = document.getElementById('lightbox-7');
    let isGraph7Loaded = false;
    if (btnChart7) {
        btnChart7.addEventListener('click', function() {
            if(lightbox7) lightbox7.style.display = 'flex';
            if (!isGraph7Loaded) {
                loadGraph7FromJSON();
                isGraph7Loaded = true;
            }
        });
    }

    // --- CARICAMENTO TESTO EMBED DELLE QUERY SPARQL ---
    document.querySelectorAll('pre[data-src]').forEach(block => {
        const fileUrl = block.getAttribute('data-src');
        const codeElement = block.querySelector('code');
        
        fetch(fileUrl)
            .then(response => {
                if (!response.ok) throw new Error('File non trovato: ' + response.status);
                return response.text();
            })
            .then(text => { codeElement.textContent = text; })
            .catch(error => {
                console.error("Impossibile caricare la query da " + fileUrl + ":", error);
                codeElement.textContent = "Errore: impossibile caricare il file " + fileUrl;
                codeElement.style.color = "#f43f5e";
            });
    });


    // ==========================================
    // 3. ESECUZIONE CARICAMENTI DATI ASINCRONI
    // ==========================================

    // Avvio Query 2
    if (document.getElementById("tbody-query2")) {
        caricaDatiQuery2("./queries_results/query_2.json");
    }

    // Avvio Query 3
    if (document.getElementById("tbody-query3")) {
        caricaDatiQuery3("./queries_results/query_3.json");
    }

      // Avvio Query 7
    if (document.getElementById("tbody-query7")) {
        caricaDatiQuery7("./queries_results/query_7.json");
    }

    // Avvio Query 8
    if (document.getElementById("tbody-query8")) {
        caricaDatiQuery8("./queries_results/query_8.json");
    }

    // Avvio Query 8
    if (document.getElementById("tbody-query9bis")) {
        caricaDatiQuery8("./queries_results/query_9bis.json");
    }

});