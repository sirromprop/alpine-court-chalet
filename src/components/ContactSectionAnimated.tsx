import { motion, useInView } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useRef } from "react";
import { FadeInView } from "./animations";

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  role: "property_manager" | "owner";
}

interface ContactSectionProps {
  propertyName: string;
  primaryContact: ContactPerson;
}

export default function ContactSectionAnimated({
  propertyName,
  primaryContact,
}: ContactSectionProps): React.JSX.Element {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeInView className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Book Your Stay
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-200">
          Ready to experience {propertyName}? Contact us directly to check
          availability and reserve your dates.
        </p>
      </FadeInView>

      <motion.div
        ref={cardsRef}
        className="mx-auto mt-12 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
              Property Manager
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-neutral-900">
            {primaryContact.name}
          </h3>

          <div className="mt-6 space-y-4">
            <a
              href={`mailto:${primaryContact.email}`}
              className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-3 text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              <Mail className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                {primaryContact.email}
              </span>
            </a>
            <a
              href={`tel:${primaryContact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-3 text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              <Phone className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                {primaryContact.phone}
              </span>
            </a>
            <a
              href={`sms:${primaryContact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-lg bg-primary-600 px-4 py-3 text-white transition-colors hover:bg-primary-700"
            >
              <MessageCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">Send a Text Message</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* <motion.div
        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      >
        <a
          href="/house-rules"
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/90 px-6 py-3 font-medium text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-700"
        >
          <FileText className="h-5 w-5" />
          View House Rules
        </a>
        <a
          href="/house-rules#booking-terms"
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/90 px-6 py-3 font-medium text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-700"
        >
          <Receipt className="h-5 w-5" />
          Booking Terms
        </a>
      </motion.div> */}
    </div>
  );
}
