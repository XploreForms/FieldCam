# Xplore Field Cam (v1.9.0)

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
2. Each work order: optionally enter the **Account ID or SA-#**, pick **Platform** (Fixed Wireless / Fibre / Satellite), **Work order**
   (Install / Conversion / Repair) and **Outcome** (Complete / Cannot Complete = reschedule / Not Required = e.g. no LOS),
   then **Start job**. These can be changed mid-job from the top bar.
3. Pick a label (Radio POV, Mount, Cabling…) and shoot as many as needed; the label stays
   selected and its count goes up. The top bar shows how many labels are covered (e.g. 4/10).
4. Tap the **download button** (right of the shutter): every new photo saves as its own file.
   On iPhone they go to **Files › Downloads**.
5. In FSL, attach the photos from Files.
6. Top bar → **Finish job and start a new one**.

Previous jobs stay on the phone (gallery › Previous jobs) until deleted.

## File names
`20261026-185233_SA-01234567_FW-Install-Complete_Radio-POV-01_43.36010_-80.31230.jpg`
= date-time taken _ Account ID or SA-# _ platform-work order-outcome _ photo name-number _ latitude_longitude.
No SA-# entered: that part is left out. No GPS fix: ends in `noGPS`.
Names are built at download time, so they reflect the SA-# and job type as last set.
`sa 01234567` is tidied to `SA-01234567`.

## Editing the photo labels
Near the top of the script in `index.html`: `SHOTS` (completed work, per platform and work
order type) and `SHOTS_CANNOT_COMPLETE` (reschedules, per platform) and `SHOTS_NOT_REQUIRED` (e.g. no LOS, per platform). "Other" is always
added: tapping it asks what the photo is of, and that text becomes the label (stamp and file
name). Custom labels stay in the row for the rest of the job once they have a photo. Current lists are placeholders.

## Photo checks
- **POV / LOS level lock:** only for labels with "POV" or "LOS" in the name (Radio POV, Dish POV,
  LOS Attempt POV, Sky View POV). The shutter turns amber and won't fire unless tilt is within ±3°. Press and hold the shutter (0.8 s) to take it anyway; the stamp then
  says `(not level)`.
- **Blurry / dark warning:** after each shot the app checks sharpness and brightness and offers
  Retake or Keep. Thresholds (`BLUR_MIN`, `DARK_MAX` in `index.html`) were set on test images;
  adjust after field use if it warns too often or not enough.
- **Note:** the pencil button adds a note to the next photo (stamped as `Note: …`), then clears.
- **Missing shots:** Finish job lists labels with no photo yet and photos not downloaded.

## Tilt
On POV / LOS labels the top readout shows tilt large (+ = aimed up), turns green with LEVEL ✓
within ±3°, and a horizon line lines up with the side marks. The stamp says `(level)` or
`(not level)`. On every other label the tilt is just a small number and the stamp records the
value only. Skew (sideways roll) is shown small.

## Notes
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
