"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  loading: boolean;
  addProperty: (property: Omit<Property, "id" | "createdAt">) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  refreshProperties: () => Promise<void>;
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedData: Property[] = data.map((p: any) => ({
          ...p,
          createdAt: p.created_at,
        }));
        setProperties(mappedData);
      } else {
        setProperties(DEFAULT_PROPERTIES);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setProperties(DEFAULT_PROPERTIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (property: Omit<Property, "id" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            title: property.title,
            location: property.location,
            price: property.price,
            type: property.type,
            category: property.category,
            beds: property.beds,
            baths: property.baths,
            area: property.area,
            description: property.description,
            image: property.image,
            featured: property.featured,
          },
        ])
        .select();

      if (error) throw error;
      await fetchProperties();
    } catch (err) {
      console.error("Error adding property:", err);
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      if (id.startsWith("default-")) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        return;
      }

      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
      await fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err);
      throw err;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      if (id.startsWith("default-")) {
        setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
        return;
      }

      const { error } = await supabase.from("properties").update(updates).eq("id", id);
      if (error) throw error;
      await fetchProperties();
    } catch (err) {
      console.error("Error updating property:", err);
      throw err;
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        addProperty,
        deleteProperty,
        updateProperty,
        refreshProperties: fetchProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperties must be used inside PropertyProvider");
  return ctx;
}
