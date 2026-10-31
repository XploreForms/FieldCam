# Field Cam (v3.17.0)

Installable web app for job-site photos. One session = one work order. The tech picks the job
type, takes labelled photos, downloads them as individual files, then attaches them in FSL.

Every camera photo is **landscape 4:3** (2048 × 1536), however the phone is held. The
viewfinder fills the full width of the screen (and all the space above the labels): it shows
the centre of the photo, with whatever doesn't fit trimmed **on screen only**. The saved photo is
always the full 4:3 frame, so it shows a little more at the edges than the viewfinder did. An **info band** below the photo makes the final image a
**2048 × 2048 square** (see *Info band* below). Nothing is drawn over the photo itself. Compressed to
500 KB max for low-signal uploads.

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
2. Each work order: optionally enter the **Account ID or SA-#**, then pick the **Work order**
   (Install / Conversion / Repair) and the **Platform** (Fibre existing drop / drop required /
   drop only (Install only), Fixed Wireless, Satellite, VAS (Install and Repair)). VAS then asks **XTV, XWH or XWR**. That's all that's
   needed to start shooting.
   **Same spot every time:** every platform and every Not Required reason keep
   the same position whatever the work order or platform. Options that don't apply are greyed out
   instead of removed, so techs can tap from memory. The XTV/XWH/XWR row only appears when VAS is picked.
   **Outcome: now or later.** If the tech already knows it, the start screen has an optional
   **Outcome** button under Platform (same one-tap list, plus "Select later"). Otherwise it comes later,
   once the tech knows it: tap the amber **Set outcome** button just
   above the photo tiles (in thumb reach; it shows the chosen outcome afterwards) and tap the final outcome. It's one list, one tap: **Complete**, then each
   **Cannot Complete** reason and each **Not Required** reason as its own button, each showing how
   many listed photos it has (blank when there are none listed). Until it's picked, the Complete photo list is used. Changing it switches the
   photo list and redraws the info band on photos not saved yet; photos keep their labels. Saving
   asks for the outcome first if it hasn't been picked, then carries straight on.
3. **Labels: pick first, or shoot first.** Every checklist item for the form shows as a tile under
   the viewfinder (items still needed have an amber edge; done ones show ✓ and a count). There is
   no set order and the shutter always works.
   - **Pick first:** tap a tile, then shoot. Tap more tiles for **one photo, several items** (the
     stamp lists them all and the file name joins them, e.g. `Cable Run + Grounding Overview`); tap
     a lit tile again to drop it. After every shot the tiles un-select, so each photo is labelled on
     purpose (**Retake** puts the same labels back). Picked tiles are lit green.
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
   **Start Next Job** (or Keep shooting).
5. In FSL, attach the photos from Photos or Files.
6. **New Job** (the + button just above the photo tiles): shows what's still unlabelled or unsaved,
   then **Save Photos, Then Start New Job**, **Start New Job** (unsaved photos stay on the phone under
   Previous jobs) or **Start Over** (wrong job picked etc.: deletes this job's photos after confirming
   and goes back to the start screen). The same options are also in the job sheet (tap the job name).

Previous jobs stay on the phone (gallery › Previous jobs) until deleted.

## File names
Plain and readable:
- `2026-10-27 1541 SA-123456 - CPE Line of Sight (43.3601 -80.3123).jpg`
- `2026-10-27 1543 - LOS POVs 2 (43.3601 -80.3123).jpg`

= date and time taken, SA-# (if entered), photo name (numbered only when there's more than one),
GPS (or `no GPS`). The job type is on the photo's info band, not in the file name.
A few long checklist items get a short name in the file (`FILE_LABEL` in `index.html`), e.g.
"Line of sight POVs to all viable towers" → "LOS POVs"; the stamp keeps the full wording.
Names are built at save time, so they follow the SA-# and labels as last set.

## SA-# / account number
The start screen and the job sheet have a **Paste** button next to the SA-# box. Copy the SA-# or
the account number anywhere (FSL, a text, an email), tap Paste, and Field Cam picks the number out
of whatever was copied: `SA-` + 6 digits first (also written `SA 123456`, `SA#123456`), then a number next to "Account"/"Acct", then a single long
number on its own. iPhones show a small "Paste" bubble to confirm the first time; if the clipboard
can't be read, long-press the box and paste as usual.

## Job start card (divider)
When a job's photos are saved, Field Cam also saves a bold yellow-and-black **JOB START** card
(SA-#, work order · platform · outcome, date, tech). It's dated 2 seconds before the job's first
photo, so in Photos, Files and FSL's photo picker every job's photos sit right after their own card:
select the photos up to the card and you can't pick up another job's photos by mistake. Its file name
is `… - 00 JOB START (divider).jpg`, so it sorts first in Files too. The card says not to upload it.

It's saved once per job (again if "Save all" re-saves the job's first photo). It isn't a photo in the
app: it never shows in the gallery or counts toward anything. The save message says
"+ job start card".

