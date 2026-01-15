import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bmiHome from "./assets/bmi-home.jpg";
import bmiHistory from "./assets/bmi-history.jpg";

import financeTransactions from "./assets/finance-transactions.png";
import financeReports from "./assets/finance-reports.png";
import financeBudgets from "./assets/finance-budgets.png";
import financeSettings from "./assets/finance-settings.png";
import financeLogin from "./assets/finance-login.png";
import financeMenu from "./assets/finance-menu.png";

import bookLogin from "./assets/book-login.jpg";
import bookCreateAccount from "./assets/book-create-account.jpg";
import bookHome from "./assets/book-home.jpg";
import bookAddEdit from "./assets/book-add-edit.jpg";

import shMainPage from "./assets/main-page.png";
import shLogin from "./assets/login.png";
import shCreateAccount from "./assets/create-account.png";
import shAdminDashboard from "./assets/admin-dashboard.png";
import shDoctorDashboard from "./assets/doctor-dashboard.png";
import shDoctorPrescription from "./assets/doctor-prescription.png";
import shPatientBooking from "./assets/patient-booking.png";
import shPatientHistory from "./assets/patient-history.png";

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const chipPop = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.03, ease: "easeOut" },
  }),
};

// --- Components ---

function Tag({ children }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/85 shadow-sm"
    >
      {children}
    </motion.span>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-medium transition",
        "border border-white/10 backdrop-blur",
        active
          ? "bg-purple-500/20 text-white shadow-[0_0_0_1px_rgba(168,85,247,0.35)]"
          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// New Component: Full Screen Image Modal
function ImageModal({ src, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose} // Click backdrop to close
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Image Container */}
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        src={src}
        alt="Full view"
        className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
      />
    </motion.div>
  );
}

