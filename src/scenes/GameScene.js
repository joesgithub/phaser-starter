import Phaser from 'phaser';

import ScoreLabel from '../ui/ScoreLabel';
import BombSpawner from '../ui/BombSpawner';

const KEYS = {
	GROUND: 'ground',
	DUDE: 'dude',
	STAR: 'star',
	BOMB: 'bomb',
};

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene');

		this.player;
		this.platforms;
		this.cursors;
		this.stars;
		this.scoreLabel;
		this.bombSpawner;
		this.gameOver = false;
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
		this.add.image(400, 300, 'sky');

		this.platforms = this.createPlatforms();
		this.player = this.createPlayer();
		this.stars = this.createStars();

		this.scoreLabel = this.createScoreLabel(16, 16, 0);

		this.bombSpawner = new BombSpawner(this, KEYS.BOMB);
		const bombsGroup = this.bombSpawner.group;

		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.collider(bombsGroup, this.platforms);
		this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);

		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if(this.gameOver) return;

		if(this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.anims.play('left', true);
		} else if(this.cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}

		if(this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330);
		}
	}

	collectStar(player, star) {
		star.disableBody(true, true);

		this.scoreLabel.add(10);

		if(this.stars.countActive(true) === 0) {
			// re-enable stars (a new batch to collect)
			this.stars.children.iterate(star => {
				star.enableBody(true, star.x, 0, true, true);
			});
		}

		this.bombSpawner.spawn(player.x);
	}

	hitBomb(player, bomb) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
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

		platforms.create(400, 568, KEYS.GROUND).setScale(2).refreshBody();
		platforms.create(600, 400, KEYS.GROUND);
		platforms.create(50, 250, KEYS.GROUND);
		platforms.create(750, 220, KEYS.GROUND);

		return platforms;
	}

	createStars() {
		const stars = this.physics.add.group({
			key: KEYS.STAR,
			repeat: 11,
			setXY: {
				x: 12,
				y: 0,
				stepX: 70,
			}
		});

		stars.children.iterate(star => {
			star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		});

		return stars;
	}

	createPlayer() {
		const player = this.physics.add.sprite(100, 450, KEYS.DUDE);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(KEYS.DUDE, {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'turn',
			frames: [{key: KEYS.DUDE, frame: 4}],
			frameRate: 20,
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(KEYS.DUDE, {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1,
		});

		return player;
	}
}