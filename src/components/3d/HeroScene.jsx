
import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  OrbitControls,

} from '@react-three/drei';

function LaptopModel() {
  return (
    <group rotation={[-0.12, -0.35, 0]}>

      {/* Laptop Screen Body */}
      <mesh position={[0, 1.15, -0.48]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.65, 1.75, 0.09]} />
        <meshStandardMaterial
          color="#192b43"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Display */}
      <mesh position={[0, 1.15, -0.425]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[2.42, 1.5]} />
        <meshStandardMaterial
          color="#06285c"
          emissive="#087cff"
          emissiveIntensity={1.3}
          metalness={0.4}
          roughness={0.15}
        />
      </mesh>

      {/* Screen Light */}
      <mesh position={[0, 1.15, -0.415]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[1.9, 0.035]} />
        <meshBasicMaterial color="#00d9ff" />
      </mesh>

      {/* Laptop Base */}
      <mesh position={[0, 0.18, 0.35]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.85, 0.12, 1.95]} />
        <meshStandardMaterial
          color="#a5b8ca"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.25, 0.22]}>
        <boxGeometry args={[2.05, 0.025, 0.85]} />
        <meshStandardMaterial color="#17263c" />
      </mesh>

      {/* Keyboard Glow */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.91 + col * 0.165,
              0.267,
              -0.08 + row * 0.19
            ]}
          >
            <boxGeometry args={[0.105, 0.012, 0.105]} />
            <meshBasicMaterial color="#1689ff" />
          </mesh>
        ))
      )}

      {/* Trackpad */}
      <mesh position={[0, 0.255, 0.88]}>
        <boxGeometry args={[0.85, 0.018, 0.48]} />
        <meshStandardMaterial
          color="#536b83"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Hinge */}
      <mesh position={[0, 0.32, -0.53]}>
        <boxGeometry args={[2.4, 0.08, 0.1]} />
        <meshStandardMaterial color="#5c7189" metalness={1} />
      </mesh>

    </group>
  );
}

function EnergyRing({ radius, rotation, color }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={3}
        color="#c5e8ff"
      />
      <pointLight
        position={[-3, 2, 2]}
        intensity={25}
        color="#008cff"
      />
      <pointLight
        position={[3, 1, -3]}
        intensity={12}
        color="#00d9ff"
      />

      <Float
        speed={1.6}
        rotationIntensity={0.18}
        floatIntensity={0.35}
      >
        <LaptopModel />
      </Float>

      <group position={[0, 0.7, 0]} rotation={[0.9, 0.2, 0.2]}>
        <EnergyRing radius={2.15} rotation={[0, 0, 0]} color="#087cff" />
        <EnergyRing radius={2.35} rotation={[0.5, 0.3, 0]} color="#00d9ff" />
      </group>

      <ContactShadows
        position={[0, -0.15, 0]}
        opacity={0.4}
        blur={2.5}
        scale={7}
      />

      <Environment preset="city" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '420px' }}>
      <Canvas
        camera={{ position: [4, 3, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}
