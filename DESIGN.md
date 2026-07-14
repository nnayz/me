# DESIGN.md — Pacôme Pertant Portfolio Design System Study

> Reference site: `https://pacomepertant.com/`  
> Subject: Motion and sound designer portfolio for Pacôme Pertant  
> Purpose: Capture the visual language, interaction model, animation principles, and implementation guidance so the style can be studied and adapted without copying the website directly.

---

## 0. Inspection notes

### What was inspected

The live site itself is protected by a browser verification screen in normal web fetches, and local Playwright access from this sandbox was blocked by network/browser restrictions. Because of that, this study is based on:

- Public Awwwards page and Awwwards element breakdowns for the site.
- Public Landing Love screenshots of the live experience.
- Recent.design metadata describing the framework, interaction tags, and libraries.
- GSAP public post describing the animation stack.
- Visual analysis of available screenshots showing the spiral gallery, list mode, project detail pages, about section, controls, and overall layout.

### Reliability level

- **High confidence:** palette, dark/light theme split, spiral/list gallery model, menu/audio controls, project list, 3D/WebGL gallery, GSAP/Three.js/Nuxt presence, sound emphasis, smooth transitions.
- **Medium confidence:** exact animation timings, easing curves, hover physics, loading sequence duration, mobile behavior.
- **Low confidence:** exact font family, internal component names, shader implementation, exact Three.js camera values.

Use this as a **design direction document**, not a pixel-perfect forensic clone.

---

## 1. Creative direction

### Core concept

The site treats a portfolio as a **motion instrument** rather than a static archive. The interface is minimal, but the work is presented through rhythm, depth, sound, and spatial movement.

The main experience is built around three ideas:

1. **A dark stage**  
   The home page is almost entirely black, with subtle grid texture and floating media cards. The dark background turns every project thumbnail into a glowing object.

2. **Two browsing modes**  
   Users can switch between an expressive **spiral view** and a highly scannable **list view**. This gives the site both spectacle and usability.

3. **Motion and sound as identity**  
   The portfolio belongs to a motion and sound designer, so animation, rhythm, transitions, hover trails, and audio toggles are not decoration. They are the brand.

### Design keywords

- Minimal
- Experimental
- Playful
- Dark
- Cinematic
- Rhythmic
- Spatial
- Sound-aware
- Editorial on detail pages
- Portfolio as showreel

---

## 2. Product personality

The site feels like:

- A **showreel in orbit**.
- A **dark-room gallery** where project thumbnails float like animated canvases.
- A **music visualizer** translated into portfolio navigation.
- A **minimal editorial portfolio** when entering project detail pages.

The brand personality is confident but not corporate. It avoids long explanations on the home page and relies on movement, contrast, and curation.

---

## 3. Information architecture

### Primary sections

```txt
/
├── Entry / Loader
│   ├── Enter with sound
│   └── Enter without sound
│
├── Home
│   ├── Spiral view
│   ├── List view
│   ├── Menu
│   ├── Audio toggle
│   └── Project navigation
│
├── Project detail
│   ├── Title
│   ├── Short description
│   ├── Video / motion embed
│   ├── Still images
│   ├── Case link CTA
│   └── Next project / transition
│
├── About
│   ├── Short bio
│   ├── Emoji-like inline icons
│   ├── Horizontal project strip
│   └── Contact / socials
│
└── Menu overlay
    ├── Work
    ├── About
    ├── Contact
    └── Social links
```

### Project examples visible in screenshots

- Paths of life
- The disease spread on Tiktok
- Ah, Psychedelics
- Thought
- Jupiter
- Chromatik
- Digital Travel
- Mercedes AMG
- The purity revealed

---

## 4. Visual system

## 4.1 Color palette

The design is almost binary: black and white, with color coming mainly from project thumbnails.

```css
:root {
  --color-black: #0a0a0a;
  --color-white: #fafafa;
  --color-muted-white: rgba(250, 250, 250, 0.64);
  --color-faint-white: rgba(250, 250, 250, 0.12);
  --color-faint-black: rgba(10, 10, 10, 0.12);

  --surface-home: #0a0a0a;
  --surface-detail: #fafafa;
  --text-on-dark: #fafafa;
  --text-on-light: #0a0a0a;
}
```

### Palette rules

