import { ReactNode } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./agradecimentos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

const contributors = [
  {
    name: "Leonardo Henrique",
    role: "Criador e Desenvolvedor",
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/leonardognh",
        icon: faGithub,
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/leohenriq95/",
        icon: faInstagram,
      },
    ],
    image: "https://github.com/leonardognh.png",
  },
];

export default function Agradecimentos(): ReactNode {
  return (
    <Layout
      title="Agradecimentos"
      description="Página de agradecimentos do Angular Wiki"
    >
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Agradecimentos</h1>
          <p className="hero__subtitle">
            Um grande obrigado a todas as pessoas que ajudaram a tornar esta
            documentação possível.
          </p>
        </div>
      </header>
      <main>
        <section className={styles.contributorsSection}>
          <div className="container">
            <div className={styles.contributorsGrid}>
              {contributors.map((person, index) => (
                <div key={index} className={styles.contributorCard}>
                  <img
                    src={person.image}
                    alt={person.name}
                    className={styles.profileImage}
                  />
                  <h2 className={styles.name}>{person.name}</h2>
                  <p className={styles.role}>{person.role}</p>
                  <div className={styles.socials}>
                    {person.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                          "button button--outline button--primary button--icon ",
                          styles.socialButtonSpacing
                        )}
                      >
                        <FontAwesomeIcon icon={social.icon} size="lg" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
