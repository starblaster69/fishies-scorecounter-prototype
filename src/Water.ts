import * as PIXI from 'pixi.js'

export class Water extends PIXI.Sprite {
    constructor(texture: PIXI.Texture){
        super(texture)
        this.width = 800
        this.height = 450
    }
}