import { Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function SpaceBackground() {
    const ref = useRef<any>(null)

    useFrame(({ camera }) => {
        if (ref.current) {
            ref.current.position.copy(camera.position)
        }
    })

    return (
        <Stars ref={ref} radius={10000} count={25000} depth={5000} factor={4} fade={false} speed={0} />
    )
}