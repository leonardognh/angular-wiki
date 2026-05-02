import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>🅰️ {siteConfig.title}</h1>
      <p style={{ fontSize: "1.4rem", opacity: 0.8 }}>{siteConfig.tagline}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          className="button button--primary button--lg"
          to="/docs/trilhas/iniciante"
        >
          Sou iniciante
        </Link>
        <Link
          className="button button--secondary button--lg"
          to="/docs/trilhas/intermediario"
        >
          Já sei o básico
        </Link>
        <Link
          className="button button--secondary button--lg"
          to="/docs/trilhas/migracao-signals"
        >
          Quero migrar pra Signals
        </Link>
      </div>
    </header>
  );
}

function EraCards() {
  const eras = [
    {
      emoji: "🏛️",
      title: "Era Clássica",
      version: "v2–14",
      desc: "Modules, class-based services, RxJS, decorators. A fundação de tudo.",
      link: "/docs/era-classica",
    },
    {
      emoji: "🔀",
      title: "Era Transição",
      version: "v14–16",
      desc: "Standalone, inject(), functional guards. Simplificação sem quebrar.",
      link: "/docs/era-transicao",
    },
    {
      emoji: "⚡",
      title: "Era Moderna",
      version: "v17+",
      desc: "Signals, @if/@for/@defer, zoneless. O futuro já é presente.",
      link: "/docs/era-moderna",
    },
  ];

  return (
    <section style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {eras.map((era) => (
          <Link
            key={era.title}
            to={era.link}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "12px",
              padding: "1.5rem",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "var(--ifm-color-primary)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor =
                "var(--ifm-color-emphasis-300)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: "2rem" }}>{era.emoji}</div>
            <h3>
              {era.title}{" "}
              <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                ({era.version})
              </span>
            </h3>
            <p style={{ opacity: 0.8, margin: 0 }}>{era.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Home"
      description="Documentação Angular em pt-BR — do clássico ao moderno, sem enrolação."
    >
      <HomepageHeader />
      <EraCards />
    </Layout>
  );
}
