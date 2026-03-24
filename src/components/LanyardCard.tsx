/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import snorriFace from '@/assets/snorri_face.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// Lanyard stripe texture (generated programmatically)
function createLanyardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, 64, 0);
  gradient.addColorStop(0, '#7c3aed');
  gradient.addColorStop(0.5, '#a855f7');
  gradient.addColorStop(1, '#6d28d9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 1024);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(20, 0, 8, 1024);
  ctx.fillRect(36, 0, 8, 1024);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const faceTexture = useTexture(snorriFace);
  const lanyardTexture = useRef(createLanyardTexture());

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1] as any);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ] as any);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      (band.current!.geometry as any).setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <RigidBody ref={fixed} {...segmentProps} type="fixed" />
      <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody
        ref={card}
        {...segmentProps}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
        position={[2, -2, 0]}
      >
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <mesh
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={(e) => {
            (e.target as Element & { releasePointerCapture: (id: number) => void }).releasePointerCapture(e.pointerId);
            drag(false);
          }}
          onPointerDown={(e) => {
            (e.target as Element & { setPointerCapture: (id: number) => void }).setPointerCapture(e.pointerId);
            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
          }}
        >
          <boxGeometry args={[1.6, 2.25, 0.02]} />
          {/* Front face with photo */}
          <meshPhysicalMaterial
            map={faceTexture}
            roughness={0.3}
            metalness={0.1}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* Card back */}
        <mesh position={[0, 0, -0.015]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[1.6, 2.25, 0.001]} />
          <meshPhysicalMaterial color="#1e0a3c" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Purple glow ring at top */}
        <mesh position={[0, 1.1, 0]}>
          <torusGeometry args={[0.12, 0.04, 16, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
        </mesh>
      </RigidBody>

      {/* The lanyard rope */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#7c3aed"
          depthTest={false}
          resolution={[1200, 900]}
          useMap={1}
          map={lanyardTexture.current}
          repeat={[-3, 1]}
          lineWidth={0.06}
        />
      </mesh>
    </>
  );
}

export default function LanyardCard() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          interpolate
          gravity={[0, -40, 0]}
          timeStep={1 / 60}
        >
          <Band />
        </Physics>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
