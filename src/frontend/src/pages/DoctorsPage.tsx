import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  UserRound,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { doctors, DAY_NAMES, FULL_DAY_NAMES, TIME_SLOTS } from "@/data/doctors";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import { useActor } from "@/hooks/useActor";

interface AppointmentForm {
  doctorId: string;
  patientName: string;
  mobile: string;
  date: string;
  time: string;
  reason: string;
}

export default function DoctorsPage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentForm>();

  const watchedDoctorId = watch("doctorId") || selectedDoctorId;
  const selectedDoctor = doctors.find((d) => String(d.id) === watchedDoctorId);

  const isDateAvailable = (dateStr: string) => {
    if (!selectedDoctor || !dateStr) return true;
    const dayOfWeek = new Date(dateStr + "T00:00:00").getDay();
    return selectedDoctor.availableDays.includes(dayOfWeek);
  };

  const onSubmit = async (data: AppointmentForm) => {
    if (!data.date || !isDateAvailable(data.date)) {
      toast.error("Selected date is not available for this doctor");
      return;
    }
    setSubmitting(true);
    try {
      const dateTimeStr = `${data.date}T${data.time.replace(" AM", "").replace(" PM", "")}`;
      const timeMatch = data.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      let hours = parseInt(timeMatch?.[1] ?? "10");
      const mins = parseInt(timeMatch?.[2] ?? "0");
      const meridiem = timeMatch?.[3]?.toUpperCase();
      if (meridiem === "PM" && hours !== 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      const dt = new Date(data.date);
      dt.setHours(hours, mins, 0, 0);

      if (actor && selectedDoctor) {
        await actor.createDoctorAppointment(
          selectedDoctor.name,
          data.patientName,
          data.mobile,
          BigInt(dt.getTime() * 1_000_000),
          data.reason,
          BigInt(selectedDoctor.fee)
        );
      }

      setSubmitting(false);
      if (selectedDoctor?.freeConsultation) {
        toast.success("Appointment confirmed! No payment required.");
        reset();
        setSelectedDoctorId("");
      } else {
        setPaymentOpen(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  const handlePaymentConfirm = (txId: string) => {
    toast.success(`Appointment confirmed! Tx: ${txId}`);
    reset();
    setSelectedDoctorId("");
    setPaymentOpen(false);
  };

  const handleBookDoctor = (doctorId: number) => {
    const id = String(doctorId);
    setSelectedDoctorId(id);
    setValue("doctorId", id);
    const formEl = document.getElementById("appointment-form");
    formEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Get next available date for a doctor
  const getNextAvailableDate = (availableDays: number[]) => {
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (availableDays.includes(date.getDay())) {
        return date.toISOString().split("T")[0];
      }
    }
    return "";
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
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.15_300/0.15)] flex items-center justify-center">
              <UserRound className="w-4 h-4 text-[oklch(0.65_0.12_300)]" />
            </div>
            <span className="text-xs text-[oklch(0.65_0.12_300)] font-semibold tracking-widest uppercase">
              Doctor Consultation
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Specialist Doctors
          </h1>
          <p className="text-[oklch(0.6_0.008_240)] mt-1">
            10+ specialists visiting regularly · Affordable fees · Smart appointment booking
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Cards */}
        <div className="mb-10">
          <h2 className="font-heading font-semibold text-white text-lg mb-5">Our Specialist Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {doctors.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className={`bg-[oklch(0.12_0.002_240)] rounded-xl border overflow-hidden transition-all duration-200 ${
                  String(doctor.id) === watchedDoctorId
                    ? "border-[oklch(0.537_0.207_25.1/0.5)] shadow-red-sm"
                    : "border-[oklch(0.22_0.004_240)] hover:border-[oklch(0.537_0.207_25.1/0.3)]"
                }`}
              >
                <div className="h-0.5 bg-gradient-to-r from-[oklch(0.537_0.207_25.1)] to-transparent" />
                <div className="p-4">
                  {/* Avatar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                      style={{ background: doctor.color }}
                    >
                      {doctor.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-white text-sm leading-tight truncate">
                        {doctor.name}
                      </p>
                      <p className="text-xs text-[oklch(0.55_0.006_240)] leading-tight mt-0.5 line-clamp-2">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Available days */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {DAY_NAMES.map((day, idx) => (
                      <span
                        key={day}
                        className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                          doctor.availableDays.includes(idx)
                            ? "bg-[oklch(0.537_0.207_25.1/0.15)] text-[oklch(0.65_0.18_25.1)] border border-[oklch(0.537_0.207_25.1/0.3)]"
                            : "bg-[oklch(0.15_0.002_240)] text-[oklch(0.35_0.003_240)]"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Fee & Timing */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="flex items-center gap-1 text-[oklch(0.55_0.006_240)]">
                      <Clock className="w-3 h-3" /> {doctor.timing}
                    </span>
                    {doctor.freeConsultation ? (
                      <Badge className="bg-[oklch(0.65_0.15_142/0.15)] text-[oklch(0.7_0.15_142)] border border-[oklch(0.65_0.15_142/0.3)] text-xs px-2 py-0">
                        FREE
                      </Badge>
                    ) : (
                      <span className="font-display font-bold text-[oklch(0.65_0.18_25.1)]">
                        ₹{doctor.fee}
                      </span>
                    )}
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleBookDoctor(doctor.id)}
                    className="w-full bg-[oklch(0.537_0.207_25.1/0.1)] hover:bg-[oklch(0.537_0.207_25.1/0.2)] text-[oklch(0.65_0.18_25.1)] border border-[oklch(0.537_0.207_25.1/0.3)] text-xs h-8"
                    variant="outline"
                  >
                    <Calendar className="w-3 h-3 mr-1.5" />
                    Book Appointment
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Appointment Form */}
        <div id="appointment-form" className="scroll-mt-24">
          <div className="max-w-2xl mx-auto bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] p-6">
            <h2 className="font-display font-bold text-white text-xl mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[oklch(0.537_0.207_25.1)]" />
              Book Appointment
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Doctor Selection */}
              <div className="space-y-1.5">
                <Label className="text-sm text-[oklch(0.75_0.008_240)]">Select Doctor *</Label>
                <input {...register("doctorId", { required: "Required" })} type="hidden" value={selectedDoctorId} />
                <Select
                  value={watchedDoctorId}
                  onValueChange={(val) => {
                    setSelectedDoctorId(val);
                    setValue("doctorId", val);
                    // Auto-set next available date
                    const doc = doctors.find((d) => String(d.id) === val);
                    if (doc) {
                      const nextDate = getNextAvailableDate(doc.availableDays);
                      setValue("date", nextDate);
                    }
                  }}
                >
                  <SelectTrigger className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus:ring-[oklch(0.537_0.207_25.1)]">
                    <SelectValue placeholder="Choose a doctor..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.16_0.003_240)] border-[oklch(0.25_0.004_240)] text-white max-h-[280px] overflow-y-auto">
                    {doctors.map((doc) => (
                      <SelectItem
                        key={doc.id}
                        value={String(doc.id)}
                        className="text-white hover:bg-[oklch(0.537_0.207_25.1/0.15)] focus:bg-[oklch(0.537_0.207_25.1/0.15)]"
                      >
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-[oklch(0.5_0.005_240)]">{doc.specialty}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.doctorId && (
                  <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.doctorId.message}</p>
                )}
              </div>

              {/* Doctor info card */}
              {selectedDoctor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 rounded-lg bg-[oklch(0.15_0.002_240)] border border-[oklch(0.22_0.004_240)]"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[oklch(0.6_0.008_240)]">
                    <span>
                      Available:{" "}
                      <span className="text-white font-medium">
                        {selectedDoctor.availableDays.map((d) => FULL_DAY_NAMES[d]).join(", ")}
                      </span>
                    </span>
                    <span>
                      Timing: <span className="text-white font-medium">{selectedDoctor.timing}</span>
                    </span>
                    <span>
                      Fee:{" "}
                      <span className={`font-bold ${selectedDoctor.freeConsultation ? "text-[oklch(0.7_0.15_142)]" : "text-[oklch(0.65_0.18_25.1)]"}`}>
                        {selectedDoctor.freeConsultation ? "FREE" : `₹${selectedDoctor.fee}`}
                      </span>
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Patient Name *</Label>
                  <Input
                    {...register("patientName", { required: "Required" })}
                    placeholder="Full name"
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                  />
                  {errors.patientName && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.patientName.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Mobile *</Label>
                  <Input
                    {...register("mobile", {
                      required: "Required",
                      pattern: { value: /^[6-9]\d{9}$/, message: "Invalid mobile" },
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">
                    Date *{selectedDoctor && (
                      <span className="text-xs text-[oklch(0.5_0.005_240)] ml-1">
                        (Available: {selectedDoctor.availableDays.map((d) => DAY_NAMES[d]).join(", ")})
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register("date", {
                      required: "Required",
                      validate: (v) => !v || isDateAvailable(v) || "Doctor not available on this day",
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                  />
                  {errors.date && (
                    <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.date.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Time Slot *</Label>
                  <Select onValueChange={(val) => setValue("time", val)}>
                    <SelectTrigger className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus:ring-[oklch(0.537_0.207_25.1)]">
                      <SelectValue placeholder="Select slot..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.16_0.003_240)] border-[oklch(0.25_0.004_240)] text-white">
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem
                          key={slot}
                          value={slot}
                          className="text-white hover:bg-[oklch(0.537_0.207_25.1/0.15)] focus:bg-[oklch(0.537_0.207_25.1/0.15)]"
                        >
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input {...register("time", { required: "Required" })} type="hidden" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-[oklch(0.75_0.008_240)]">Reason for Visit *</Label>
                <Textarea
                  {...register("reason", { required: "Required" })}
                  placeholder="Briefly describe your symptoms or reason for consultation..."
                  rows={3}
                  className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] resize-none"
                />
                {errors.reason && (
                  <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.reason.message}</p>
                )}
              </div>

              {selectedDoctor && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[oklch(0.15_0.002_240)] border border-[oklch(0.22_0.004_240)]">
                  <span className="text-sm text-[oklch(0.6_0.008_240)]">Consultation Fee</span>
                  <span className={`font-display font-bold text-lg ${selectedDoctor.freeConsultation ? "text-[oklch(0.7_0.15_142)]" : "text-[oklch(0.65_0.18_25.1)]"}`}>
                    {selectedDoctor.freeConsultation ? "FREE" : `₹${selectedDoctor.fee}`}
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-11"
              >
                {submitting ? (
                  <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Booking...</>
                ) : (
                  <><CheckCircle2 className="mr-2 w-4 h-4" /> Confirm Appointment</>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <UPIPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={selectedDoctor?.fee ?? 0}
        title={`Consultation: ${selectedDoctor?.name ?? ""}`}
        onConfirm={handlePaymentConfirm}
      />
    </motion.div>
  );
}
