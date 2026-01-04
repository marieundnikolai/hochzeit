// If the user went through landing.html, redirect them
  const group = localStorage.getItem('group');
  if (group) {
    window.location.href = `main.html?gst=${group}`; //
  }

  // New data structure with tuples
  const groups = {
    // ToVaRi Groups
    TVRi: [
      ['tvr', 'i'],
    ],
    TVRc: [
        ['laura'],['szemkus'], ['tobias'],['szemkus'], ['tobi'],['szemkus'],
        ['niklas', 'nieswand'], ['nikki', 'nieswand'], ['niki', 'nieswand'],
    ],
    TVRa: [
        ['tvr', 'a'],
        ['elisabeth', 'arras'], ['stefan', 'arras'],
        ['martina', 'roth'], ['oliver', 'roth'], ['tina', 'roth'], ['oli', 'roth'],
        ['jens', 'paar'], ['selina', 'paar'], ['seli', 'paar'],
        ['frauke', 'frauke'],
        ['pia', 'arras'], ['pieter', 'kindermans'], ['pieter-jan', 'kindermans'],
        [],
        ['nikolai', 'arras'], ['marie', 'gnott'], ['niko', 'arras'], ['mimi', 'gnott'],
        ['ilka', 'arras'], ['andre', 'sinnema'],
        ['carsten', 'jerke'], ['julia', 'jerke'],
        ['andreas', 'biegaj'], ['andy', 'biegaj'],
        ['sandra', 'deutz'], ['thomas', 'kazala'], ['thomek', 'kazala'],
        ['leona', 'bahn'], ['sebastian', 'schaumann'], ['schaumann', 'schaumann'],
        ['patty', 'dittkens'], ['patrizia', 'dittkens'],
        ['ansi', 'bernard'], ['tobias', 'sedlmeier'], ['anne-sophie', 'bernard'], ['tobi', 'sedlmeier'],
        ['nils', 'richrath'], ['marie', 'gottowik'], ['Luisa', 'nogga'], ['leon', 'manitz'],  ['lulu', 'nogga'],
    ],

    // Sopra Groups
    SOPi: [ 
      ['sop', 'i'],
      ['suraj', 'shetty'],
      ['ben', 'keil'],
      ['alexander', 'otto'], ['alex', 'otto'],
      ['serkan', 'aygültekiin'],
      ['hendrik', 'reents'],
      ['michael', 'keck'],
      ['fabienne', 'walter'], ['moritz', 'zimmermann'], ['fabi', 'walter']
    ],
    SOPa: [
      ['sop', 'a']
    ],

    // Cardeto Groups
    CDOi: [
      ['cdo', 'i'],
      ['alicia', 'fertsch'], ['lukas', 'fertsch'], ['lucas', 'fertsch'],
      ['irene', 'goretzki'], ['günther', 'goretzki'],
      ['marek', 'manderla'],
    ],
    CDOa: [
      ['cdo', 'a'],
      ['therese', 'gnott'],
      ['monika', 'manderla'], ['moni', 'manderla'],
      ['dora', 'kazala'], ['jendrek', 'kazala'],
    ],

    // Self Booker Groups
    SBK: [
        ['sbk', 'i'],
        ['ewelina','sarnecka'], ['anton','pfeiffer'],
        ['björn','dornbusch'], ['marc','meyer'],
        ['jupp','lukoschek'], ['bozena','lukoschek'],
        ['peter','biegaj'], ['josepha','biegaj'],
        ['steffi','biegaj-rummler'], ['jochen','rummler'], ['stefanie','biegaj-rummler'],
        ['lars','lukoschek'], ['nina','dettmer'], ['lucas','lukoschek'], ['lars lucas','lukoschek'],
        ['klara','gellrich'], ['laurens','gellrich'], ['vanessa','ernst'], ['micah','hensing'], ['lukas','lelittko'], ['lynn',''],
        ['hannah', 'hapekotte'],
        ['fredi','leufgen'], ['judith','leufgen'], ['frederik','leufgen'],
        ['denis', 'polczyk'],
        ['andre','polczyk'], ['dani',''], ['daniela',''],
        ['giuliano', 'börner'], ['giuli', 'börner'],
        ['kevin','thiel'], ['anna','becker'], ['toni','becker'],
        ['anna', 'kuchen'],
        ['jessica','wille'], ['daniel','wille'],
        ['daniel','gramlich'], ['ulrike','von dellemann'], ['ulli','von dellemann'], ['uli','von dellemann'],
        ['ilka','möller'], ['flavia','möller'], ['joe','möller'],
        ['jana','könekamp'], ['dennis','hierl'],
        ['nathanja',''], ['stefan','gramlich'], ['stefan','gramlich'],
        ['robin', 'lugt'], ['melanie',''],
        ['jenny', 'schumacher'],
        ['frauke', ''],
    ],
    SBKa: [
      ['sbk', 'a']
    ],
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
    const greeting = document.getElementById('greeting');

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

    const matchingNames = Object.values(groups).flat().filter(t => (t && (t[0] || '')).toLowerCase() === vorname);

    // Case 1: Multiple first names match
    if (matchingNames.length > 1) {
      if (lastNameContainer.style.display === 'none') {
        greeting.textContent = `Ciao ${vorname.charAt(0).toUpperCase() + vorname.slice(1)}, bitte gib auch deinen Nachnamen ein:`;
        lastNameContainer.style.display = 'block';
        errorMessage.textContent = ' ';
        errorMessage.style.display = 'block';
        return;
      }

      // Case 2: Matching with last name
      const fullMatch = matchingNames.find(t => (t[1] || '').toLowerCase() === nachname);
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
