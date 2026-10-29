# Field Cam (v3.7.2)

Installable web app for job-site photos. One session = one work order. The tech picks the job
type, takes labelled photos, downloads them as individual files, then attaches them in FSL.

Every camera photo is **landscape 4:3** (2048 × 1536), however the phone is held. The
viewfinder fills the full width of the screen (and all the space above the labels): it shows
the centre of the photo, with whatever doesn't fit trimmed **on screen only**. The saved photo is
always the full 4:3 frame, so it shows a little more at the edges than the viewfinder did. An **info band** below the photo makes the final image a
**2048 × 2048 square** (see *Info band* below). Nothing is drawn over the photo itself. Compressed to
350 KB max for low-signal uploads.

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
3. **Labels: pick first, or shoot first.** Every checklist item for the form shows as a tile under
   the viewfinder (items still needed have an amber edge; done ones show ✓ and a count). There is
   no set order and the shutter always works.
   - **Pick first:** tap a tile, then shoot. The pick stays for the next shots too, so a run of the
     same item is shutter-only. Right after a shot the next tap starts a new pick; further taps
     add or remove items (**one photo, several items**: tap each one, the stamp lists them all and
     the file name joins them, e.g. `Cable Run + Grounding Overview`). Tap the lit tile right after
     a shot to go back to no label. The line above the tiles says what the next photo will be.
   - **Shoot first:** with no tile picked, photos go to **To label**. Tap **To label (n)** (or the
     button in the gallery) to sort them: each photo shows full screen, tap what's in it (one or
     more), then **Next**. Photos can't be saved until they're labelled.
   - After each shot a small note shows for a few seconds (`✓ Cable Run · Change`, or
     `Saved to To label · Label`). It never blocks the next shot; ignore it or tap to fix.
   - **Wrong label later:** open the photo in the gallery and tap **Change label**. The stamp is
     redrawn with the new label (the app keeps a clean copy of each photo until the job is
     finished, then deletes it to save space).
   - **Other…** asks what the photo is of; the text becomes the label.
4. Tap the **save button** (right of the shutter). On iPhone this opens the share sheet with
   every new photo: tap **Save N Images** to put them in Photos (the gallery), or **Save to Files**
   to keep the readable file names. iPhone web apps can't write into Photos any other way; a plain
   download only opens a preview. On Android/computers each photo downloads as its own file.
   Tap a gallery photo to view it full screen; **swipe left/right** (or the arrows) to flip
   through the job's photos, pinch or double-tap to zoom. Save or Delete applies to the photo shown.
   When every photo in the job is saved and nothing the form needs is missing, the app offers
   **Start next job** (or Keep shooting).
5. In FSL, attach the photos from Photos or Files.
6. Tap the job name at the top (▾) → **Start a new job** (keeps this job's photos under
   Previous jobs) or **Cancel this job** (wrong form picked etc.: deletes its photos after
   confirming and goes back to the start screen).

Previous jobs stay on the phone (gallery › Previous jobs) until deleted.

## File names
Plain and readable:
- `2026-10-27 1541 SA-01234567 - CPE Line of Sight (43.3601 -80.3123).jpg`
- `2026-10-27 1543 - LOS POVs 2 (43.3601 -80.3123).jpg`

= date and time taken, SA-# (if entered), photo name (numbered only when there's more than one),
GPS (or `no GPS`). The job type is on the photo's info band, not in the file name.
A few long checklist items get a short name in the file (`FILE_LABEL` in `index.html`), e.g.
"Line of sight POVs to all viable towers" → "LOS POVs"; the stamp keeps the full wording.
Names are built at save time, so they follow the SA-# and labels as last set.

