import { motion, useInView } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useRef } from "react";
import { FadeInView } from "./animations";
import AvailabilityCalendar from "./AvailabilityCalendar";

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
          Ready to experience {propertyName}? Check availability and contact us
          to reserve your dates.
        </p>
      </FadeInView>

      <motion.div
        ref={cardsRef}
        className="mx-auto mt-12 flex max-w-md flex-col gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Contact Card */}
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

        {/* Availability Calendar */}
        <div className="rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm">
          <h3 className="mb-4 text-center text-lg font-semibold text-neutral-900">
            Availability
          </h3>
          <AvailabilityCalendar />
        </div>
      </motion.div>
    </div>
  );
}
