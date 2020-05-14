import Phaser from 'phaser';
import Chunk from '../ui/Chunk';

export default class InfinteScene extends Phaser.Scene {
	constructor() {
		super('infinite');
	}

	preload() {
		this.load.spritesheet('sprWater', 'assets/sprWater.png', {
			frameWidth: 16,
			frameHeight: 16,
		});
		this.load.image('sprSand', 'assets/sprSand.png');
		this.load.image('sprGrass', 'assets/sprGrass.png');
	}

	create() {
		this.anims.create({
			key: 'sprWater',
			frames: this.anims.generateFrameNumbers('sprWater'),
			frameRate: 5,
			repeat: -1,
		});

		this.chunkSize = 16;
		this.tileSize = 16;
		this.cameraSpeed = 10;

		this.cameras.main.setZoom(2);

		this.followPoint = new Phaser.Math.Vector2(
			this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
			this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5),
		);

		this.chunks = [];

		// alternate navigation from other scenes
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	update() {
		const snappedChunkX = this.getSnappedChunk(this.followPoint.x);
		const snappedChunkY = this.getSnappedChunk(this.followPoint.y);

		for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
			for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
				const existingChunk = this.getChunk(x, y);

				if (existingChunk === null) {
					const newChunk = new Chunk(this, x, y);
					this.chunks.push(newChunk);
				}
			}
		}

		for (var i = 0; i < this.chunks.length; i++) {
			const chunk = this.chunks[i];

			if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
				if (chunk !== null) {
					chunk.load();
				}
			} else {
				if (chunk !== null) {
					chunk.unload();
				}
			}
		}

		if (this.keyW.isDown) {
			this.followPoint.y -= this.cameraSpeed;
		}
		if (this.keyS.isDown) {
			this.followPoint.y += this.cameraSpeed;
		}
		if (this.keyA.isDown) {
			this.followPoint.x -= this.cameraSpeed;
		}
		if (this.keyD.isDown) {
			this.followPoint.x += this.cameraSpeed;
		}

		this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
	}

	getSnappedChunk = followPoint => ((this.chunkSize * this.tileSize) * Math.round(followPoint / (this.chunkSize * this.tileSize))) / this.chunkSize / this.tileSize;

	getChunk(x, y) {
		let chunk = null;

		for (var i = 0; i < this.chunks.length; i++) {
			if (this.chunks[i].x === x && this.chunks[i].y === y) {
				chunk = this.chunks[i];
			}
		}

		return chunk;
	}
}