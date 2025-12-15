import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function HeroSection() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={styles.heroSection}>
            <div className="container">
                <h1 className={styles.heroTitle}>RoboNative</h1>
                <p className={styles.heroTagline}>
                    AI-Native Textbook for Physical AI & Humanoid Robotics.<br />
                    <strong>Build the Future of Physical AI & Humanoid Robotics</strong>
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        className="button button--primary button--lg"
                        to="/docs/table-of-contents">
                        Start Learning 🚀
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        to="/simulation">
                        Try Simulation 🤖
                    </Link>
                </div>
            </div>
        </header>
    );
}
