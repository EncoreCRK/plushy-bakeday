# Plushy's Birthday — The Spire's Grand Deception

A mobile-first, static interactive birthday theater. No backend, build step, or external libraries.

## Start

1. Edit `config.js`: dialogue, names, character expression images, audio paths, and final Canva link.
2. Put transparent character PNGs into `assets/bsaph/`, `assets/candy/`, `assets/shamil/`, and OC artwork in `assets/ocs/`.
3. Put your speech bubble graphic at `assets/bubble.png` (the browser overlays text). If you don't have it yet, a CSS bubble is used automatically.
4. Add optional music as MP3/OGG files in `assets/music/`; music loops and crossfades between acts.
5. Open `index.html` locally for a quick test, or publish the folder to GitHub Pages, Netlify, Render Static Site, etc. All paths are relative.

## Editable script

Every step is listed in `SCENES` in `config.js`. Supported fields:

- `act`: "prologue", "welcome", "spire", "cake", "finale" (controls title, backdrop style, music).
- `speaker`: character key from `CHARACTERS`, or "narrator".
- `expression`: an expression key defined for that character, e.g., "grin" or "surprised".
- `text`: dialogue text. `\n` makes a line break. Plain text only, no HTML needed.
- `left`, `right`, `center`: actors visible in slots. Each slot accepts a string character key, or `{ character: "candy", expression: "excited" }`.
- `oc`: a key in `OCS`, optionally illustrated beside the narration.
- `effect`: optional "confetti", "cake", "gift", "shiver".
- `button`: button label for moving to next page.

The player advances with the next button, tapping the speech bubble, or clicking the stage. The cake and gift are interactive. On the gift scene, the present opens the Canva URL. There is a sound toggle and back button.

## Important notes

- Mobile browsers usually **block audio autoplay until a user interacts**. The "Enter the Theatre" button starts the audio, then curtain animation begins. Subsequent audio changes are triggered by interactions.
- The site doesn't include anyone's proprietary character art or music; supply assets you have permission to use.
- If you don't have an asset yet, the site shows a graceful labeled silhouette instead of a broken image.
- For best mobile results, use transparent PNG/WebP sprites with some transparent padding, and landscape backgrounds. Adjust individual character `scale` and `positionY` in `CHARACTERS`.
- The Canva destination should be a **public view link**, not an edit link. Set `CANVA_GIFT_URL` in `config.js`.
- For testing music: a browser may require a local web server, and `file://` audio playback can vary. Hosting is best.
