import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../components/LandingPage/styles.module.css';

export default function Simulation() {
    return (
        <Layout title="Simulation Lobby" description="Launch Physical AI Simulations">
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 className={styles.heroTitle}>Simulation <span style={{ color: '#00f2ea' }}>Lobby</span></h1>
                <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    Welcome to the Digital Twin interface. Select an environment to launch your simulated robot.
                </p>

                <div className={styles.featureGrid}>
                    {/* Card 1 */}
                    <div className={styles.featureCard}>
                        <h3>🤖 Basic Kinematics</h3>
                        <p>Debug joint limits and coordinate frames on a simple arm.</p>
                        <Link to="/simulation-kinematics" className="button button--primary button--block">Launch Environment</Link>
                    </div>

                    {/* Card 2 */}
                    <div className={styles.featureCard}>
                        <h3>⚖️ Balance Control</h3>
                        <p>Test your PID controllers on an inverted pendulum.</p>
                        <button className="button button--secondary button--block" disabled>Locked (Module 3)</button>
                    </div>

                    {/* Card 3 */}
                    <div className={styles.featureCard}>
                        <h3>🏙️ Nav2 World</h3>
                        <p>Full autonomous navigation in a warehouse environment.</p>
                        <button className="button button--secondary button--block" disabled>Locked (Module 4)</button>
                    </div>
                </div>

                <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid #333', borderRadius: '12px' }}>
                    <h3>⚠️ WebGL Status</h3>
                    <p>Physics Engine: <strong>Ready</strong></p>
                    <p>Rendering: <strong>60 FPS</strong></p>
                </div>
            </div>
        </Layout>
    );
}
