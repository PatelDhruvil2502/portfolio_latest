import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  FileText,
  Briefcase,
  Code,
  ArrowRight,
  ChevronRight,
  Building,
  Sparkles,
  Book,
  Monitor,
  Dices,
  GitCommit,
  Coffee,
  Database,
  Terminal,
  Server,
  Network,
} from "lucide-react";

// Define the navigation items
const navItems = [
  { name: "About Me", id: "about" },
  { name: "Education", id: "education" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact Me", id: "contact" },
];

// Define skills data with relevant icons from lucide-react
const skills = [
  { name: "React", icon: <Monitor size={32} className="text-gray-700" /> },
  { name: "JavaScript", icon: <Code size={32} className="text-gray-700" /> },
  { name: "Python", icon: <Terminal size={32} className="text-gray-700" /> },
  { name: "Tailwind CSS", icon: <Dices size={32} className="text-gray-700" /> },
  { name: "HTML5", icon: <Book size={32} className="text-gray-700" /> },
  { name: "CSS3", icon: <Network size={32} className="text-gray-700" /> },
  { name: "Node.js", icon: <Server size={32} className="text-gray-700" /> },
  {
    name: "Express.js",
    icon: <ArrowRight size={32} className="text-gray-700" />,
  },
  { name: "MongoDB", icon: <Database size={32} className="text-gray-700" /> },
  { name: "Git", icon: <GitCommit size={32} className="text-gray-700" /> },
  { name: "Docker", icon: <Coffee size={32} className="text-gray-700" /> },
];

// Define projects data
const projects = [
  {
    title: "Project Alpha",
    description:
      "A responsive web application for project management, built with React and a RESTful API.",
    image: "https://placehold.co/400x300/e5e7eb/555555?text=Project+Alpha",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Data Dashboard",
    description:
      "An interactive data visualization dashboard. Provides real-time insights with charts and graphs.",
    image: "https://placehold.co/400x300/e5e7eb/555555?text=Data+Dashboard",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "D3.js", "Express.js"],
  },
  {
    title: "E-commerce Store",
    description:
      "A full-stack e-commerce platform with a Stripe payment integration and user authentication.",
    image: "https://placehold.co/400x300/e5e7eb/555555?text=E-commerce+Store",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["MERN Stack", "Redux", "Stripe"],
  },
];

// Define education history
const educationHistory = [
  {
    school: "University Name",
    degree: "Master of Science in Computer Science",
    date: "2023 - 2025",
    description:
      "Focused on advanced algorithms, distributed systems, and machine learning.",
    id: "masters",
  },
  {
    school: "College Name",
    degree: "Bachelor of Technology in Information Technology",
    date: "2019 - 2023",
    description: "Specialized in software development and database management.",
    id: "bachelors",
  },
];

// Define experience history
const experienceHistory = [
  {
    company: "Tech Solutions Inc.",
    position: "Full Stack Developer",
    date: "Jan 2024 - Present",
    responsibilities: [
      "Developed and maintained web applications using React and Node.js.",
      "Designed and implemented RESTful APIs and integrated with MongoDB.",
      "Collaborated with a cross-functional team to deliver high-quality software.",
      "Implemented CI/CD pipelines to automate deployment processes.",
    ],
    skills: ["React", "Node.js", "Express.js", "MongoDB", "Git"],
  },
  {
    company: "Web Innovators LLC",
    position: "Junior Developer",
    date: "June 2023 - Dec 2023",
    responsibilities: [
      "Assisted in the development of front-end components using JavaScript and HTML/CSS.",
      "Contributed to code reviews and resolved bugs in the existing codebase.",
      "Gained experience with version control using Git.",
    ],
    skills: ["JavaScript", "HTML5", "CSS3", "Git"],
  },
];

// Define social media links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    url: "https://www.linkedin.com/in/dhruvil-patel",
  },
  {
    name: "GitHub",
    icon: <Github size={24} />,
    url: "https://github.com/PatelDhruvil2502",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    url: "mailto:your.email@example.com",
  },
];

/**
 * Renders a single experience item.
 * @param {object} props - The component props.
 * @param {object} props.exp - The experience data object.
 */