## Info band
Every saved image has the same layout: a 4:3 photo area (camera photos fill it; imports are scaled
to fit, centred) and the band below it. Band: label(s) in green with the SA-# at the right end of
the same row, then two equal columns split by a thin centre line. Left: time, GPS, facing and
elevation, address. Right: job type, tilt, tech, note. The text is measured before drawing: it shrinks
a little or wraps a long item rather than cutting it off, and the block is centred with equal space
above and below. Only an extremely long note gets cut with "…".

## Job forms and photo lists
`WORKFLOWS` near the top of the script in `index.html` has one entry per JotForm, with its
Pictures Checklist copied from the form:

| Outcome | Forms | Photos |
|---|---|---|
| Complete | Install / Conversion: Fibre (Existing Drop), Fibre (Drop Required), Fixed Wireless, Satellite; Install: VAS. Repair: Fibre, Fixed Wireless, Satellite, VAS | As on each form |
| Cannot Complete | One form for all jobs (platform chosen for the file name) | Form has no checklist; optional "House (customer no-show)" |
| Not Required | Fixed Wireless: Signal Requirements Not Met, Stop Sell Area, Not in Coverage Area, NLOS. Satellite NLOS. Unrelated to Signal (any job) | FW: LOS POVs to all viable towers, Testing locations, Overall structure (+ eCoverage screenshot for Not in Coverage). Sat: LOS POVs, Testing locations, Overall structure. Unrelated: none |

When a form changes, edit its `shots` list. `level` marks photos that get the 0° horizon line;
`MULTI` marks items where several photos are normal. "Other" is always added: tapping it asks
what the photo is of, and that text becomes the label. Custom labels stay for the rest of the job
once they have a photo.

## Photo checks
- **Level guide (no lock):** on Fixed Wireless "CPE Line of Sight" and "Line of sight POVs to all
  viable towers" a **0° horizon line** shows where level sits in the frame. Line it up with the
  centre ring to shoot level; it turns green within ±3°. The shutter always works. A dashed 0°
  line (white with a dark outline, labelled "0°") is drawn into the saved photo at the horizon,
  and the info band records the real tilt with `(level)` or `(not level)`. Satellite LOS photos have no guide (dishes aim at
  the sky).
- **Blurry / dark warning:** after each shot the app checks sharpness and brightness. A problem
  shows in the after-shot note with a **Retake** button (5 s, never blocks the shutter) and stays
  as a **!** badge on the gallery tile and in the sorter. Thresholds (`BLUR_MIN`, `DARK_MAX` in `index.html`) were set on test images;
  adjust after field use if it warns too often or not enough.
- **Note:** the pencil button (right of "Next photo: …", above the labels) adds a note to the next
  photo (stamped as `Note: …`), then clears. It turns green while a note is waiting.
- **Import:** gallery › **Import from photo library** (e.g. an eCoverage screenshot). Imports get the
  label picked at the time, or go to To label.

## Full quality (HQ)
The **HQ** button (top-right of the camera) switches the current job to full quality: photos keep
the camera's full resolution (as much as the phone gives a web app, up to 4032 px wide) with light
compression and no size limit, typically 2–5 MB each instead of under 350 KB. The info band is still
added. While it's on, **FULL QUALITY** shows next to "Next photo". It stays on for that job and is
off again for the next job, so nobody leaves it on by accident. Turning it on or off affects photos
taken afterwards, not ones already taken.

## Battery
- The camera preview, GPS and tilt updates pause whenever the camera isn't in view: app in the
  background, start screen, gallery, photo viewer, label sorter, or any sheet open. They resume the
  moment the camera screen is back. The camera stays connected while paused, so iPhones don't ask
  for permission again.
- The tilt readout runs at full screen speed (about 60 times a second) only when a line-of-sight
  label is picked; otherwise it updates 4 times a second.

## Back button (Android)
Back closes whatever is open (a sheet, the photo viewer, the sorter, the note box) one layer at a
time. With nothing open, the first back shows "Press back again to close Field Cam"; a second back
within a couple of seconds leaves. iPhones have no back button.

