import { motion } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import GradientRevealText from "./GradientRevealText";

interface HeroAnimatedProps {
  propertyName: string;
  featuredAmenities: readonly string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function HeroAnimated({
  propertyName,
  featuredAmenities,
}: HeroAnimatedProps): React.JSX.Element {
  return (
    <motion.div
      className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Property Name */}
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        variants={itemVariants}
      >
        {propertyName}
      </motion.h1>

      {/* Cycling Amenities with Gradient Reveal */}
      <motion.div
        className="mt-6 h-16 w-full max-w-3xl sm:mt-8"
        variants={itemVariants}
      >
        <GradientRevealText
          texts={featuredAmenities}
          interval={2500}
          className="text-xl font-medium text-white sm:text-2xl md:text-3xl"
        />
      </motion.div>

      {/* CTA Button */}
      <motion.div className="mt-10 sm:mt-12" variants={buttonVariants}>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl hover:scale-105"
        >
          Contact Us
          <ArrowDown className="h-5 w-5" />
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.5,
            duration: 0.6,
          },
        }}
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
