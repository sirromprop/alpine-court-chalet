import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Bath,
  Bed,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountUp, FadeInView } from "./animations";

interface Amenity {
  name: string;
  icon?: string;
  schemaName?: string;
}

interface AmenityCategory {
  category: string;
  items: Amenity[];
}

interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  levels: number;
}

interface PropertyOverviewProps {
  description: string;
  fullDescription: string;
  specs: PropertySpecs;
  amenities: readonly AmenityCategory[];
}

const specIcons = {
  bedrooms: Bed,
  bathrooms: Bath,
  maxGuests: Users,
  levels: Layers,
};

const specLabels = {
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  maxGuests: "Guests",
  levels: "Levels",
};

export default function PropertyOverviewAnimated({
  description,
  fullDescription,
  specs,
  amenities,
}: PropertyOverviewProps): React.JSX.Element {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);
  const isSpecsInView = useInView(specsRef, { once: true, margin: "-50px" });
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const isAmenitiesInView = useInView(amenitiesRef, {
    once: true,
    margin: "-50px",
  });

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (showFullDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFullDescription]);

  const specsList = [
    { key: "bedrooms" as const, value: specs.bedrooms },
    { key: "bathrooms" as const, value: specs.bathrooms },
    { key: "maxGuests" as const, value: specs.maxGuests },
    { key: "levels" as const, value: specs.levels },
  ];

  return (
    <section id="overview" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInView className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Your Mountain Retreat
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-600">
            {description}
          </p>
          <button
            type="button"
            onClick={() => setShowFullDescription(true)}
            className="mt-4 inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            <Info className="h-4 w-4" />
            Read more about the Chalet
          </button>
        </FadeInView>

        {/* Full Description Dialog */}
        <AnimatePresence>
          {showFullDescription && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowFullDescription(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Dialog */}
              <motion.div
                className="relative flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 sm:px-8">
                  <h2 className="text-2xl font-bold text-neutral-900">
                    About The Chalet
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowFullDescription(false)}
                    className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-8 sm:px-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-400 hover:[&::-webkit-scrollbar-thumb]:bg-primary-500">
                  <div className="prose prose-neutral max-w-none">
                    <div className="space-y-4 text-neutral-600 whitespace-pre-line">
                      {fullDescription}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property Specs */}
        <motion.div
          ref={specsRef}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8"
        >
          {specsList.map((spec, index) => {
            const Icon = specIcons[spec.key];
            return (
              <motion.div
                key={spec.key}
                className="flex flex-col items-center rounded-2xl bg-neutral-50 p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isSpecsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="text-primary-600">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="mt-3 text-3xl font-bold text-neutral-900">
                  <CountUp value={spec.value} />
                </span>
                <span className="mt-1 text-sm font-medium text-neutral-500">
                  {specLabels[spec.key]}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Key Amenities */}
        <div id="amenities" className="mt-16 scroll-mt-24">
          <FadeInView className="text-center">
            <h3 className="text-2xl font-bold text-neutral-900">
              What Makes Us Special
            </h3>
          </FadeInView>

          <motion.div
            ref={amenitiesRef}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="wait">
              {(showAllAmenities ? amenities : amenities.slice(0, 3)).map(
                (category, catIndex) => (
                  <motion.div
                    key={category.category}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isAmenitiesInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <h4 className="text-lg font-semibold text-neutral-900">
                      {category.category}
                    </h4>
                    <ul className="mt-4 space-y-2">
                      {(showAllAmenities
                        ? category.items
                        : category.items.slice(0, 6)
                      ).map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center gap-2 text-sm text-neutral-600"
                        >
                          <Check className="h-4 w-4 flex-shrink-0 text-primary-600" />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {/* Show All Amenities Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={isAmenitiesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="button"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700"
            >
              <span>
                {showAllAmenities ? "Hide amenities" : "View all amenities"}
              </span>
              {showAllAmenities ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
