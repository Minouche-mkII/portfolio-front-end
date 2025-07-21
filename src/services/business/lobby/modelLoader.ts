import {useGltf} from "@threlte/extras";
import {
    Mesh,
    MeshStandardMaterial,
} from "three";

export async function loadAndConfigureModel(path: string) {
    const model = await useGltf(path)
    model.scene.traverse((child) => {
        if((child as Mesh).isMesh) {
            const mesh = child as Mesh
            const oldMat = mesh.material as MeshStandardMaterial
            const mat = new MeshStandardMaterial({
                color: oldMat.color,
                map: oldMat.map,
                metalness: 0.1,
                roughness: 0.4
            });
            mesh.castShadow = true
            mesh.receiveShadow = true
            mesh.material = mat
        }
    })
    return model
}