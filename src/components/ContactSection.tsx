import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, MapPin, Loader2, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const WEB3FORMS_ACCESS_KEY = "d637843b-ba24-444c-82d7-f296deaceea5";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBaseClasses =
    "bg-slate-900/80 border-slate-700/80 text-white placeholder:text-slate-500 rounded-sm focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent transition-colors hover:border-slate-600";

  return (
    <section id="contact" className="section-padding bg-[#080B0F] text-white border-t border-slate-800 scroll-mt-16 tech-grid">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12 pb-4 border-b border-slate-800"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            07 / LET&apos;S CONNECT
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Executive Consultation &bull; Strategic Advisory
          </span>
        </motion.div>

        {/* Editorial Two-Column Desktop / Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Strong CTA Typography & Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-[1.08] text-white mb-6">
                Have a technology, cybersecurity or transformation challenge?
                <br />
                <span className="text-accent">Let&apos;s talk.</span>
              </h2>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-light">
                Available for executive consulting, board advisory, technology modernization initiatives, and high-impact leadership discussions.
              </p>
            </div>

            {/* Direct Contact Metadata Block */}
            <div className="space-y-4 pt-6 border-t border-slate-800 font-mono text-xs">
              <a
                href="mailto:kamlesh.prasad@gmail.com"
                className="flex items-center justify-between p-3.5 border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-accent hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-accent" />
                  <span>kamlesh.prasad@gmail.com</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/kamleshsprasad0512/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-accent hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={16} className="text-accent" />
                  <span>linkedin.com/in/kamleshsprasad0512</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-3 p-3.5 border border-slate-850 bg-slate-900/30 text-slate-400">
                <MapPin size={16} className="text-slate-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Minimal Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 border border-slate-800 bg-slate-900/60 p-6 sm:p-8 md:p-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
                    Full Name <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className={inputBaseClasses}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-400 font-mono" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
                    Email Address <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className={inputBaseClasses}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-400 font-mono" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
                  Subject / Topic <span className="text-accent">*</span>
                </Label>
                <Input
                  id="subject"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. CISO Advisory / Infrastructure Modernization"
                  className={inputBaseClasses}
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs text-red-400 font-mono" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
                  Message Details <span className="text-accent">*</span>
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your initiative, mandate or discussion topic..."
                  className={`${inputBaseClasses} resize-y min-h-[110px]`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-400 font-mono" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {status === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 text-left rounded-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">Message Sent Successfully</p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Thank you for reaching out. Your communication has been received directly.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 p-4 text-left rounded-sm"
                >
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-200">
                    Unable to deliver message at this moment. Please email directly at kamlesh.prasad@gmail.com.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 h-auto bg-accent text-white hover:bg-accent/90 transition-all font-mono text-xs font-bold uppercase tracking-wider rounded-sm disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
