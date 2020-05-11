// Plugins
import '../public/plugins/camera3d.min';

// Scenes
import HelloWorldScene from './scenes/HelloWorldScene';
import GameScene from './scenes/GameScene';
import ThreeDScene from './scenes/ThreeDScene';

export const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scale: {
	    mode: Phaser.Scale.FIT,
	    autoCenter: Phaser.Scale.CENTER_BOTH,
	    parent: "game",
	},
	plugins: {
		scene: [
			{
				key: 'Camera3DPlugin',
				plugin: window.Camera3DPlugin,
				mapping: 'camera3d',
			}
		]
	},
	scene: [
		// ThreeDScene,
		GameScene,
		HelloWorldScene
	],
};