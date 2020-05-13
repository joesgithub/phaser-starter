import Phaser from 'phaser';

import { config } from '../config';

const thumbWidth = 300;
const thumbHeight = 60;
const spacing = 20;

const kebabToTitle = kebab => kebab.split('-').map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ');

export default class SelectScene extends Phaser.Scene{
    constructor(){
        super('select-scene');
    }

    preload(){
    }

    create(){
        console.log(this.scene.manager.keys);
        this.scenes = Object.keys(this.scene.manager.keys).filter(sceneName => sceneName !== 'select-scene');

        this.thumbsGroup = this.add.group();
        this.textGroup = this.add.group();

        this.pageText = this.add.text(
            config.width / 2,
            32,
            `Select game`,
            {
                font: "18px Arial",
                fill: "#ffffff",
                align: "center"
            }
        );
        this.pageText.setOrigin(0.5);

        this.scenes.forEach((sceneName, index) => {
            const allThumbsHeight = ((this.scenes.length * thumbHeight) + ((this.scenes.length - 1) * spacing)) / 2;
            const configHeight = (config.height / 2) - allThumbsHeight + (thumbHeight / 2);
            const thisThumbHeight = (index * (thumbHeight + spacing));
            const itemHeight = configHeight + thisThumbHeight;

            const sceneThumb = this.add.rectangle(
                config.width / 2,
                itemHeight,
                thumbWidth,
                thumbHeight,
                '0xFFFFFF',
            );
            sceneThumb
                .setOrigin(0.5, 0.5)
                .setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => this.scene.start(sceneName));

            this.thumbsGroup.add(sceneThumb);

            const sceneText = this.add.text(
                config.width / 2,
                itemHeight,
                kebabToTitle(sceneName),
                {
                    font: "24px Arial",
                    color: '#000000',
                },
            );
            sceneText.setOrigin(0.5, 0.5);
            this.textGroup.add(sceneText);
        });

    }
}