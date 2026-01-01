"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
}

export function PartnerLogos() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/partners/active");
        const data = await response.json();
        
        if (data.success && data.data) {
          // Duplicate the array for seamless infinite scroll
          setPartners([...data.data, ...data.data]);
        }
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Our Trusted Partners</h2>
          <div className="flex gap-8 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="container mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">Our Trusted Partners</h2>
        <p className="text-center text-muted-foreground">
          Collaborating with industry leaders to deliver excellence
        </p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: partners.length * 3, // Adjust speed based on number of partners
              ease: "linear",
            },
          }}
        >
          {partners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-40 h-24 relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              {partner.websiteUrl ? (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  title={partner.name}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                </a>
              ) : (
                <div
                  className="relative w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm"
                  title={partner.name}
                >
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
