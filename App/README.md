# An Evening of Distinction — Luxury Invitation Gate

A luxury invitation gate built with **pure PHP, HTML5, CSS3, and JavaScript**, rendering the exact stationery artwork provided with interactive 3D wax seal mechanics, high-DPI canvas "binging" indicators, Web Audio acoustic crystal chimes, and strict source code secrecy.

---

## What Was Updated

1. **Moon Removed Completely**:
   - The top-right corner is clean, seamless cotton paper background with zero overlay or distraction.
2. **Mobile Vertical Zoom Presentation ("Show Vertical on Mobile")**:
   - On mobile portrait screens (`@media (max-width: 768px) and (orientation: portrait)`), the presentation switches from a wide letterbox into a **majestic vertical portrait invitation card** (`height: min(84dvh, 720px); width: min(94vw, 440px)`).
   - The artwork zooms into the central vertical column, displaying the constellation, "You're Cordially Invited", "SAVE THE DATE", the full envelope, the wax seal, and "+ PRESS THE SEAL TO OPEN +" large, bold, and centered for phone viewports.
   - The wax seal and its interactive binging canvas automatically maintain sub-pixel mathematical alignment at **50.0% X, 59.7% Y** with an expanded thumb-friendly touch target.
3. **Sound Icon Hidden (Acoustic Chimes Active & Unmuted)**:
   - No audio icons clutter the UI.
   - Crystal bell chimes, harmonic singing bowl resonance, and unsealing fanfares play automatically when pressing and holding the seal.
4. **Strict Source Code Secrecy**:
   - `index.php` outputs **strictly the gate**; no secret party details exist in the initial HTML or client JS.
   - The party invitation is securely fetched from `unlock.php` only after the 3-second hold is complete.

---

## How to Run

```bash
cd /Users/mac/.gemini/antigravity/scratch/luxury-invitation-gate
php -S 127.0.0.1:8000
```
Open **`http://127.0.0.1:8000`** in desktop or mobile browsers.
