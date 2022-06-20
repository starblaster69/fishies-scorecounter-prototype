import * as PIXI from 'pixi.js'

export class Bubble extends PIXI.Sprite {
    private top: number
    private bottom: number
    private bounceUp: boolean
    private initX: number
    private initY: number
    private speed: number

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.initX = Math.random() * 800
        this.initY = Math.random() * 450
        this.x = this.initX
        this.y = this.initY
        this.top = this.initY + 25
        this.bottom = this.initY - 25
        this.anchor.set(0.5)
        this.bounceUp = true
        this.speed = Math.random() * 1.25
    }

    //operations
    public bounce(){
        if(this.y >= this.top) {
            this.bounceUp = false
        } else if(this.y <= this.bottom) {
            this.bounceUp = true
        }
        if(this.bounceUp) {
            this.y += this.speed
        } else {
            this.y -= this.speed
        }
    }
}