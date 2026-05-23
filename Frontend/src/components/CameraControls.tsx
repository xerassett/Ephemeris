import { PointerLockControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export default function CameraControls() {
    const keys = useRef({ forward: false, backward: false, left: false, right: false })
    const velocity = useRef(new Vector3())

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    keys.current.forward = true
                    break
                case "KeyS":
                case "ArrowDown":
                    keys.current.backward = true
                    break
                case "KeyA":
                case "ArrowLeft":
                    keys.current.left = true
                    break
                case "KeyD":
                case "ArrowRight":
                    keys.current.right = true
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    keys.current.forward = false
                    break
                case "KeyS":
                case "ArrowDown":
                    keys.current.backward = false
                    break
                case "KeyA":
                case "ArrowLeft":
                    keys.current.left = false
                    break
                case "KeyD":
                case "ArrowRight":
                    keys.current.right = false
                    break
            }
        }

        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, []);

    useFrame((state, delta) => {
        const speed = 5;

        velocity.current.multiplyScalar(0.85)
        if (keys.current.forward) velocity.current.z -= speed * delta
        if (keys.current.backward) velocity.current.z += speed * delta
        if (keys.current.left) velocity.current.x -= speed * delta
        if (keys.current.right) velocity.current.x += speed * delta

        state.camera.translateZ(velocity.current.z)
        state.camera.translateX(velocity.current.x)
    });

    return (
        <PointerLockControls />
    )
}