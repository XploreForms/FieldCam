# Field Cam (v2.5.0)

Installable web app for job-site photos. One session = one work order. The tech picks the job
type, takes labelled photos, downloads them as individual files, then attaches them in FSL.

Each photo is stamped with its label, platform and work order type, date/time, GPS coordinates
(± accuracy), street address, tilt, compass direction, elevation and tech name, then compressed
to 2048 px / 350 KB max for low-signal uploads.

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `sw.js` | Offline support: the app opens and works with no signal once installed |
| `manifest.webmanifest` | Lets it install to the home screen as "Field Cam" |
| `icons/` | Home-screen icons |

## Hosting on GitHub Pages
1. In the `xploreforms` GitHub account, create a public repository, e.g. `FieldCam`.
2. Upload every file in this folder (keep the `icons` folder).
3. Repository **Settings → Pages → Branch: main / root → Save**.
4. Live at `https://xploreforms.github.io/FieldCam/` after a minute. Must be https.

## Tech workflow
1. First launch only: enter name.
2. Each work order: optionally enter the **Account ID or SA-#**, then pick the job form:
   **Work order** (Install / Conversion / Repair) → **Outcome** (Complete / Cannot Complete /
   Not Required) → **Platform** (or **Reason** for Not Required). The start screen previews the
   photos that form needs. Can be changed mid-job from the top bar.
3. The app walks through that form's Pictures Checklist in order ("3 of 10 · Cable Run").
   After the first photo of an item it moves to the next missing one, except for items where
   several shots are normal (LOS POVs, testing locations, SNs, issues): take all you need, then
   tap **Next**. Any label can be tapped to add more.
   **One photo, several items:** tap one item, then tap any others the same photo shows (tap a
   selected one again to remove it), then shoot. The photo counts for all of them (each gets a ✓),
   the stamp lists each one, and the file name joins them (`Cable Run + Grounding Overview`).
   After the shot the app moves to the next item still needed; the next tap starts a new selection.
4. Tap the **save button** (right of the shutter). On iPhone this opens the share sheet with
   every new photo: tap **Save N Images** to put them in Photos (the gallery), or **Save to Files**
   to keep the readable file names. iPhone web apps can't write into Photos any other way; a plain
   download only opens a preview. On Android/computers each photo downloads as its own file.
5. In FSL, attach the photos from Photos or Files.
6. Tap the job name at the top (▾) → **Start a new job** (keeps this job's photos under
   Previous jobs) or **Cancel this job** (wrong form picked etc.: deletes its photos after
   confirming and goes back to the start screen).

Previous jobs stay on the phone (gallery › Previous jobs) until deleted.

## File names
Plain and readable:
- `2026-10-27 1541 SA-01234567 FW Install - CPE Line of Sight (43.3601 -80.3123).jpg`
- `2026-10-27 1543 FW Install Not Required - LOS POVs 2 (43.3601 -80.3123).jpg`

= date and time taken, SA-# (if entered), platform + work order (+ outcome unless Complete),
photo name (numbered only when there's more than one), GPS (or `no GPS`).
A few long checklist items get a short name in the file (`FILE_LABEL` in `index.html`), e.g.
"Line of sight POVs to all viable towers" → "LOS POVs"; the stamp keeps the full wording.
Names are built at download time, so they follow the SA-# and job type as last set.

## Job forms and photo lists
`WORKFLOWS` near the top of the script in `index.html` has one entry per JotForm, with its
Pictures Checklist copied from the form:

| Outcome | Forms | Photos |
|---|---|---|
| Complete | Install / Conversion: Fibre (Existing Drop), Fibre (Drop Required), Fixed Wireless, Satellite; Install: VAS. Repair: Fibre, Fixed Wireless, Satellite, VAS | As on each form |
| Cannot Complete | One form for all jobs (platform chosen for the file name) | Form has no checklist; optional "House (customer no-show)" |
| Not Required | Fixed Wireless: Signal Requirements Not Met, Stop Sell Area, Not in Coverage Area, NLOS. Satellite NLOS. Unrelated to Signal (any job) | FW: LOS POVs to all viable towers, Testing locations, Overall structure (+ eCoverage screenshot for Not in Coverage). Sat: LOS POVs, Testing locations, Overall structure. Unrelated: none |

When a form changes, edit its `shots` list. `level` marks photos that get the 0° level guide;
`MULTI` marks items where several photos are normal. "Other" is always added: tapping it asks
what the photo is of, and that text becomes the label. Custom labels stay for the rest of the job
once they have a photo.

## Photo checks
- **Level guide (no lock):** on Fixed Wireless "CPE Line of Sight" and "Line of sight POVs to all
  viable towers" a **0° dot** shows where the horizon sits in the frame. Put the dot in the centre
  ring to shoot level; it turns green within ±3°. The shutter always works, and the stamp records
  the real tilt with `(level)` or `(not level)`. Satellite LOS photos have no guide (dishes aim at
  the sky).
- **Blurry / dark warning:** after each shot the app checks sharpness and brightness and offers
  Retake or Keep. Thresholds (`BLUR_MIN`, `DARK_MAX` in `index.html`) were set on test images;
  adjust after field use if it warns too often or not enough.
- **Note:** the pencil button adds a note to the next photo (stamped as `Note: …`), then clears.
- **Missing shots:** Finish job lists labels with no photo yet and photos not downloaded.

## Tilt
On level-guided photos the top readout shows tilt large (+ = aimed up) with LEVEL ✓ / AIM LOWER /
AIM HIGHER, and the 0° dot plus a faint horizon line (which also shows skew) move with the phone.
The dot's position uses the iPhone camera's field of view and the current zoom/lens. On every
other label the tilt is just a small number and the stamp records the value only.

## Notes
- **Permission prompts on iPhone:** home-screen web apps don't get permanent permissions like App
  Store apps. Motion & Orientation is asked on every launch (Apple rule); camera and location are
  usually asked once per launch. Setting Settings › Apps › Safari › Camera and Location to
  **Allow** can reduce the prompts.
- Tilt, skew and the horizon line redraw every screen frame (about 60 times a second); GPS and
  address text update twice a second.
- Rear camera only; never falls back to the selfie camera.
- Zoom: .5× / Tele use the real lenses where the iPhone exposes them; 2× / 3× / pinch crop.
- Compass is magnetic north (about 10° off true north in Southern Ontario).
- Address lookup uses OpenStreetMap's free service; with no data, coordinates are still stamped.
- Location, time and direction are also written into the JPEG metadata.

## Updating
Edit files, bump `VERSION` in `sw.js` and `index.html`, upload. Phones update next time the
app opens with signal.
