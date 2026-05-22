"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import * as THREE from "three";

function TTGOModel() {
  const materials = useLoader(MTLLoader, "/models/ttgo-t-display.mtl");
  const obj = useLoader(OBJLoader, "/models/ttgo-t-display.obj", (loader) => {
    materials.preload();
    (loader as OBJLoader).setMaterials(materials);
  });

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Center on bounding box
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);

    // Ensure double-sided so interior faces are visible on rotation
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          (m as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
        });
        mesh.castShadow = true;
      }
    });
  }, [obj]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <p
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(240,235,224,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        Loading model…
      </p>
    </Html>
  );
}

export default function TTGOViewer() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#060606", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 25, 90], fov: 50, near: 0.1, far: 2000 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#060606", 0)}
      >
        {/* IBL gives realistic colour response without washing out the MTL colours */}
        <Environment preset="city" />
        <ambientLight intensity={0.2} />

        <Suspense fallback={<Loader />}>
          <TTGOModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minDistance={30}
          maxDistance={300}
        />
      </Canvas>

      <p
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "8px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(240,235,224,0.18)",
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
