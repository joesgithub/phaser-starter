import Phaser from 'phaser';

import { config } from '../config';

const cameraSpeed = 2;
const cameraZSpeed = cameraSpeed * 4;

// z goes negative to go forward
const minZ = -7000;
const maxZ = 250;
const minX = -100;
const maxX = 100;

const roadLength = maxZ - minZ;
const treeInterval = 200;

export default class ThreeDScene extends Phaser.Scene {
	constructor() {
		super('three-d');

		this.sprite;
        this.sky;
        this.horizon;
        this.text;

		this.camera;
		this.cursors;
        this.transform;
	}

	preload() {
		this.load.image('star', 'assets/star.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('horizon', 'assets/horizon-wide.png');
        this.load.image('tree', 'assets/tree.png');
    }

    create() {
    	this.camera = this.createCamera();

        // this.sprite = this.camera.create(1500, -70, 9900, 'star');
        this.sprite = this.add.image(400, config.height - 200, 'star').setOrigin(0.5).setDepth(-1);

        this.sky = this.add.image(400, 300, 'bg').setDepth(-3);
        this.horizon = this.add.image(400, 350, 'horizon').setDepth(-2);

        this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

    	this.cursors = this.input.keyboard.createCursorKeys();


        for (var z = 0; z < (roadLength / treeInterval); z++) {
            var bz = z * -treeInterval;

            this.camera.create(-130, -20, bz, 'tree');
            this.camera.create(130, -20, bz, 'tree');
        }
        for (var x = 0; x < 10; x++) {
            var bx = (x * 26) - 130;

            this.camera.create(bx, -20, minZ - 200, 'tree');
        }

        const specificChildren = this.camera.getChildren().slice(0, 2);

        // const transform = new Phaser.Math.Matrix4().rotateX(11);
        // this.camera.transformChildren(transform, specificChildren);
        this.camera.lookAt(0, -1300, minZ);
    }

    update() {
    	if(this.cursors.left.isDown) {
            this.camera.x = Phaser.Math.Clamp(this.camera.x - cameraSpeed, minX, maxX);
    	} else if(this.cursors.right.isDown) {
    		this.camera.x = Phaser.Math.Clamp(this.camera.x + cameraSpeed, minX, maxX);
    	}

    	// up and down keys grow and shrink
    	// hold shift to move up and down
    	if(this.cursors.up.isDown) {
	    	// if(this.cursors.shift.isDown) {
	    	// 	this.camera.y -= cameraSpeed;
	    	// } else {
            this.camera.z = Phaser.Math.Clamp(this.camera.z - cameraZSpeed, minZ, maxZ);
	    	// }
    	}
    	if(this.cursors.down.isDown) {
	    	// if(this.cursors.shift.isDown) {
	    	// 	this.camera.y += cameraSpeed;
	    	// } else {
            this.camera.z = Phaser.Math.Clamp(this.camera.z + cameraZSpeed, minZ, maxZ);
	    	// }
    	}

        this.text.setText([
            'camera.x: ' + this.camera.x,
            'camera.y: ' + this.camera.y,
            'camera.z: ' + this.camera.z
        ]);
    }

    createCamera() {
    	const camera = this.camera3d.add(80).setPosition(0, 0, maxZ);

    	return camera;
    }
}

