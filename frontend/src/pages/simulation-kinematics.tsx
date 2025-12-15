import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../components/LandingPage/styles.module.css';

export default function KinematicsSimulation() {
    const [rotation, setRotation] = useState(0);

    // Simple animation loop simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(r => (r + 1) % 360);
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout title="Kinematics Simulation" description="Interactive Arm Simulation">
            <div className="container" style={{ padding: '2rem', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/simulation" className="button button--secondary">← Back to Lobby</Link>
                    <h1>Basic Kinematics Environment</h1>
                    <div className="badge badge--success">Running</div>
                </div>

                <div style={{
                    flex: 1,
                    background: '#000',
                    borderRadius: '12px',
                    border: '1px solid #00f2ea',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Grid Background */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(0, 242, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 234, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        opacity: 0.3
                    }}></div>

                    {/* Simulated Robot Arm */}
                    <div style={{ position: 'relative', width: '400px', height: '400px' }}>
                        {/* Base */}
                        <div style={{
                            position: 'absolute',
                            bottom: '50px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '80px',
                            height: '20px',
                            background: '#333',
                            border: '1px solid #555'
                        }}></div>

                        {/* Link 1 */}
                        <div style={{
                            position: 'absolute',
                            bottom: '70px',
                            left: '50%',
                            width: '20px',
                            height: '150px',
                            background: '#00f2ea',
                            transformOrigin: 'bottom center',
                            transform: `translateX(-50%) rotate(${Math.sin(rotation * 0.02) * 45}deg)`,
                            boxShadow: '0 0 15px rgba(0, 242, 234, 0.5)'
                        }}>
                            {/* Joint 2 */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: '16px',
                                height: '100px',
                                background: '#ff0050',
                                transformOrigin: 'top center',
                                transform: `translateX(-50%) rotate(${Math.sin(rotation * 0.05) * 90}deg)`,
                                boxShadow: '0 0 15px rgba(255, 0, 80, 0.5)'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#00f2ea', fontFamily: 'monospace' }}>
                        <p>JOINT_1: {(Math.sin(rotation * 0.02) * 45).toFixed(2)}°</p>
                        <p>JOINT_2: {(Math.sin(rotation * 0.05) * 90).toFixed(2)}°</p>
                        <p>FPS: 60</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
