'use strict'

import * as THREE from 'three'

const glslify = require('glslify')

export default class ImageQuads extends THREE.Object3D {

    constructor() {

        super()

        this.initImageData()

        // this.initGeo()

        // this.initMat()

        // this.initMesh()

    }

    initImageData() {

        const canvas = document.createElement('canvas')

        this.ctx = canvas.getContext('2d')

        this.img = new Image()

        this.img.src = './testImg/testimg.jpg'

        this.img.crossOrigin = 'anonymous'

        console.log(this.img)

        this.img.onload = () => {

            if (this.img.complete) {


                canvas.width = this.img.width

                canvas.height = this.img.height

                this.ctx.drawImage(this.img, 0, 0)

                this.imgData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)

                // for(let i in this.imgData.data) {

                //     this.imgData.data[i] /= 255

                // }

                console.log(this.imgData)


                this.imgCol = new Float32Array(this.imgData.data.length)

                for (let i = 0; i < this.imgData.data.length; i++) {

                    this.imgCol[i] = this.imgData.data[i] / 255

                }

                this.dataTex = new THREE.DataTexture(

                    this.imgCol,
                    this.imgData.width,
                    this.imgData.height,
                    THREE.RGBAFormat,
                    THREE.FloatType

                )

                // this.dataTex.minFilter = THREE.LinearFilter

                // this.dataTex.magFilter = THREE.LinearFilter

                this.dataTex.flipY = true

                this.dataTex.needsUpdate = true


                // // // console.log(this.imgCol)

                // // this.mat.uniforms.tex.value = this.dataTex

                // // // this.initMesh()

                this.initGeo()

                this.initMat(this.dataTex)

                this.initMesh()

                // this.dataTex.needsUpdate = false

            }

        }

    }

    initGeo() {

        this.amnt = 30

        this.geo = new THREE.InstancedBufferGeometry()

        this.baseGeo = new THREE.PlaneBufferGeometry(8, 16, 1, 1)
        // this.baseGeo = new THREE.BoxBufferGeometry(1, 1, 1)

        this.geo.addAttribute('position', this.baseGeo.attributes.position)

        this.geo.addAttribute('uv', this.baseGeo.attributes.uv) //will later use a instanced buffer attrobite for uv offsetting

        const translations = new Float32Array(this.amnt * 3)

        const rotations = new Float32Array(this.amnt * 3)

        const scales = new Float32Array(this.amnt * 3)

        const uvInstanceScale = new THREE.Vector2(1 / 240000, 1)

        const uvScale = new Float32Array(this.amnt * 2)

        const uvOffset = new Float32Array(this.amnt * 2)

        let uvScaleIterator = 0

        let uvOffsetIterator = 0

        for (let i = 0; i < this.amnt; i++) {

            uvOffset[uvOffsetIterator * 2 + 0] = i * uvInstanceScale.x
            uvOffset[uvOffsetIterator * 2 + 1] = uvInstanceScale.y

            uvScale[uvScaleIterator * 2 + 0] = uvInstanceScale.x
            uvScale[uvScaleIterator * 2 + 1] = uvInstanceScale.y

            uvOffsetIterator++
            uvScaleIterator++

        }



        for (let i in translations) {

            let i3 = i * 3

            translations[i3 + 0] = i * 2 * 1.1 - 20
            translations[i3 + 1] = 0
            translations[i3 + 2] = 0

        }

        console.log(translations)

        for (let i in rotations) {

            let i3 = i * 3

            rotations[i3 + 0] = 0
            rotations[i3 + 1] = 0
            rotations[i3 + 2] = 0

        }

        for (let i in scales) {

            let i3 = i * 3

            scales[i3 + 0] = .1
            scales[i3 + 1] = .1
            scales[i3 + 2] = .1

        }

        this.geo.addAttribute('translation', new THREE.InstancedBufferAttribute(translations, 3, 1))

        this.geo.addAttribute('rotation', new THREE.InstancedBufferAttribute(rotations, 3, 1))

        this.geo.addAttribute('scale', new THREE.InstancedBufferAttribute(scales, 3, 1))

        this.geo.addAttribute('uvOffset', new THREE.InstancedBufferAttribute(uvOffset, 2, 1))

        this.geo.addAttribute('uvScale', new THREE.InstancedBufferAttribute(uvScale, 2, 1))

        this.geo.setIndex(this.baseGeo.index)

    }

    initMat(texture) {

        console.log(texture)

        this.mat = new THREE.RawShaderMaterial({

            uniforms: {

                tex: {

                    type: 't',
                    value: texture

                }

            },

            vertexShader: glslify('./shaders/vertexShader.glsl'),
            fragmentShader: glslify('./shaders/fragmentShader.glsl'),
            side: THREE.DoubleSide

        })

    }

    initMesh() {

        this.mesh = new THREE.Mesh(this.geo, this.mat)

        this.mesh.frustumCulled = false

        this.add(this.mesh)

    }


}