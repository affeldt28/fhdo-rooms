/** @typedef { import('./types').FhDoEvent} FhDoEvent */
/** @typedef { import('./types').RoomInfo} RoomInfo */
import {
	API_URL,
	ACCEPT_JSON,
	ACCEPT_HTML,
	ROOM_FREE,
	URL_PLACEHOLDER,
	ATTRIBUTE_ROOM_ID,
} from './const.js';

/**
 * Fetch JSON and reject HTTP errors or unexpected response formats.
 * @param {string | URL} url
 * @returns {Promise<Array>}
 */
async function getParsed(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const data = await response.json();
	if (!Array.isArray(data)) throw new Error('Ungültige Serverantwort');
	return data;
}
/**
 * TODO
 *
 */
async function loadNextEvents() {
	/** @type {NodeListOf<HTMLAnchorElement>} */
	const rooms = document.querySelectorAll(`a[${ATTRIBUTE_ROOM_ID}]`);
	const today = new Date();

	await Promise.all(Array.from(rooms, async (room) => {
		const status = createInfo('Raumbelegung wird geladen …');
		status.classList.add('loading-status');
		status.setAttribute('role', 'status');
		room.setAttribute('aria-busy', 'true');
		room.appendChild(status);
		try {
			/** @type {string} */
			const roomId = room.getAttribute(ATTRIBUTE_ROOM_ID);
			/** @type {FhDoEvent[]} */
			const events = await getParsed(
				API_URL.replace(URL_PLACEHOLDER, roomId) + ACCEPT_JSON,
			);

			if (events == undefined || events.length == 0) {
				room.appendChild(createInfo(ROOM_FREE));
				return;
			}

			/** @type {FhDoEvent} */
			const next = events[0];

			const beginn = new Date(next.timestampBegin * 1000);
			const end = new Date(next.timestampEnd * 1000);

			if (
				beginn.getFullYear() == today.getFullYear() &&
				beginn.getMonth() == today.getMonth() &&
				beginn.getDate() == today.getDate()
			) {
				// check current date
				if (beginn.getHours() <= today.getHours()) {
					// hat schon angefangen
					if (end.getHours() >= today.getHours()) {
						// angefangen aber nicht zu ende
						room.appendChild(
							createInfo(timeFromTo('Jetzt', next.timeEnd)),
						);
						room.appendChild(createInfo(next.name));
					}
				} else {
					// noch nicht angefangen
					room.appendChild(
						createInfo(timeFromTo(next.timeBegin, next.timeEnd)),
					);
					room.appendChild(createInfo(next.name));
				}
			} else {
				room.appendChild(createInfo(ROOM_FREE));
			}
		} catch (error) {
			const message = createInfo(`Raumbelegung konnte nicht geladen werden: ${error.message}`);
			message.classList.add('error-status');
			message.setAttribute('role', 'alert');
			room.appendChild(message);
		} finally {
			status.remove();
			room.setAttribute('aria-busy', 'false');
		}
	}));
}

/**
 * Add a colon to a time string formatted like `hhmm`
 * @param {string} time
 * @returns Time string as `hh:mm`
 */
function addColon(time) {
	return time.substring(0, 2) + ':' + time.substring(2, 4);
}

/**
 * Format time input
 * @param {string} from `hhmm` or `hh:mm`
 * @param {string} to `hhmm` or `hh:mm`
 * @return Time string as `hh:mm - hh:mm`
 */
function timeFromTo(from, to) {
	let time = '';

	if (from.match(/[0-9]{2}:[0-9]{2}/)) time += from;
	else if (from.match(/[0-9]{4}/)) time += addColon(from);
	else time += from;

	time += ' - ';

	if (to.match(/[0-9]{2}:[0-9]{2}/)) time += to;
	else if (to.match(/[0-9]{4}/)) time += addColon(to);
	else time += to;

	return time;
}

/**
 * Create info htmlElement. For use inside a card
 * @param {string} str
 * @returns Info htmlElement
 */
function createInfo(str) {
	const info = document.createElement('p');
	info.textContent = str;
	return info;
}

/**
 * Creates a Room element and returns it.
 * @param {RoomInfo} room
 * @returns  Room htmlElement
 */
function createRoomElement(room) {
	const roomEl = document.createElement('a');
	roomEl.href = API_URL.replace(URL_PLACEHOLDER, room.roomId) + ACCEPT_HTML;
	roomEl.classList.add('card');
	roomEl.setAttribute(ATTRIBUTE_ROOM_ID, room.roomId);

	const headerWrapper = document.createElement('div');
	headerWrapper.classList.add('card-header');
	roomEl.appendChild(headerWrapper);

	const header = document.createElement('h3');
	header.textContent = room.roomId;
	headerWrapper.appendChild(header);

	if (room.eKey) {
		if (room.eKey.student) {
			const key = document
				.querySelector('.keyIcon.legend')
				.cloneNode(true);
			key.classList.remove('legend');
			key.classList.add('student');
			headerWrapper.appendChild(key);
		} else {
			const lock = document
				.querySelector('.lockIcon.legend')
				.cloneNode(true);
			lock.classList.remove('legend');
			lock.classList.add('locked');
			headerWrapper.appendChild(lock);
		}
	} else {
		const shrugging = document
			.querySelector('.shruggingIcon.legend')
			.cloneNode(true);
		shrugging.classList.remove('legend');
		shrugging.classList.add('shrugging');
		headerWrapper.appendChild(shrugging);
	}

	const title = document.createElement('p');
	title.textContent = room.title;
	roomEl.appendChild(title);

	return roomEl;
}

async function main() {
	const wrapper = document.querySelector('.card-wrapper');
	if (!wrapper) return;

	const status = document.querySelector('#rooms-status');
	wrapper.setAttribute('aria-busy', 'true');
	try {
		/** @type {RoomInfo[]} */
		const rooms = await getParsed('/data/roomInfo.json');

		// Populate site with room cards
		for (const room of rooms) wrapper.appendChild(createRoomElement(room));

		status.hidden = true;
		wrapper.setAttribute('aria-busy', 'false');
		await loadNextEvents();
	} catch (error) {
		status.textContent = `Räume konnten nicht geladen werden: ${error.message}`;
		status.classList.remove('loading-status');
		status.classList.add('error-status');
		status.setAttribute('role', 'alert');
	} finally {
		wrapper.setAttribute('aria-busy', 'false');
	}
}

main();
