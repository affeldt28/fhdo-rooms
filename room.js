const rooms = [
	'A.E.01',
	'A.E.02',
	'A.E.03',
	'A.1.02',
	'A.1.03',
	'A.2.02',
	'A.2.03',
	'A.3.03',

	'B.1.20',
	'B.1.23',
	'B.2.20',
	'B.2.21',
	'B.E.23',

	'C.E.31',
	'C.E.32',
	'C.E.40',
	'C.E.41',
	'C.1.30',
	'C.1.31',
	'C.2.30',
	'C.2.32',
	'C.3.32',
	'C.3.34',
];
const roomApiUrl = 'https://ws.inf.fh-dortmund.de/timetable/current/rest/Room/';
const roomApiParam = '/AllEvents?Accept=text/html';

function main() {
	const wrapper = document.querySelector('.card-wrapper');
	if (!wrapper) return;

	rooms.forEach((room) => {
		const aTag = document.createElement('a');
		aTag.href = roomApiUrl + room + roomApiParam;
		aTag.classList.add('card', 'card-hover');

		const header = document.createElement('h3');
		header.textContent = room;
		aTag.appendChild(header);
		wrapper.appendChild(aTag);
	});
}

main();