| Token | Usage |
|---|---|
| `#0a0a0a` | Home background, menu surface, immersive gallery stage |
| `#fafafa` | Text on dark, project detail page background, menu pill background |
| Color thumbnails | The only strong color source; project artwork creates emotional variety |
| Transparent white | Grid, dividers, inactive controls, subtle UI marks |
| Transparent black | Buttons and text on project pages |

### Important principle

Do **not** add a separate brand accent color. The work thumbnails are the accent system.

---

## 4.2 Typography

The type appears to be a clean, modern grotesk/sans-serif. It is bold, direct, and neutral enough to let the motion work dominate.

### Recommended font choices

Use one of these:

```css
font-family:
  "Inter",
  "Geist",
  "Suisse Intl",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

### Typography scale

```css
:root {
  --font-xs: clamp(0.625rem, 0.55rem + 0.2vw, 0.75rem);
  --font-sm: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-md: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --font-lg: clamp(1.25rem, 1rem + 1vw, 2rem);
  --font-xl: clamp(2rem, 1.5rem + 3vw, 4rem);
  --font-list: clamp(2rem, 3.2vw, 4.5rem);
  --font-project-title: clamp(2.75rem, 7vw, 8.5rem);
}
```

### Typography usage

| Element | Style |
|---|---|
| Center list titles | Large, bold, tight line height, centered |
| Project detail title | Oversized, top-left, black on white |
| Body copy | Small, compact, almost caption-like |
| UI controls | Tiny lowercase labels, circular dot indicator |
| Menu button | Small rounded pill, lowercase |
| About text | Medium-large paragraph, centered top block |

### Type rules

- Keep text short.
- Let type become a spatial object.
- Prefer lowercase UI labels: `spiral`, `list`, `menu`.
- Use heavy weight for project names.
- Use small body copy to create scale contrast.

---

## 4.3 Layout

### Global chrome

The home page keeps controls pinned around the edges:

```txt
┌─────────────────────────────────────────────────────────────┐
│  logo                                              menu pill  │
│                         spiral • list                       │
│                                                             │
│                                                             │
│                  3D spiral gallery / list                    │
│                                                             │
│                                                             │
│  rotating showreel mark                         sound toggle │
└─────────────────────────────────────────────────────────────┘
```

### Control placement

| Control | Position | Notes |
|---|---|---|
| Logo | Top-left | Circular glossy symbol, small but colorful |
| View toggle | Top-center | `spiral • list`, active state marked by a dot |
| Menu | Top-right | White pill on dark background |
| Audio | Bottom-right | White circular button with speaker icon |
| Showreel marker | Bottom-left | Circular/rotating stamp-like element with preview card |

### Layout principle

The edges hold utility. The center holds the experience.

---

## 4.4 Background treatment

The background is not flat black. It uses a subtle grid that gives the 3D content depth and scale.

```css
.stage {
  background-color: var(--color-black);
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Grid rules

- Keep grid nearly invisible.
- Avoid high-contrast graph-paper styling.
- Fade grid toward edges with radial/linear overlays.
- Use grid to suggest space, not decoration.

---

## 5. Home page experience

## 5.1 Entry / loader

The site opens with a loading/entry state and a sound choice.

### Behavior

- Show a minimal loading state.
- Ask the user whether to enter with or without sound.
- Do not autoplay sound without consent.
- Use the choice to initialize sound state globally.

### Suggested structure

```txt
[ Loader ]
Please wait while your request is being verified / loading assets

[ Enter with sound ]    [ Enter without sound ]
```

### Motion idea

- Text fades or splits into view.
- Background remains dark.
- Small circular brand object can rotate or pulse.
- Transition from loader into gallery should feel like entering a stage.

---

## 5.2 Spiral view

The spiral view is the signature interaction.

### Visual description

- Project thumbnails appear as floating rectangular planes.
- Planes are positioned in 3D depth, not a flat grid.
- Some planes curve or warp slightly, suggesting WebGL shaders or geometry deformation.
- Cards overlap in perspective.
- The currently focused card sits near the center, larger and clearer.
- Peripheral cards are partially cropped, blurred, darker, or angled.

### Interaction model

| Trigger | Response |
|---|---|
| Mouse move | Gallery subtly parallax-shifts; cursor may leave a trail |
| Scroll / wheel | Spiral advances through projects |
| Hover card | Card becomes more visible, less distorted, possibly scales forward |
| Click card | Project transition opens detail page |
| Toggle `list` | Cards collapse/morph/fade into centered text list |

### Implementation model

Use Three.js planes with texture materials.

```ts
interface ProjectCard3D {
  id: string;
  title: string;
  texture: THREE.Texture;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  focusProgress: number;
}
```

### Spiral positioning pseudocode

```ts
const radius = 4.5;
const depthStep = 0.55;
const angleStep = 0.72;

projects.forEach((project, index) => {
  const t = index - activeIndex;
  const angle = t * angleStep;

  project.position.x = Math.sin(angle) * radius;
  project.position.y = Math.cos(angle) * radius * 0.45;
  project.position.z = -Math.abs(t) * depthStep;

  project.rotation.y = -Math.sin(angle) * 0.55;
  project.rotation.x = Math.cos(angle) * 0.16;

  project.scale.setScalar(t === 0 ? 1.25 : 0.8);
});
```

### Feel

The spiral should feel like a controlled orbit, not a chaotic carousel.

---

## 5.3 List view

The list view is the usability anchor.

### Visual description

- Black background remains.
- Project names are stacked vertically in the center.
- Text is large, white, bold, and tightly spaced.
- The view toggle changes active state from `spiral` to `list`.
- The rest of the UI stays consistent.

### Layout

```css
.project-list {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.project-list__items {
  display: flex;
  flex-direction: column;
  gap: 0.05em;
}

.project-list__item {
  font-size: var(--font-list);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.055em;
}
```

### Interaction model

| Trigger | Response |
|---|---|
| Hover project name | Text brightens; preview thumbnail may appear or cursor trail responds |
| Click project name | Page transition to project detail |
| Toggle `spiral` | Text dissolves/morphs back into floating card gallery |

### Why this matters

Experimental portfolios often lose usability. This list view repairs that by giving the user a fast index of the work.

---

## 6. Project detail pages

Project pages invert the experience from black immersive gallery to white editorial case-study pages.

### Visual description

- Background becomes `#fafafa`.
- Text becomes `#0a0a0a`.
- Project title appears huge at top-left.
- Short description sits at top-right in a narrow text column.
- Media is arranged in a staggered composition rather than a uniform grid.
- Large white space surrounds the videos/images.
- Media cards have softly rounded corners.
- A small black CTA pill such as `see the case •` appears near the description.

### Example layout

```txt
┌──────────────────────────────────────────────────────────────┐
│  Jupiter                         Release motion created ...  │
│                                                              │
│                                                              │
│     ┌───────────────────────────────┐                        │
│     │           video still          │                        │
│     └───────────────────────────────┘                        │
│                                                              │
│                              ┌────────────────────────────┐  │
│                              │         image/video         │  │
│                              └────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Project page CSS

```css
.project-page {
  min-height: 100svh;
  background: var(--surface-detail);
  color: var(--text-on-light);
  padding: clamp(1rem, 3vw, 4rem);
}

.project-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 32rem);
  gap: clamp(2rem, 8vw, 10rem);
  align-items: start;
}

