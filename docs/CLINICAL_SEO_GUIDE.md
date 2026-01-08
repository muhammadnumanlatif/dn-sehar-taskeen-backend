# Clinical SEO & Landing Page Implementation Guide
**adapted for Dr. Sehar Taskeen | Clinical Nutritionist**

## 🚨 CRITICAL FOUNDATION (Already Implemented)
**Status:** ✅ Solved
**Solution:** We have successfully migrated to **Next.js with Static Site Generation (SSG)**.
- **Old Site:** Client-side React (SEO invisible).
- **New Site:** Pre-rendered HTML for every page, including dynamic service and location pages.

---

## 📋 PAGE-SPECIFIC REQUIREMENTS
For Each Location + Service Page (e.g., `/locations/pakistan/lahore` or `/services/hormonal-health`)

### 1. META TAGS (Required for Every Page)

#### A. Title Tag
**Formula:** `[Service/Role] in [City], [Country] | [Brand Name] | [Key Outcome]`
**Example:** `Clinical Nutritionist in Lahore, Pakistan | Dr. Sehar Taskeen | Reverse PCOS Naturally`

#### B. Meta Description
**Formula:** `[Doctor Name] provides [Adjective] [Service] in [Location]. Specialized in [Conditions]. [CTA].`
**Example:** `Dr. Sehar Taskeen provides evidence-based clinical nutrition in Lahore. Specialized in PCOS reversal, diabetes management, and gut health. Book your consultation today.`
**Length:** 150-160 characters.

#### C. Canonical URL
**Example:** `https://drsehartaskeen.online/locations/pakistan/lahore`
*Must be the absolute URL of the page.*

#### D. Open Graph (Social Sharing)
Allows your links to look professional when shared on WhatsApp/Facebook.
```html
<meta property="og:title" content="Best Nutritionist in Lahore | Dr. Sehar Taskeen">
<meta property="og:description" content="Expert clinical nutrition for PCOS and metabolic health in Lahore.">
<meta property="og:image" content="https://drsehartaskeen.online/images/dr-sehar-lahore-clinic.jpg">
```

### 2. SCHEMA MARKUP (JSON-LD)
*Crucial for Medical SEO. We use `Physician` or `MedicalClinic` instead of generic `LocalBusiness`.*

#### A. Physician / MedicalClinic Schema
Place this on location pages (e.g., `/locations/pakistan/lahore`).
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Sehar Taskeen - Clinical Nutritionist",
  "image": "https://drsehartaskeen.online/images/dr-sehar-profile.jpg",
  "@id": "https://drsehartaskeen.online/locations/pakistan/lahore",
  "url": "https://drsehartaskeen.online/locations/pakistan/lahore",
  "telephone": "+92-300-XXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DHA Phase 5",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.5204,
    "longitude": 74.3587
  },
  "medicalSpecialty": "DietNutrition",
  "availableService": ["PCOS Management", "Diabetes Reversal", "Weight Loss"],
  "priceRange": "$$$"
}
</script>
```

#### B. Service Schema
Place this on service pages (e.g., `/services/hormonal-health`).
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "PCOS Management Protocol",
  "provider": {
    "@type": "Physician",
    "name": "Dr. Sehar Taskeen"
  },
  "description": "Comprehensive evidenced-based protocol to reverse PCOS symptoms through nutrition.",
  "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD"
  }
}
</script>
```

### 3. CONTENT REQUIREMENTS (E-E-A-T Focus)
*Since this is a distinct "Your Money or Your Life" (YMYL) topic, Authority is key.*

**For Service Pages (1,000+ words):**
1.  **Hero:** Clear promise (e.g., "Take Control of Your Hormones").
2.  **The Problem:** Empathize with symptoms (Hair fall, weight gain, fatigue).
3.  **The Science:** Explain *why* it happens (Insulin resistance, cortisol).
4.  **The Solution:** Your specific "Taskeen Protocol" (Diet, Supplements, Lifestyle).
5.  **Evidence:** Case studies or "Before/After" stories (anonymized).
6.  **Dr. Credentials:** Emphasize clinical experience and certifications.
7.  **FAQ:** Medical/Scientific answers to common patient fears.

**For Location Pages (800+ words):**
1.  **Local Context:** Diets specific to the region (e.g., Desi diet challenges in Lahore, Eating out culture in Dubai).
2.  **Accessibility:** "Located in DHA" or "Online Consultations for UAE Residents".
3.  **Cultural Relevance:** Halal meal planning, Ramadan nutrition guides.

### 4. TECHNICAL SEO CHECKLIST
- [x] **SSR/SSG Implementation:** Done via Next.js.
- [ ] **Sitemap.xml:** Ensure all new dynamic routes (`/courses/slug`, `/services/slug`) are in the sitemap.
- [ ] **Robots.txt:** Allow indexing of everything except `/admin`.
- [ ] **Image Optimization:** All images must use Next.js `<Image/>` component with `alt` tags containing keywords (e.g., "PCOS diet plan Pakistan").

### 5. URL STRUCTURE
**Format:** `lowercase-with-hyphens`
- ✅ Correct: `/services/gut-health`
- ✅ Correct: `/locations/uae/dubai`
- ❌ Incorrect: `/Services/GutHealth` (No caps)
- ❌ Incorrect: `/courses/pcos_specialist` (Use hyphens, not underscores)

### 6. MAINTENANCE
- **Weekly:** Blog posts or new "Success Stories".
- **Monthly:** Review generic content and update with new medical research/findings to maintain authority.
- **Quarterly:** Check for broken links (e.g., if a course is retired).
