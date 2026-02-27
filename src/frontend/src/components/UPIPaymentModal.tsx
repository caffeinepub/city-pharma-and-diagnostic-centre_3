import { useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { Check, X, Smartphone, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UPIPaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  onConfirm: (transactionId: string) => void;
}

const UPI_ID = "7295970820@naviaxis";
const PAYEE_NAME = "City+Pharma+and+Diagnostic+Centre";

export default function UPIPaymentModal({
  open,
  onClose,
  amount,
  title,
  onConfirm,
}: UPIPaymentModalProps) {
  const [transactionId, setTransactionId] = useState("");
  const [confirming, setConfirming] = useState(false);

  const upiString = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${amount}&cu=INR`;

  const handleConfirm = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter the transaction ID");
      return;
    }
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 800));
    setConfirming(false);
    onConfirm(transactionId);
    setTransactionId("");
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[oklch(0.12_0.002_240)] border-[oklch(0.22_0.004_240)] text-white max-w-sm w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-white font-display text-lg">
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount */}
          <div className="text-center p-3 rounded-lg bg-[oklch(0.537_0.207_25.1/0.1)] border border-[oklch(0.537_0.207_25.1/0.2)]">
            <p className="text-xs text-[oklch(0.55_0.006_240)] mb-1">{title}</p>
            <p className="text-2xl font-display font-bold text-white">₹{amount.toLocaleString("en-IN")}</p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-xl">
              <QRCodeSVG
                value={upiString}
                size={140}
                bgColor="#FFFFFF"
                fgColor="#0F0F0F"
                level="M"
              />
            </div>
            <p className="text-xs text-[oklch(0.5_0.005_240)] text-center">
              Scan with any UPI app
            </p>
          </div>

          {/* UPI ID */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[oklch(0.15_0.003_240)] border border-[oklch(0.25_0.004_240)]">
            <Smartphone className="w-4 h-4 text-[oklch(0.537_0.207_25.1)] shrink-0" />
            <span className="text-sm text-white flex-1 font-mono">{UPI_ID}</span>
            <button
              type="button"
              onClick={copyUpiId}
              className="text-[oklch(0.55_0.006_240)] hover:text-white transition-colors"
              aria-label="Copy UPI ID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Supported apps */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
              <span
                key={app}
                className="px-2 py-0.5 rounded-full text-xs bg-[oklch(0.37_0.18_264.4/0.15)] text-[oklch(0.6_0.14_264.4)] border border-[oklch(0.37_0.18_264.4/0.2)]"
              >
                {app}
              </span>
            ))}
          </div>

          {/* Transaction ID */}
          <div className="space-y-1.5">
            <Label className="text-sm text-[oklch(0.75_0.008_240)]">
              Enter Transaction ID / UTR Number
            </Label>
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. 412381234567"
              className="bg-[oklch(0.15_0.003_240)] border-[oklch(0.25_0.004_240)] text-white placeholder:text-[oklch(0.4_0.005_240)] focus-visible:ring-[oklch(0.537_0.207_25.1)]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[oklch(0.25_0.004_240)] text-[oklch(0.6_0.008_240)] hover:text-white hover:bg-white/5"
            >
              <X className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-medium"
              >
                {confirming ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Confirm Payment
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