.project-title {
  font-size: var(--font-project-title);
  line-height: 0.88;
  letter-spacing: -0.075em;
  font-weight: 700;
}

.project-description {
  max-width: 34ch;
  font-size: var(--font-sm);
  line-height: 1.15;
  font-weight: 600;
}

.project-media-grid {
  margin-top: clamp(3rem, 10vh, 9rem);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(1rem, 2.2vw, 2rem);
}

.media-card {
  border-radius: 0.5rem;
  overflow: hidden;
  background: #111;
}
```

### Staggered media rules

- Use a 12-column grid.
- Avoid symmetrical gallery layouts.
- Let one asset occupy 5 to 6 columns, another 5 columns offset lower.
- Use vertical gaps as rhythm.
- Alternate large video blocks and still-image blocks.

---

## 7. About section

### Visual description

The about section returns to the dark stage.

- Short bio is centered near the top.
- Bio is set in large white text.
- Inline emoji-like icons appear inside the paragraph.
- A horizontal strip of project thumbnails spans the lower part of the viewport.
- The menu pill and audio toggle remain available.
- The showreel marker remains at bottom-left.

### Example copy structure

```txt
I’m Pacome Pertant, [icon] motion and sound designer
based in Paris. [icon] I move shapes and sound [icon] to
create emotional content. [icon] Always playing with
rhythm, sound and visual narrative on a 2D and/or
3D canvas. Clean at times, [icon] experimental at others.
```

### Design role

The about section does not behave like a traditional biography page. It is still part of the animated environment. The bio is concise, almost like a statement in a gallery.

---

## 8. Menu overlay

Awwwards identifies a dedicated `Menu Open` interaction. The menu should be treated as a motion component, not just a dropdown.

### Expected behavior

- The white `menu •` pill triggers the menu.
- The overlay likely opens with a soft expansion, wipe, or masked transition.
- Menu entries should be large and direct.
- Background should retain black/white contrast.
- The open state should preserve the site’s playful dot language.

### Suggested menu structure

```txt
work
about
contact
instagram
behance
x / twitter
email
```

### Menu motion spec

| Phase | Behavior | Duration |
|---|---|---:|
| Press | Pill compresses slightly | 120ms |
| Open | Overlay expands/masks in | 500 to 800ms |
| Items | Links stagger in with split text | 450 to 700ms |
| Close | Reverse with faster timing | 350 to 500ms |

### Implementation hint

Use GSAP timeline:

```ts
const tl = gsap.timeline({ paused: true });

