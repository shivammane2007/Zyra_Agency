"use client"

import { motion } from "framer-motion"
import { WorldMap } from "@/components/ui/map"

export default function MapDemo() {
  return (
    <div className="w-full py-40">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-heading text-3xl font-bold text-zyra-text-primary md:text-5xl">
          Global Network
        </p>
        <p className="mx-auto max-w-2xl py-4 text-sm text-zyra-text-secondary md:text-lg">
          Connect with teams and clients worldwide. Our platform enables seamless collaboration across continents.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 max-w-7xl px-4"
      >
        <WorldMap
          dots={[
            {
              start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
              end: { lat: 51.5074, lng: -0.1278, label: "London" },
            },
            {
              start: { lat: 51.5074, lng: -0.1278, label: "London" },
              end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
            },
            {
              start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
              end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
            },
            {
              start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
              end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
            },
          ]}
          lineColor="#39ff87"
        />
      </motion.div>
    </div>
  )
}