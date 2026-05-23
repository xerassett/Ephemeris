import { Canvas } from '@react-three/fiber'
import './index.css'
import CameraControls from './components/CameraControls'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import CelestialBody from './components/CelestialBody'
import SpaceBackground from './components/SpaceBackground'

function App() {

  return (
    <Canvas className="w-full h-full" camera={{ fov: 60, near: 0.1, far: 1000000 }}>
      <color attach="background" args={['#000010']} />
      <SpaceBackground />
      <CameraControls />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          intensity={1.5}
          height={512}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
      <CelestialBody
        radius={50}
        texture="/sun_texture.jpg"
        isStar={true}
        emissive="#ff6600"
        position={[0, 0, 0]}
        rotationSpeed={0.05}
      />
      <pointLight position={[0, 0, 0]} intensity={100} distance={10000} decay={0.5} />
      <CelestialBody
        radius={10}
        texture="/jupiter_texture.jpg"
        isStar={false}
        emissive='#f8c9aaff'
        position={[1000, 0, 0]}
        rotationSpeed={0.01}
      />
      <ambientLight intensity={0.04} />
    </Canvas>
  )
}

export default App