// If the user went through landing.html, redirect them
const group = localStorage.getItem('group');
if (group) {
    window.location.href = `main.html?gst=${group}`; //
}

// New data structure with tuples
const groups = {
    // ToVaRi Groups
    TVRi: [
        ['test', 'tovari'],
        ['elisabeth', 'arras'], ['stefan', 'arras'],
        ['martina', 'roth'], ['oliver', 'roth'], ['tina', 'roth'], ['oli', 'roth'],
        ['jens', 'paar'], ['selina', 'paar'], ['seli', 'paar'],
        ['andreas', 'biegaj'], ['andy', 'biegaj'],
        ['sandra', 'deutz'], ['thomas', 'kazala'], ['thomek', 'kazala'],
        ['leona', 'bahn'], ['sebastian', 'schaumann'], ['schaumann', 'schaumann'],
        ['patty', 'dittkens'], ['patrizia', 'dittkens'],
        ['frauke', 'frauke'],
        ['pia', 'arras'], ['pieter', 'kindermans'], ['pieter-jan', 'kindermans'],
        ['ansi', 'bernard'], ['tobias', 'sedlmeier'], ['anne-sophie', 'bernard'], ['tobi', 'sedlmeier'],
        [],
        ['nikolai'],['arras'], ['marie'],['gnott'], ['niko'],['arras'], ['mimi'],['gnott'],
        ['ilka', 'arras'], ['andre', 'sinnema'],
        ['carsten', 'jerke'], ['julia', 'jerke'],
        ['nils', 'richrath'], ['marie', 'gottowik'], ['Luisa', 'nogga'], ['leon', 'manitz'],  ['lulu', 'nogga'],
        ['laura'],['szemkus'], ['tobias'],['szemkus'], ['tobi'],['szemkus'],
        ['niklas', 'nieswand'], ['nikki', 'nieswand'], ['niki', 'nieswand'],
    ],
    TVRp: [['tvr', 'p']],
    TVRc: [['tvr', 'c']],
    TVRa: [['marie', 'gnott'], ['niko', 'arras']],

    // Sopra Groups
    SOPp: [ ['test', 'sopra'],
        ['suraj', 'shetty'],
        ['ben', 'keil'],
        ['alexander', 'otto'], ['alex', 'otto'],
        ['serkan', 'aygültekiin'],
        ['hendrik', 'reents'],
        ['michael', 'keck'],
        ['fabienne', 'walter'], ['moritz', 'zimmermann'], ['fabi', 'walter']
    ],
    SOPa: [['sop', 'a']],

    // Cardeto Groups
    CDOp: [
        ['test', 'cardeto'],
        ['therese', 'gnott'],
        ['monika', 'manderla'], ['moni', 'manderla'],
        ['dora', 'kazala'], ['jendrek', 'kazala'],
        ['alicia', 'fertsch'], ['lukas', 'fertsch'], ['lucas', 'fertsch'],
        ['irene', 'goretzki'], ['günther', 'goretzki'],
        ['marek', 'manderla'],
    ],
    CDOa: [['cdo', 'a']],

    // Self Booker Groups
    SBK: [
        ['test', 'selbstbucher'],
        ['selbstbucher', 'n'], ['björn', 'dornbusch'], ['stefan', 'gramlich'], ['ilka', 'möller']],
    SBKie: [['sbk', 'ie']],
    SBKim: [['sbk', 'im']],
    SBKic: [['sbk', 'ic']],
    SBKe: [['sbk', 'e']],
};

function submitName() {
    const vornameInput = document.getElementById('vorname');
    const nachnameInput = document.getElementById('nachname');
    const lastNameContainer = document.getElementById('last-name-container');
    const errorMessage = document.getElementById('error-message');

    const vorname = vornameInput.value.trim().toLowerCase();
    const nachname = nachnameInput.value.trim().toLowerCase();

    // Check if the first name is empty
    if (vorname === '') {
        errorMessage.textContent = 'Bitte gib deinen Vornamen ein.';
        errorMessage.style.display = 'block';
        return;
    }

    let firstNames = [];
    for (const group of Object.values(groups)) {
        for (const nameTuple of group) {
            firstNames.push(nameTuple[0]);
        }
    }

    const matchingNames = Object.values(groups).flat().filter(tuple => tuple[0] === vorname);

    // Case 1: Multiple first names match
    if (matchingNames.length > 1) {
        if (lastNameContainer.style.display === 'none') {
            lastNameContainer.style.display = 'block';
            errorMessage.textContent = ' ';
            errorMessage.style.display = 'block';
            return;
        }

        // Case 2: Matching with last name
        const fullMatch = matchingNames.find(tuple => tuple[1] === nachname);
        if (fullMatch) {
            const groupKey = Object.keys(groups).find(key => groups[key].includes(fullMatch));
            if (groupKey) {
                localStorage.setItem('name', `${vorname} ${nachname}`);
                localStorage.setItem('group', groupKey);
                window.location.href = `main.html?gst=${groupKey}`;
            }
        } else {
            errorMessage.textContent = 'Fehler. Bitte kontaktiere Mimi oder Niko.';
            errorMessage.style.display = 'block';
        }
    }
    // Case 3: Single first name match
    else if (matchingNames.length === 1) {
        const groupKey = Object.keys(groups).find(key => groups[key].includes(matchingNames[0]));
        if (groupKey) {
            localStorage.setItem('name', `${vorname} ${matchingNames[0][1]}`);
            localStorage.setItem('group', groupKey);
            window.location.href = `main.html?gst=${groupKey}`;
        }
    }
    // Case 4: No match at all
    else {
        errorMessage.textContent = 'Fehler. Bitte kontaktiere Mimi oder Niko.';
        errorMessage.style.display = 'block';
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        submitName();
    }
}
