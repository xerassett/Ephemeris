import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"

type TCelestialProps = {
    radius: number,
    texture: string,
    isStar?: boolean,
    emissive?: string,
    position: [number, number, number],
    rotationSpeed: number,
    distance?: number,
    orbitalAngle?: number,
    orbitalSpeed?: number
}

export default function CelestialBody(props: TCelestialProps) {
    const loadedTexture = useTexture(props.texture)
    const ref = useRef<Mesh>(null)

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += props.rotationSpeed * delta
        }
    })

    return (
        <mesh position={props.position} ref={ref}>
            <sphereGeometry args={[props.radius, 64, 64]} />
            {props.isStar ? (
                <meshBasicMaterial
                    map={loadedTexture}
                />
            ) : (
                <meshStandardMaterial
                    map={loadedTexture}
                />
            )}
        </mesh>
    )
}