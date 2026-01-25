import { motion, useInView } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useRef } from "react";

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  role: "property_manager" | "owner";
}

interface PropertyLocation {
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
}

interface FooterProps {
  propertyName: string;
  shortDescription: string;
  location: PropertyLocation;
  companyName: string;
  identifier: string;
  primaryContact: ContactPerson;
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#amenities", label: "Amenities" },
  // { href: "/house-rules", label: "House Rules" },
  { href: "/#contact", label: "Contact" },
];

export default function FooterAnimated({
  propertyName,
  shortDescription,
  location,
  companyName,
  identifier,
  primaryContact,
}: FooterProps): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer ref={footerRef} className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand & Description */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h2 className="text-xl font-semibold text-white">{propertyName}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
              {shortDescription}
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={`mailto:${primaryContact.email}`}
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {primaryContact.email}
              </a>
              <a
                href={`tel:${primaryContact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {primaryContact.phone}
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Location
            </h3>
            <address className="mt-4 not-italic">
              <p className="text-sm text-neutral-400">
                {location.address.city}, {location.address.region}
              </p>
              <p className="text-sm text-neutral-400">
                {location.address.country}
              </p>
            </address>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 border-t border-neutral-800 pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-500">
              &copy; {currentYear} {companyName}. All rights reserved.
            </p>
            <p className="text-sm text-neutral-500">
              Registration: {identifier}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
