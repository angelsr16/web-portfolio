import { Card } from "../../../components/Card";
import { Pill } from "../../../components/Pill";

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

          <p className="font-thin leading-relaxed text-brand-textMuted">
            Graduado del{" "}
            <strong>Instituto Tecnológico Superior de Xalapa</strong>, Ingeniero
            en Sistemas Computacionales con más de{" "}
            <strong>5 años de experiencia</strong> construyendo aplicaciones web
            de alto impacto.
          </p>

          <p className="font-thin leading-relaxed text-brand-textMuted">
            Especializado en arquitecturas Fullstack modernas. Profesional
            autodidacta con enfoque en software{" "}
            <strong>modular, mantenible y de alto impacto</strong>, con
            capacidad de adaptación rápida a nuevas tecnologías.
          </p>

          <p className="bio-extra text-sm text-brand-textMuted">
            Disfruto explorar problemas complejos que combinan optimización,
            lógica y diseño estructural. Además, tengo una fuerte pasión por el
            desarrollo de videojuegos como espacio para integrar creatividad,
            ingeniería y simulación interactiva.
          </p>
        </div>

        <div className="panel-right">
          <div className="exp-header">
            <div className="section-label">Experiencia Laboral</div>

            <Card>
              <div className="org-name">
                H. Ayuntamiento de San Juan Bautista Tuxtepec, Oaxaca
              </div>
              <span className="date-badge">2021 – 2024</span>
            </Card>
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

          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill) => (
              <Pill key={skill} className="skill-pill">
                {skill}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
