"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Bed, Bath, Maximize, ChevronDown } from "lucide-react";
import { useProperties } from "@/context/PropertyContext";

export default function PropertiesPage() {
  const { properties } = useProperties();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProperties = properties.filter((p) => {
    const matchesCategory = filter === "All" || p.type === filter || p.category === filter;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || p.category.toLowerCase() === typeFilter;
    return matchesCategory && matchesSearch && matchesType;
  });

  return (
    <main className="w-full bg-[#002f4b] pt-24 pb-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-visible mb-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#002f4b]/60 z-10" />
          <Image
            src="/images/luxury_property.png"
            alt="Oman Luxury Property"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container relative z-20 mx-auto px-6 lg:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-white mb-6"
          >
            Exclusive Listings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-rpm-gold uppercase tracking-[0.3em] text-sm"
          >
            Discover your next premium investment
          </motion.p>
        </div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-30"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location or keyword..."
                className="w-full bg-black/20 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-rpm-gold transition-colors"
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full appearance-none bg-black/20 border border-white/10 rounded-lg py-4 px-4 text-white focus:outline-none focus:border-rpm-gold transition-colors cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <button
                onClick={() => { setSearchQuery(""); setTypeFilter("all"); setFilter("All"); }}
                className="bg-rpm-gold text-black px-8 py-4 rounded-lg font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Property Listings */}
      <section className="container mx-auto px-6 lg:px-12 mt-32">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {["All", "Sale", "Rent", "Villa", "Commercial", "Office", "Land"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === f
                  ? "bg-rpm-gold border-rpm-gold text-black"
                  : "border-white/20 text-gray-400 hover:border-rpm-gold hover:text-rpm-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mb-12">
          Showing {filteredProperties.length} propert{filteredProperties.length === 1 ? "y" : "ies"}
        </p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProperties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center py-24 text-gray-400"
              >
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No properties found matching your criteria.</p>
              </motion.div>
            ) : (
              filteredProperties.map((prop) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#003a5c]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-rpm-gold/30 hover:shadow-[0_10px_40px_-10px_rgba(197,168,128,0.15)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={prop.image || "/images/luxury_property.png"}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider rounded-sm border border-white/10">
                      For {prop.type}
                    </div>
                    <div className="absolute bottom-4 right-4 glass text-rpm-gold px-4 py-2 text-sm font-medium rounded-sm border-rpm-gold/30">
                      {prop.price}
                    </div>
                    {prop.featured && (
                      <div className="absolute top-4 right-4 bg-rpm-gold text-black px-3 py-1 text-xs font-medium uppercase rounded-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-xs text-rpm-gold uppercase tracking-widest mb-2">{prop.category}</div>
                    <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-rpm-gold transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 text-rpm-gold/70" /> {prop.location}
                    </div>
                    {prop.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{prop.description}</p>
                    )}

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-300">
                        {prop.beds > 0 && (
                          <div className="flex items-center gap-1.5" title="Bedrooms">
                            <Bed className="w-4 h-4 text-rpm-gold" /> {prop.beds}
                          </div>
                        )}
                        {prop.baths > 0 && (
                          <div className="flex items-center gap-1.5" title="Bathrooms">
                            <Bath className="w-4 h-4 text-rpm-gold" /> {prop.baths}
                          </div>
                        )}
                        {prop.area && (
                          <div className="flex items-center gap-1.5" title="Area">
                            <Maximize className="w-4 h-4 text-rpm-gold" /> {prop.area}
                          </div>
                        )}
                      </div>
                      <button className="text-xs uppercase tracking-widest text-white border-b border-rpm-gold pb-1 hover:text-rpm-gold transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
