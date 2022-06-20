import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Counter {
    private integer: number = 0
    private counterText: PIXI.Text
    private game: Game

    private style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#940303', '#ff3636'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        lineJoin: 'round',
    });

    constructor(game: Game){
        this.game = game
        this.counterText = new PIXI.Text(`fishies eaten: ${this.integer}`, this.style)
        this.counterText.x = 25
        this.counterText.y = 25
        this.game.pixi.stage.addChild(this.counterText)
    }

    // called by fishes when eaten, increases numeric value and replaces text element with the updated value and color
    public updateCounter() {
        this.integer++
        this.counterText.destroy()
        this.changeColor()
        this.counterText = new PIXI.Text(`fishies eaten: ${this.integer}`, this.style)
        this.game.pixi.stage.addChild(this.counterText)
    }

    // changes the color of the counter text element when the integer reaches certain values
    public changeColor(){
        switch (this.integer) {
            case 4:               
                this.style.fill = ["#8e3400", "#f26511"]
                break
            case 8:
                this.style.fill = ["#844f00", "#df8600"]
                break
            case 12:
                this.style.fill = ["#776300", "#c8a100"]
                break
            case 16:
                this.style.fill = ["#687502", "#aeb724"]
                break
            case 20:
                this.style.fill = ["#57852e", "#93ca51"]
                break
            case 24:
                this.style.fill = ["#439352", "#75da7e"]
                break
            case 28:
                this.style.fill = ["#2aa075", "#53e8ac"]
                break
            case 32:
                this.style.fill = ["#09ab98", "#34f4d8"]
                break
            case 36:
                this.style.fill = ["#13b5b7", "#36fdff"]
                break
            case 40:
                this.style.fill = ["#ffca11", "#fdff4c"]
                break
            default:
                break
        }
    }

}