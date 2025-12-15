import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function SimulationTeaser() {
    return (
        <section id="simulations" className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Interactive <span>Simulations</span></h2>
                <div className={styles.simContainer}>
                    <div className={styles.gridBackground}></div>
                    <div className={styles.simPlaceholder}>
                        <h3>Interactive Physics Engine Loading...</h3>
                        <p>Experience real-time inverse kinematics directly in your browser.</p>
                        <Link to="/simulation" className="button button--primary button--lg" style={{ marginTop: '1rem' }}>
                            Launch Demo Environment
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
