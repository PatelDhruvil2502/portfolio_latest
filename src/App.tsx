import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";

const Projects = lazy(() => import("./components/Projects"));
const Query = lazy(() => import("./components/Query"));

const App = () => {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <Cursor />
      <Navbar />
      <main className="app">
        <Hero />
        <About />
        <Marquee
          items={[
            "React · Next.js · TypeScript · accessibility · perf",
            "RAG · CAG · HNSW · ANN · vector search",
            "Global Health Impact · Bloomington, IN",
            "open to conversations - full-time, May 2026",
          ]}
        />
        <Experience />
        <Education />
        <Suspense fallback={<div style={{ height: "60vh" }} />}>
          <Projects />
        </Suspense>
        <Skills />
        <Suspense fallback={<div style={{ height: "40vh" }} />}>
          <Query />
        </Suspense>
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default App;
