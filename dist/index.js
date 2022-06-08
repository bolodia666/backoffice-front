const host = window.location.protocol + "//" + window.location.host;
const rtpElement = document.getElementById('rtp');
const method = 'POST'
const headers = {
	'Content-Type': 'application/json'
}

document.getElementById('saveBtn').onclick = setRTP;
init();

async function init() {
	const response = await send('/game/settings/get')
	showPanel(response.data.rtp)
}
function showPanel(rtp) {
	rtpElement.value = rtp;
	document.getElementById('form').style.visibility = 'visible';
}
async function setRTP() {
	const rtp = rtpElement.value
	if (rtp && rtp != '') {
		send('/game/settings/set', { rtp })
	}
	else {
		onError('Wrong rtp')
	}
}

async function send(action, params) {
	const body = JSON.stringify(params)
	const request = { method, headers, body }
	const response = {}
	try {
		const fetched = await fetch(host + action, request);
		fetched.ok ? response.data = await parseResp(fetched) : onError('Connection error');
	} catch (error) {
		onError('Connection error')
	}
	return response
}
async function parseResp(fetched) {
	const isJSON = !fetched.headers.get("content-type").indexOf("application/json")
	const resp = isJSON ? await fetched.json() : await fetched.text()
	return resp
}
function onError(msg) {
	alert(msg);
}