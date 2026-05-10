"use client";

import { useState, useRef } from "react";
import { useProperties, Property } from "@/context/PropertyContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, LogOut, Plus, Trash2, Eye, Home,
  Building, Users, MapPin, Upload, CheckCircle, X,
  Edit3, Save, TrendingUp, DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ADMIN_PASSWORD = "rpm@admin2024";

type FormData = {
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
};

const emptyForm: FormData = {
  title: "",
  location: "",
  price: "",
  type: "Sale",
  category: "Villa",
  beds: 0,
  baths: 0,
  area: "",
  description: "",
  image: "",
  featured: false,
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "add" | "manage">("dashboard");
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { properties, addProperty, deleteProperty, updateProperty } = useProperties();

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Access denied.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, image: url }));
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const confirmDelete = (id: string) => setDeleteConfirmId(id);

  const handleConfirmedDelete = () => {
    if (deleteConfirmId) {
      deleteProperty(deleteConfirmId);
      setDeleteConfirmId(null);
      showSuccess("Property deleted successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) return;

    if (editingId) {
      updateProperty(editingId, form);
      showSuccess("Property updated successfully!");
      setEditingId(null);
    } else {
      addProperty(form);
      showSuccess("Property added successfully!");
    }
    setForm(emptyForm);
    setImagePreview("");
    setActiveTab("manage");
  };

  const startEdit = (property: Property) => {
    setForm({
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
    });
    setImagePreview(property.image);
    setEditingId(property.id);
    setActiveTab("add");
  };

  const adminProperties = properties.filter((p) => !p.id.startsWith("default-"));
  const totalProps = properties.length;

  // ─── Login Screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#002f4b] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex bg-white px-6 py-4 rounded-lg mb-6">
              <img src="/logo.png" alt="RPM Logo" className="h-10 object-contain" />
            </div>
            <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm tracking-widest uppercase">Real Property Management</p>
          </div>

          <div className="bg-[#003a5c] rounded-3xl p-10 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rpm-gold/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-rpm-gold/10 border border-rpm-gold/30 flex items-center justify-center">
                <Lock className="w-7 h-7 text-rpm-gold" />
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    {loginError}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full bg-rpm-gold text-black py-4 rounded-xl font-medium uppercase tracking-widest hover:bg-white transition-colors"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-rpm-gold transition-colors flex items-center justify-center gap-2">
                <Home className="w-4 h-4" /> Back to Website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Admin Dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#002f4b] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#003a5c] border-r border-white/5 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-white/5">
          <div className="bg-white px-4 py-3 rounded-lg mb-3">
            <img src="/logo.png" alt="RPM" className="h-8 object-contain" />
          </div>
          <p className="text-xs text-rpm-gold uppercase tracking-widest mt-2">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: TrendingUp },
            { id: "add", label: editingId ? "Edit Property" : "Add Property", icon: Plus },
            { id: "manage", label: "Manage Listings", icon: Building },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as typeof activeTab); if (!editingId || tab.id !== "add") { setEditingId(null); setForm(emptyForm); setImagePreview(""); } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-rpm-gold text-black font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <Link href="/properties" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Eye className="w-5 h-5" /> View Site
          </Link>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">

        {/* Success Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 px-6 py-4 rounded-2xl backdrop-blur-md"
            >
              <CheckCircle className="w-5 h-5" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Dashboard Tab ── */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-10">
              <h2 className="text-3xl font-serif mb-2">Welcome Back</h2>
              <p className="text-gray-400">Manage your property listings from this dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Total Properties", value: totalProps, icon: Building, color: "text-rpm-gold" },
                { label: "Admin Added", value: adminProperties.length, icon: Plus, color: "text-green-400" },
                { label: "For Sale", value: properties.filter(p => p.type === "Sale").length, icon: DollarSign, color: "text-blue-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#003a5c] border border-white/5 rounded-2xl p-8 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-serif text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#003a5c] border border-white/5 rounded-2xl p-8">
              <h3 className="text-xl font-serif mb-6">Recent Listings</h3>
              <div className="flex flex-col gap-4">
                {properties.slice(-4).reverse().map((p) => (
                  <div key={p.id} className="flex items-center gap-5 p-4 bg-black/20 rounded-xl border border-white/5">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image src={p.image || "/images/luxury_property.png"} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{p.title}</p>
                      <p className="text-gray-400 text-sm">{p.location}</p>
                    </div>
                    <div>
                      <span className="text-rpm-gold text-sm font-medium">{p.price}</span>
                      <span className={`ml-3 text-xs px-2 py-1 rounded-full ${p.type === "Sale" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>{p.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Add / Edit Property Tab ── */}
        {activeTab === "add" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif mb-1">{editingId ? "Edit Property" : "Add New Property"}</h2>
                <p className="text-gray-400">Fill in the details below to {editingId ? "update the" : "list a new"} property.</p>
              </div>
              {editingId && (
                <button onClick={() => { setEditingId(null); setForm(emptyForm); setImagePreview(""); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                  <X className="w-4 h-4" /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="bg-[#003a5c] rounded-3xl p-8 border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Title */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Property Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Al Mouj Luxury Villa"
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Location *</label>
                <input
                  required
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Muscat Bay"
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Price *</label>
                <input
                  required
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="e.g. OMR 450,000 or OMR 2,500 / mo"
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Listing Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value as "Sale" | "Rent" }))}
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-rpm-gold transition-colors appearance-none cursor-pointer"
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as FormData["category"] }))}
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-rpm-gold transition-colors appearance-none cursor-pointer"
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Beds */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  value={form.beds}
                  onChange={e => setForm(f => ({ ...f, beds: Number(e.target.value) }))}
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Baths */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Bathrooms</label>
                <input
                  type="number"
                  min={0}
                  value={form.baths}
                  onChange={e => setForm(f => ({ ...f, baths: Number(e.target.value) }))}
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Area */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Area</label>
                <input
                  value={form.area}
                  onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                  placeholder="e.g. 350 sqm"
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the property in detail..."
                  className="bg-black/30 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-rpm-gold transition-colors resize-none"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <label className="text-xs uppercase tracking-widest text-rpm-gold">Property Photo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-white/10 hover:border-rpm-gold rounded-2xl p-8 text-center cursor-pointer transition-colors relative overflow-hidden group"
                >
                  {imagePreview ? (
                    <div className="relative h-48 w-full rounded-xl overflow-hidden">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <Upload className="w-10 h-10 text-gray-500 group-hover:text-rpm-gold transition-colors" />
                      <p className="text-gray-400 text-sm">Click to upload a property photo</p>
                      <p className="text-gray-600 text-xs">PNG, JPG, WEBP accepted</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Featured Toggle */}
              <div className="md:col-span-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${form.featured ? "bg-rpm-gold" : "bg-white/10"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? "translate-x-7" : "translate-x-1"}`} />
                </button>
                <label className="text-sm text-gray-300">Mark as Featured Property</label>
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-rpm-gold text-black px-10 py-4 rounded-xl font-medium uppercase tracking-widest hover:bg-white transition-colors"
                >
                  {editingId ? <><Save className="w-5 h-5" /> Update Property</> : <><Plus className="w-5 h-5" /> Publish Property</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── Manage Listings Tab ── */}
        {activeTab === "manage" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif mb-1">Manage Listings</h2>
                <p className="text-gray-400">{totalProps} properties listed · {adminProperties.length} admin-added</p>
              </div>
              <button
                onClick={() => { setForm(emptyForm); setImagePreview(""); setEditingId(null); setActiveTab("add"); }}
                className="flex items-center gap-2 bg-rpm-gold text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {properties.map((p) => (
                <div key={p.id} className="bg-[#003a5c] border border-white/5 rounded-2xl p-5 flex items-center gap-5 hover:border-rpm-gold/20 transition-colors">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={p.image || "/images/luxury_property.png"} alt={p.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium truncate">{p.title}</h4>
                      {p.id.startsWith("default-") && <span className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">Default</span>}
                      {p.featured && <span className="text-xs bg-rpm-gold/20 text-rpm-gold px-2 py-0.5 rounded-full">Featured</span>}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                      <MapPin className="w-3 h-3" /> {p.location}
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="text-rpm-gold font-medium">{p.price}</span>
                      <span className="text-gray-500">{p.category}</span>
                      {p.beds > 0 && <span className="text-gray-500">{p.beds} beds</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${p.type === "Sale" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                      {p.type}
                    </span>
                    <button
                      onClick={() => startEdit(p)}
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(p.id)}
                      className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Delete Confirmation Modal ── */}
        <AnimatePresence>
          {deleteConfirmId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setDeleteConfirmId(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#003a5c] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Delete Property?</h3>
                <p className="text-gray-400 text-sm mb-8">
                  This will permanently remove{" "}
                  <span className="text-white font-medium">
                    {properties.find((p) => p.id === deleteConfirmId)?.title}
                  </span>{" "}
                  from your listings. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmedDelete}
                    className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors text-sm font-medium"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
