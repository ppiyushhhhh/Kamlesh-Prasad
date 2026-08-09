import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Message Sent | Kamlesh Prasad</title>
        <meta name="description" content="Thank you for contacting Kamlesh Prasad. Your message has been received successfully." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-2xl p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10"
            >
              <CheckCircle2 className="w-10 h-10 text-gold" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold text-card-foreground mb-4"
            >
              Message Sent Successfully
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8"
            >
              Thank you for reaching out. Your message has been received successfully. I'll get back to you as soon as possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-primary font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                <ArrowLeft size={18} />
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default ThankYou;
