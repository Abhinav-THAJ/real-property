"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "Sale" | "Rent";
  category: "Villa" | "Apartment" | "Commercial" | "Office" | "Land";
  beds: number;
  baths: number;
  area: string;
  description: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, "id" | "createdAt">) => void;
  deleteProperty: (id: string) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
}

const PropertyContext = createContext<PropertyContextType | null>(null);

const DEFAULT_PROPERTIES: Property[] = [
  {
    id: "default-1",
    title: "Al Mouj Luxury Villa",
    location: "Al Mouj, Muscat",
    price: "OMR 450,000",
    type: "Sale",
    category: "Villa",
    beds: 5,
    baths: 4,
    area: "600 sqm",
    description: "Stunning luxury villa with premium finishes and sea views.",
    image: "/images/luxury_property.png",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-2",
    title: "Muscat Bay Penthouse",
    location: "Muscat Bay",
    price: "OMR 2,500 / mo",
    type: "Rent",
    category: "Apartment",
    beds: 3,
    baths: 2,
    area: "250 sqm",
    description: "Breathtaking penthouse apartment with panoramic bay views.",
    image: "/images/hero_skyline.png",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-3",
    title: "Bousher Commercial Hub",
    location: "Bousher",
    price: "OMR 1,200,000",
    type: "Sale",
    category: "Commercial",
    beds: 0,
    baths: 0,
    area: "1200 sqm",
    description: "Premium commercial space in the heart of Bousher.",
    image: "/images/commercial_building.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-4",
    title: "Qurum Executive Office",
    location: "Qurum",
    price: "OMR 1,500 / mo",
    type: "Rent",
    category: "Office",
    beds: 0,
    baths: 2,
    area: "150 sqm",
    description: "Modern executive office space in prime Qurum location.",
    image: "/images/office_team.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-5",
    title: "Azaiba Modern Mansion",
    location: "Azaiba",
    price: "OMR 850,000",
    type: "Sale",
    category: "Villa",
    beds: 6,
    baths: 5,
    area: "800 sqm",
    description: "Grand modern mansion with state-of-the-art amenities.",
    image: "/images/luxury_interior.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-6",
    title: "Shatti Al Qurum Flat",
    location: "Shatti Al Qurum",
    price: "OMR 800 / mo",
    type: "Rent",
    category: "Apartment",
    beds: 2,
    baths: 2,
    area: "120 sqm",
    description: "Elegant apartment in the prestigious Shatti Al Qurum area.",
    image: "/images/evening_skyline.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);

  useEffect(() => {
    const stored = localStorage.getItem("rpm_properties");
    if (stored) {
      try {
        const parsed: Property[] = JSON.parse(stored);
        // Use the full stored list (includes any admin edits/deletes)
        setProperties(parsed);
      } catch {
        // ignore parse errors, fall back to defaults
      }
    } else {
      // First visit: persist the defaults so future deletes are tracked
      localStorage.setItem("rpm_properties", JSON.stringify(DEFAULT_PROPERTIES));
    }
  }, []);

  const persist = (props: Property[]) => {
    localStorage.setItem("rpm_properties", JSON.stringify(props));
    setProperties(props);
  };

  const addProperty = (property: Omit<Property, "id" | "createdAt">) => {
    const newProp: Property = {
      ...property,
      id: `admin-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...properties, newProp];
    persist(updated);
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    persist(updated);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updated = properties.map((p) => (p.id === id ? { ...p, ...updates } : p));
    persist(updated);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, deleteProperty, updateProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperties must be used inside PropertyProvider");
  return ctx;
}
