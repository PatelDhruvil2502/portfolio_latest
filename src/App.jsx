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
  ChevronDown,
  Feather,
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
  { name: "React", icon: <Monitor size={32} className="text-purple-600" /> },
  { name: "TypeScript", icon: <Code size={32} className="text-purple-600" /> },
  { name: "JavaScript", icon: <Code size={32} className="text-purple-600" /> },
  { name: "Python", icon: <Terminal size={32} className="text-purple-600" /> },
  { name: "Java", icon: <Coffee size={32} className="text-purple-600" /> },
  { name: "Flutter", icon: <Feather size={32} className="text-purple-600" /> },
  { name: "Node.js", icon: <Server size={32} className="text-purple-600" /> },
  {
    name: "Spring Boot",
    icon: <Server size={32} className="text-purple-600" />,
  },
  {
    name: "Firebase",
    icon: <Database size={32} className="text-purple-600" />,
  },
  { name: "MongoDB", icon: <Database size={32} className="text-purple-600" /> },
  { name: "MySQL", icon: <Database size={32} className="text-purple-600" /> },
  { name: "Redux", icon: <Network size={32} className="text-purple-600" /> },
  { name: "OpenCV", icon: <Sparkles size={32} className="text-purple-600" /> },
  {
    name: "Tesseract OCR",
    icon: <FileText size={32} className="text-purple-600" />,
  },
  { name: "Git", icon: <GitCommit size={32} className="text-purple-600" /> },
];

import pihealth from "../src/assets/pihealth.png";
import me from "../src/assets/me.png";
import chat from "../src/assets/chat.png";
import ecommerce from "../src/assets/ecommerce.png";
import pullventure from "../src/assets/pullventure.png";
import societyzen from "../src/assets/societyzen.png";
import textextract from "../src/assets/textextract.png";
// Define projects data
const projects = [
  {
    title: "Pi-health",
    description:
      "A hospital management application built with React and TypeScript to enhance operational efficiency and patient care.",
    image: pihealth,
    tags: ["React", "TypeScript", "Redux"],
  },
  {
    title: "Societyzen",
    description:
      "A society management application built with React and TypeScript to streamline operations for administrators and residents.",
    image: societyzen,
    tags: ["React", "TypeScript", "Node.js"],
  },
  {
    title: "Ecommerce Website",
    description:
      "A seamless online retail experience built with Java, Servlets, JSP, and Hibernate, featuring a responsive UI and secure checkout.",
    image: ecommerce,
    tags: ["Java", "Spring Boot", "MySQL"],
  },
  {
    title: "Gujarati Text Extractor",
    description:
      "An application using Python and Tesseract OCR to efficiently extract Gujarati text from images with a user-friendly interface.",
    image: textextract,
    tags: ["Python", "OpenCV", "Tesseract OCR"],
  },
  {
    title: "Chatapp",
    description:
      "A real-time chat application built with Flutter and Firebase, offering a seamless messaging experience similar to WhatsApp.",
    image: chat,
    tags: ["Flutter", "Firebase"],
  },
  {
    title: "Pullventure",
    description:
      "A chat app developed with Flutter and Firebase, connecting startup founders with users for collaboration and networking.",
    image: pullventure,
    tags: ["Flutter", "Firebase"],
  },
];

// Define education history
const educationHistory = [
  {
    school: "Indiana University Bloomington",
    degree: "Master of Science in Computer Science",
    date: "Present",
    description:
      "Focusing on advanced algorithms, distributed systems, and machine learning.",
    id: "masters",
  },
  {
    school: "Dharmsinh Desai University",
    degree: "Bachelor of Technology in Information Technology",
    date: "2020 - 2024",
    description:
      "Specialized in software development and database management. Projects included an appreciated e-commerce website and a text extraction mobile application.",
    id: "bachelors",
  },
];

// Define experience history
const experienceHistory = [
  {
    company: "Fuzzy Cloud",
    position: "Software Developer Intern",
    date: "December 2023 - May 2024",
    responsibilities: [
      "Contributed to two real-world projects in React.",
      "Gained practical experience with modern front-end development workflows.",
      "Collaborated effectively with the development team.",
    ],
    skills: [
      "React",
      "Typescript",
      "Jotai",
      "Felte",
      "Zod",
      "Dexie",
      "Vite",
      "ElectronJs",
      "HTML5",
      "CSS3",
    ],
  },
  {
    company: "University Projects",
    position: "Project Member",
    date: "2020 - 2026",
    responsibilities: [
      "Developed and maintained the BookCars software engineering project.",
      "Contributed to a Flutter mobile application and a Java/Hibernate e-commerce site.",
      "Received recognition and recommendation letters from professors for dedication and results.",
    ],
    skills: ["Flutter", "Java", "Hibernate", "MERN Stack"],
  },
];

