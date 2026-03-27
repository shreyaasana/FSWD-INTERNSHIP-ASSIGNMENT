import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import './App.css'

const PROJECTS = [
  { id: '01', title: 'Resume Page', desc: 'HTML resume showcasing personal and academic info' },
  { id: '02', title: 'First Website', desc: 'Personal profile page with basic HTML structure' },
  { id: '03', title: 'Styled Profile', desc: 'Enhanced profile design with CSS styling' },
  { id: '04', title: 'Hero Page', desc: 'Responsive hero section using Flexbox layout' },
  { id: '05', title: 'Interactive Form', desc: 'Form with client-side validation logic' },
  { id: '06', title: 'Student Manager', desc: 'CRUD operations with arrays and objects' },
  { id: '07', title: 'Weather Dashboard', desc: 'Live weather data using Open-Meteo API' },
  { id: '08', title: 'Mood Tracker', desc: 'React state management for mood logging' },
  { id: '09', title: 'Task List', desc: 'Dynamic task management with React hooks' },
  { id: '10', title: 'Signup Form', desc: 'Registration form with password strength meter' },
  { id: '11', title: 'Product Listing', desc: 'E-commerce style product UI components' },
  { id: '12', title: 'Hello Server', desc: 'Basic Node.js HTTP server implementation' },
]

const SKILLS = [
  { name: 'Python', level: 'strong' },
  { name: 'JavaScript', level: 'learning' },
  { name: 'React', level: 'learning' },
  { name: 'HTML/CSS', level: 'strong' },
  { name: 'Flask', level: 'strong' },
  { name: 'Java', level: 'strong' },
  { name: 'Firebase', level: 'learning' },
  { name: 'Git', level: 'learning' },
  { name: 'Photography', level: 'strong' },
]

const TIMELINE = [
  { year: '2026', event: 'SuprMentr Full-Stack Internship' },
  { year: '2025', event: 'Sortify IoT Project' },
  { year: '2025', event: 'Loan Prediction ML Project' },
  { year: '2023', event: 'Started B.Tech in CSE' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Shreya.</Link>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>Shreya N &copy; {new Date().getFullYear()} &mdash; Built with React</p>
    </footer>
  )
}

function Home() {
  return (
    <section className="page home-page">
      <div className="home-intro">
        <h1 className="home-name">Shreya N</h1>
        <p className="home-subtitle">Full-Stack Developer | Graphic Designer | Photographer</p>
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">B.Tech</span>
            <span className="stat-label">CSE</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">7+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">16</span>
            <span className="stat-label">Week Internship</span>
          </div>
        </div>
        <div className="learning-section">
          <h3>Currently Learning</h3>
          <div className="learning-tags">
            {['React', 'Flask', 'Node.js', 'Firebase'].map((tech) => (
              <span key={tech} className="learning-tag">{tech}</span>
            ))}
          </div>
        </div>
        <Link to="/projects" className="cta-btn">View My Work</Link>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="page about-page">
      <div className="about-card">
        <div className="about-header">
          <span className="about-icon">📸</span>
          <div>
            <h2>Shreya N</h2>
            <p className="about-role">Full Stack Web Dev Intern &amp; Designer</p>
          </div>
        </div>
        <p className="about-bio">
          A creative and driven B.Tech CSE student with a passion for building web
          applications, designing visuals, and capturing moments through photography.
          Currently interning at SuprMentr to sharpen full-stack development skills.
        </p>
      </div>

      <h3 className="section-heading">Journey</h3>
      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div key={i} className="timeline-item">
            <span className="timeline-year">{item.year}</span>
            <span className="timeline-event">{item.event}</span>
          </div>
        ))}
      </div>

      <h3 className="section-heading">Skills</h3>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div key={skill.name} className={`skill-chip ${skill.level}`}>
            {skill.name}
            <span className="skill-level">{skill.level}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="page projects-page">
      <h2 className="page-title">Projects</h2>
      <p className="page-desc">A collection of work built during my internship journey</p>
      <div className="projects-grid">
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="project-card">
            <span className="project-id">{proj.id}</span>
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="page contact-page">
      <h2 className="page-title">Get In Touch</h2>
      <p className="page-desc">Feel free to reach out for collaborations or just a chat</p>
      <div className="contact-cards">
        <div className="contact-card">
          <span className="contact-icon">📧</span>
          <h4>Email</h4>
          <a href="mailto:shreyasana3@gmail.com">shreyasana3@gmail.com</a>
        </div>
        <div className="contact-card">
          <span className="contact-icon">📍</span>
          <h4>Location</h4>
          <p>Bangalore, India</p>
        </div>
        <div className="contact-card">
          <span className="contact-icon">🎓</span>
          <h4>College</h4>
          <p>Global Academy of Technology</p>
        </div>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="page notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-msg">Oops! This page doesn't exist.</p>
      <Link to="/" className="cta-btn">Go Home</Link>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
