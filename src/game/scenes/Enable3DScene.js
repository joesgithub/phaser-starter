import Phaser from 'phaser';
import { Scene3D } from '@enable3d/phaser-extension';

export default class Enable3DScene extends Scene3D {
	constructor() {
		super('enable3d-scene');
	}

	init = () => {
		this.accessThirdDimension();
		// wouldn't usually have to do following two lines
		// if game was full screen because
		// default aspect is window width / height
		this.third.camera.aspect = 4/3; // 800 / 600
		this.third.camera.updateProjectionMatrix();
	}

	preload = () => {
	}

	create = () => {
		this.third.warpSpeed();
		// this.third.physics.add.box();
		this.third.physics.add.sphere({ radius: 30 });
	}
}