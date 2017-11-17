'use strict'

import * as THREE from 'three'

import ImageQuads from './Image/index.js'

export default class App {

    constructor() {

        this.initParams()

        this.initWorld()

        this.initQuads()

        this.initEvents()

        this.Start()

    }

    initParams() {

        this.w = window.innerWidth

        this.h = window.innerHeight

    }

    initWorld() {

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(40,this.w / this.h, .1, 1000)

        this.camera.position.set(0,0,25)

        this.renderer = new THREE.WebGLRenderer()

        this.renderer.setSize(this.w, this.h)

        document.body.appendChild(this.renderer.domElement)

        this.mesh = new THREE.Mesh(

            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })

        )

        // this.scene.add(this.mesh)

    }

    initQuads() {

        this.imageQuads = new ImageQuads()

        this.scene.add(this.imageQuads)

        console.log(this.imageQuads)

    }

    initEvents() {

        window.addEventListener('resize', this.onResize.bind(this))

    }

    Start() {

        this.animate()

    }

    render() {

        this.renderer.render(this.scene, this.camera)

    }

    animate() {

        window.requestAnimationFrame(this.animate.bind(this))

        this.render()

    }

    onResize() {

        this.w = window.innerWidth

        this.h = window.innerHeight

        this.camera.aspect = this.w / this.h
        
        this.renderer.setSize(this.w, this.h)

        this.camera.updateProjectionMatrix()

    }

}

window.app = new App()