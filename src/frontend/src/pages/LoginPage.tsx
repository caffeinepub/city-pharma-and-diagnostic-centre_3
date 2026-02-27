import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import {
  Smartphone,
  LogOut,
  Package,
  Microscope,
  Activity,
  UserRound,
  RefreshCw,
  CheckCircle2,
  Loader2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@/hooks/useActor";

type FlowStep = "mobile" | "otp" | "profile";

function formatTimestamp(ns: bigint): string {
  return new Date(Number(ns / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  let cls = "badge-pending";
  if (lower === "confirmed") cls = "badge-confirmed";
  else if (lower === "completed") cls = "badge-completed";
  else if (lower === "cancelled") cls = "badge-cancelled";
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${cls}`}>
      {status}
    </span>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<FlowStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { session, isLoggedIn, login, logout } = useAuth();
  const { actor } = useActor();

  // Timer countdown
  useEffect(() => {
    if (!timerActive) return;
    if (timer <= 0) { setTimerActive(false); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timerActive, timer]);

  const sendOtp = useCallback(() => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtp(["", "", "", "", "", ""]);
    setTimer(120);
    setTimerActive(true);
    setStep("otp");
    // Show OTP for demo
    setTimeout(() => {
      toast.info(`Demo OTP: ${code}`, { duration: 30000 });
      console.log("[DEMO] OTP:", code);
    }, 500);
  }, [mobile]);

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Enter all 6 digits");
      return;
    }
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    if (enteredOtp === generatedOtp) {
      login(mobile);
      setStep("profile");
      toast.success("Login successful!");
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
    setVerifying(false);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Backend queries for logged-in user
  const userMobile = session?.mobile ?? "";

  const { data: medicineOrders, isLoading: loadingMeds } = useQuery({
    queryKey: ["medicineOrders", userMobile],
    queryFn: () => actor?.getMedicineOrdersByMobile(userMobile) ?? Promise.resolve([]),
    enabled: isLoggedIn && !!actor && !!userMobile,
  });

  const { data: pathologyBookings, isLoading: loadingPath } = useQuery({
    queryKey: ["pathologyBookings", userMobile],
    queryFn: () => actor?.getPathologyBookingsByMobile(userMobile) ?? Promise.resolve([]),
    enabled: isLoggedIn && !!actor && !!userMobile,
  });

  const { data: ultrasoundBookings, isLoading: loadingUltra } = useQuery({
    queryKey: ["ultrasoundBookings", userMobile],
    queryFn: () => actor?.getUltrasoundBookingsByMobile(userMobile) ?? Promise.resolve([]),
    enabled: isLoggedIn && !!actor && !!userMobile,
  });

  const { data: doctorAppointments, isLoading: loadingDocs } = useQuery({
    queryKey: ["doctorAppointments", userMobile],
    queryFn: () => actor?.getDoctorAppointmentsByMobile(userMobile) ?? Promise.resolve([]),
    enabled: isLoggedIn && !!actor && !!userMobile,
  });

  const formatTimer = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (isLoggedIn && session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Profile Header */}
        <section className="bg-[oklch(0.11_0.001_240)] border-b border-[oklch(0.22_0.004_240)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[oklch(0.537_0.207_25.1/0.15)] border-2 border-[oklch(0.537_0.207_25.1/0.3)] flex items-center justify-center">
                  <UserRound className="w-7 h-7 text-[oklch(0.65_0.18_25.1)]" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-white text-xl">My Profile</h1>
                  <p className="text-[oklch(0.6_0.008_240)] text-sm flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> {session.mobile}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => { logout(); setStep("mobile"); setMobile(""); }}
                variant="outline"
                className="border-[oklch(0.25_0.004_240)] text-[oklch(0.6_0.008_240)] hover:text-white hover:border-[oklch(0.537_0.207_25.1/0.5)]"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </section>

        {/* Booking History */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="medicines">
            <TabsList className="bg-[oklch(0.15_0.002_240)] border border-[oklch(0.22_0.004_240)] mb-6 flex-wrap h-auto gap-1 p-1">
              {[
                { value: "medicines", icon: Package, label: "Medicines" },
                { value: "pathology", icon: Microscope, label: "Pathology" },
                { value: "ultrasound", icon: Activity, label: "Ultrasound" },
                { value: "doctors", icon: UserRound, label: "Doctors" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center gap-1.5 text-[oklch(0.6_0.008_240)] data-[state=active]:bg-[oklch(0.537_0.207_25.1)] data-[state=active]:text-white data-[state=active]:shadow-red-sm"
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="medicines">
              <h3 className="font-heading font-semibold text-white mb-4">Medicine Orders</h3>
              {loadingMeds ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[oklch(0.537_0.207_25.1)]" /></div>
              ) : !medicineOrders?.length ? (
                <EmptyState message="No medicine orders yet" />
              ) : (
                <div className="space-y-3">
                  {medicineOrders.map((order) => (
                    <BookingCard key={String(order.id)} title={`Order #${order.id}`} status={order.status} date={formatTimestamp(order.createdAt)} detail={`Delivery to: ${order.address}`} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pathology">
              <h3 className="font-heading font-semibold text-white mb-4">Pathology Bookings</h3>
              {loadingPath ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[oklch(0.537_0.207_25.1)]" /></div>
              ) : !pathologyBookings?.length ? (
                <EmptyState message="No pathology bookings yet" />
              ) : (
                <div className="space-y-3">
                  {pathologyBookings.map((booking) => (
                    <BookingCard
                      key={String(booking.id)}
                      title={`Lab Booking #${booking.id}`}
                      status={booking.status}
                      date={formatTimestamp(booking.dateTime)}
                      detail={`${booking.tests.length} tests · ${booking.sampleCollectionType} · ₹${Number(booking.totalAmount).toLocaleString("en-IN")}`}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="ultrasound">
              <h3 className="font-heading font-semibold text-white mb-4">Ultrasound Bookings</h3>
              {loadingUltra ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[oklch(0.537_0.207_25.1)]" /></div>
              ) : !ultrasoundBookings?.length ? (
                <EmptyState message="No ultrasound bookings yet" />
              ) : (
                <div className="space-y-3">
                  {ultrasoundBookings.map((booking) => (
                    <BookingCard
                      key={String(booking.id)}
                      title={booking.scanType}
                      status={booking.status}
                      date={formatTimestamp(booking.dateTime)}
                      detail={`Amount: ₹${Number(booking.amount).toLocaleString("en-IN")}`}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="doctors">
              <h3 className="font-heading font-semibold text-white mb-4">Doctor Appointments</h3>
              {loadingDocs ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[oklch(0.537_0.207_25.1)]" /></div>
              ) : !doctorAppointments?.length ? (
                <EmptyState message="No doctor appointments yet" />
              ) : (
                <div className="space-y-3">
                  {doctorAppointments.map((appt) => (
                    <BookingCard
                      key={String(appt.id)}
                      title={appt.doctorName}
                      status={appt.status}
                      date={formatTimestamp(appt.dateTime)}
                      detail={`${appt.reason} · Fee: ${Number(appt.fee) === 0 ? "FREE" : `₹${Number(appt.fee)}`}`}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[70vh] flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[oklch(0.537_0.207_25.1/0.1)] border border-[oklch(0.537_0.207_25.1/0.2)] flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-[oklch(0.65_0.18_25.1)]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Customer Login</h1>
          <p className="text-[oklch(0.55_0.006_240)] text-sm mt-1">
            {step === "mobile" ? "Enter your mobile number" : "Enter the 6-digit OTP"}
          </p>
        </div>

        <div className="bg-[oklch(0.12_0.002_240)] rounded-2xl border border-[oklch(0.22_0.004_240)] p-6">
          <AnimatePresence mode="wait">
            {step === "mobile" && (
              <motion.div
                key="mobile-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label className="text-sm text-[oklch(0.75_0.008_240)]">Mobile Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.5_0.005_240)] text-sm">
                      +91
                    </span>
                    <Input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9XXXXXXXXX"
                      type="tel"
                      maxLength={10}
                      className="pl-11 bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] h-11"
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={sendOtp}
                  disabled={mobile.length !== 10}
                  className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-11"
                >
                  Send OTP
                </Button>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="text-center">
                  <p className="text-sm text-[oklch(0.6_0.008_240)]">
                    OTP sent to <span className="text-white font-medium">+91 {mobile}</span>
                  </p>
                </div>

                {/* 6-digit OTP inputs */}
                <div className="flex gap-2 justify-center">
                  {["d1","d2","d3","d4","d5","d6"].map((pos, i) => (
                    <input
                      key={pos}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-10 h-12 text-center text-lg font-bold rounded-lg border bg-[oklch(0.15_0.003_240)] text-white transition-all ${
                        otp[i]
                          ? "border-[oklch(0.537_0.207_25.1)] bg-[oklch(0.537_0.207_25.1/0.1)]"
                          : "border-[oklch(0.25_0.004_240)] focus:border-[oklch(0.537_0.207_25.1)]"
                      } outline-none focus:ring-2 focus:ring-[oklch(0.537_0.207_25.1/0.3)]`}
                      aria-label={`OTP digit ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="text-center">
                  {timerActive ? (
                    <p className="text-sm text-[oklch(0.55_0.006_240)] flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Resend OTP in <span className="text-white font-mono font-medium">{formatTimer(timer)}</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-sm text-[oklch(0.537_0.207_25.1)] hover:underline flex items-center gap-1.5 mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                    </button>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={verifyOtp}
                  disabled={verifying || otp.join("").length !== 6}
                  className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-11"
                >
                  {verifying ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying...</>
                  ) : (
                    <><CheckCircle2 className="mr-2 w-4 h-4" /> Verify OTP</>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("mobile")}
                  className="w-full text-sm text-[oklch(0.5_0.005_240)] hover:text-white transition-colors"
                >
                  ← Change mobile number
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-[oklch(0.45_0.004_240)]">
      <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function BookingCard({
  title,
  status,
  date,
  detail,
}: {
  title: string;
  status: string;
  date: string;
  detail: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-[oklch(0.12_0.002_240)] border border-[oklch(0.22_0.004_240)]">
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-heading font-semibold text-white text-sm">{title}</p>
        <StatusBadge status={status} />
      </div>
      <p className="text-xs text-[oklch(0.55_0.006_240)] mb-0.5">{date}</p>
      <p className="text-xs text-[oklch(0.5_0.005_240)]">{detail}</p>
    </div>
  );
}
