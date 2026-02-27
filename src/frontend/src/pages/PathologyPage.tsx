import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  Microscope,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CheckCircle2,
  Loader2,
  Home,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { pathologyTests } from "@/data/pathologyTests";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import { useActor } from "@/hooks/useActor";

interface BookingForm {
  patientName: string;
  mobile: string;
  collectionType: "home" | "centre";
  date: string;
  time: string;
}

export default function PathologyPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Hematology");
  const [selectedTests, setSelectedTests] = useState<Record<string, number>>({});
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({ defaultValues: { collectionType: "centre" } });

  const collectionType = watch("collectionType");

  const totalAmount = useMemo(
    () =>
      Object.entries(selectedTests).reduce((sum, [testName, checked]) => {
        if (!checked) return sum;
        for (const tests of Object.values(pathologyTests)) {
          const test = tests.find((t) => t.name === testName);
          if (test) return sum + test.price;
        }
        return sum;
      }, 0),
    [selectedTests]
  );

  const selectedTestNames = Object.entries(selectedTests)
    .filter(([, v]) => v === 1)
    .map(([k]) => k);

  const toggleTest = (name: string) => {
    setSelectedTests((prev) => ({
      ...prev,
      [name]: prev[name] ? 0 : 1,
    }));
  };

  const onSubmit = async (data: BookingForm) => {
    if (selectedTestNames.length === 0) {
      toast.error("Please select at least one test");
      return;
    }
    setSubmitting(true);
    try {
      const dateTime = new Date(`${data.date}T${data.time}`);
      if (actor) {
        await actor.createPathologyBooking(
          data.patientName,
          data.mobile,
          selectedTestNames,
          data.collectionType === "home" ? "Home Collection" : "Visit Centre",
          BigInt(dateTime.getTime() * 1_000_000),
          BigInt(totalAmount)
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
    toast.success(`Pathology booking confirmed! Tx: ${txId}`);
    setSelectedTests({});
    reset();
    setPaymentOpen(false);
  };

  const categories = Object.keys(pathologyTests);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <section className="relative bg-[oklch(0.11_0.001_240)] border-b border-[oklch(0.22_0.004_240)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="float-2 absolute top-4 right-12 text-[oklch(0.37_0.18_264.4)]">
            <Microscope className="w-20 h-20" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.37_0.18_264.4/0.15)] flex items-center justify-center">
              <Microscope className="w-4 h-4 text-[oklch(0.6_0.14_264.4)]" />
            </div>
            <span className="text-xs text-[oklch(0.6_0.14_264.4)] font-semibold tracking-widest uppercase">
              Pathology Services
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Lab Tests & Diagnostics
          </h1>
          <p className="text-[oklch(0.6_0.008_240)] mt-1">
            80+ tests across all categories · Home sample collection available
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white text-lg">Available Tests</h2>
              {selectedTestNames.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTests({})}
                  className="text-xs text-[oklch(0.537_0.207_25.1)] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {categories.map((category) => {
              const tests = pathologyTests[category];
              const isExpanded = expandedCategory === category;
              const selectedCount = tests.filter((t) => selectedTests[t.name]).length;

              return (
                <motion.div
                  key={category}
                  layout
                  className="bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[oklch(0.15_0.002_240)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-semibold text-white">{category}</span>
                      <span className="text-xs text-[oklch(0.5_0.005_240)]">
                        {tests.length} tests
                      </span>
                      {selectedCount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.537_0.207_25.1/0.15)] text-[oklch(0.65_0.18_25.1)] border border-[oklch(0.537_0.207_25.1/0.3)]">
                          {selectedCount} selected
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[oklch(0.5_0.005_240)]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[oklch(0.5_0.005_240)]" />
                    )}
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="border-t border-[oklch(0.22_0.004_240)]"
                    >
                      {tests.map((test, i) => {
                        const isSelected = !!selectedTests[test.name];
                        return (
                          <div
                            key={test.name}
                            className={`flex items-center justify-between px-4 py-3 transition-colors ${
                              i % 2 === 0 ? "bg-[oklch(0.11_0.001_240)]" : ""
                            } ${isSelected ? "bg-[oklch(0.537_0.207_25.1/0.07)]" : ""}`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <button
                                type="button"
                                onClick={() => toggleTest(test.name)}
                                className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${
                                  isSelected
                                    ? "bg-[oklch(0.537_0.207_25.1)] border-[oklch(0.537_0.207_25.1)]"
                                    : "border-[oklch(0.35_0.004_240)] hover:border-[oklch(0.537_0.207_25.1)]"
                                }`}
                                aria-label={`${isSelected ? "Deselect" : "Select"} ${test.name}`}
                              >
                                {isSelected && (
                                  <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill="none" aria-hidden="true">
                                    <path
                                      d="M1 4L4 7L9 1"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </button>
                              <span
                                className={`text-sm truncate ${
                                  isSelected ? "text-white font-medium" : "text-[oklch(0.7_0.006_240)]"
                                }`}
                              >
                                {test.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-semibold text-[oklch(0.65_0.18_25.1)]">
                                ₹{test.price}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleTest(test.name)}
                                className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                                  isSelected
                                    ? "bg-[oklch(0.537_0.207_25.1/0.15)] text-[oklch(0.65_0.18_25.1)]"
                                    : "bg-[oklch(0.18_0.003_240)] text-[oklch(0.6_0.008_240)] hover:bg-[oklch(0.537_0.207_25.1/0.1)] hover:text-[oklch(0.65_0.18_25.1)]"
                                }`}
                                aria-label={`${isSelected ? "Remove" : "Add"} ${test.name}`}
                              >
                                {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Booking Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Selected Tests Summary */}
              {selectedTestNames.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.537_0.207_25.1/0.2)] p-4"
                >
                  <h3 className="font-heading font-semibold text-white text-sm mb-3">
                    Selected Tests ({selectedTestNames.length})
                  </h3>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {selectedTestNames.map((name) => {
                      let price = 0;
                      for (const tests of Object.values(pathologyTests)) {
                        const t = tests.find((x) => x.name === name);
                        if (t) { price = t.price; break; }
                      }
                      return (
                        <div key={name} className="flex items-center justify-between text-xs">
                          <span className="text-[oklch(0.7_0.006_240)] truncate mr-2">{name}</span>
                          <span className="text-[oklch(0.65_0.18_25.1)] shrink-0">₹{price}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[oklch(0.22_0.004_240)] flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Total</span>
                    <span className="text-lg font-display font-bold text-[oklch(0.65_0.18_25.1)]">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Booking Form */}
              <div className="bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] p-4">
                <h3 className="font-heading font-semibold text-white text-sm mb-4">Book Tests</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
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
                    <Label className="text-xs text-[oklch(0.7_0.006_240)]">Sample Collection</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "home", label: "Home", icon: Home },
                        { value: "centre", label: "Centre", icon: Building2 },
                      ].map(({ value, label, icon: Icon }) => (
                        <label
                          key={value}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                            collectionType === value
                              ? "bg-[oklch(0.537_0.207_25.1/0.1)] border-[oklch(0.537_0.207_25.1/0.4)] text-white"
                              : "border-[oklch(0.25_0.004_240)] text-[oklch(0.55_0.006_240)] hover:border-[oklch(0.537_0.207_25.1/0.3)]"
                          }`}
                        >
                          <input
                            {...register("collectionType")}
                            type="radio"
                            value={value}
                            className="sr-only"
                          />
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

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

                  {totalAmount > 0 && (
                    <div className="flex items-center justify-between py-2 border-t border-[oklch(0.22_0.004_240)]">
                      <span className="text-sm text-[oklch(0.6_0.008_240)]">Total Amount</span>
                      <span className="font-display font-bold text-[oklch(0.65_0.18_25.1)]">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting || selectedTestNames.length === 0}
                    className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold text-sm h-10"
                  >
                    {submitting ? (
                      <><Loader2 className="mr-1.5 w-3.5 h-3.5 animate-spin" /> Booking...</>
                    ) : (
                      <><CheckCircle2 className="mr-1.5 w-3.5 h-3.5" /> Book Tests</>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UPIPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={totalAmount}
        title="Pathology Booking Payment"
        onConfirm={handlePaymentConfirm}
      />
    </motion.div>
  );
}
