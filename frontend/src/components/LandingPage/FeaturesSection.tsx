import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'RAG Chatbot 🧠',
        description: (
            <>
                Ask complex questions about robotics and physics. Our <strong>Retrieval-Augmented Generation</strong> AI understands the context of the entire textbook to give you precise answers.
            </>
        ),
    },
    {
        title: 'Personalized Learning 👤',
        description: (
            <>
                Adapts to your role—whether you're a <strong>Student</strong>, <strong>Researcher</strong>, or <strong>Hobbyist</strong>. Content serves your specific needs.
            </>
        ),
    },
    {
        title: 'Physical AI Simulations 🦾',
        description: (
            <>
                Don't just read—<strong>interact</strong>. Run high-fidelity simulations of humanoid joints, sensors, and control loops directly in your browser.
            </>
        ),
    },
];

function Feature({ title, description }) {
    return (
        <div className={styles.featureCard}>
            <h3 style={{ color: 'var(--ifm-color-primary)', marginBottom: '1rem' }}>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default function FeaturesSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>AI-Native <span>Features</span></h2>
                <div className={styles.featureGrid}>
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
