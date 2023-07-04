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
 * Creates get request to given url.
 * @param {string} url
 * @returns Response text from the request.
 */
function get(url) {
	const req = new XMLHttpRequest();
	req.open('GET', url, false);
	req.send(null);
	return req.responseText;
}

/**
 * Creates get request to given url and parse it.
 * @param {string} url
 * @returns Parsed response text, if valid json otherwise the plain text.
 */
function getParsed(url) {
	const resText = get(url);
	try {
		return JSON.parse(resText);
	} catch (error) {
		return resText;
	}
}
/**
 * TODO
 *
 */
function loadNextEvents() {
	/** @type {NodeListOf<HTMLAnchorElement>} */
	const rooms = document.querySelectorAll(`a[${ATTRIBUTE_ROOM_ID}]`);
	const today = new Date();

	for (const room of rooms) {
		/** @type {string} */
		const roomId = room.getAttribute(ATTRIBUTE_ROOM_ID);
		/** @type {FhDoEvent[]} */
		const events = getParsed(
			API_URL.replace(URL_PLACEHOLDER, roomId) + ACCEPT_JSON,
		);

		if (events == undefined || events.length == 0) {
			room.appendChild(createInfo(ROOM_FREE));
			continue;
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
	}
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

	const icon = document.querySelector('.keyIcon.hidden').cloneNode(true);
	if (room.eKey) {
		icon.classList.remove('hidden');
		if (room.eKey.student) {
			icon.classList.add('student');
		} else {
			icon.classList.add('locked');
		}
	}
	headerWrapper.appendChild(icon);

	const title = document.createElement('p');
	title.textContent = room.title;
	roomEl.appendChild(title);

	const spacer = document.createElement('span');
	spacer.style = 'display: block; padding-bottom: 1rem;';
	roomEl.appendChild(spacer);

	return roomEl;
}

function main() {
	const wrapper = document.querySelector('.card-wrapper');
	if (!wrapper) return;

	/** @type {RoomInfo[]} */
	const rooms = getParsed('/data/roomInfo.json');

	// Populate site with room cards
	for (const room of rooms) wrapper.appendChild(createRoomElement(room));

	loadNextEvents();
}

main();
