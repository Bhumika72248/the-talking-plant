import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cone } from '@react-three/drei';
import * as THREE from 'three';

const Plant3DModel = ({ mood, health }) => {
  const plantRef = useRef();
  const leavesRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (plantRef.current) {
      plantRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      plantRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  const getMoodColor = () => {
    if (mood.includes('Thirsty')) return '#8B4513';
    if (mood.includes('Hot')) return '#FF4500';
    if (mood.includes('Shade')) return '#696969';
    if (mood.includes('Happy')) return '#32CD32';
    return '#228B22';
  };

  const getHealthScale = () => {
    return 0.8 + (health / 100) * 0.4;
  };

  return (
    <group ref={plantRef} scale={getHealthScale()}>
      {/* Pot */}
      <Cone
        args={[1, 1.5, 8]}
        position={[0, -1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? '#8B4513' : '#654321'} 
          roughness={0.8}
        />
      </Cone>
      
      {/* Soil */}
      <Sphere args={[0.9, 16, 8]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#3E2723" roughness={1} />
      </Sphere>
      
      {/* Stem */}
      <Box args={[0.1, 2, 0.1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={getMoodColor()} />
      </Box>
      
      {/* Leaves */}
      <group ref={leavesRef}>
        {[...Array(6)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.3, 8, 6]}
            position={[
              Math.cos((i * Math.PI * 2) / 6) * 0.8,
              1.2 + Math.sin(i) * 0.2,
              Math.sin((i * Math.PI * 2) / 6) * 0.8
            ]}
          >
            <meshStandardMaterial 
              color={getMoodColor()}
              transparent
              opacity={0.8}
            />
          </Sphere>
        ))}
      </group>
      
      {/* Glow effect for happy mood */}
      {mood.includes('Happy') && (
        <Sphere args={[2, 16, 16]} position={[0, 0.5, 0]}>
          <meshBasicMaterial 
            color="#39ff14" 
            transparent 
            opacity={0.1}
          />
        </Sphere>
      )}
    </group>
  );
};

const Plant3D = ({ mood = 'Happy 🌸', health = 85 }) => {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-200 to-green-100">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39ff14" />
        <Plant3DModel mood={mood} health={health} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Plant3D;