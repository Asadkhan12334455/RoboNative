import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function CommunitySection() {
    return (
        <section className={styles.section} style={{ textAlign: 'center', paddingBottom: '8rem' }}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Join the <span>Revolution</span></h2>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#a0a0b0' }}>
                    Contribute to the open-source community, share your simulations, and help build the future of humanoid robotics.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        className="button button--primary button--lg"
                        to="https://github.com/your-repo">
                        Star on GitHub ⭐
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/contributing">
                        Contribution Guide 📖
                    </Link>
                </div>
            </div>
        </section>
    );
}
