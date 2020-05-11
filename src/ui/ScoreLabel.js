import Phaser from 'phaser';

import Storage from '../utils/Storage';

const formatScore = score => `SCORE: ${score}`;

export default class ScoreLabel extends Phaser.GameObjects.Text {
	constructor(scene, x, y, score, style){
		super(scene, x, y, formatScore(score), style);

		this.score = score;
	}

	setScore(score) {
		this.score = score;
		this.updateScoreText();

		Storage.saveProp('score', this.score);
	}

	add(points) {
		this.setScore(this.score + points);
	}

	updateScoreText() {
		this.setText(formatScore(this.score));
	}
}