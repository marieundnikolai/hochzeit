// const name = localStorage.getItem('name');
const storedGroup = localStorage.getItem('group');

// If the user hasn't gone through landing.html, redirect them
if (!storedGroup || storedGroup === 'none') {
    window.location.href = 'index.html';
}

const params = new URLSearchParams(window.location.search);
const guestGroup = params.get('gst');

// Use URL param if present, otherwise fallback to localStorage
const activeGroup = guestGroup || storedGroup;

const validGroups = [
    'TVRi', 'TVRp', 'TVRc', 'TVRa',
    'SOPi', 'SOPp', 'SOPa',
    'CDOi', 'CDOp', 'CDOa',
    'SBK', 'SBKa', 'SBKie', 'SBKim', 'SBKic', 'SBKe'
];

if (validGroups.includes(activeGroup)) {
    document.querySelectorAll('[data-groups]').forEach(el => {
        const groups = (el.dataset.groups || '').split(/\s+/); // "SOPi SOPp SOPa"
        if (groups.includes(activeGroup)) {
            el.classList.remove('hidden');
        }
    });
} else {
    window.location.href = 'index.html';
}
