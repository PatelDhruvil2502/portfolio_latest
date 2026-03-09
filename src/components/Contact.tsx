import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-wrapper">
          <div className="contact-form">
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out!"); }}>
               <input type="text" placeholder="Your Name" required />
               <input type="email" placeholder="Your Email" required />
               <textarea placeholder="Your Message" required rows={5}></textarea>
               <button type="submit" data-cursor="pointer">Send Message</button>
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
