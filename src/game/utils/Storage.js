import Phaser from 'phaser';

let scene;
const fileProps = [
	'score',
];
let saveFile = {};

const init = (scene) => {
	scene = scene;
	load();
}

const save = () => {
    const file = Object.fromEntries(fileProps.map(prop => ([prop, scene[prop]])));

    localStorage.setItem('saveFile', JSON.stringify(file));
}

const saveProp = (key, value) => {
    if(!saveFile.hasOwnProperty(key)) return;

    saveFile[key] = value;
	localStorage.setItem('saveFile', JSON.stringify(saveFile));

	return value;
};

const load = () => {
	saveFile = !localStorage.getItem('saveFile')
	? Object.fromEntries(fileProps.map(prop => ([prop, null])))
    : JSON.parse(localStorage.getItem('saveFile'));
};

const loadProp = prop => {
	return saveFile[prop];
}

const reset = () => {
	localStorage.removeItem('saveFile');
}

export default {init, save, saveProp, load, loadProp, reset};