tl.to(menuMask, {
  scale: 1,
  duration: 0.7,
  ease: "expo.out"
});

tl.from(menuLinks, {
  yPercent: 110,
  opacity: 0,
  stagger: 0.045,
  duration: 0.8,
  ease: "power4.out"
}, "-=0.45");
```

---

## 9. Motion design system

## 9.1 Motion principles

### 1. Motion must express rhythm

The subject is motion and sound, so animations should feel timed, musical, and intentional. Avoid random easing everywhere.

### 2. Every transition should have a spatial idea

Cards do not merely fade. They orbit, fold, scale, warp, or move through depth.

### 3. Keep UI controls calm

The content can be expressive, but controls should stay minimal and readable.

### 4. Use contrast between spectacle and clarity

- Spiral view = spectacle.
- List view = clarity.
- Detail page = editorial focus.

### 5. Let the work provide color

The interface stays almost monochrome so that thumbnails become the color system.

---

## 9.2 Motion tokens

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

  --duration-tap: 120ms;
  --duration-hover: 220ms;
  --duration-ui: 420ms;
  --duration-view-switch: 900ms;
  --duration-page-transition: 1000ms;
  --duration-loader: 1400ms;
}
```

### Recommended timings

| Interaction | Duration | Ease |
|---|---:|---|
| Button hover | 180 to 240ms | out-quart |
| Card hover | 350 to 600ms | out-expo |
| Spiral scroll settle | 700 to 1200ms | out-expo |
| Spiral to list | 800 to 1200ms | in-out-quart / expo |
| Page transition | 900 to 1300ms | expo |
| Menu open | 500 to 800ms | expo |
| Split text reveal | 600 to 900ms | power4/expo |

---

## 9.3 Interaction inventory

| Interaction | What happens | Implementation approach |
|---|---|---|
| Loading | Minimal entry before gallery | GSAP timeline, asset preloading |
| Sound choice | User chooses sound on/off | Howler.js state initialized after consent |
| Spiral gallery | Cards float in 3D orbit | Three.js camera + textured planes |
| Spiral/list toggle | 3D gallery becomes text list | GSAP state transition + DOM/WebGL sync |
| List view | Large centered project index | DOM text, SplitText hover/reveal |
| Page transition | Move from gallery/list to case page | Mask/clip-path + project media continuity |
| Menu open | Pill expands to navigation | GSAP + CSS masks |
| Mouse trail | Cursor leaves visual trace | Canvas or absolutely positioned particles |
| Video player | Opens/plays project motion | Custom player overlay, keyboard support |
| Footer scroll transition | Lower content transforms on scroll | GSAP ScrollTrigger + Lenis |

---

## 10. Sound design

Sound is a central part of the portfolio identity, but it must stay user-controlled.

### Sound rules

- Ask before enabling sound.
- Keep a persistent audio toggle at bottom-right.
- Use short UI sounds, not constant noise, unless the user explicitly opts into ambient audio.
- Mute videos by default unless opened in a focused player.
- Save sound preference in local storage.

### Suggested audio state

