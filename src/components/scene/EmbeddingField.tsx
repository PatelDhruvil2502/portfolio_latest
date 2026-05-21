import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

const POINT_COUNT = 1400;
const EDGE_COUNT = 60;

const FieldPoints = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3);
    for (let i = 0; i < POINT_COUNT; i++) {
      // sphere-ish distribution with a few dense clusters
      const r = Math.cbrt(Math.random()) * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;

    // gentle parallax toward mouse
    const [mx, my] = mouse.current;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mx * 0.4, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -my * 0.4, 0.04);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f5ede1"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
};

const HighlightNodes = () => {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const pts: { pos: [number, number, number]; color: string; size: number }[] = [];
    const labels = [
      [2.3, 1.1, 0.8, "#ff5e3a"],
      [-2.6, 0.4, -1.2, "#ff5e3a"],
      [1.1, -1.9, 1.4, "#b8ff5e"],
      [-1.5, 1.8, -2.2, "#b8ff5e"],
      [0.4, 2.4, -0.6, "#b8ff5e"],
      [-0.8, -2.2, 1.8, "#ff5e3a"],
      [3.0, -0.6, -0.4, "#b8ff5e"],
      [-2.2, -1.6, 0.3, "#ff5e3a"],
    ] as const;
    labels.forEach((l) => {
      pts.push({
        pos: [l[0] as number, l[1] as number, l[2] as number],
        color: l[3] as string,
        size: 0.05 + Math.random() * 0.06,
      });
    });
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.04;
      group.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 24, 24]} />
          <meshBasicMaterial color={n.color} />
        </mesh>
      ))}
    </group>
  );
};

const Edges = () => {
  const group = useRef<THREE.Group>(null);

  const segments = useMemo(() => {
    const out: { from: [number, number, number]; to: [number, number, number] }[] = [];
    for (let i = 0; i < EDGE_COUNT; i++) {
      const a: [number, number, number] = [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ];
      // pick a "close" endpoint
      const b: [number, number, number] = [
        a[0] + (Math.random() - 0.5) * 2.5,
        a[1] + (Math.random() - 0.5) * 2.5,
        a[2] + (Math.random() - 0.5) * 2.5,
      ];
      out.push({ from: a, to: b });
    }
    return out;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.04;
      group.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group ref={group}>
      {segments.map((s, i) => (
        <Line
          key={i}
          points={[s.from, s.to]}
          color="#f5ede1"
          lineWidth={0.5}
          transparent
          opacity={0.12}
        />
      ))}
    </group>
  );
};

const CameraDrift = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
  const { camera } = useThree();
  useFrame(() => {
    const [mx, my] = mouse.current;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -my * 0.8, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

type Props = { mouse: React.MutableRefObject<[number, number]> };

const EmbeddingField = ({ mouse }: Props) => {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.6]}
    >
      <CameraDrift mouse={mouse} />
      <fog attach="fog" args={["#0b0a14", 5, 14]} />
      <FieldPoints mouse={mouse} />
      <Edges />
      <HighlightNodes />
    </Canvas>
  );
};

export default EmbeddingField;
