import Phaser from 'phaser'

export default class ThreeDScene extends Phaser.Scene {
	constructor() {
		super('three-d');

		this.sprite;
		this.camera;
		this.cursors;
		this.cameraSpeed;
	}

	preload() {
		this.load.image('star', 'assets/star.png');
    }

    create() {
    	this.camera = this.createCamera();

    	this.sprite = this.camera.create(0, 0, 150, 'star');

    	this.cursors = this.input.keyboard.createCursorKeys();

    	this.cameraSpeed = 1;
    }

    update() {
    	if(this.cursors.left.isDown) {
    		this.camera.x -= this.cameraSpeed;
    	}
    	if(this.cursors.right.isDown) {
    		this.camera.x += this.cameraSpeed;
    	}

    	// up and down keys grow and shrink
    	// hold shift to move up and down
    	if(this.cursors.up.isDown) {
	    	if(this.cursors.shift.isDown) {
	    		this.camera.y -= this.cameraSpeed;
	    	} else {
	    		this.camera.z += this.cameraSpeed;
	    	}
    	}
    	if(this.cursors.down.isDown) {
	    	if(this.cursors.shift.isDown) {
	    		this.camera.y += this.cameraSpeed;
	    	} else {
	    		this.camera.z -= this.cameraSpeed;
	    	}
    	}
    }

    createCamera() {
    	const camera = this.camera3d.add(80).setPosition(0, 0, 200);

    	return camera;
    }
}