## Appearance
Settings › Appearance: **Dark** (default: true black, which switches pixels off on the OLED screens
most iPhones have and saves battery) or **Light** (easier to read in bright sun). Both use the Xplore
greens. The camera overlays (tilt readout, zoom, after-shot note) stay dark in both, over the picture.

## Text size
Settings › Text size: **Normal** or **Large**. Large makes all the app's text and buttons bigger
(label tiles go to two columns, with larger header, zoom, HQ, after-shot note, sheets, gallery and
start screen) for techs who find the normal size hard to read. The stamp on saved photos doesn't
change. Saved per phone.

## Camera screen
Kept clear on purpose: just the picture, a small zoom pill along its bottom edge (left edge when
the phone is sideways) and the flashlight in the top-right corner when the phone has one. Time, GPS
and address aren't shown live (they're stamped on every photo; the GPS dot in the top bar shows
whether there's a fix: green good, amber fair, red none). Line-of-sight shots add the tilt readout, the centre ring and the 0° line.
- **Saving checks:** every photo must be labelled before it can be saved; tapping Save with
  unlabelled photos opens the sorter, and saving carries on once they're labelled. If any photo
  the form needs hasn't been taken, Save lists them first: **Take them now** or **Save anyway**.
- **Missing shots:** Finish job lists photos still to label, labels with no photo yet, and photos not saved.

## Hold the phone upright
Field Cam is used with the phone upright (portrait) so every job's photos look the same; the saved
photo is always the same wide 4:3 frame. If the phone is turned sideways for more than a moment, the
camera shows **Turn your phone upright** and the shutter won't fire. For a shot that really needs
the phone sideways (or anything else the app can't take), use the phone's Camera app and bring it in
with **Import from photo library** (button on that card, or in the gallery). Imported photos get the
info band and labels like any other.

The app layout never turns sideways either: Android keeps it upright through the install settings,
and on iPhone the app turns itself back upright if the screen rotates.

## Tilt
On level-guided photos the top readout shows tilt large (+ = aimed up) with LEVEL ✓ / AIM LOWER /
AIM HIGHER, and the 0° line moves and tilts with the phone (skew).
The line's position uses the iPhone camera's field of view and the current zoom/lens. On every
other label the tilt is just a small number and the stamp records the value only.

## Notes
- **Permission prompts on iPhone:** home-screen web apps don't get permanent permissions like App
  Store apps. Motion & Orientation is asked on every launch (Apple rule); camera and location are
  usually asked once per launch. Setting Settings › Apps › Safari › Camera and Location to
  **Allow** can reduce the prompts.
- Tilt, skew and the 0° line redraw every screen frame on LOS shots (see Battery).
- Rear camera only; never falls back to the selfie camera.
- Zoom starts at 1× every time and **1× is the minimum**: no ultra-wide, and pinch can't go wider.
  Tele uses the real telephoto lens where exposed; 2× / 3× / pinch crop. Any zoom other than 1×
  is noted on the info band.
- **Compass is true north** (matches Google Maps and tower bearings), corrected from the phone's
  magnetic reading using the IGRF-14 geomagnetic model for wherever the photo is taken (about −10°
  around Cambridge, +16° in Vancouver). Needs a GPS fix; without one the heading is stamped as
  magnetic, marked `(mag)`. Phone compasses are only good to about ±5°, worse near metal.
- Address lookup uses OpenStreetMap's free service. Photos taken with no signal get coordinates
  only; once there's signal the app looks up their addresses and redraws their info band (only for
  photos not yet saved; saved files never change).
- Location, time and direction are also written into the JPEG metadata.

## Updating
Edit files, bump `VERSION` in `sw.js` and `index.html`, upload. The app checks for a new version
whenever it's opened or brought back to the front with signal. When one has downloaded, a bar
says **New version of Field Cam ready · Update**; tapping it reloads (it waits for any photo being
saved). Photos and the current job are kept.