```ts
type SoundState = "unknown" | "enabled" | "disabled";

interface AudioStore {
  state: SoundState;
  muted: boolean;
  volume: number;
}
```

### Possible sound events

| Event | Sound style |
|---|---|
| Enter with sound | Soft whoosh / tonal hit |
| View toggle | Short click or synthetic pop |
| Card hover | Very subtle blip, pitch varies by card |
| Project open | Transition swell |
| Menu open | Rounded tap + low sweep |

---

## 11. Component inventory

### Core components

```txt
<AppShell />
<Loader />
<SoundGate />
<LogoOrb />
<ViewToggle />
<MenuButton />
<MenuOverlay />
<AudioToggle />
<ShowreelBadge />
<SpiralGallery />
<ProjectPlane />
<ProjectList />
<ProjectTransition />
<ProjectPage />
<ProjectMediaGrid />
<VideoPlayer />
<AboutPanel />
<FooterScrollTransition />
<CursorTrail />
```

### Component responsibilities

| Component | Responsibility |
|---|---|
| `AppShell` | Global fixed controls, route transitions, sound state |
| `Loader` | Preload assets and reveal entry choices |
| `ViewToggle` | Switch between spiral and list views |
| `SpiralGallery` | Render WebGL gallery and input mapping |
| `ProjectList` | Accessible DOM list of project links |
| `ProjectTransition` | Animate route changes |
| `VideoPlayer` | Focused playback with controls |
| `MenuOverlay` | Full navigation experience |
| `CursorTrail` | Pointer expression layer |

---

## 12. Implementation stack

The public metadata points to an implementation using:

- Nuxt.js / Vue.js
- Three.js
- GSAP
- GSAP ScrollTrigger
- GSAP SplitText
- Lenis for smooth scrolling
- Howler.js for sound
- LottieFiles for vector animations
- Pinia for state
- PWA setup

### Equivalent React stack

If recreating the design language in React:

```txt
Framework:       Next.js or Vite + React
3D:              Three.js + React Three Fiber
Animation:       GSAP + @gsap/react
Smooth scroll:   Lenis
Sound:           Howler.js
State:           Zustand or Jotai
Video:           Native video + custom controls
Assets:          WebP/AVIF + MP4/WebM
```

### Equivalent Vue/Nuxt stack

```txt
Framework:       Nuxt 3
3D:              Three.js
Animation:       GSAP
Smooth scroll:   Lenis
Sound:           Howler.js
State:           Pinia
Assets:          Nuxt image / static media pipeline
```

---

## 13. Accessibility requirements

An experimental portfolio still needs accessible fallbacks.

### Required

- The list view must be keyboard navigable.
- Every project card must have a real link and text label.
- Audio must be opt-in.
- Video player must support keyboard controls.
- Provide `prefers-reduced-motion` mode.
- Provide `prefers-reduced-transparency` friendly states where possible.
- Ensure `menu`, `audio`, and `view toggle` buttons have accessible names.
- Avoid trapping keyboard focus in WebGL canvas.

### Reduced motion behavior

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

### Reduced motion product behavior

| Normal | Reduced motion |
|---|---|
| Floating spiral gallery | Static 2D grid or list |
| Page transition masks | Fast fade |
| Cursor trail | Disabled |
| Smooth scroll inertia | Native scroll |
| SplitText reveals | Static text |

---

## 14. Performance requirements

The site depends on heavy visual media, so performance must be designed upfront.

### Asset strategy

- Use low-resolution poster images for initial gallery textures.
- Lazy-load full video only when the user opens a project/player.
- Use `WebP` or `AVIF` for thumbnails.
- Use short looping `mp4`/`webm` clips for motion previews.
- Compress textures to power-of-two sizes if used in WebGL.
- Dispose Three.js textures and geometries on route changes.
- Pause or reduce render loop when the tab is hidden.
- Render on demand when gallery is idle if possible.

### WebGL performance

```ts
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(width, height);

// Pause on hidden tab
document.addEventListener("visibilitychange", () => {
  isRendering = document.visibilityState === "visible";
});
```

### Loading strategy

| Phase | Assets |
|---|---|
| Initial | Logo, CSS, loader, low-res gallery thumbnails |
| After entry | Home gallery textures, core sounds if enabled |
| On hover/focus | Higher-quality preview if needed |
| On project open | Project hero media and video |
| Below fold | Lazy-loaded case study media |

