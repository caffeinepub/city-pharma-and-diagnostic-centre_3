import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Upload,
  Pill,
  Truck,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { medicines } from "@/data/medicines";
import { useCart } from "@/hooks/useCart";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import { useActor } from "@/hooks/useActor";

interface OrderForm {
  patientName: string;
  mobile: string;
  prescription: FileList;
  deliveryDate: string;
  deliveryTime: string;
  address: string;
}

export default function MedicinePage() {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { items, addItem, removeItem, clearCart, isInCart } = useCart();
  const { actor } = useActor();

  const filtered = useMemo(
    () =>
      medicines.filter(
        (m) =>
          !search ||
          m.brand.toLowerCase().includes(search.toLowerCase()) ||
          m.generic.toLowerCase().includes(search.toLowerCase()) ||
          m.manufacturer.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderForm>();

  const onSubmit = async (data: OrderForm) => {
    setSubmitting(true);
    try {
      const deliveryDateTime = new Date(`${data.deliveryDate}T${data.deliveryTime}`);
      const prescriptionFileName = data.prescription?.[0]?.name ?? "prescription.pdf";

      if (actor) {
        await actor.createMedicineOrder(
          data.patientName,
          data.mobile,
          data.address,
          BigInt(deliveryDateTime.getTime() * 1_000_000),
          prescriptionFileName
        );
      }

      setSubmitting(false);
      setOrderFormOpen(false);
      setPaymentOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit order. Please try again.");
      setSubmitting(false);
    }
  };

  const handlePaymentConfirm = (txId: string) => {
    toast.success(`Order placed! Transaction ID: ${txId}`);
    clearCart();
    reset();
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
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="float-1 absolute top-4 right-16 text-[oklch(0.537_0.207_25.1)]">
            <Pill className="w-16 h-16" />
          </div>
          <div className="float-3 absolute top-8 right-48 text-[oklch(0.537_0.207_25.1)]">
            <Pill className="w-10 h-10" />
          </div>
          <div className="float-2 absolute bottom-2 right-32 text-[oklch(0.37_0.18_264.4)]">
            <Pill className="w-12 h-12" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[oklch(0.537_0.207_25.1/0.15)] flex items-center justify-center">
                  <Pill className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                </div>
                <span className="text-xs text-[oklch(0.537_0.207_25.1)] font-semibold tracking-widest uppercase">
                  Medicine Services
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Order Medicines Online
              </h1>
              <p className="text-[oklch(0.6_0.008_240)] mt-1">
                Branded & generic medicines with FREE home delivery within 20 km
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Animated delivery truck */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-[oklch(0.55_0.006_240)] bg-[oklch(0.537_0.207_25.1/0.1)] border border-[oklch(0.537_0.207_25.1/0.2)] px-3 py-2 rounded-lg">
                <Truck className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                Free delivery within 20 km
              </div>
              <Button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {items.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[oklch(0.537_0.207_25.1)] text-xs font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.005_240)]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand name, generic/salt, or manufacturer..."
            className="pl-10 bg-[oklch(0.14_0.002_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] h-11"
          />
        </div>
        <p className="text-xs text-[oklch(0.5_0.005_240)] mt-2">
          Showing {filtered.length} of {medicines.length} medicines
        </p>
      </section>

      {/* Medicine Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence>
            {filtered.map((med) => {
              const inCart = isInCart(med.id);
              return (
                <motion.div
                  key={med.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] overflow-hidden hover:border-[oklch(0.537_0.207_25.1/0.4)] transition-colors group"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm truncate">
                          {med.brand}
                        </h3>
                        <p className="text-xs text-[oklch(0.55_0.006_240)] mt-0.5 truncate">
                          {med.generic}
                        </p>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 mt-1 ml-2 ${
                          med.inStock ? "bg-[oklch(0.65_0.15_142)]" : "bg-[oklch(0.537_0.207_25.1)]"
                        }`}
                        title={med.inStock ? "In Stock" : "Out of Stock"}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(0.18_0.003_240)] text-[oklch(0.6_0.008_240)]">
                        {med.strength}
                      </span>
                      {med.prescriptionRequired && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(0.55_0.15_60/0.1)] text-[oklch(0.7_0.15_60)] border border-[oklch(0.55_0.15_60/0.2)]">
                          Rx Required
                        </span>
                      )}
                      {!med.inStock && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(0.537_0.207_25.1/0.1)] text-[oklch(0.65_0.18_25.1)]">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[oklch(0.45_0.004_240)] mb-3">
                      {med.manufacturer}
                    </p>

                    <Button
                      type="button"
                      size="sm"
                      disabled={!med.inStock}
                      onClick={() =>
                        inCart
                          ? removeItem(med.id)
                          : addItem(med)
                      }
                      className={`w-full text-xs transition-all ${
                        inCart
                          ? "bg-[oklch(0.65_0.15_142/0.15)] text-[oklch(0.7_0.15_142)] border border-[oklch(0.65_0.15_142/0.3)] hover:bg-[oklch(0.537_0.207_25.1/0.15)] hover:text-[oklch(0.65_0.18_25.1)]"
                          : "bg-[oklch(0.537_0.207_25.1/0.1)] text-[oklch(0.65_0.18_25.1)] border border-[oklch(0.537_0.207_25.1/0.2)] hover:bg-[oklch(0.537_0.207_25.1/0.2)]"
                      }`}
                      variant="outline"
                    >
                      {inCart ? (
                        <span className="flex items-center gap-1">
                          <Minus className="w-3 h-3" /> Remove
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add to Cart
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-[oklch(0.3_0.003_240)] mx-auto mb-3" />
            <p className="text-[oklch(0.5_0.005_240)]">No medicines found for "{search}"</p>
          </div>
        )}
      </section>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="bg-[oklch(0.12_0.002_240)] border-[oklch(0.22_0.004_240)] text-white w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white font-display">
              Your Cart ({items.length} items)
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <ShoppingCart className="w-12 h-12 text-[oklch(0.3_0.003_240)] mb-3" />
              <p className="text-[oklch(0.5_0.005_240)]">Your cart is empty</p>
            </div>
          ) : (
            <div className="mt-4 flex flex-col h-full">
              <div className="flex-1 overflow-auto space-y-2 max-h-[50vh]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[oklch(0.15_0.002_240)] border border-[oklch(0.22_0.004_240)]"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{item.brand}</p>
                      <p className="text-xs text-[oklch(0.5_0.005_240)] truncate">{item.generic} · {item.strength}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[oklch(0.4_0.005_240)] hover:text-[oklch(0.537_0.207_25.1)] transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3 border-t border-[oklch(0.22_0.004_240)] pt-4">
                <div className="flex items-center gap-2 text-xs text-[oklch(0.55_0.006_240)] bg-[oklch(0.537_0.207_25.1/0.08)] border border-[oklch(0.537_0.207_25.1/0.2)] rounded-lg p-2.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[oklch(0.65_0.15_60)] shrink-0" />
                  Upload prescription for Rx medicines
                </div>
                <Button
                  type="button"
                  onClick={() => { setCartOpen(false); setOrderFormOpen(true); }}
                  className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold"
                >
                  Proceed to Order
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Order Form Sheet */}
      <Sheet open={orderFormOpen} onOpenChange={setOrderFormOpen}>
        <SheetContent className="bg-[oklch(0.12_0.002_240)] border-[oklch(0.22_0.004_240)] text-white w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-white font-display flex items-center gap-2">
              <Upload className="w-5 h-5 text-[oklch(0.537_0.207_25.1)]" />
              Place Medicine Order
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
            {/* Patient Name */}
            <div className="space-y-1.5">
              <Label className="text-[oklch(0.75_0.008_240)]">Patient Name *</Label>
              <Input
                {...register("patientName", { required: "Name is required" })}
                placeholder="Enter full name"
                className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
              />
              {errors.patientName && (
                <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.patientName.message}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <Label className="text-[oklch(0.75_0.008_240)]">Mobile Number *</Label>
              <Input
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile number" },
                })}
                placeholder="10-digit mobile number"
                type="tel"
                maxLength={10}
                className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
              />
              {errors.mobile && (
                <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.mobile.message}</p>
              )}
            </div>

            {/* Prescription Upload */}
            <div className="space-y-1.5">
              <Label className="text-[oklch(0.75_0.008_240)]">Upload Prescription</Label>
              <div className="relative">
                <Input
                  {...register("prescription")}
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white file:text-[oklch(0.65_0.18_25.1)] file:bg-[oklch(0.537_0.207_25.1/0.1)] file:border-0 file:rounded file:px-2 file:py-1 file:text-xs cursor-pointer focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                />
              </div>
              <p className="text-xs text-[oklch(0.45_0.004_240)]">JPG, PNG or PDF (max 10MB)</p>
            </div>

            {/* Delivery Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.75_0.008_240)]">Delivery Date *</Label>
                <Input
                  {...register("deliveryDate", { required: "Date required" })}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                />
                {errors.deliveryDate && (
                  <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.deliveryDate.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.75_0.008_240)]">Delivery Time *</Label>
                <Input
                  {...register("deliveryTime", { required: "Time required" })}
                  type="time"
                  className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white focus-visible:ring-[oklch(0.537_0.207_25.1)]"
                />
                {errors.deliveryTime && (
                  <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.deliveryTime.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label className="text-[oklch(0.75_0.008_240)]">Delivery Address *</Label>
              <Textarea
                {...register("address", { required: "Address is required" })}
                placeholder="Full delivery address with landmark..."
                rows={3}
                className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)] resize-none"
              />
              {errors.address && (
                <p className="text-xs text-[oklch(0.65_0.18_25.1)]">{errors.address.message}</p>
              )}
            </div>

            {/* Items summary */}
            {items.length > 0 && (
              <div className="p-3 rounded-lg bg-[oklch(0.15_0.002_240)] border border-[oklch(0.22_0.004_240)]">
                <p className="text-xs text-[oklch(0.6_0.008_240)] font-medium mb-1.5">
                  {items.length} item(s) in order:
                </p>
                <div className="flex flex-wrap gap-1">
                  {items.map((i) => (
                    <Badge
                      key={i.id}
                      variant="secondary"
                      className="text-xs bg-[oklch(0.537_0.207_25.1/0.1)] text-[oklch(0.65_0.18_25.1)] border border-[oklch(0.537_0.207_25.1/0.2)]"
                    >
                      {i.brand}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold h-11"
            >
              {submitting ? (
                <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><CheckCircle2 className="mr-2 w-4 h-4" /> Submit Order</>
              )}
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      {/* UPI Payment Modal */}
      <UPIPaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={0}
        title="Medicine Order Payment"
        onConfirm={handlePaymentConfirm}
      />
    </motion.div>
  );
}
