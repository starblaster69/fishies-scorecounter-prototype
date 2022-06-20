import * as PIXI from 'pixi.js'
import waterImage from "./images/water.jpg"
import fishImage from "./images/fish.png"
import bonesImage from "./images/bones.png"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import { Water } from "./Water"
import { Fish } from "./Fish" 
import { Shark } from "./Shark"
import { Bubble } from "./Bubble"
import { Counter } from "./counter"
import { UPDATE_PRIORITY } from 'pixi.js'

//
// STAP 1 - maak een pixi canvas
//
export class Game{
    public pixi : PIXI.Application //canvas element in de html file
    private loader : PIXI.Loader
    private fishes: Fish[] = []
    private bubbles: Bubble[] = []
    private shark: Shark
    public counter: Counter
    private integer: number = 0

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        console.log(this.pixi)
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
        this.loader.add('bonesTexture', bonesImage)
        this.loader.add('sharkTexture', sharkImage)
        this.loader.add('bubbleTexture', bubbleImage)
        this.loader.add('waterTexture', waterImage)
        this.loader.load(()=>this.loadCompleted())
    }   

    private loadCompleted() {
        //creates background image
        let water = new Water(this.loader.resources["waterTexture"].texture!)
        this.pixi.stage.addChild(water)

        // creates score counter class, which itself creates the visible scorecounter element
        this.counter = new Counter(this)

        //creates fishes
        for(let i = 0; i<40; i++){ 
            let fish = new Fish(this.loader.resources["fishTexture"].texture!, this.loader.resources["bonesTexture"].texture!, this)
            this.pixi.stage.addChild(fish)
            this.fishes.push(fish)
        }
        //creates shark
        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.shark)

        //creates bubbles
        for(let i = 0; i<20; i++){
            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.pixi.stage.addChild(bubble)
            this.bubbles.push(bubble)
        }
        //updater
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }



    private update(delta : number){
        for(let fish of this.fishes){
            fish.swim()
            fish.turn()
            fish.bounce()
            
            if(this.collision(this.shark, fish)){
                fish.kill()
            }
        }
        for(let bubble of this.bubbles){
            bubble.bounce()
        }
        this.shark.update()
    }
}

let g = new Game()