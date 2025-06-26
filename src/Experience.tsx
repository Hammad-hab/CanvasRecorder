import { Environment } from '@react-three/drei'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { BackSide } from 'three'
import { useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import CanvasRecorder from './CanvasRecorder'
import React from 'react'

export default function Experience()
{   
    const { gl, camera } = useThree()
    const canvas = gl.domElement
    const radius = 10
    const recorder = useMemo(() => new CanvasRecorder(canvas, {
        fps: 60,
        duration: 5,
        mimeType: 'video/mp4'
    }), [canvas])

    useEffect(() => {
        recorder.start()
    }, [recorder])

    useFrame((state) => {
        camera.position.x = Math.sin(state.clock.elapsedTime) * radius
        camera.position.z = Math.cos(state.clock.elapsedTime) * radius
        camera.lookAt(0, 0, 0)
    })

    return <>
        <color attach='background' args={ [ '#87cefa' ] } />
        <pointLight position={ [ 0, 10, 0 ] } intensity={ 100 } />
        <Environment preset="sunset" ground/>
        <mesh rotation-x={ - Math.PI / 2 }>
            <boxGeometry args={ [ 6, 5, 5 ] } />
            <meshStandardMaterial color="white" side={BackSide}/>
        </mesh>
        <mesh rotation-x={ - Math.PI / 2 } position-y={ -2 }>
            <boxGeometry args={ [ 1, 1,1 ] } />
            <meshStandardMaterial color="white" />
        </mesh>

        <mesh rotation-x={ - Math.PI / 2 } position-y={ -2 } position-x={ 1.5 }>
            <sphereGeometry args={ [ 0.5, 32, 32 ] } />
            <meshStandardMaterial color="white" />
        </mesh>
        <EffectComposer multisampling={ 0 }>
            <N8AO intensity={ 1 } quality="performance" />
        </EffectComposer>
    </>
}