const ExperienceItem = ({ exp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-start mb-12 last:mb-0`}
    >
      {/* Skills Section */}
      <div className="w-full p-6 md:p-0">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Skills Learned:
        </h4>
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, skillIndex) => (
            <motion.div
              key={skillIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer shadow-md transform"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 rounded-2xl p-6 shadow-xl w-full md:col-start-2 transform hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center gap-3 mb-2">
          <Building size={24} className="text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">{exp.company}</h3>
        </div>
        <p className="text-lg text-blue-500 font-semibold">{exp.position}</p>
        <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
        <ul className="list-none space-y-2 text-gray-600">
          {exp.responsibilities.map((resp, respIndex) => (
            <li key={respIndex} className="flex items-start gap-2">
              <ChevronRight
                size={18}
                className="text-blue-500 flex-shrink-0 mt-1"
              />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

/**
 * The main App component for the portfolio website.
 */
const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isTyping, setIsTyping] = useState(true);
  const [hoveredEduId, setHoveredEduId] = useState(null);
  const [activeEduId, setActiveEduId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { scrollYProgress } = useScroll();
  const headerWidth = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["100%", "90%"]
  );
  const headerBorderRadius = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["1rem", "9999px"]
  );
  const headerBackgroundColor = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["rgb(255, 255, 255)", "rgba(255, 255, 255, 0.6)"]
  );

  // New transforms for the resume button
  const buttonWidth = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["11rem", "3rem"]
  ); // Initial width to small width
  const buttonPadding = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["1.5rem 1.5rem", "0.75rem"]
  ); // From horizontal padding to square padding
  const textOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]); // Text fades out early
  const textDisplay = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["block", "none"]
  );

  const isFormValid =
    formState.name.trim() !== "" &&
    formState.email.trim() !== "" &&
    formState.message.trim() !== "";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSending(true);
      // Simulate form submission success and reset
      setTimeout(() => {
        alert("Message sent successfully!");
        setIsSending(false);
        setFormState({ name: "", email: "", message: "" });
      }, 2000);
    }
  };

  useEffect(() => {
    // Scroll listener to update the active navigation section
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section) => {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulate initial typing effect for the hero text
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    // This effect is crucial for handling mobile-specific logic
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hero text typing animation component
  const HeroText = () => {
    const text =
      "A Full Stack Developer passionate about creating beautiful and functional web applications.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (!isTyping) {
        setDisplayedText(text);
        return;
      }
      if (index < text.length) {
        const typingTimeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(typingTimeout);
      }
    }, [index, isTyping, text]);

    return (
      <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl">
        {displayedText}
      </p>
    );
  };

  // Section title component with fade-in animation
  const SectionTitle = ({ children }) => (
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-bold text-gray-800 mb-10"
    >
      {children}
    </motion.h2>
  );

  return (
    <div className="bg-white text-gray-800 font-sans antialiased relative">
      {/* Header Container */}
      <motion.header
        style={{
          width: headerWidth,
          borderRadius: headerBorderRadius,
          backgroundColor: headerBackgroundColor,
          backdropFilter: "blur(8px)",
        }}
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all mx-auto max-w-7xl"
      >
        <div className="flex items-center justify-between p-4 md:px-8">
          {/* Main header content (logo + nav links) */}
          <div className="flex items-center gap-6">
            <div className="text-2xl font-extrabold text-gray-800">DP</div>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`
                    relative text-lg font-medium transition-all duration-300
                    ${
                      activeSection === item.id
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }
                  `}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 bottom-0 block h-0.5 w-full bg-blue-600"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Resume button with dynamic styling */}
          <motion.a
            style={{ width: buttonWidth, padding: buttonPadding }}
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold transition-all duration-300 shadow-lg rounded-full"
          >
            <FileText size={18} />
            <motion.span style={{ opacity: textOpacity, display: textDisplay }}>
              Resume
            </motion.span>
          </motion.a>
        </div>
      </motion.header>

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold mb-4"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Dhruvil Patel
              </span>
            </motion.h1>
            <HeroText />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a
                href="#projects"
                className="group relative overflow-hidden px-6 py-3 rounded-full bg-blue-600 text-white font-semibold transition-all duration-300 hover:bg-blue-700"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-hover:bg-opacity-10" />
              </a>
              <a
                href="#contact"
                className="group relative overflow-hidden px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-300"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-hover:bg-opacity-10" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="p-8 md:p-16 max-w-6xl mx-auto">
          <SectionTitle>About Me</SectionTitle>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/3 flex-shrink-0"
            >
              <motion.img
                src="https://placehold.co/400x400/d1d5db/555555?text=Dhruvil"
                alt="Dhruvil Patel"
                className="w-full h-auto rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-2/3"
            >
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                As a passionate Full Stack Developer, I thrive on bringing ideas
                to life through code. My expertise lies in the MERN stack, where
                I enjoy crafting everything from dynamic user interfaces to
                robust server-side logic and scalable databases. I am a
                detail-oriented problem-solver who is always eager to learn new
                technologies and improve my skills.
              </p>
              <p className="mt-4 text-gray-500 text-lg md:text-xl leading-relaxed">
                I believe that technology should not only be functional but also
                intuitive and visually appealing. My goal is to create seamless
                digital experiences that make a real impact. When I'm not
                coding, you can find me exploring new design trends or working
                on personal projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="p-8 md:p-16 max-w-6xl mx-auto">
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {educationHistory.map((edu, index) => (
              <motion.div
                key={index}
                onHoverStart={
                  !isMobile ? () => setHoveredEduId(edu.id) : undefined
                }
                onHoverEnd={!isMobile ? () => setHoveredEduId(null) : undefined}
                onClick={() =>
                  setActiveEduId(activeEduId === edu.id ? null : edu.id)
                }
                initial={{
                  width: isMobile ? "100%" : 200,
                  height: 200,
                  opacity: 0,
                  scale: 0.8,
                  x: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6 },
                }}
                animate={{
                  width:
                    hoveredEduId === edu.id || activeEduId === edu.id
                      ? 500
                      : 200,
                  x:
                    hoveredEduId === "masters" || activeEduId === "masters"
                      ? 0
                      : hoveredEduId === "bachelors" ||
                        activeEduId === "bachelors"
                      ? 0
                      : 0,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className={`relative rounded-full shadow-lg cursor-pointer transform w-full md:w-auto md:h-auto bg-gray-100`}
                style={{
                  backgroundColor:
                    hoveredEduId === edu.id || activeEduId === edu.id
                      ? "#2563EB"
                      : "#F3F4F6",
                  color:
                    hoveredEduId === edu.id || activeEduId === edu.id
                      ? "white"
                      : "#1F2937",
                  zIndex:
                    hoveredEduId === edu.id || activeEduId === edu.id ? 10 : 5,
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* Initial button content */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-4"
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity:
                      hoveredEduId === edu.id || activeEduId === edu.id ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold">
                    {edu.degree.split(" of")[0]}
                  </h3>
                </motion.div>

                {/* Rolled-out details content */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center overflow-hidden"
                  initial={{ opacity: 0, x: "0" }}
                  animate={{
                    opacity:
                      hoveredEduId === edu.id || activeEduId === edu.id ? 1 : 0,
                  }}
                  transition={{
                    x: {
                      duration:
                        hoveredEduId === edu.id || activeEduId === edu.id
                          ? 0.6
                          : 0,
                      delay:
                        hoveredEduId === edu.id || activeEduId === edu.id
                          ? 0.2
                          : 0,
                    },
                    opacity: {
                      duration:
                        hoveredEduId === edu.id || activeEduId === edu.id
                          ? 0.2
                          : 0,
                    },
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-bold">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-semibold">{edu.date}</p>
                  <p className="mt-2 text-sm text-center">{edu.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="p-8 md:p-16 max-w-6xl mx-auto">
          <AnimatePresence>
            <SectionTitle>Experience</SectionTitle>
          </AnimatePresence>
          <div className="relative">
            {experienceHistory.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="p-8 md:p-16 max-w-6xl mx-auto">
          <SectionTitle>My Skills</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="p-8 md:p-16 max-w-6xl mx-auto">
          <SectionTitle>Recent Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg group transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="flex-1 text-center py-2 rounded-full border border-blue-600 text-blue-500 font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex-1 text-center py-2 rounded-full border border-gray-400 text-gray-600 font-semibold hover:bg-gray-400 hover:text-gray-800 transition-colors duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="p-8 md:p-16 max-w-3xl mx-auto text-center"
        >
          <SectionTitle>Get In Touch</SectionTitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 p-8 rounded-3xl shadow-xl"
          >
            <p className="text-lg text-gray-700 mb-8">
              Send me a message directly, and I'll get back to you as soon as
              possible.
            </p>
            <form
              action="https://formspree.io/f/xanqvwyd"
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full max-w-xl mx-auto"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formState.name}
                onChange={handleFormChange}
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formState.email}
                onChange={handleFormChange}
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="6"
                value={formState.message}
                onChange={handleFormChange}
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
              ></textarea>
              <motion.button
                type="submit"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`
                  px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 shadow-lg
                  ${
                    isSending
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : isFormValid
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }
                `}
                disabled={isSending || !isFormValid}
              >
                {isSending ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 mb-8"
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              I'm currently seeking new opportunities and projects. Feel free to
              reach out to me!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-4 rounded-full bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                {link.icon}
                <span className="text-lg font-semibold">{link.name}</span>
              </a>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <p className="text-sm">
          Designed and Built by{" "}
          <span className="text-blue-500">Dhruvil Patel</span>
        </p>
        <p className="text-sm">&copy; 2024. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
