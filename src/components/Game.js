// React
import React from 'react';

// Phaser
import Phaser from 'phaser';

// Config
import { config } from '../game/config';

const gameObject = new Phaser.Game(config);

export const Game = () => (
	<>
		<h1>PLAY THE GAME</h1>
		<div id={config.scale.parent}></div>
	</>
);
