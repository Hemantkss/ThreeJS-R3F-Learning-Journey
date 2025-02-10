import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter 
{
    constructor() 
    {
        super();
        
        // Set Up
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        // Tick
        window.requestAnimationFrame(() =>  {
            this.tick();
        })
    }

    // Tick function
    tick() 
    {
        // calculate Time
        const currentTime = Date.now() 
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        // Update Time
        window.requestAnimationFrame(() =>  {
            this.tick();
        })
    }
}