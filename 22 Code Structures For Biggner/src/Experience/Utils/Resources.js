import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter 
{
    constructor(sources) 
    {
        // initialize the parent class
        super();

        // Options
        this.sources = sources;

        // Setup
        this.items = {};
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading();

    }


    // Loaders
    setLoaders() 
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    // Start Loading
    startLoading() 
    {
        for (const source of this.sources) 
        {
            
            // Types
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load
                (
                    source.path,
                    (file) =>  
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            } 
            else if 
             (source.type === 'texture') {
                this.loaders.textureLoader.load
                (
                    source.path,
                    (file) =>  
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            } 
            else if 
             (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load
                (
                    source.path,
                    (file) =>  
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            } 
        }
        
    }

    // source load
    sourceLoaded(source, file) 
    {
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}