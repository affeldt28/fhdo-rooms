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

export interface RoomInfo {
	roomId: string;
	title: string;
	eKey: { student: boolean };
}
