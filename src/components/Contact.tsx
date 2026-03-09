import { useRef, useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loadedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const data = new FormData(form);

    // Basic bot checks
    const honey = (data.get("company") || "").toString().trim();
    if (honey) {
      e.preventDefault();
      return;
    }

    // Time-on-page check
    const elapsed = Date.now() - loadedAtRef.current;
    if (elapsed < 2500) {
      e.preventDefault();
      setError("Please take a moment to complete the form before submitting.");
      return;
    }

    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    // Name: reasonable characters and length
    if (!/^[a-zA-Z\s.'-]{2,60}$/.test(name)) {
      e.preventDefault();
      setError("Please enter a valid name (letters only).");
      return;
    }

    // Email: basic format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      setError("Please enter a valid email address.");
      return;
    }

    // Message length & basic spam check
    if (message.length < 10) {
      e.preventDefault();
      setError("Your message is a bit short—add a few more details.");
      return;
    }
    if (message.length > 2000) {
      e.preventDefault();
      setError("Your message is quite long—please keep it under 2000 characters.");
      return;
    }
    if (/(https?:\/\/|www\.)/i.test(message)) {
      e.preventDefault();
      setError("For security reasons, please remove links from the message.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-wrapper">
          <div className="contact-form">
            <form
              action="https://formspree.io/f/xanqvwyd"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="_redirect"
                value="https://dhruvil2502.netlify.app/#contact"
              />
              {/* Honeypot field for bots */}
              <input
                type="text"
                name="company"
                className="contact-honeypot"
                autoComplete="off"
                tabIndex={-1}
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
              ></textarea>
              {error && <p className="contact-error">{error}</p>}
              <button type="submit" data-cursor="pointer" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:dhruvilpatel6468@gmail.com" data-cursor="disable">
                dhruvilpatel6468@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>MS in Computer Science</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/PatelDhruvil2502"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruvil2502/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Dhruvil Patel</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
