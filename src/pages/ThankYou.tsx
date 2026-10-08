import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Communication Transmitted | Kamlesh Prasad</title>
        <meta name="description" content="Thank you for contacting Kamlesh Prasad. Your message has been received successfully." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="bg-[#070B16] text-white relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20 tech-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="border border-slate-850 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            >
              <CheckCircle2 size={32} />
            </motion.div>

            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase block mb-2">
              Status: Transmitted
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase text-white mb-4"
            >
              Message Received
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-light"
            >
              Thank you for reaching out. Your communication has been dispatched to Kamlesh Prasad. Expect a direct response shortly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Return to Portfolio</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default ThankYou;
