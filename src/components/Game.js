// React
import React from 'react';

// Phaser
import Phaser from 'phaser';

// Enable3D
import { enable3d } from '@enable3d/phaser-extension';

// Config
import { config } from '../game/config';

const gameObject = enable3d(() => new Phaser.Game(config)).withPhysics('ammo');

export const Game = () => (
	<>
		<h1>PLAY THE GAME</h1>
		<div id={config.scale.parent}></div>
	</>
);
