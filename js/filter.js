/** @typedef { import('./types').FilterType} FilterType */
import { CLASS_HIDDEN, ATTRIBUTE_ROOM_ID } from './const.js';

/**
 *
 * @param {FilterType} filterType
 */
function filter(filterType) {
	const allRooms = document.querySelectorAll(`a[${ATTRIBUTE_ROOM_ID}]`);
	switch (filterType) {
		default:
		case 'all':
			allRooms.forEach((room) => {
				room.classList.remove(CLASS_HIDDEN);
			});
			break;
		case 'a':
		case 'b':
		case 'c':
			allRooms.forEach((room) => {
				if (
					room
						.getAttribute(ATTRIBUTE_ROOM_ID)
						.split('.')[0]
						.toLowerCase() == filterType
				)
					room.classList.remove(CLASS_HIDDEN);
				else room.classList.add(CLASS_HIDDEN);
			});
			break;
		case 'eg':
			allRooms.forEach((room) => {
				if (
					room
						.getAttribute(ATTRIBUTE_ROOM_ID)
						.split('.')[1]
						.toLowerCase() == 'e'
				)
					room.classList.remove(CLASS_HIDDEN);
				else room.classList.add(CLASS_HIDDEN);
			});
			break;
		case '1og':
			allRooms.forEach((room) => {
				if (
					room
						.getAttribute(ATTRIBUTE_ROOM_ID)
						.split('.')[1]
						.toLowerCase() == '1'
				)
					room.classList.remove(CLASS_HIDDEN);
				else room.classList.add(CLASS_HIDDEN);
			});
			break;
		case '2og':
			allRooms.forEach((room) => {
				if (
					room
						.getAttribute(ATTRIBUTE_ROOM_ID)
						.split('.')[1]
						.toLowerCase() == '2'
				)
					room.classList.remove(CLASS_HIDDEN);
				else room.classList.add(CLASS_HIDDEN);
			});
			break;
		case '3og':
			allRooms.forEach((room) => {
				if (
					room
						.getAttribute(ATTRIBUTE_ROOM_ID)
						.split('.')[1]
						.toLowerCase() == '3'
				)
					room.classList.remove(CLASS_HIDDEN);
				else room.classList.add(CLASS_HIDDEN);
			});
			break;
	}
}

/**
 *
 * @param {FilterType} filterType
 */
function createFilterBtn(filterType) {
	const filterBtn = document.createElement('button');
	filterBtn.classList.add('btn', 'filter');
	if (filterType == 'all') filterBtn.classList.add('active');
	filterBtn.setAttribute('data-filter', filterType);
	filterBtn.textContent = translateFilterType(filterType);
	filterBtn.addEventListener('click', (event) => {
		event.preventDefault();
		document.querySelectorAll('.filter').forEach((btn) => {
			btn.classList.remove('active');
		});
		filterBtn.classList.add('active');
		const filterType = filterBtn.getAttribute('data-filter');
		filter(filterType);
	});
	return filterBtn;
}

/**
 *
 * @param {FilterType} filterType
 */
function translateFilterType(filterType) {
	switch (filterType) {
		case 'all':
			return 'All';
		case 'a':
			return 'A';
		case 'b':
			return 'B';
		case 'c':
			return 'C';
		case 'eg':
			return 'EG';
		case '1og':
			return '1. OG';
		case '2og':
			return '2. OG';
		case '3og':
			return '3. OG';
	}
}

function main() {
	const FilterTypeArr = ['all', 'a', 'b', 'c', 'eg', '1og', '2og', '3og'];
	const filterGrp = document.querySelector('#filter-group');
	FilterTypeArr.forEach((filterType) => {
		filterGrp.appendChild(createFilterBtn(filterType));
	});
}

main();