---

## 15. Responsive behavior

### Desktop

- Full 3D spiral gallery.
- Edge-pinned controls.
- Large centered list view.
- Staggered editorial project pages.

### Tablet

- Reduce number of visible cards.
- Decrease gallery depth.
- Keep spiral/list toggle.
- Project pages use 8-column or 6-column layout.

### Mobile

- Prefer list view as a strong fallback.
- Spiral can remain but should show fewer cards and less distortion.
- Controls should remain thumb-friendly.
- Menu pill top-right remains useful.
- Audio button bottom-right should not block content.
- Project detail pages become single-column with large title and stacked media.

### Mobile CSS

```css
@media (max-width: 768px) {
  .project-hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-title {
    font-size: clamp(3rem, 17vw, 6rem);
  }

  .project-media-grid {
    display: flex;
    flex-direction: column;
  }

  .view-toggle {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
```

---

## 16. Page transition model

The site has a dedicated page transition element in Awwwards. Use transitions to connect gallery objects to detail pages.

### Good transition options

1. **Card expansion**  
   The selected gallery card scales toward the camera, then the detail page appears from behind it.

2. **Mask wipe**  
   A black or white circular/organic mask expands from the clicked card or cursor.

3. **Depth dive**  
   Camera moves into the selected card, then cuts into the project page.

4. **SplitText reveal**  
   Project title reveals after the background color switches.

### Recommended route transition timeline

```ts
const transition = gsap.timeline();

transition
  .to(selectedCard, {
    scale: 1.35,
    z: 2,
    duration: 0.55,
    ease: "power3.out"
  })
  .to(pageMask, {
    clipPath: "circle(150% at 50% 50%)",
    duration: 0.9,
    ease: "expo.inOut"
  }, "-=0.25")
  .from(projectTitleChars, {
    yPercent: 110,
    opacity: 0,
    stagger: 0.012,
    duration: 0.8,
    ease: "power4.out"
  }, "-=0.35");
```

---

## 17. Hover and cursor behavior

Awwwards identifies a `Mouse trail` element. The cursor is likely part of the identity layer.

### Cursor trail principles

- Keep it subtle.
- Trail should follow fast enough to feel responsive, slow enough to feel physical.
- It should not hide text or controls.
- Disable it on touch devices and reduced-motion mode.

### Implementation options

| Option | Pros | Cons |
|---|---|---|
| DOM particles | Easy to implement | Can be expensive if many nodes |
| Canvas trail | Efficient and expressive | Needs manual render loop |
| WebGL particles | Best for complex visuals | More implementation work |

### Canvas trail sketch

```ts
const points: { x: number; y: number; life: number }[] = [];

window.addEventListener("pointermove", (event) => {
  points.push({ x: event.clientX, y: event.clientY, life: 1 });
});

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const point of points) {
    point.life -= 0.025;
    ctx.globalAlpha = Math.max(point.life, 0);
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5 * point.life, 0, Math.PI * 2);
    ctx.fill();
  }

  points = points.filter((point) => point.life > 0);
  requestAnimationFrame(draw);
}
```

---

## 18. Detail-page media behavior

### Media cards

- Rounded corners: small, not overly soft.
- White page background means media should cast no heavy shadows.
- Use spacing, not borders, to separate content.
- Autoplay only muted previews.
- Click opens focused player or external case link.

### Video player

Awwwards identifies a dedicated `Video player` element.

Required states:

```txt
idle poster
hover preview
opening transition
playing
paused
muted/unmuted
fullscreen
closed
```

### Video player UX rules

- Use a strong opening transition.
- Keep controls minimal.
- Preserve native keyboard interactions.
- Allow Escape to close.
- Remember audio state.

---

## 19. Design principles to reuse

### 1. Design the index as an experience

The home page is not just a list of work. It is a memorable way to browse the work.

### 2. Offer an escape hatch

The list view is crucial. Always pair experimental navigation with a simple navigation mode.

### 3. Keep the interface quiet

Buttons are tiny. Labels are direct. Most of the interface disappears behind the work.

### 4. Use color through content

The site avoids decorative accent colors because the work is already colorful.

### 5. Use page theme inversion

Dark home page creates drama. White detail pages create focus and readability.

### 6. Make transitions thematic

A motion designer’s site should not use generic fades. Transitions should demonstrate timing, rhythm, and spatial imagination.

