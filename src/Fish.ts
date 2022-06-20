import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Counter } from './counter'

export class Fish extends PIXI.Sprite {
    private initX: number
    private initY: number
    private top: number
    private bottom: number
    private bounceUp: boolean
    private swimDirection: boolean
    private speed: number
    private bonesTexture: PIXI.Texture
    private alive: boolean
    private size: number
    private game: Game
    private counter: Counter

    constructor(texture: PIXI.Texture, bonesTexture: PIXI.Texture, game: Game) {
        super(texture)
        this.bonesTexture = bonesTexture
        
        this.initX = Math.random() * 800
        this.initY = Math.random() * 450
        this.x = this.initX
        this.y = this.initY
        this.top = this.initY + 25
        this.bottom = this.initY - 25
        this.size = Math.random() * 1
        this.alive = true
        this.game = game

        this.anchor.set(0.5)
        this.rotation = 0
        this.scale.set(this.size)
        this.tint = Math.random() * 0xFFFFFF

        this.bounceUp = true
        this.swimDirection = false
        this.speed = Math.random() * 6

        //this.interactive = true
        //this.buttonMode = true
        //this.on('pointerdown', ()=> this.kill())        
    }

    //operations
    public swim() {
        if (this.swimDirection) {
            this.x += this.speed
        } else {
            this.x -= this.speed
        }
    }
    public turn() {
        if (this.x >= 800) {
            this.scale.set(this.size)
            this.swimDirection = false
        } else if (this.x <= 0) {
            this.scale.set(this.size * -1, this.size)
            this.swimDirection = true
        }
    }
    public bounce() {
        if (this.y == this.top) {
            this.bounceUp = false
        } else if (this.y == this.bottom) {
            this.bounceUp = true
        }
        if(this.alive){
            if (this.bounceUp) {
                this.y += Math.cos(this.x * 0.005)
                //this.rotation = Math.cos(this.x * 0.005)
            } else {
                this.y -= Math.cos(this.x * 0.005)
                //this.rotation = Math.cos(this.x * -0.005)
            }
        } else if(this.y !<= 450) {
            this.y += 1
        }
        
    }
    public kill(){
        if (this.alive){
            console.log("Chomp!")
        this.speed = 0
        this.alive = false
        this.texture = this.bonesTexture
        this.tint = 0xFFFFFF
        this.game.counter.updateCounter()
        }
    }
}