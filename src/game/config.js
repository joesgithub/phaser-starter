// Plugins
import '../../public/plugins/camera3d.min';

// Enable3D
import { Canvas } from '@enable3d/phaser-extension';

// Scenes
import SelectScene from './scenes/SelectScene';
import HelloWorldScene from './scenes/HelloWorldScene';
import GameScene from './scenes/GameScene';
import ThreeDScene from './scenes/ThreeDScene';
import InfiniteScene from './scenes/InfiniteScene';
import RunnerScene from './scenes/RunnerScene';
import Enable3DScene from './scenes/Enable3DScene';

export const config = {
	type: Phaser.WEBGL,
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
		Enable3DScene,
		RunnerScene,
		InfiniteScene,
		ThreeDScene,
		GameScene,
		HelloWorldScene,
	],
	...Canvas(),
};