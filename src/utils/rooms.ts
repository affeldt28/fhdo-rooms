export const ATTRIBUTE_ROOM_ID = 'data-roomId';
export const URL_PLACEHOLDER = '*';
export const API_URL = `https://ws.inf.fh-dortmund.de/timetable/current/rest/Room/${URL_PLACEHOLDER}/AllEvents`;
export const ACCEPT_HTML = '?Accept=text/html';
export const ACCEPT_JSON = '?Accept=application/json';
export const ROOM_FREE = 'Raum ist laut Plan, heute frei.';

export interface RoomInfo  {
	roomId: string;
	title: string;
	eKey?: { student: boolean };
}

export interface FhDoEvent {
	id: number;
	name: string;
	eventType: string;
	courseId: string;
	courseOfStudy: string;
	examinationReg: string;
	termId: undefined;
	grade: string;
	description: string;
	note: string;
	courseType: string;
	lecturerId: string;
	lecturerName: string;
	lecturerSurname: string;
	studentSet: string;
	roomId: string;
	dateBegin: number;
	dateEnd: number;
	timeBegin: string;
	timeEnd: string;
	timestampBegin: number;
	timestampEnd: number;
	timeSlotBegin: number;
	timeSlotDuration: number;
	timeSlotColum: number;
	weekday: string;
	interval: number;
	flags: number;
	creator: string;
	created: number;
	modified: number;
}

/**
 * Add a colon to a time string formatted like `hhmm`
 */
export function addColon(time: string): string {
	return time.substring(0, 2) + ':' + time.substring(2, 4);
}

/**
 * Format time input to `hh:mm - hh:mm`
 */
export function timeFromTo(from:string, to:string):string {
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
