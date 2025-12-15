import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const ModuleList = [
    {
        title: 'Module 1: Foundations',
        link: '/docs/module-1/intro',
        topics: ['History of Humanoids', 'Basic Kinematics', 'Actuators'],
    },
    {
        title: 'Module 2: Sensing',
        link: '/docs/module-2/intro',
        topics: ['Computer Vision', 'LIDAR/Depth', 'Proprioception'],
    },
    {
        title: 'Module 3: Control',
        link: '/docs/module-3/intro',
        topics: ['PID Control', 'MPC', 'Reinforcement Learning'],
    },
    {
        title: 'Capstone: VLA',
        link: '/docs/capstone/intro',
        topics: ['Voice-Language-Action', 'Sim-to-Real', 'Full Deployment'],
    },
];

export default function CurriculumSection() {
    return (
        <section className={styles.section} style={{ background: 'rgba(5, 5, 16, 0.4)' }}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Curriculum <span>Structure</span></h2>
                <div className={styles.featureGrid}>
                    {ModuleList.map((module, idx) => (
                        <div key={idx} className={styles.featureCard}>
                            <h3>{module.title}</h3>
                            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.5rem', color: '#a0a0b0' }}>
                                {module.topics.map((topic, tIdx) => (
                                    <li key={tIdx}>{topic}</li>
                                ))}
                            </ul>
                            <Link to={module.link} className="button button--secondary button--block">
                                Explore Module
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
