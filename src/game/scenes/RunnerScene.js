import Phaser from 'phaser';

import { config } from '../config';

// scene options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}

export default class RunnerScene extends Phaser.Scene{
    constructor(){
        super('runner');

        this.platformGroup;
        this.platformPool;
        this.playerJumps;
        this.player;
    }

    preload = () => {
        this.load.image('platform', '/platform.png');
        this.load.spritesheet(
            'player',
            'assets/dude.png',
            {
                frameWidth: 32,
                frameHeight: 48,
            },
        );
    }

    create = () => {
        // overwrite default game gravity
        this.physics.world.gravity = {x: 0, y: 0};

        // group with all active platforms.
        this.platformGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding initial platform to the game, the arguments are platform width and x position
        this.addPlatform(config.width, config.width / 2);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, config.height / 2, 'player');
        this.player.setGravityY(gameOptions.playerGravity);

        // player animation
        this.anims.create({
            key: 'side',
            frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 9] }),
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play('side', true);
 
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
 
        // checking for input
        this.input.on('pointerdown', this.jump);
        this.input.keyboard.on('keydown-SPACE', this.jump);
    }

    update = () => {
        // game over
        if(this.player.y > config.height){
            this.scene.start('runner');
        }
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = config.width;
        this.platformGroup.getChildren().forEach(platform => {
            let platformDistance = config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        });
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2);
        }
    }

    // platform are added from the pool or created on the fly
    addPlatform = (platformWidth, posX) => {
        let platform;
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        } else {
            platform = this.physics.add.sprite(posX, config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }

    // the player jumps when on the ground or
    // once in the air as long as there are jumps left
    // and the first jump was on the ground
    jump = () => {
        if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
            if (this.player.body.touching.down) {
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    }
}