function ProjectCard({ project, onImageClick }) {
  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:bg-white/[0.07]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/70">
              {project.type}
            </span>
          </div>

          <p className="mt-2 text-white/75">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t, i) => (
              <motion.div
                key={t}
                custom={i}
                variants={chipPop}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Tag>{t}</Tag>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-purple-500/25 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500/30"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      {project.features?.length ? (
        <ul className="mt-5 grid gap-2 text-white/70 md:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-300/80" />
              <span className="min-w-0">{f}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {project.screenshots?.length ? (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white/80">Screenshots</h4>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.map((s) => (
              <motion.figure
                key={s.label}
                whileHover={{ y: -4 }}
                onClick={() => onImageClick(s.src)} // Add click handler
                className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                <img
                  src={s.src}
                  alt={s.label}
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white/90">
                  {s.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for modal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = useMemo(
    () => [
      {
        id: "finance",
        title: "FinanceApp",
        type: "Android",
        github: "https://github.com/AnasAlhatti/Financeapp",
        description:
          "Personal finance app with modular structure. Track income and expenses, manage budgets, visualize reports, switch currencies, and export or import CSV.",
        tags: [
          "Kotlin",
          "Jetpack Compose",
          "MVVM",
          "Clean Architecture",
          "Room",
          "DataStore",
          "Hilt",
          "Coroutines",
          "Flow",
        ],
        features: [
          "Transactions: add, edit, delete income and expenses",
          "Budgets with live progress tracking",
          "Reports with charts and filters",
          "Multi-currency support and compact money formatting",
          "Receipt scanning placeholder flow",
          "CSV export and import",
          "Login and navigation drawer",
        ],
        screenshots: [
          { src: financeTransactions, label: "Transactions" },
          { src: financeReports, label: "Reports" },
          { src: financeBudgets, label: "Budgets" },
          { src: financeSettings, label: "Settings" },
          { src: financeLogin, label: "Login" },
          { src: financeMenu, label: "Navigation Drawer" },
        ],
      },
      {
        id: "book",
        title: "BookManager",
        type: "Android",
        github: "https://github.com/AnasAlhatti/Book-Manager",
        description:
          "Reading list manager. Add books, track progress with live bars, search and filter, and optionally sign in to sync.",
        tags: [
          "Kotlin",
          "MVVM",
          "Room",
          "Firebase Auth",
          "Firestore",
          "Coroutines",
          "Flow",
          "Material UI",
          "DataStore",
        ],
        features: [
          "Email, Google sign in, and guest mode",
          "Create, edit, delete books",
          "Progress tracking and auto complete at 100%",
          "Search and filter",
          "Room persistence",
          "Optional Firestore sync",
        ],
        screenshots: [
          { src: bookLogin, label: "Login" },
          { src: bookCreateAccount, label: "Create Account" },
          { src: bookHome, label: "Home" },
          { src: bookAddEdit, label: "Add or Edit" },
        ],
      },
      {
        id: "bmi",
        title: "BMI Calculator",
        type: "Android",
        github: "https://github.com/AnasAlhatti/BMI-Calculator",
        description:
          "BMI calculator built with Kotlin and Jetpack Compose with unit switching and history tracking.",
        tags: ["Kotlin", "Jetpack Compose", "State", "Android Studio"],
        features: [
          "BMI calculation from weight and height",
          "Metric and imperial units",
          "History tracking",
          "Modern Compose UI",
        ],
        screenshots: [
          { src: bmiHome, label: "Home" },
          { src: bmiHistory, label: "History" },
        ],
      },
      {
        id: "hospital",
        title: "Smart Hospital Appointment System",
        type: "Web",
        github: null,
        description:
          "Full-stack hospital platform with role-based access for Patients, Doctors, and Admins. Hybrid frontend using Thymeleaf for auth pages and React for dashboards. Secure sessions via HttpOnly cookies.",
        tags: [
          "React",
          "JavaScript",
          "Spring Boot",
          "Spring Security",
          "Thymeleaf",
          "MySQL",
          "AWS EC2",
        ],
        features: [
          "RBAC with separate dashboards for patient, doctor, admin",
          "Patients browse departments and book appointments",
          "Doctors accept or reject requests and write diagnosis and prescriptions",
          "Prescription search integrated with OpenFDA API",
          "Admins manage users and departments and assign doctors",
          "Deployed on AWS EC2 with backend service and frontend process manager",
        ],
        screenshots: [
          { src: shMainPage, label: "Landing Page" },
          { src: shLogin, label: "Login" },
          { src: shCreateAccount, label: "Create Account" },
          { src: shPatientBooking, label: "Patient Dashboard" },
          { src: shPatientHistory, label: "Medical History" },
          { src: shDoctorDashboard, label: "Doctor Dashboard" },
          { src: shDoctorPrescription, label: "Prescription Modal" },
          { src: shAdminDashboard, label: "Admin Dashboard" },
        ],
      },
    ],
    []
  );

  const filters = ["All", "Android", "Web"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter, projects]);

  const skillGroups = useMemo(
    () => [
      {
        title: "Android",
        chips: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Room", "Hilt", "Firebase", "Coroutines", "Flow"],
      },
      {
        title: "Web",
        chips: ["React", "JavaScript", "HTML", "CSS", "Spring Boot", "Spring Security", "Thymeleaf", "MySQL"],
      },
      {
        title: "Tools",
        chips: ["Git", "Android Studio", "IntelliJ IDEA", "VS Code", "Postman", "AWS EC2"],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#05010a] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12001f] via-[#05010a] to-black" />
        <div className="absolute left-[-20%] top-[-20%] h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[90px]" />
        <div className="absolute right-[-20%] top-[10%] h-[520px] w-[520px] rounded-full bg-fuchsia-600/10 blur-[110px]" />
        <div className="absolute bottom-[-30%] left-[10%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[110px]" />
      </div>

      {/* Image Modal - Rendered at root level */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      {/* Sticky Navbar */}
      <header
        className={[
          "sticky top-0 z-50 transition",
          scrolled
            ? "border-b border-white/10 bg-black/40 backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.7)]" />
            <span className="text-sm font-semibold tracking-wide text-white/90">
              Anas Alhatti
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#skills">
              Skills
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/AnasAlhatti"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              GitHub
            </a>
            <a
              href="/cv.pdf"
              className="rounded-xl bg-purple-500/25 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500/30"
            >
              Download CV
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:pb-16 md:pt-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur md:p-10"
        >
          <p className="text-sm font-medium text-purple-200/80">Software Engineer</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Android Developer and Full-Stack Web
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
              Kotlin, Jetpack Compose, MVVM, Clean Architecture, Room, Firebase,
              plus React and Spring Boot. Focused on building clean, scalable
              apps with strong UI and solid architecture
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Kotlin", "Jetpack Compose", "MVVM", "Room", "React", "Spring Boot"].map((t, i) => (
              <motion.div key={t} custom={i} variants={chipPop} initial="hidden" animate="show">
                <Tag>{t}</Tag>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-purple-500/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-500/30"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-semibold text-white">Featured Projects</h2>
            <p className="mt-2 text-white/70">
              Filter by platform and click screenshots to view details.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Pill key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>
                {f}
              </Pill>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-8 grid gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onImageClick={(src) => setSelectedImage(src)} // Pass click handler
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-5 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-3xl font-semibold text-white">Skills</h2>
          <p className="mt-2 text-white/70">Tech tags animate in, without showing any numbers.</p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {skillGroups.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.chips.map((c, i) => (
                  <motion.div
                    key={c}
                    custom={i}
                    variants={chipPop}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Tag>{c}</Tag>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur md:p-10"
        >
          <h2 className="text-2xl font-semibold text-white">Contact</h2>

          <div className="mt-6 grid gap-3 text-white/80">
            <p>Email: anasalhati@gmail.com</p>
            <p>GitHub: github.com/AnasAlhatti</p>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-white/40">
          Built with React, Tailwind, and Framer Motion.
        </p>
      </section>
    </div>
  );
}