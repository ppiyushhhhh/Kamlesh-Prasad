import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, MapPin, Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
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
    "bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-muted/60 focus-visible:ring-gold focus-visible:ring-offset-0 transition-colors hover:border-hero-foreground/20";

  return (
    <section id="contact" className="hero-gradient section-padding scroll-mt-16">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-hero-muted uppercase tracking-[0.2em] text-sm font-medium mb-3">Engage</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-hero-foreground mb-6">
            Let's Connect
          </h2>
          <p className="text-hero-muted text-lg mb-10 max-w-2xl mx-auto">
            Have a question, opportunity, or project in mind? Send me a message and I'll get back to you as soon as possible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a
              href="mailto:kamlesh.prasad@gmail.com"
              className="flex items-center gap-3 text-hero-foreground hover:text-gold transition-colors"
            >
              <Mail size={20} />
              <span>kamlesh.prasad@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kamleshsprasad0512/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-hero-foreground hover:text-gold transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn Profile</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-hero-muted text-sm mb-12">
            <MapPin size={16} />
            <span>Mumbai, Maharashtra, India</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-hero-foreground/5 backdrop-blur-sm border border-hero-foreground/10 rounded-xl p-6 md:p-10 text-left"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-hero-foreground">
                  Full Name <span className="text-gold">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className={inputBaseClasses}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-400" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-hero-foreground">
                  Email Address <span className="text-gold">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className={inputBaseClasses}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-hero-foreground">
                Subject <span className="text-gold">*</span>
              </Label>
              <Input
                id="subject"
                type="text"
                autoComplete="off"
                placeholder="Project inquiry / Speaking opportunity"
                className={inputBaseClasses}
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                {...register("subject")}
              />
              {errors.subject && (
                <p id="subject-error" className="text-sm text-red-400" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-hero-foreground">
                Message <span className="text-gold">*</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project, opportunity, or question..."
                className={`${inputBaseClasses} resize-y min-h-[120px]`}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-400" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {status === "success" && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-md border border-gold/30 bg-gold/10 p-4 text-left"
              >
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-hero-foreground">Message Sent Successfully</p>
                  <p className="text-sm text-hero-muted">
                    Thank you for reaching out. Your message has been received successfully.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-left"
              >
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-hero-foreground">
                  Unable to send your message. Please try again.
                </p>
              </div>
            )}

            <div className="pt-2">

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 h-auto bg-gold text-primary hover:bg-gold/90 hover:opacity-95 transition-all duration-200 font-semibold rounded-md disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
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
    </section>
  );
};

export default ContactSection;
