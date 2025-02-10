import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  // Geometry
  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  // Textures
  setTextures() {
    this.texture = {};
    this.texture.color = this.resources.items.grassColorTexture;
    this.texture.color.encoding = THREE.sRGBEncoding;
    this.texture.color.repeat.set(1, 1);
    this.texture.color.wrapS = THREE.RepeatWrapping;
    this.texture.color.wrapT = THREE.RepeatWrapping;

    this.texture.normal = this.resources.items.grassNormalTexture;
    this.texture.normal.repeat.set(1, 1);
    this.texture.normal.wrapS = THREE.RepeatWrapping;
    this.texture.normal.wrapT = THREE.RepeatWrapping;
  }

  // Material
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture.color,
      normalMap: this.texture.normal,
    });
  }

  // Mesh
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