## Serial numbers (Complete jobs)
On Complete jobs (or before the outcome is picked) a barcode button sits under HQ in the picture's
top-right corner. Tap it: a red line appears in the picture and the shutter turns into a red
**scan** button. Put the red line across the equipment's **S/N** barcode and tap the red button.
Field Cam reads it and adds it to the job straight away, naming the item when it recognises the
serial pattern (same list as Stock Tracker: Adtran router/extender, Nokia/Adtran ONTs, 5G and LTE
CPEs, Hughes and SurfBeam modems and radios, Zyxel, set-top boxes). A slim strip at the top of the
picture shows what was added. Scan as many as needed, then **Done** (or the barcode button again) and
the shutter takes photos again. MAC address barcodes and repeats are caught.

Scanned serials are stamped on every photo in the job as an **S/N** row, only while the outcome is
Complete. They're listed in the job sheet (tap the job name) with **Remove**. If the outcome changes
to Cannot Complete or Not Required the scanner hides and the serials come off the stamp (they're
kept in case it changes back).

Scanning uses the phone's own barcode reader on Android and the ZXing library on iPhone (loaded from
the jsDelivr CDN and kept for offline use by the service worker, the same as Stock Tracker).

## Auto-cleanup
Field Cam keeps its own copy of every photo (for re-labelling and saving again). Once a photo has
been **saved** and the save was more than **14 days** ago, Field Cam deletes its own copy when the
app opens or a job is finished, and shows a short note ("Cleared 12 saved photos older than 14
days…"). The copies the tech saved to Photos or Files are never touched. Unsaved photos and the
current job's photos are never cleared. The number of days is `CLEAN_DAYS` in `index.html`.

## Vibration (Android)
A short buzz when a line-of-sight shot becomes level, so the tech doesn't have to watch the screen.
A small wobble at the edge doesn't re-buzz. Warnings (blurry or dark photo, shot blocked) still give
a double buzz; normal shots don't vibrate. iPhones don't let web apps vibrate.

## Info band
Every saved image has the same layout: a 4:3 photo area (camera photos fill it; imports are scaled
to fit, centred) and the band below it ("label chips" layout):
- **Top row:** each label as its own green chip (more labels wrap onto a second row), SA-# at the
  right. Unlabelled photos show an amber "Not labelled yet" chip.
- **Job** on its own row (work order · platform · outcome · reason).
- **Facts grid:** When, GPS, Facing (direction · tilt), Tech, plus Elev / Zoom / Source when they
  apply, each as a grey key and white value, 2 or 3 across, whichever lets the text be biggest.
- **Address** on its own row at the bottom.

The text is measured before drawing and capped so every photo looks the same: it shrinks a little
or wraps a long item rather than cutting it off, and the block is centred with equal space above
and below. Only an extremely long address or label gets cut with "…".

## Outcomes, reasons and photo lists
These live in the `SETUP` and `PHOTOS` block at the top of the script in `index.html` (between
`/*CONFIG:BEGIN` and `/*CONFIG:END*/`). Don't edit that block by hand: it's generated from two tools
in Claude:
- **Field Cam Outcomes**: for each work order + platform, which outcomes are offered (Complete /
  Cannot Complete / Not Required) and the reasons techs pick from.
- **Field Cam Photo Lists**: for each work order + platform + outcome + reason, the photos (in
  order), whether each is required or optional, and which get the 0° horizon guide.

Ask Claude to "apply the outcomes / photo lists"; it reads both tools and regenerates the block with
`tools/build_config.py`.

How it behaves in the app:
- The outcome picker is a single list: Complete, then every Cannot Complete and Not Required reason
  for that platform as its own button (an outcome with no reasons is one button). One tap sets both
  outcome and reason. The reason shows on the info band and in the header.
- Until the outcome (and reason) is picked, the Complete photo list is shown and the button above the
  tiles reads **Set outcome** in amber. Saving asks for it first.
- Required photos count toward progress and the missing-photo check; optional ones are offered
  only. "Other" is always available. Photos keep their labels when the outcome changes.

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
- **Anything not on the list:** use the **Other…** tile and type what the photo is of.
- **Import:** gallery › **Import from photo library** (e.g. an eCoverage screenshot). Imports get the
  label picked at the time, or go to To label.

## Full quality (HQ)
The **HQ** button (top-right of the camera) switches the current job to full quality: photos keep
the camera's full resolution (as much as the phone gives a web app, up to 4032 px wide) with light
compression and no size limit, typically 2–5 MB each instead of under 500 KB. The info band is still
added. While it's on, the **HQ** button in the picture's top-right corner is green. It stays on for that job and is
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
Back closes whatever is open (a sheet, the photo viewer, the sorter, the Other box) one layer at a
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
- **Viewfinder crop:** the picture fills the screen width but is never cropped narrower than a
  square; on tall phones the extra space above and below is black. The saved photo is always the
  full 4:3 frame.
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
Edit files, bump `VERSION` in `sw.js` and `index.html` (same number), upload all changed files.

The app checks for a new version a few seconds after it opens, whenever it's brought back to the
front, and every 15 minutes, all with signal. It reads the version straight from the live site with
an address that skips GitHub Pages' ~10 minute server cache, so a new upload is noticed within a
couple of minutes (GitHub Pages itself takes about a minute to publish). A bar then says
**Field Cam 3.x.x is ready · Update**; tapping it waits for any photo being saved, clears the old
app files (never photos) and reloads. Photos and the current job are kept.

**Settings › Check for updates** does the same check on demand and shows the version in use.
