import Phaser from 'phaser';

import { config } from '../config';

export default class StarSpawner {
	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor(scene, starKey = 'star') {
		this.scene = scene;
		this.key = starKey;

		this._group = this.scene.physics.add.group();
		this.spawnAll();
	}

	get group() {
		return this._group;
	}

	spawnAll() {
		this.group.createFromConfig({
			key: this.key,
			repeat: 11,
			setXY: {
				x: 12,
				y: 0,
				stepX: (config.width - 24) / 11,
			}
		});


		this.group.children.iterate(star => {
			star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		});

		return this.group;
	}

	respawnAll() {
		if(this.group.countActive(true) === 0) {
			// re-enable stars (a new batch to collect)
			this.group.children.iterate(this.enable);
		}
	}

	enable(star) {
		star.enableBody(true, star.x, 0, true, true);
	}

	disable(star) {
		star.disableBody(true, true);
	}
}