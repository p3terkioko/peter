"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type RawMesh = {
  name: string;
  indices: number[];
  vertices: number[];
  normals: number[];
  color: { r: number; g: number; b: number } | null;
};

type ParsedScene = {
  meshes: RawMesh[];
  center: THREE.Vector3;
  cameraZ: number;
};

function SceneContents({
  scene,
  dragging,
  setDragging,
}: {
  scene: ParsedScene;
  dragging: boolean;
  setDragging: (v: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const geos = useMemo(() => {
    return scene.meshes.map((mesh) => {
      const geo = new THREE.BufferGeometry();
      geo.setIndex(mesh.indices);
      geo.setAttribute("position", new THREE.Float32BufferAttribute(mesh.vertices, 3));
      if (mesh.normals.length > 0) {
        geo.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.normals, 3));
      } else {
        geo.computeVertexNormals();
      }
      const color = mesh.color
        ? new THREE.Color(mesh.color.r / 255, mesh.color.g / 255, mesh.color.b / 255)
        : new THREE.Color("#9ca3af");
      return { geo, color };
    });
  }, [scene.meshes]);

  // Dispose geometries on unmount
  useEffect(() => {
    return () => { geos.forEach(({ geo }) => geo.dispose()); };
  }, [geos]);

  useFrame(({ clock }) => {
    if (groupRef.current && !dragging) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.25;
    }
  });

  return (
    <>
      <group
        ref={groupRef}
        position={[-scene.center.x, -scene.center.y, -scene.center.z]}
      >
        {geos.map(({ geo, color }, i) => (
          <mesh key={i} geometry={geo}>
            <meshStandardMaterial
              color={color}
              metalness={0.35}
              roughness={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </>
  );
}

export default function TTGOViewer() {
  const [scene, setScene] = useState<ParsedScene | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { default: initOcct } = await import("occt-import-js");
        const occt = await initOcct({
          locateFile: (path: string) =>
            path.endsWith(".wasm") ? "/occt-import-js.wasm" : path,
        });

        const response = await fetch("/ttgo-t-display.step");
        const buffer = await response.arrayBuffer();
        const result = occt.ReadStepFile(new Uint8Array(buffer), null);

        if (cancelled) return;

        if (!result.success || !result.meshes?.length) {
          setStatus("error");
          return;
        }

        // Compute bounding box across all vertices
        const box = new THREE.Box3();
        for (const mesh of result.meshes) {
          for (let i = 0; i < mesh.vertices.length; i += 3) {
            box.expandByPoint(
              new THREE.Vector3(mesh.vertices[i], mesh.vertices[i + 1], mesh.vertices[i + 2])
            );
          }
        }
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const cameraZ = maxDim * 1.6;

        setScene({ meshes: result.meshes, center, cameraZ });
        setStatus("ready");
      } catch (e) {
        console.error("[TTGOViewer] load failed:", e);
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {status !== "ready" && (
        <p
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,235,224,0.3)",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {status === "loading" ? "Loading model…" : "Model unavailable"}
        </p>
      )}

      {scene && (
        <Canvas
          camera={{ position: [0, 0, scene.cameraZ], fov: 45, near: 0.01, far: scene.cameraZ * 10 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => gl.setClearColor("#060606", 0)}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[scene.cameraZ, scene.cameraZ, scene.cameraZ]} intensity={1.2} color="#F0EBE0" />
          <pointLight position={[-scene.cameraZ, scene.cameraZ * 0.5, scene.cameraZ * 0.5]} intensity={0.7} color="#FF2D00" />
          <SceneContents scene={scene} dragging={dragging} setDragging={setDragging} />
        </Canvas>
      )}

      {status === "ready" && !dragging && (
        <p
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "8px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,235,224,0.2)",
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
