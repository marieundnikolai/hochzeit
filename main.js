//const name = localStorage.getItem('name');
const group = localStorage.getItem('group');

// If the user hasn't gone through landing.html, redirect them
if (!group || group === 'none') {
    window.location.href = 'index.html'; // or 'landing.html' if that's the name
}

const params = new URLSearchParams(window.location.search);
const guestGroup = params.get('gst');

const validGroups = [
    'TVRi', 'TVRp', 'TVRc', 'TVRa',
    'SOPp', 'SOPa',
    'CDOp', 'CDOa',
    'SBK', 'SBKie', 'SBKim', 'SBKic', 'SBKe'
]; // Add more groups here as needed

if (validGroups.includes(guestGroup)) {
    const el = document.getElementById(guestGroup);
    if (el) {
        el.classList.remove('hidden');
    }
}
