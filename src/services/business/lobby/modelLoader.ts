import {useGltf} from "@threlte/extras";
import {Mesh, MeshStandardMaterial, MeshToonMaterial} from "three";

export async function loadAndConfigureModel(path: string) {
    const model = await useGltf(path)
    model.scene.traverse((child) => {
        if((child as Mesh).isMesh) {
            const mesh = child as Mesh
            const oldMat = mesh.material as MeshStandardMaterial
            const toonMat = new MeshToonMaterial({
                color: oldMat.color,
                map: oldMat.map,
            });
            mesh.material = toonMat
        }
    })
    return model
}