import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useActor } from "@/hooks/useActor";

interface ContactForm {
  name: string;
  mobile: string;
  email: string;
  message: string;
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    lines: [
      "Near College More Bundu,",
      "Opposite Bank of Baroda, NH-33,",
      "Bundu, Jharkhand – 835204",
    ],
    action: null,
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    lines: ["9931918438", "7004655571"],
    action: "tel",
  },
  {
    icon: Mail,
    title: "Email Address",
    lines: ["citypharmanavdurga@gmail.com"],
    action: "mailto",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Sunday", "8:00 AM – 8:00 PM"],
    action: null,
  },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    try {
      if (actor) {
        await actor.createContactMessage(data.name, data.email || "", data.mobile, data.message);
      }
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <section className="relative bg-[oklch(0.11_0.001_240)] border-b border-[oklch(0.22_0.004_240)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[oklch(0.537_0.207_25.1/0.05)] blur-3xl" />
          <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-[oklch(0.37_0.18_264.4/0.05)] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.537_0.207_25.1/0.15)] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[oklch(0.65_0.18_25.1)]" />
            </div>
            <span className="text-xs text-[oklch(0.65_0.18_25.1)] font-semibold tracking-widest uppercase">
              Contact Us
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Get In Touch</h1>
          <p className="text-[oklch(0.6_0.008_240)] mt-1">
            We're here to help. Reach us by phone, email, or visit us in person.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-xl bg-[oklch(0.12_0.002_240)] border border-[oklch(0.22_0.004_240)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.537_0.207_25.1/0.1)] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[oklch(0.537_0.207_25.1)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-white text-sm mb-1">{info.title}</p>
                    {info.lines.map((line) => {
                      if (info.action === "tel") {
                        return (
                          <a
                            key={`tel-${line}`}
                            href={`tel:${line}`}
                            className="block text-sm text-[oklch(0.6_0.008_240)] hover:text-[oklch(0.65_0.18_25.1)] transition-colors"
                          >
                            📞 {line}
                          </a>
                        );
                      }
                      if (info.action === "mailto") {
                        return (
                          <a
                            key={`mail-${line}`}
                            href={`mailto:${line}`}
                            className="block text-sm text-[oklch(0.6_0.008_240)] hover:text-[oklch(0.65_0.18_25.1)] transition-colors break-all"
                          >
                            {line}
                          </a>
                        );
                      }
                      return (
                        <p key={`info-${line}`} className="text-sm text-[oklch(0.6_0.008_240)] leading-relaxed">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* Click-to-call buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:9931918438"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href="https://wa.me/919931918438"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[oklch(0.55_0.19_142)] hover:bg-[oklch(0.48_0.19_142)] text-white text-sm font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>

            {/* Google Map Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-[oklch(0.22_0.004_240)] bg-[oklch(0.12_0.002_240)]"
            >
              <div className="h-48 relative bg-gradient-to-br from-[oklch(0.14_0.003_240)] to-[oklch(0.11_0.001_240)] flex flex-col items-center justify-center gap-3">
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.537 0.207 25.1 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.537 0.207 25.1 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.537_0.207_25.1)] flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-medium text-sm">City Pharma, Bundu, NH-33</p>
                  <p className="text-[oklch(0.5_0.005_240)] text-xs mt-0.5">Jharkhand, India</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=City+Pharma+Bundu+Jharkhand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 text-sm text-[oklch(0.6_0.008_240)] hover:text-white transition-colors border-t border-[oklch(0.22_0.004_240)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Google Maps
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] p-6">
              <h2 className="font-display font-bold text-white text-xl mb-5 flex items-center gap-2">
                <Send className="w-5 h-5 text-[oklch(0.537_0.207_25.1)]" />
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-[oklch(0.75_0.008_240)]">Full Name *</Label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Your full name"
                      className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                    />
                    {errors.name && (
                      <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-[oklch(0.75_0.008_240)]">Mobile *</Label>
                    <Input
                      {...register("mobile", {
                        required: "Mobile is required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid mobile number" },
                      })}
                      placeholder="10-digit mobile"
                      type="tel"
                      maxLength={10}
                      className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                    />
                    {errors.mobile && (
                      <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.mobile.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Email (Optional)</Label>
                  <Input
                    {...register("email", {
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
                    })}
                    placeholder="your@email.com"
                    type="email"
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Message *</Label>
                  <Textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Message too short" },
                    })}
                    placeholder="How can we help you? Ask about our services, report issues, or provide feedback..."
                    rows={5}
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-11"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><CheckCircle2 className="mr-2 w-4 h-4" /> Send Message</>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
