import { motion } from "framer-motion";
import { Card } from "../../../components/Card";

const skills = [
  "Desarrollo Fullstack",
  "Algoritmos e Inteligencia Artificial",
  "Estructura de Datos",
  "Desarrollo Backend",
  "Frontend Moderno",
  "Arquitectura de Software",
  "Cloud & Infraestructura",
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Sobre mí
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="heading"
          >
            Fullstack
            <br />
            <span>Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-thin leading-relaxed text-brand-textMuted"
          >
            Graduado del{" "}
            <strong>Instituto Tecnológico Superior de Xalapa</strong>, Ingeniero
            en Sistemas Computacionales con más de{" "}
            <strong>5 años de experiencia</strong> construyendo aplicaciones web
            de alto impacto.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-thin leading-relaxed text-brand-textMuted"
          >
            Especializado en arquitecturas Fullstack modernas. Profesional
            autodidacta con enfoque en software{" "}
            <strong>modular, mantenible y de alto impacto</strong>, con
            capacidad de adaptación rápida a nuevas tecnologías.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bio-extra text-sm text-brand-textMuted"
          >
            Disfruto explorar problemas complejos que combinan optimización,
            lógica y diseño estructural. Además, tengo una fuerte pasión por el
            desarrollo de videojuegos como espacio para integrar creatividad,
            ingeniería y simulación interactiva.
          </motion.p>
        </div>

        <div className="panel-right">
          <div className="exp-header">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="section-label"
            >
              Experiencia Laboral
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <div className="org-name">
                  H. Ayuntamiento de San Juan Bautista Tuxtepec, Oaxaca
                </div>
                <span className="badge">2021 – 2024</span>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="projects-label">Proyectos destacados</div>
            <div className="projects-list">
              {projects.map((p) => (
                <div className="project-item">
                  <span className="project-icon">{p.icon}</span>
                  <div className="project-info">
                    <span className="project-name">{p.name}</span>
                    <span className="project-tag">{p.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
                key={skill}
                className="pill"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
