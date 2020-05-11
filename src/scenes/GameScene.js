import Phaser from 'phaser';

import { config } from '../config';

import Storage from '../utils/Storage';

import Player from '../ui/Player';

import ScoreLabel from '../ui/ScoreLabel';
import BombSpawner from '../ui/BombSpawner';
import StarSpawner from '../ui/StarSpawner';

const KEYS = {
	GROUND: 'ground',
	DUDE: 'dude',
	STAR: 'star',
	BOMB: 'bomb',
};

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene');

		this.player = new Player(this, KEYS.DUDE);
		this.platforms;
		this.scoreLabel;
		this.cursors;
		this.stars;
		this.bombs;
		this.gameOver = false;

		Storage.init();
	}

	preload() {
		this.load.image('sky', 'assets/sky.png');
		this.load.image(KEYS.GROUND, 'assets/platform.png');
		this.load.image(KEYS.STAR, 'assets/star.png');
		this.load.image(KEYS.BOMB, 'assets/bomb.png');

		this.load.spritesheet(
			KEYS.DUDE,
			'assets/dude.png',
			{
				frameWidth: 32,
				frameHeight: 48,
			},
		);
	}

	create() {
		this.add.image(config.width/2, config.height/2, 'sky');

		const playerSprite = this.player.createPlayer();

		this.stars = new StarSpawner(this, KEYS.STAR);
		const starSprites = this.stars.group;
		this.bombs = new BombSpawner(this, KEYS.BOMB);
		const bombSprites = this.bombs.group;

		this.platforms = this.createPlatforms();
		this.scoreLabel = this.createScoreLabel(16, 16, Storage.loadProp('score') || 0);

		this.physics.add.collider(playerSprite, this.platforms);
		this.physics.add.collider(starSprites, this.platforms);
		this.physics.add.collider(bombSprites, this.platforms);
		this.physics.add.collider(playerSprite, bombSprites, this.hitBomb, null, this);

		this.physics.add.overlap(playerSprite, starSprites, this.collectStar, null, this);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if(this.gameOver) return;

		this.player.setCursors(this.cursors);
	}

	collectStar(player, star) {
		this.stars.disable(star);

		this.scoreLabel.add(10);

		this.stars.respawnAll();

		this.bombs.spawn(player.x);
	}

	hitBomb(player, bomb) {
		this.physics.pause();

		this.player.gameOver();

		const gameOverText = this.add.text(0, 0, 'GAME OVER', {fontSize: '60px', fontWeight: '700'});
		gameOverText.setX((config.width/2) - (gameOverText.displayWidth/2)).setY((config.height/2) - (gameOverText.displayHeight/2));

		this.gameOver = true;
	}

	createScoreLabel(x, y, score) {
		const style = {fontSize: '32px', fill: '#000'};

		const label = new ScoreLabel(this, x, y, score, style);

		this.add.existing(label);

		return label;
	}

	createPlatforms() {
		const platforms = this.physics.add.staticGroup();

		platforms.create(config.width/2, config.height-32, KEYS.GROUND).setScale(2).refreshBody();
		platforms.create(config.width-200, config.height-200, KEYS.GROUND);
		platforms.create(50, config.height-350, KEYS.GROUND);
		platforms.create(config.width-50, config.height-380, KEYS.GROUND);

		return platforms;
	}
}