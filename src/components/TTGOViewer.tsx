"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// THREE is already in the bundle via @react-three/fiber.
// OBJLoader is loaded dynamically inside useEffect so three-stdlib never
// appears as a top-level import — this avoids a Next.js 14 clientModules crash
// that triggers when three-stdlib is imported at the module level.

function RotatingModel({ obj }: { obj: THREE.Object3D }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.25;
  });

  return (
    <group ref={ref}>
      <primitive object={obj} />
    </group>
  );
}

export default function TTGOViewer() {
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    import("three-stdlib").then(({ OBJLoader }) => {
      if (cancelled) return;
      new OBJLoader().load(
        "/models/ttgo-t-display.obj",
        (loaded) => {
          if (cancelled) return;

          // Center on bounding box
          const box = new THREE.Box3().setFromObject(loaded);
          loaded.position.sub(box.getCenter(new THREE.Vector3()));

          // MTL has Ka 1 1 1 on every face (pure-white ambient) — replace with
          // a physically-based dark material so the model isn't washed out
          loaded.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = new THREE.MeshStandardMaterial({
                color: "#111827",
                metalness: 0.45,
                roughness: 0.45,
                side: THREE.DoubleSide,
              });
              mesh.castShadow = true;
            }
          });

          setObj(loaded);
          setStatus("ready");
        },
        undefined,
        (err) => {
          console.error("[TTGOViewer]", err);
          if (!cancelled) setStatus("error");
        }
      );
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: "#060606", position: "relative" }}>
      {/* Loading / error label */}
      {status !== "ready" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.3)",
            }}
          >
            {status === "loading" ? "Loading model…" : "Model unavailable"}
          </p>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 25, 90], fov: 50, near: 0.1, far: 2000 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#060606", 0)}
      >
        {/* City IBL — gives realistic surface response without washing out */}
        <Environment preset="city" />
        <ambientLight intensity={0.15} />

        {obj && <RotatingModel obj={obj} />}

        <OrbitControls
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minDistance={30}
          maxDistance={300}
        />
      </Canvas>

      {status === "ready" && (
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
      )}
    </div>
  );
}