// Define social media links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    url: "https://www.linkedin.com/in/dhruvil2502/",
  },
  {
    name: "GitHub",
    icon: <Github size={24} />,
    url: "https://github.com/PatelDhruvil2502",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    url: "mailto:pateldhruvil2502@gmail.com",
  },
];

const HeroAnimation = () => {
  const mountRef = useRef(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => setThreeLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!threeLoaded) return;

    const THREE = window.THREE;
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const particlesCount = 7000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x9333ea, // Purple color
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.05;
      camera.position.x += (mouse.x - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      currentMount.removeChild(renderer.domElement);
    };
  }, [threeLoaded]);

  return (
    <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
  );
};

const ExperienceItem = ({ exp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-start mb-12 last:mb-0`}
    >
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
              className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium cursor-pointer shadow-md transform"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 rounded-2xl p-6 shadow-xl w-full md:col-start-2 transform hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center gap-3 mb-2">
          <Building size={24} className="text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-800">{exp.company}</h3>
        </div>
        <p className="text-lg text-purple-500 font-semibold">{exp.position}</p>
        <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
        <ul className="list-none space-y-2 text-gray-600">
          {exp.responsibilities.map((resp, respIndex) => (
            <li key={respIndex} className="flex items-start gap-2">
              <ChevronRight
                size={18}
                className="text-purple-500 flex-shrink-0 mt-1"
              />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

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
  const [viewedOnMobile, setViewedOnMobile] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const headerWidth = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["100%", "90%"]
  );
  const headerBackgroundColor = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["rgba(229, 231, 235, 0.85)", "rgba(229, 231, 235, 0.5)"]
  );

  const buttonWidth = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["11rem", "3rem"]
  );
  const buttonPadding = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["1.5rem 1.5rem", "0.75rem"]
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
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
      setTimeout(() => {
        alert("Message sent successfully!");
        setIsSending(false);
        setFormState({ name: "", email: "", message: "" });
      }, 2000);
    }
  };

  useEffect(() => {
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
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (!isMobileDevice) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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

  const SectionTitle = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
      {children}
    </h2>
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white text-gray-800 font-sans antialiased relative">
      <motion.header
        ref={headerRef}
        style={{
          width: headerWidth,
          backgroundColor: headerBackgroundColor,
          backdropFilter: "blur(10px)",
        }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all mx-auto max-w-7xl shadow-lg ${
          isMobile ? "rounded-2xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 md:px-8">
          <div className="flex items-center gap-6">
            <motion.div className="text-2xl font-extrabold text-gray-800">
              DP
            </motion.div>
            {isMobile ? (
              activeSection !== "home" && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-1 text-lg font-bold text-gray-800"
                >
                  <motion.span
                    key={activeSection}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {navItems.find((item) => item.id === activeSection)?.name}
                  </motion.span>
                  <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
              )
            ) : (
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative text-lg font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-purple-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 block h-0.5 w-full bg-purple-600"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
          <motion.a
            style={{ width: buttonWidth, padding: buttonPadding }}
            href="https://drive.google.com/file/d/1VfPTEp3cL0i6zNzR8dOj5tzcZ4j-R6A4/view?usp=sharing"
            download
            className="flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold transition-all duration-300 shadow-lg rounded-full hover:bg-purple-700"
          >
            <FileText size={18} />
            <motion.span style={{ opacity: textOpacity, display: textDisplay }}>
              Resume
            </motion.span>
          </motion.a>
        </div>
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <nav className="flex flex-col px-8 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center p-8 text-center"
        >
          <HeroAnimation />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl z-10 bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold mb-4 text-gray-800"
              style={{ textShadow: "0 0 15px rgba(168, 85, 247, 0.2)" }}
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
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
              <motion.a
                href="#projects"
                className="group relative overflow-hidden px-6 py-3 rounded-full bg-purple-600 text-white font-semibold transition-all duration-300 hover:bg-purple-700 shadow-lg shadow-purple-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="group relative overflow-hidden px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 md:p-16 max-w-6xl mx-auto"
        >
          <SectionTitle>About Me</SectionTitle>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/3 flex-shrink-0"
            >
              <img
                src={me}
                alt="Dhruvil Patel"
                className="w-64 h-64 mx-auto rounded-full object-cover shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)]"
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
                to life through code. My expertise spans both{" "}
                <span className="font-bold text-purple-600">
                  web development
                </span>{" "}
                and{" "}
                <span className="font-bold text-purple-600">
                  machine learning
                </span>
                . While I enjoy crafting dynamic user interfaces and scalable
                databases with the MERN stack, I'm equally enthusiastic about
                applying my skills in{" "}
                <span className="font-bold text-purple-600">data analysis</span>{" "}
                and{" "}
                <span className="font-bold text-purple-600">
                  model building
                </span>
                .
              </p>
              <p className="mt-4 text-gray-600 text-lg md:text-xl leading-relaxed">
                I believe that technology should not only be functional but also
                intelligent and visually appealing. My goal is to create
                seamless digital experiences that make a real impact.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 md:p-16 max-w-6xl mx-auto"
        >
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {educationHistory.map((edu) => {
              const isExpanded =
                (isMobile && viewedOnMobile[edu.id]) ||
                (!isMobile &&
                  (hoveredEduId === edu.id || activeEduId === edu.id));
              return (
                <motion.div
                  key={edu.id}
                  onHoverStart={() => !isMobile && setHoveredEduId(edu.id)}
                  onHoverEnd={() => !isMobile && setHoveredEduId(null)}
                  onClick={() =>
                    !isMobile &&
                    setActiveEduId(activeEduId === edu.id ? null : edu.id)
                  }
                  onViewportEnter={() =>
                    isMobile &&
                    setViewedOnMobile((p) => ({ ...p, [edu.id]: true }))
                  }
                  onViewportLeave={() =>
                    isMobile &&
                    setViewedOnMobile((p) => ({ ...p, [edu.id]: false }))
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: isExpanded ? (isMobile ? "90%" : 500) : 200,
                    backgroundColor: isExpanded ? "#A855F7" : "#F3F4F6",
                    color: isExpanded ? "white" : "#1F2937",
                    zIndex: isExpanded ? 10 : 5,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={`relative h-52 rounded-full shadow-lg transform mx-auto md:mx-0 ${
                    !isMobile ? "cursor-pointer" : ""
                  }`}
                  viewport={{
                    once: false,
                    amount: 0.8,
                    margin: "0px 0px -150px 0px",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-4"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isExpanded ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-center">
                      {edu.degree.split(" of")[0]}
                    </h3>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    transition={{
                      opacity: { duration: 0.2, delay: isExpanded ? 0.2 : 0 },
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold">
                      {edu.school}
                    </h3>
                    <p className="text-sm font-semibold">{edu.date}</p>
                    <p className="mt-2 text-sm text-center">
                      {edu.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 md:p-16 max-w-6xl mx-auto"
        >
          <SectionTitle>Experience</SectionTitle>
          <div className="relative">
            {experienceHistory.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 md:p-16 max-w-6xl mx-auto"
        >
          <SectionTitle>My Skills</SectionTitle>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="p-8 md:p-16 max-w-6xl mx-auto"
        >
          <SectionTitle>Recent Projects</SectionTitle>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg group transform hover:scale-105 transition-transform duration-300 hover:shadow-purple-500/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-purple-600">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-200 text-purple-800 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 md:p-16 max-w-3xl mx-auto text-center"
        >
          <SectionTitle>Get In Touch</SectionTitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-xl"
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
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formState.email}
                onChange={handleFormChange}
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="6"
                value={formState.message}
                onChange={handleFormChange}
                className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
              ></textarea>
              <motion.button
                type="submit"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 shadow-lg ${
                  isSending
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : isFormValid
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/30"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
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
        </motion.section>
      </main>

      <footer className="py-8 text-center text-gray-500">
        <p className="text-sm">
          Designed and Built by{" "}
          <span className="text-purple-600">Dhruvil Patel</span>
        </p>
        <p className="text-sm">&copy; 2025. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