---

## 20. What not to copy blindly

Avoid these mistakes when adapting the style:

- Do not make the 3D gallery so abstract that users cannot find projects.
- Do not autoplay sound.
- Do not hide the list view.
- Do not overload the UI with extra colors.
- Do not use massive videos before first interaction.
- Do not make every element animated all the time.
- Do not sacrifice keyboard navigation for WebGL spectacle.
- Do not copy Pacôme’s project visuals, logo, or exact artwork.

---

## 21. Minimal implementation blueprint

### Step 1: Build content model

```ts
export const projects = [
  {
    slug: "jupiter",
    title: "Jupiter",
    description: "Release motion created to mark the launch of a stablecoin.",
    thumbnail: "/projects/jupiter/thumb.webp",
    media: [
      { type: "video", src: "/projects/jupiter/hero.mp4" },
      { type: "image", src: "/projects/jupiter/frame-01.webp" }
    ]
  }
];
```

### Step 2: Build accessible list first

Before adding WebGL, create the list view as the canonical navigation.

```tsx
<nav aria-label="Projects" className="project-list">
  {projects.map((project) => (
    <a href={`/work/${project.slug}`} key={project.slug}>
      {project.title}
    </a>
  ))}
</nav>
```

### Step 3: Add WebGL spiral as progressive enhancement

If WebGL fails, users still get the list.

```tsx
{supportsWebGL && view === "spiral" ? (
  <SpiralGallery projects={projects} />
) : (
  <ProjectList projects={projects} />
)}
```

### Step 4: Add motion layer

Use GSAP timelines for:

- loader reveal
- view switch
- menu open
- route transition
- SplitText reveals
- ScrollTrigger detail-page reveals

### Step 5: Add sound layer last

Only after visual UX works.

---

## 22. Suggested file structure

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── work/[slug]/page.tsx
├── components/
│   ├── app-shell.tsx
│   ├── loader.tsx
│   ├── sound-gate.tsx
│   ├── view-toggle.tsx
│   ├── menu-overlay.tsx
│   ├── audio-toggle.tsx
│   ├── showreel-badge.tsx
│   ├── project-list.tsx
│   ├── spiral-gallery.tsx
│   ├── project-plane.tsx
│   ├── project-media-grid.tsx
│   └── video-player.tsx
├── lib/
│   ├── animation.ts
│   ├── audio.ts
│   ├── projects.ts
│   ├── use-reduced-motion.ts
│   └── webgl.ts
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   └── motion.css
└── public/
    └── projects/
```

---

## 23. Final checklist for a similar site

### Visual

- [ ] Monochrome interface palette.
- [ ] Project thumbnails provide color.
- [ ] Dark immersive home stage.
- [ ] Light editorial project pages.
- [ ] Subtle grid texture.
- [ ] Fixed edge controls.

### Interaction

- [ ] Sound choice before audio plays.
- [ ] Spiral gallery.
- [ ] List fallback.
- [ ] Animated view switch.
- [ ] Animated menu open.
- [ ] Mouse trail or pointer response.
- [ ] Custom page transitions.
- [ ] Video player with accessible controls.

### Technical

- [ ] WebGL gracefully degrades.
- [ ] Reduced motion mode.
- [ ] Lazy-loaded media.
- [ ] Render loop optimization.
- [ ] Keyboard navigation.
- [ ] Sound preference persistence.
- [ ] Mobile simplification.

---

## 24. References used for this study

- `https://pacomepertant.com/`
- `https://www.awwwards.com/sites/pacome-pertant-portfolio`
- `https://www.awwwards.com/inspiration/menu-open-pacome-pertant-portfolio`
- `https://www.awwwards.com/inspiration/spiral-view-pacome-pertant-portfolio`
- `https://www.awwwards.com/inspiration/spiral-to-list-pacome-pertant-portfolio`
- `https://www.awwwards.com/inspiration/video-player-pacome-pertant-portfolio`
- `https://www.landing.love/sites/pacomepertant/`
- `https://recent.design/i/pw6bwd5-pacome-pertant`
- GSAP public social post about the site and stack

---

## 25. One-sentence summary

A minimal black-and-white portfolio where the homepage behaves like an interactive 3D showreel, the list view restores clarity, and project pages switch into spacious white editorial layouts so the motion work can breathe.
