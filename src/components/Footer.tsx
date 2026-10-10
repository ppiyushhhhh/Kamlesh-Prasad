import { Linkedin, ArrowUp } from "lucide-react";
import kpLogo from "@/assets/kamlesh-prasad-logo.png";

const footerLinks = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Recognition", href: "#achievements" },
  { label: "Credentials", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#08080A] text-white border-t border-zinc-800 py-12 px-6 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-zinc-850">
          {/* Brand & Designation */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-zinc-800 bg-black flex items-center justify-center overflow-hidden rounded-md p-0.5 shadow-xs">
                <img
                  src={kpLogo}
                  alt="Kamlesh Prasad"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Kamlesh Prasad
                </h3>
                <p className="font-mono text-[11px] text-zinc-400">
                  Technology Executive &bull; CIO &bull; CISO
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-md font-light leading-relaxed">
              Enterprise technology leadership, cybersecurity governance, and infrastructure modernization across complex multi-site operations.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
            <div>
              <p className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-widest mb-3">
                Navigation
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-widest mb-3">
                Connect
              </p>
              <div className="space-y-2 text-xs font-mono">
                <a
                  href="https://www.linkedin.com/in/kamleshsprasad0512/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Linkedin size={14} className="text-zinc-300" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="mailto:kamlesh.prasad@gmail.com"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  kamlesh.prasad@gmail.com
                </a>
                <p className="text-zinc-500">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Kamlesh Prasad. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span>Developed by Piyush Prasad</span>
              <a
                href="https://www.linkedin.com/in/ppiyushhhh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Piyush Prasad on LinkedIn"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin size={13} />
              </a>
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors ml-2"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
