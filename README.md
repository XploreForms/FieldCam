# Field Cam (v3.25.1)

Installable web app for job-site photos. One session = one work order. The tech picks the job
type, takes labelled photos, downloads them as individual files, then attaches them in FSL.

Every camera photo is **landscape 4:3** (2048 × 1536), however the phone is held. The
viewfinder fills the full width of the screen (and all the space above the labels): it shows
the centre of the photo, with whatever doesn't fit trimmed **on screen only**. The saved photo is
always the full 4:3 frame, so it shows a little more at the edges than the viewfinder did. An **info band** below the photo makes the final image a
**2048 × 2048 square** (see *Info band* below). Nothing is drawn over the photo itself. Compressed to
500 KB max by default for low-signal uploads (Settings › Photo size: 500 KB, 1 MB or full quality).

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
1. First launch only: enter your name and dealer name (both required, both stamped on every photo;
   change them in Settings).
2. Each work order: enter the **SA-#** (required, 7 digits; **Paste** grabs it from FSL), then pick the **Work order**
   (Install / Conversion / Repair / Recovery) and the **Platform** (Fibre existing drop / drop required /
   drop only (Install only); Repair and Recovery use a single Fibre), Fixed Wireless, Satellite, VAS (Install, Repair and Recovery)). VAS then asks **XTV, XWH or XWR**. That's all that's
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
     stamp lists them all and the file name joins them, e.g. `Outdoor Cable Run + Grounding Overview`); tap
     a lit tile again to drop it. After every shot the tiles un-select, so each photo is labelled on
     purpose (**Retake** puts the same labels back). Picked tiles are lit green.
   - **Shoot first:** with no tile picked, photos go to **To label**. Tap **To label (n)** (or the
     button in the gallery) to sort them: each photo shows full screen, tap what's in it (one or
     more), then **Next**. Photos can't be saved until they're labelled.
   - After each shot a small note shows for a few seconds (`✓ Outdoor Cable Run · Change`, or
     `Saved to To label · Label`). It never blocks the next shot; ignore it or tap to fix.
   - **Wrong label later:** open the photo in the gallery and tap **Change label**. The stamp is
     redrawn with the new label (the app keeps a clean copy of each photo until the job is
     finished, then deletes it to save space).
   - **Other…** asks what the photo is of; the text becomes the label.
4. Tap the **save button** (right of the shutter). On iPhone this opens the share sheet with
   every new photo: techs tap **Save N Images** to put them in Photos (the gallery), then attach
   them in FSL from Photos. Don't use Save to Files. iPhone web apps can't write into Photos any other way; a plain
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
- `2026-10-27 1541 SA-1234567 - CPE Line of Sight (43.3601 -80.3123).jpg`
- `2026-10-27 1543 - LOS POVs 2 (43.3601 -80.3123).jpg`

= date and time taken, SA-# (if entered), photo name (numbered only when there's more than one),
GPS (or `no GPS`). The job type is on the photo's info band, not in the file name.
A few long checklist items get a short name in the file (`FILE_LABEL` in `index.html`), e.g.
"Line of sight POVs to all viable towers" → "LOS POVs"; the stamp keeps the full wording.
Names are built at save time, so they follow the SA-# and labels as last set.

## SA-# (required)
Every job needs its SA-# (7 digits, e.g. `SA-1234567`) before it can start; account numbers aren't
used. The box opens the number pad and adds `SA-` as you type: type just the 7 digits, or the full `SA-1234567`, and it ends up the same; anything that isn't 7 digits
is refused with a message. It can be corrected later in the job sheet (tap the job name), but not cleared.

The **Paste** button next to the box picks the SA-# out of whatever was copied (FSL, a text, an
email): `SA-` + 7 digits (also written `SA 1234567`, `SA#1234567`), or just the 7 digits copied on their
own. It won't guess from other numbers (work orders, phone numbers, account numbers). iPhones show a
small "Paste" bubble to confirm the first time.

## Job start and end cards (dividers)
When a job's photos are saved, Field Cam also saves two divider cards around them:
- a **green JOB START** card, dated 2 seconds before the job's first photo;
- an **amber JOB END** card, dated 2 seconds after the job's last photo.

