"use client";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { recipes, type Recipe } from "@/lib/recipes";
import * as THREE from "three";

// Actual kitchen world bounds: min(-3.55, 0, -4.04) max(3.02, 3.28, 2.10)
// Center: (-0.26, 1.64, -0.97) — all positions below are calibrated to this scale
const HOTSPOT_POSITIONS: [number, number, number][] = [
  [-2.2, 2.2, -1.0],
  [-1.1, 2.2, -2.0],
  [ 0.0, 2.2, -2.5],
  [ 1.1, 2.2, -2.0],
  [ 2.2, 2.2, -1.0],
];

function KitchenModel({ onLoaded }: { onLoaded: (box: THREE.Box3) => void }) {
  const { scene } = useGLTF("/models/scene.gltf");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Double-sided so interior walls are visible
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          (m as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
        });
        // Disable raycasting on kitchen geometry so hotspots always receive clicks
        mesh.raycast = () => {};
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    console.log("[Kitchen] world bounds min:", box.min);
    console.log("[Kitchen] world bounds max:", box.max);
    console.log("[Kitchen] world center:", box.getCenter(new THREE.Vector3()));
    onLoaded(box);
  }, [scene, onLoaded]);

  return <primitive object={scene} dispose={null} />;
}

function Hotspot({
  recipe,
  position,
  index,
}: {
  recipe: Recipe;
  position: [number, number, number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        baseY + Math.sin(clock.elapsedTime * 0.7 + index * 1.3) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Invisible hitbox */}
      <mesh
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/kitchen/${recipe.slug}`);
        }}
      >
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[hovered ? 0.18 : 0.13, hovered ? 0.22 : 0.16, 32]} />
        <meshBasicMaterial color="#FF2D00" transparent opacity={hovered ? 1 : 0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner solid dot */}
      <mesh>
        <sphereGeometry args={[hovered ? 0.10 : 0.07, 16, 16]} />
        <meshBasicMaterial color="#FF2D00" />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.009, 0.009, 0.85, 8]} />
        <meshBasicMaterial color="#FF2D00" transparent opacity={hovered ? 1 : 0.7} />
      </mesh>

      <Html
        center
        distanceFactor={3}
        position={[0, 0.55, 0]}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
            textAlign: "center",
            transition: "transform 0.25s ease",
            transform: hovered ? "translateY(-4px) scale(1.06)" : "translateY(0px) scale(1)",
          }}
        >
          <div
            style={{
              border: `1px solid ${hovered ? "#FF2D00" : "rgba(255,45,0,0.55)"}`,
              background: hovered ? "rgba(6,6,6,0.97)" : "rgba(6,6,6,0.85)",
              padding: "9px 16px",
              transition: "border-color 0.25s ease, background 0.25s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "24px",
                color: hovered ? "#FF2D00" : "#F0EBE0",
                lineHeight: 1,
                textTransform: "uppercase",
                margin: 0,
                transition: "color 0.25s ease",
              }}
            >
              {recipe.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "9px",
                color: hovered ? "rgba(255,45,0,0.8)" : "rgba(240,235,224,0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                margin: "4px 0 0 0",
                transition: "color 0.25s ease",
              }}
            >
              {recipe.category}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.03;
    camera.position.y +=
      (-mouse.current.y * 0.2 + 1.5 - camera.position.y) * 0.03;
    camera.position.z += (1.6 - camera.position.z) * 0.03;
    camera.lookAt(-0.26, 1.5, -2.5);
  });

  return null;
}

function SceneContents({
  onReady,
}: {
  onReady: (box: THREE.Box3) => void;
}) {
  const handleLoaded = useCallback(
    (box: THREE.Box3) => {
      onReady(box);
    },
    [onReady]
  );

  return (
    <>
      <CameraRig />
      <OrbitControls makeDefault={false} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-0.26, 3.2, -0.97]} intensity={1.5} color="#FF2D00" />
      <pointLight position={[-3, 2, 0]} intensity={0.8} color="#F0EBE0" />
      <pointLight position={[3, 2, 0]} intensity={0.8} color="#F0EBE0" />
      <pointLight position={[0, 1.5, -3.5]} intensity={0.6} color="#F0EBE0" />
      <KitchenModel onLoaded={handleLoaded} />
      {recipes.map((recipe, i) => (
        <Hotspot
          key={recipe.slug}
          recipe={recipe}
          position={HOTSPOT_POSITIONS[i]}
          index={i}
        />
      ))}
    </>
  );
}

export default function KitchenScene() {
  const [loaded, setLoaded] = useState(false);
  const [modelInfo, setModelInfo] = useState<string>("");

  const handleReady = useCallback((box: THREE.Box3) => {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    setModelInfo(
      `center: (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)}) | size: ${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)}`
    );
    setLoaded(true);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#060606" }}>
      {/* Loading overlay */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#060606",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "15vw",
                color: "rgba(240,235,224,0.06)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              KITCHEN
            </p>
            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,235,224,0.3)",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: "-2rem",
              }}
            >
              Firing up the stove...
            </p>
          </div>
        </div>
      )}

      {/* Debug info — remove once camera is dialled in */}
      {loaded && modelInfo && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            fontFamily: "var(--font-space-mono)",
            fontSize: "9px",
            color: "rgba(240,235,224,0.25)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          {modelInfo}
        </div>
      )}

      <Canvas
        camera={{ position: [0, 1.5, 1.6], fov: 75, near: 0.01, far: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#060606");
        }}
      >
        <Suspense fallback={null}>
          <SceneContents onReady={handleReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
