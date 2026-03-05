import { colors } from "../constants/tokens";

const skills = [
  "IA",
  "Patrones de diseño",
  "Estructura de Datos",
  "Node.js",
  "Express",
  "Firebase",
  "AWS",
];

const projects = [
  {
    name: "Plataforma Integral de Gestión de Obras Públicas",
    tag: "Reconocida por OGAIPO",
    icon: "🏗️",
  },
  {
    name: "Sistema de Monitoreo y Geolocalización de Transporte Urbano",
    tag: "Prototipo",
    icon: "🗺️",
  },
];

export default function AboutSection() {
  return (
    <section className="flex items-center justify-center">
      <div className="about-inner">
        <div className="panel-left">
          <div className="section-label">Sobre mí</div>

          <h1 className="heading">
            Fullstack
            <br />
            <span>Developer</span>
          </h1>

          <p
            style={{ color: colors.textMuted }}
            className="font-thin leading-relaxed"
          >
            Graduado del{" "}
            <strong>Instituto Tecnológico Superior de Xalapa</strong>, Ingeniero
            en Sistemas Computacionales con más de{" "}
            <strong>5 años de experiencia</strong> construyendo aplicaciones web
            de alto impacto.
          </p>

          <p
            style={{ color: colors.textMuted }}
            className="font-thin leading-relaxed"
          >
            Especializado en arquitecturas Fullstack modernas. Profesional
            autodidacta con enfoque en software{" "}
            <strong>modular, mantenible y de alto impacto</strong>, con
            capacidad de adaptación rápida a nuevas tecnologías.
          </p>

          <p style={{ color: colors.textMuted }} className="bio-extra text-sm">
            Disfruto explorar problemas complejos que combinan optimización,
            lógica y diseño estructural. Además, tengo una fuerte pasión por el
            desarrollo de videojuegos como espacio para integrar creatividad,
            ingeniería y simulación interactiva.
          </p>
        </div>

        <div className="panel-right">
          <div className="exp-header">
            <div className="section-label">Experiencia Laboral</div>

            <div className="org-card">
              <div className="org-name">
                H. Ayuntamiento de San Juan Bautista Tuxtepec, Oaxaca
              </div>
              <span className="date-badge">2021 – 2024</span>
            </div>
          </div>

          <div>
            <div className="projects-label">Proyectos destacados</div>
            <div className="projects-list">
              {projects.map((p) => (
                <div key={p.name} className="project-item">
                  <span className="project-icon">{p.icon}</span>
                  <div className="project-info">
                    <span className="project-name">{p.name}</span>
                    <span className="project-tag">{p.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-row">
            {skills.map((s) => (
              <span key={s} className="skill-pill">
                {s}
              </span>
            ))}
          </div>
          {/* <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-desc">Años de experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-desc">Proyectos gubernamentales</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7</span>
              <span className="stat-desc">Tecnologías core</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
