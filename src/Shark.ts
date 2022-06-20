import * as PIXI from 'pixi.js'

export class Shark extends PIXI.Sprite {
    //variables
    private xspeed: number
    private yspeed: number
    private size: number 
    private hitbox:PIXI.Rectangle

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.xspeed = 0
        this.yspeed = 0
        this.size = 0.35

        this.x = 100
        this.y = 225
    
        this.scale.set(this.size)
        this.anchor.set(0.5)
        this.pivot.set(0.5)
        this.hitbox = new PIXI.Rectangle(20, -40, 70, 100)//places hitbox around the head only

        window.addEventListener("keydown", (e: KeyboardEvent) => this.move(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.unMove(e))
    }

    //operations
    public update() {
        this.x += this.xspeed
        this.y += this.yspeed

        this.boundary()
    }
    private move(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()){
            case "A":
            case "ARROWLEFT":
                this.scale.set(this.size * -1, this.size)
                this.xspeed = -5
                break
            case "D":
            case "ARROWRIGHT":
                this.scale.set(this.size)
                this.xspeed = 5
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -5
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 5
                break
        }
    }

    private unMove(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }

    private boundary(){
        switch (this.x){
            case -5:
                this.x = 0
                break
            case 805:
                this.x = 800
                break    
        }
        switch (this.y){
            case -5:
                this.y = 0
                break
            case 455:
                this.y = 450
                break    
        }
    }
    public getBounds() : PIXI.Rectangle {
        return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
    }
}