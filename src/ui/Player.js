import Phaser from 'phaser';

import { config } from '../config';

export default class Player {
	constructor(scene, key) {
		this.scene = scene;
		this.key = key;
		this.player;
	}

	createPlayer() {
		const player = this.scene.physics.add.sprite(100, config.height-150, this.key);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.scene.anims.create({
			key: 'left',
			frames: this.scene.anims.generateFrameNumbers(this.key, {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'turn',
			frames: [{key: this.key, frame: 4}],
			frameRate: 20,
		});

		this.scene.anims.create({
			key: 'right',
			frames: this.scene.anims.generateFrameNumbers(this.key, {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1,
		});

		this.player = player;
		return player;
	}

	setCursors(cursors) {
		if(cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.anims.play('left', true);
		} else if(cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}

		if(cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330);
		}
	}

	gameOver() {
		this.player.setTint(0xff0000);
		this.player.anims.play('turn');
	}
}