import Tile from './Tile';

import { Noise } from 'noisejs';

export default class Chunk {
	constructor(scene, x, y) {
		this.scene = scene;
		this.x = x;
		this.y = y;

		this.tiles = this.scene.add.group();
		this.isLoaded = false;
		this.noiseFactory = new Noise();
		this.randomFactory = new Phaser.Math.RandomDataGenerator();
	}

	unload() {
		if (!this.isLoaded) return;

		this.tiles.clear(true, true);
		this.isLoaded = false;
	}

	load() {
		if (this.isLoaded) return;

		// this could be replaced with retrieval of array of specific tiles (not random)
		for (let x = 0; x < this.scene.chunkSize; x++) {
	    	for (let y = 0; y < this.scene.chunkSize; y++) {
				const tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
				const tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);
				// could replace perlin with this.randomFactory.frac() for more random
				// but perlin makes sure grass only appears on or next to sand (builds up)
        		const perlinValue = this.noiseFactory.perlin2(tileX / 100, tileY / 100);
        		// const perlinValue = this.randomFactory.frac();

        		let key = '';
        		let animationKey = '';

        		if (perlinValue < 0.2) {
				    key = 'sprWater';
				    animationKey = 'sprWater';
				} else if (perlinValue >= 0.2 && perlinValue < 0.3) {
				    key = 'sprSand';
				} else if (perlinValue >= 0.3) {
				    key = 'sprGrass';
				}

				const tile = new Tile(this.scene, tileX, tileY, key);
				if (animationKey !== '') {
					tile.play(animationKey);
				}
				this.tiles.add(tile);
		    }
		}

		this.isLoaded = true;
	}
}