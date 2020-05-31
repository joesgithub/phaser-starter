// Plugins
import '../../public/plugins/camera3d.min';

// Scenes
import SelectScene from './scenes/SelectScene';
import HelloWorldScene from './scenes/HelloWorldScene';
import GameScene from './scenes/GameScene';
import ThreeDScene from './scenes/ThreeDScene';
import InfiniteScene from './scenes/InfiniteScene';
import RunnerScene from './scenes/RunnerScene';

export const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		},
	},
	scale: {
	    parent: "game",
	    mode: Phaser.Scale.FIT,
	    autoCenter: Phaser.Scale.CENTER_BOTH,
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
		SelectScene,
		RunnerScene,
		InfiniteScene,
		ThreeDScene,
		GameScene,
		HelloWorldScene,
	],
};