They're built to read at thumbnail size and stay small (1080 × 1080, about 45 KB each): flat colour,
a huge START or END, the SA-# large underneath, the time (12-hour, e.g. 3:17 PM) and date large in the card's colour, then
work order · platform and "Divider · don't upload". In
Photos, Files and FSL's photo picker each job's photos sit between its own two cards: select what's
inside the brackets. Anything inside without the dark info band (a screenshot, an original from the
phone's camera app) isn't a Field Cam photo and shouldn't go to FSL. File names
`… - 00 JOB START (divider).jpg` and `… - zz JOB END (divider).jpg` sort around the photos in Files too.

The start card is saved once, with the save that includes the job's first photo. The end card is saved
with the save that includes the job's newest photo; if more photos are taken and saved later, a new end
card follows them. Re-saving the same photos doesn't add cards. They aren't photos in the app: never in
the gallery, never counted. The save message says "+ job start and end cards".

## Serial numbers (Complete jobs)
On Complete jobs (or before the outcome is picked) a barcode button sits under HQ in the picture's
top-right corner. Tap it: a red line appears in the picture and the shutter turns into a red
**scan** button. Put the red line across the equipment's **S/N** barcode and tap the red button.
Field Cam reads it and adds it to the job straight away, naming the item when it recognises the
serial pattern (same list as Stock Tracker: Adtran router/extender, Nokia/Adtran ONTs, 5G and LTE
CPEs, Hughes and SurfBeam modems and radios, Zyxel, set-top boxes). A slim strip at the top of the
picture shows what was added. Scan as many as needed, then **Done** (or the barcode button again) and
the shutter takes photos again. MAC address barcodes and repeats are caught.

Each successful scan also saves a photo of the label (the whole camera frame at that moment), named
after the device, e.g. `Adtran Wi-Fi 6 router SN`, with `Note: Scanned S/N …` on its info band. A failed
read, a MAC barcode or a repeat saves no photo. Removing a serial in the job sheet doesn't delete its
photo (delete it in the gallery if needed).
Scanned serials are stamped on every photo in the job as an **S/N** row, only while the outcome is
Complete. They're listed in the job sheet (tap the job name) with **Remove**. If the outcome changes
to Cannot Complete or Not Required the scanner hides and the serials come off the stamp (they're
kept in case it changes back).

Scanning uses the phone's own barcode reader on Android and the ZXing library on iPhone (loaded from
the jsDelivr CDN and kept for offline use by the service worker, the same as Stock Tracker); where the
phone has its own reader, ZXing backs it up. The box is read at the camera's full sharpness (up to 2000 px
wide) plus a closer look at its middle, so thin serial barcodes read. If nothing reads, fill the box with
the barcode (about a hand's width away, or zoom 2×) and keep still. The strip shows which reader is in use.

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

## Time format
The stamp, metadata and screens use a 12-hour clock (e.g. `2026-10-31 3:18:42 PM EDT`). File names
keep 24-hour `HHMM` (e.g. `1518`) so they sort in time order.

## Photo metadata
Everything on the info band is also written into the photo file, so it's searchable and survives if
the band is cropped:
- **EXIF:** date/time taken, GPS (latitude, longitude, elevation, accuracy), compass direction, tech
  (Artist), and the full band text in ImageDescription and UserComment.
- **Windows** (File Explorer › Properties › Details): Title = labels, Subject = SA-# · job,
  Comments = full band text, Tags = labels, SA-#, work order, platform, outcome, reason.
- **XMP** (iPhone/Mac Photos caption and keywords, Lightroom, etc.): title, description, keywords.

The band text reads like:
`Outdoor Cable Run + Surge | SA-1234567 | Job: Install · Fixed Wireless · Complete | When: … | GPS: … |
Facing: 264° W · tilt +2.0° | Tech: … | Dealer: … | S/N: … | Address: …`

## Info band
Every saved image has the same layout: a 4:3 photo area (camera photos fill it; imports are scaled
to fit, centred) and the band below it ("label chips" layout):
- **Top row:** each label as its own green chip (more labels wrap onto a second row), SA-# at the
  right. Unlabelled photos show an amber "Not labelled yet" chip.
- **Job** on its own row (work order · platform · outcome · reason).
- **Facts grid:** When, GPS, Facing (direction · tilt), Tech, Dealer, plus Elev / Zoom / Source when they
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

## Photo size (Settings) and HQ
**Settings › Photo size** sets the size for every photo from then on:
- **500 KB** (default): 2048 px square, never over 500 KB. Best for low signal.
- **1 MB**: 3024 px square, never over 1 MB. More detail for close-ups and labels.

Each size is a range: **250–500 KB** on the 500 KB setting, **500 KB–1 MB** on the 1 MB setting. Every
photo starts at good JPEG quality (0.8, visually the same as higher settings). Busy scenes (gravel,
wiring, foliage) get compressed a little more to stay under the ceiling; quiet scenes that would come
out under the floor get extra quality up to it (max quality 0.95, so a very plain shot can still be
a little under the floor).
- **Full quality**: the camera's full resolution (up to 4032 px), light compression, no size limit,
  typically 3–6 MB each.

The **HQ** button (top-right of the picture) switches just the current job to full quality. It turns
green while on and goes back off for the next job, so nobody leaves it on by accident. It's hidden when
the default is already Full quality. Changes apply to photos taken afterwards, not ones already taken.
The info band and metadata are always added.

**Settings › Job start & end cards** turns the divider cards on (default) or off.

**Settings › Grid lines** shows rule-of-thirds lines over the picture (off by default) to help frame
straight, even shots. They're on screen only, never in the photo, and hide while scanning a barcode.

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

## Upright or sideways
Photos can be taken with the phone upright or sideways. Either way the saved photo is the same
landscape 4:3 frame with the info band along the bottom, already the right way up for FSL.
- **Upright** (normal): the frame is a landscape slice of the camera's view.
- **Sideways**: the frame is the camera's whole view, about a third wider and taller than upright
  (like zooming out to about 0.75×) with more pixels, not fewer. Use it when you can't step back far
  enough. The preview shows the whole frame; the buttons (HQ, scanner, flashlight, zoom, shutter,
  save, gallery) turn to face you, the layout stays put, like the iPhone Camera app.
- **Ultra-wide (.5×)**: on iPhones that have one, a **.5×** button sits left of 1× in the zoom bar. It
  turns amber and lasts for one photo only, then the camera goes back to 1× (edges are softer and
  straight lines bend, so it's not for everyday shots). Those photos show `Zoom: 0.5× ultra-wide` on
  the info band so reviewers know. Pinch zoom never goes below 1×.
  Android lenses aren't named: phones that zoom below 1× use that; otherwise the first **.5×** tap tries
  another back camera, and tapping **.5×** again tries the next one. The lens a photo is taken with is
  remembered as that phone's ultra-wide. **Settings** lists the cameras the phone reports and whether
  ultra-wide is available, set or still to try.
The app layout itself never turns: Android keeps it upright through the install settings, and on
iPhone the app turns itself back upright if the screen rotates.

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

## Recovery and the optional VAS photo
- **Recovery** (equipment removal): Fixed Wireless and Satellite Complete jobs need Overview of Structure,
  Mount and CPE Before Removal, Mount and CPE After Removal, and Cable Entry Hole Sealed (tiles and file
  names shorten the middle two to "CPE Before/After Removal"). Fibre and VAS recoveries have no set photos.
  Outcomes are Complete, Cannot Complete and Not Required, with no reasons yet (set them in the Outcomes tool).
- Install, Conversion and Repair Complete lists on Fibre, Fixed Wireless and Satellite have an optional
  **VAS** photo for when XWH or XTV is deployed on the same visit.

## Version line
The start screen shows `Field Cam v<VERSION> · Updated <date, time>` at the bottom of the start screen. On each release bump
`VERSION` and `UPDATED` in `index.html` and `VERSION` in `sw.js`.

## Towers on line-of-sight shots
- The tower list is **not** part of the app or its website (the site is public). The manager shares a
  `Field Cam Towers.csv` file (columns: name, lat, lon) with the team only; each tech saves it to Files
  and taps **Settings › Tower list › Load tower list** once. It's kept on that phone only (works offline);
  **Remove** deletes it. Load a new file to update.
- On line-of-sight shots (the 0° level line), towers within 30 km are drawn on the 0° line where they
  should be: a diamond, a stem and a tag with the name and distance. Tags stack when towers are close.
  The tower nearest the centre (within 6°) turns green and the readout adds "toward <tower> <km>".
  The nearest tower off each side shows as an arrow at the edge (◀ / ▶).
- Placement uses GPS, the compass corrected to true north, and the camera's field of view (zoom and
  sideways included). Phone compasses are typically 5–15° off (worse near metal), so markers are a
  guide, not a survey. Nothing about towers is stamped on the photo.
