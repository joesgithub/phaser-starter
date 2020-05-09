// Plugins
import '../public/plugins/camera3d.min';

// Scenes
import HelloWorldScene from './scenes/HelloWorldScene';
import GameScene from './scenes/GameScene';
import ThreeDScene from './scenes/ThreeDScene';

const width = window.innerWidth > 800 ? 800 : window.innerWidth;
const height = window.innerHeight > 600 ? 600 : window.innerHeight;

export const config = {
	type: Phaser.AUTO,
	width,
	height,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
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