# Xplore Field Cam (v1.2.0)

Installable web app for job-site photos. Each photo is stamped with WO #, date/time,
GPS coordinates (± accuracy), street address, site address, compass direction, camera tilt,
elevation and tech name, then compressed to a target file size for low-signal uploads.

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app (camera, sensors, stamping, compression, gallery, sharing) |
| `sw.js` | Offline support: the app opens and works with no signal once installed |
| `manifest.webmanifest` | Lets it install to the home screen as "Field Cam" |
| `icons/` | Home-screen icons |

## Hosting on GitHub Pages (same as the Work Order Description tool)
1. In the `xploreforms` GitHub account, create a new public repository, e.g. `FieldCam`.
2. Upload every file in this folder (keep the `icons` folder).
3. Repository **Settings → Pages → Branch: main / root → Save**.
4. After a minute it's live at `https://xploreforms.github.io/FieldCam/`.

It must be served over **https** for the camera, GPS and compass to work.

## Installing on a tech's iPhone
1. Open the link in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. Open **Field Cam** from the home screen, enter name, tap **Start camera**, and allow
   Camera, Location and Motion & Orientation.

iPhone asks for Motion & Orientation again each time the app is fully reopened. That is an
Apple rule for web apps; the Start camera tap handles it.

## Photo size
Nothing to choose. Every photo is saved at 2048 px on the long edge (2048 × 1536 for a normal
4:3 shot), at the highest JPEG quality that fits in 350 KB. Simple scenes come out well under
that. Tested on a deliberately worst-case 12 MP image (4.75 MB source): 352 KB.
Address lookup and GPS-in-file are always on. The only things a tech ever types are their name
(once) and, optionally, the WO #.

## Zoom
Zoom buttons above the shutter, plus pinch-to-zoom on the viewfinder (up to 5×).
On iPhones that expose them, **.5×** uses the real ultra-wide lens and **Tele** uses the real
telephoto lens, so those shots keep full detail. 2× and 3× (and pinch) crop the image, which
reduces detail: at 3× the saved photo is about 1340 px wide. Stepping closer beats zooming.

## Sending photos
Gallery → **Share** opens the iPhone share sheet (OneDrive, Save to Files, Save Images, Mail,
Teams). Photos stay on the phone until deleted; sent ones are tagged SENT.
File names: `WO00482913_03_20261024-143207.jpg`.

## Notes
- **Compass is magnetic north** (about 10° off true north in Southern Ontario). Verify against
  a real compass on first field use; iPhone compass needs a figure-8 calibration if it drifts.
- **Address lookup** uses OpenStreetMap's free service. Light use by a team is fine; for heavy
  use, swap in a paid geocoder later. With no data, photos still get coordinates.
- **Elevation** comes from the phone's GPS and is typically ±5–15 m.
- The app also writes location, time and direction into the JPEG
  metadata so photos land on a map in Photos/OneDrive.
- Import (picture icon on the viewfinder) re-compresses photos already taken with the iPhone
  Camera app, using the GPS and time saved in those photos.

## Updating
Edit files, bump `VERSION` in `sw.js` (e.g. `fieldcam-v1.0.1`) and in `index.html`, upload.
Phones get the update the next time the app opens with signal.
