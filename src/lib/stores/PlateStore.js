import { writable } from "svelte/store";

export const createEmptyPlate = (id) => {
	let maxWell = Array(12).fill(-1);
	let colNames = Array(12).fill("Neg");
	for (var i = 1; i < 11; i++) {
		colNames[i] = i;
	}
	return {id: id, name: 'Plate ' + id, maxWell: maxWell, colNames: colNames, added: false}
}

export const PlateStore = writable([createEmptyPlate(1)]);
export const newestPlate = writable(1);
export const editingPlate = writable(-1);

// Default values
export const volume = writable(10);
export const dilution = writable(10);

// Demo dataset

export const demoData = [
	createEmptyPlate(3),
	createEmptyPlate(2),
	createEmptyPlate(1)
]

demoData[1].maxWell = [-1,4,4,3,4,3,5,6,5,5,6,-1]
demoData[1].colNames = ['Neg'].concat(
	Array(5).fill('1-A'), 
	Array(5).fill('2-B'),
	['Neg'])
demoData[1].added = true;

demoData[2].maxWell = [-1,2,2,2,3,2,4,4,4,5,4,-1]
demoData[2].colNames = ['Neg'].concat(
	Array(5).fill('1-C'), 
	Array(5).fill('2-D'),
	['Neg'])
demoData[2].added = true;