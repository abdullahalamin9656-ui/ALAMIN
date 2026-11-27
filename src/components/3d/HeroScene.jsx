
import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  OrbitControls
} from '@react-three/drei';

function LaptopModel() {
  return (
    <group rotation={[-0.15, -0.35, 0]}>
      {/* Laptop screen */}
      <mesh position={[0, 1.05, -0.42]}
        rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.5, 1.65, 0.08]} />
        <meshStandardMaterial
          color="#111c31"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Display */}
      <mesh position={[0, 1.05, -0.365]}
        rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[2.3, 1.45]} />
        <meshStandardMaterial
          color="#006dff"
          emissive="#008cff"
          emissiveIntensity={0.65}
          metalness={0.5}
        />
      </mesh>

      {/* Laptop base */}
      <mesh position={[0, 0.18, 0.35]}
        rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.7, 0.1, 1.8]} />
        <meshStandardMaterial
          color="#899bad"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.24, 0.3]}>
        <boxGeometry args={[1.8, 0.025, 0.65]} />
        <meshStandardMaterial color="#101a2b" />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '420px' }}>
      <Canvas camera={{ position: [4, 3, 5], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
          color="#b9eaff"
        />
        <pointLight
          position={[-3, 2, 2]}
          intensity={25}
          color="#008cff"
        />

        <Float speed={2} rotationIntensity={0.3}
          floatIntensity={0.5}>
          <LaptopModel />
        </Float>

        <ContactShadows
          position={[0, -0.1, 0]}
          opacity={0.4}
          blur={2}
        />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}
