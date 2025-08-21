const params = new URLSearchParams(window.location.search);
const guestGroup = params.get('gst');

if (guestGroup === 'onsite') {
    document.getElementById('onsite').classList.remove('hidden');
} else if (guestGroup === 'offsite') {
    document.getElementById('offsite').classList.remove('hidden');
}