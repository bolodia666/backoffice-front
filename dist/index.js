const serverUrl = '';
const rtpElement = document.getElementById('rtp');
document.getElementById('saveBtn').onclick = setRTP;
init();

async function init() {
	try {
		const fetched = await fetch(serverUrl);
		fetched.ok ? showPanel(await fetched.json()) : onError('Connection error');
	} catch (error) {
		onError('Connection error');
	}
}
function showPanel(rtp) {
	rtpElement.value = rtp;
	document.getElementById('form').style.visibility = 'visible';
}
async function setRTP() {
	const data = {};
	data.rtp = rtpElement.value;
	const request = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	try {
		const fetched = await fetch(serverUrl, request);
		if (fetched.status != 200) onError('Wrong RTP');
	} catch (error) {
		onError('Connection error');
	}
}
function onError(msg) {
	alert(msg);
}