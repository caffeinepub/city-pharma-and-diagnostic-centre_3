import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  Activity,
  CheckCircle2,
  Loader2,
  Shield,
  Award,
  Clock,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ultrasoundServices } from "@/data/pathologyTests";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import { useActor } from "@/hooks/useActor";

interface BookingForm {
  patientName: string;
  mobile: string;
  scanType: string;
  date: string;
  time: string;
}

const features = [
  { icon: Award, title: "Experienced Sonographers", description: "Board-certified specialists with 10+ years expertise" },
  { icon: Shield, title: "Safe & Accurate Imaging", description: "Latest ultrasound equipment for precise diagnosis" },
  { icon: Clock, title: "Online Booking", description: "Book your appointment anytime, anywhere" },
  { icon: Lock, title: "Report Confidentiality", description: "Your medical reports are 100% confidential" },
];

const allUltrasoundItems = ultrasoundServices.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

export default function UltrasoundPage() {
  const [selectedScan, setSelectedScan] = useState<string>("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingForm>();

  const selectedItem = allUltrasoundItems.find((i) => i.name === selectedScan);
  const selectedPrice = selectedItem?.price ?? 0;

  const onSubmit = async (data: BookingForm) => {
    if (!data.scanType) {
      toast.error("Please select an ultrasound type");
      return;
    }
    setSubmitting(true);
    try {
      const dateTime = new Date(`${data.date}T${data.time}`);
      if (actor) {
        await actor.createUltrasoundBooking(
          data.patientName,
          data.mobile,
          data.scanType,
          BigInt(dateTime.getTime() * 1_000_000),
          BigInt(selectedPrice)
        );
      }
      setSubmitting(false);
      setPaymentOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  const handlePaymentConfirm = (txId: string) => {
    toast.success(`Ultrasound booking confirmed! Tx: ${txId}`);
    reset();
    setSelectedScan("");
    setPaymentOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <section className="relative bg-[oklch(0.11_0.001_240)] border-b border-[oklch(0.22_0.004_240)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.15_60/0.15)] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[oklch(0.7_0.15_60)]" />
            </div>
            <span className="text-xs text-[oklch(0.7_0.15_60)] font-semibold tracking-widest uppercase">
              Ultrasound Services
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Ultrasound & Imaging
          </h1>
          <p className="text-[oklch(0.6_0.008_240)] mt-1">
            Advanced imaging with experienced sonographers · Safe & accurate diagnosis
          </p>
        </div>

        {/* Sonar animation */}
        <div className="absolute top-6 right-16 pointer-events-none opacity-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full border-2 border-[oklch(0.55_0.15_60)] sonar-animate"
              style={{
                width: "100px",
                height: "100px",
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
          <Activity className="w-12 h-12 text-[oklch(0.7_0.15_60)] relative z-10" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service List */}
          <div className="lg:col-span-2 space-y-6">
            {ultrasoundServices.map((category) => (
              <div key={category.category}>
                <h2 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-[oklch(0.537_0.207_25.1)]" />
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.items.map((item) => {
                    const isSelected = selectedScan === item.name;
                    return (
                      <motion.button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setSelectedScan(item.name);
                          setValue("scanType", item.name);
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                          isSelected
                            ? "bg-[oklch(0.537_0.207_25.1/0.1)] border-[oklch(0.537_0.207_25.1/0.5)] shadow-red-sm"
                            : "bg-[oklch(0.12_0.002_240)] border-[oklch(0.22_0.004_240)] hover:border-[oklch(0.537_0.207_25.1/0.3)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-heading font-semibold text-sm ${isSelected ? "text-white" : "text-[oklch(0.8_0.006_240)]"}`}>
                              {item.name}
                            </p>
                            <p className="text-xs text-[oklch(0.5_0.005_240)] mt-0.5">
                              {category.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-[oklch(0.65_0.18_25.1)] text-lg">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>
                            {isSelected && (
                              <span className="text-xs text-[oklch(0.65_0.18_25.1)]">Selected ✓</span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Features */}
            <div className="mt-8">
              <h2 className="font-heading font-semibold text-white mb-4">Why Choose Our Ultrasound Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="flex gap-3 p-4 rounded-xl bg-[oklch(0.12_0.002_240)] border border-[oklch(0.22_0.004_240)]"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[oklch(0.537_0.207_25.1/0.1)] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{f.title}</p>
                        <p className="text-xs text-[oklch(0.5_0.005_240)] mt-0.5">{f.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] p-5">
              <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                Book Ultrasound
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label className="text-xs text-[oklch(0.7_0.006_240)]">Patient Name *</Label>
                  <Input
                    {...register("patientName", { required: "Required" })}
                    placeholder="Full name"
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] h-9 text-sm"
                  />
                  {errors.patientName && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.patientName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-[oklch(0.7_0.006_240)]">Mobile *</Label>
                  <Input
                    {...register("mobile", {
                      required: "Required",
                      pattern: { value: /^[6-9]\d{9}$/, message: "Invalid mobile" },
                    })}
                    placeholder="10-digit mobile"
                    type="tel"
                    maxLength={10}
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] h-9 text-sm"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-[oklch(0.7_0.006_240)]">Select Ultrasound Type *</Label>
                  <input {...register("scanType", { required: "Required" })} type="hidden" value={selectedScan} />
                  <Select
                    value={selectedScan}
                    onValueChange={(val) => {
                      setSelectedScan(val);
                      setValue("scanType", val);
                    }}
                  >
                    <SelectTrigger className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus:ring-[oklch(0.537_0.207_25.1)] h-9 text-sm">
                      <SelectValue placeholder="Choose scan type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.16_0.003_240)] border-[oklch(0.25_0.004_240)] text-white">
                      {ultrasoundServices.map((cat) => (
                        <div key={cat.category}>
                          <div className="px-2 py-1 text-xs text-[oklch(0.5_0.005_240)] font-medium uppercase tracking-wider">
                            {cat.category}
                          </div>
                          {cat.items.map((item) => (
                            <SelectItem
                              key={item.name}
                              value={item.name}
                              className="text-white hover:bg-[oklch(0.537_0.207_25.1/0.15)] focus:bg-[oklch(0.537_0.207_25.1/0.15)] text-sm"
                            >
                              {item.name} — ₹{item.price.toLocaleString("en-IN")}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.scanType && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.scanType.message}</p>
                  )}
                </div>

                {selectedPrice > 0 && (
                  <div className="p-2.5 rounded-lg bg-[oklch(0.537_0.207_25.1/0.08)] border border-[oklch(0.537_0.207_25.1/0.2)] text-center">
                    <p className="text-xs text-[oklch(0.6_0.008_240)]">Amount</p>
                    <p className="font-display font-bold text-[oklch(0.65_0.18_25.1)] text-xl">
                      ₹{selectedPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[oklch(0.7_0.006_240)]">Date *</Label>
                    <Input
                      {...register("date", { required: "Required" })}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus-visible:ring-[oklch(0.537_0.207_25.1)] h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[oklch(0.7_0.006_240)]">Time *</Label>
                    <Input
                      {...register("time", { required: "Required" })}
                      type="time"
                      className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus-visible:ring-[oklch(0.537_0.207_25.1)] h-9 text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !selectedScan}
                  className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-10 text-sm"
                >
                  {submitting ? (
                    <><Loader2 className="mr-1.5 w-3.5 h-3.5 animate-spin" /> Booking...</>
                  ) : (
                    <><CheckCircle2 className="mr-1.5 w-3.5 h-3.5" /> Book & Pay</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <UPIPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={selectedPrice}
        title={`Ultrasound: ${selectedScan}`}
        onConfirm={handlePaymentConfirm}
      />
    </motion.div>
  );
}
