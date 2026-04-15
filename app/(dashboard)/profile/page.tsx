"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { c, displayFont, g1box, fadeUp } from "@/lib/theme";
import { useRouter } from "next/navigation";
import {
  RxPerson,
  RxEnvelopeClosed,
  RxMobile,
  RxInfoCircled,
  RxCheck,
} from "react-icons/rx";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form State aligned with IUserProfile schema
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    gender: "prefer-not-to-say",
    about: "",
  });

  // Fetch existing profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/profile", {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          // Merge DB data with existing state (fallback to empty strings/defaults if missing)
          setFormData((prev) => ({
            ...prev,
            displayName: data.displayName || prev.displayName,
            phone: data.phone || prev.phone,
            gender: data.gender || prev.gender,
            about: data.about || prev.about,
            email: user.email as string, // Always keep Firebase email as source of truth
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: formData.displayName,
          about: formData.about,
          gender: formData.gender,
          phone: formData.phone,
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      router.refresh();

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      // Could add a toast notification here later for failure state
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyles = {
    width: "100%",
    background: "rgba(255,255,255,.02)",
    border: `1px solid ${c.b1}`,
    borderRadius: 10,
    padding: "12px 16px",
    color: c.t1,
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s ease",
  };

  const labelStyles = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: c.t3,
    marginBottom: 6,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <div
      style={{
        padding: "40px 30px",
        maxWidth: 800,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
        <h1
          style={{
            ...displayFont,
            fontSize: 32,
            fontWeight: 700,
            color: c.t1,
            marginBottom: 8,
          }}
        >
          Profile Settings
        </h1>
        <p style={{ color: c.t2, fontSize: 15 }}>
          Manage your personal information and preferences.
        </p>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{ ...g1box, borderRadius: 16, padding: 32 }}
      >
        {/* Avatar Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
            paddingBottom: 30,
            borderBottom: `1px solid ${c.b1}`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              boxShadow: `0 0 20px rgba(129,140,248,.3)`,
            }}
          >
            {formData.displayName
              ? formData.displayName.charAt(0).toUpperCase()
              : user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2
              style={{
                ...displayFont,
                fontSize: 20,
                fontWeight: 600,
                color: c.t1,
              }}
            >
              {formData.displayName || "Add your name"}
            </h2>
            <p style={{ color: c.t3, fontSize: 14 }}>{formData.email}</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {/* Display Name */}
            <div>
              <label style={labelStyles}>
                <RxPerson
                  style={{ display: "inline", marginBottom: 2, marginRight: 4 }}
                />{" "}
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                style={inputStyles}
                onFocus={(e) => (e.target.style.borderColor = c.indigo)}
                onBlur={(e) => (e.target.style.borderColor = c.b1)}
                placeholder="How should we call you?"
                required
              />
            </div>

            {/* Email (Read Only) */}
            <div>
              <label style={labelStyles}>
                <RxEnvelopeClosed
                  style={{ display: "inline", marginBottom: 2, marginRight: 4 }}
                />{" "}
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                style={{ ...inputStyles, opacity: 0.5, cursor: "not-allowed" }}
                title="Email is managed via Google Auth"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label style={labelStyles}>
                <RxMobile
                  style={{ display: "inline", marginBottom: 2, marginRight: 4 }}
                />{" "}
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyles}
                onFocus={(e) => (e.target.style.borderColor = c.indigo)}
                onBlur={(e) => (e.target.style.borderColor = c.b1)}
              />
            </div>

            {/* Gender */}
            <div>
              <label style={labelStyles}>
                <RxPerson
                  style={{ display: "inline", marginBottom: 2, marginRight: 4 }}
                />{" "}
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{
                  ...inputStyles,
                  appearance: "none",
                  cursor: "pointer",
                }}
                onFocus={(e) => (e.target.style.borderColor = c.indigo)}
                onBlur={(e) => (e.target.style.borderColor = c.b1)}
              >
                <option value="prefer-not-to-say" style={{ background: c.bg2 }}>
                  Prefer not to say
                </option>
                <option value="male" style={{ background: c.bg2 }}>
                  Male
                </option>
                <option value="female" style={{ background: c.bg2 }}>
                  Female
                </option>
                <option value="non-binary" style={{ background: c.bg2 }}>
                  Non-binary
                </option>
              </select>
            </div>
          </div>

          {/* About */}
          <div>
            <label style={labelStyles}>
              <RxInfoCircled
                style={{ display: "inline", marginBottom: 2, marginRight: 4 }}
              />{" "}
              About Me
            </label>
            <textarea
              name="about"
              rows={4}
              maxLength={300}
              placeholder="Tell us a bit about your professional journey..."
              value={formData.about}
              onChange={handleChange}
              style={{ ...inputStyles, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = c.indigo)}
              onBlur={(e) => (e.target.style.borderColor = c.b1)}
            />
            <div
              style={{
                textAlign: "right",
                fontSize: 11,
                color: c.t3,
                marginTop: 4,
              }}
            >
              {formData.about.length} / 300
            </div>
          </div>

          {/* Submit Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSaving}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: saved
                  ? c.emerald
                  : `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
                color: "white",
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: isSaving ? "wait" : "pointer",
                boxShadow: saved
                  ? `0 4px 20px rgba(52,211,153,.3)`
                  : `0 4px 20px rgba(129,140,248,.3)`,
                transition: "background 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {isSaving ? (
                "Saving..."
              ) : saved ? (
                <>
                  <RxCheck size={18} /> Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
