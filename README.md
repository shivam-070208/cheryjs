# cheryglsljs

A lightweight JavaScript library for beautiful, interactive image effects using Three.js, GLSL shaders, and GSAP. Easily add animated wave and transition effects to images in your web projects, with support for both CDN and npm/bundler workflows.

---

## ✨ Features

- GPU-accelerated wave and transition effects for images
- Highly customizable via parameters (speed, strength, hover, etc.)
- Works with both CDN and npm/bundler setups
- Built on top of [Three.js](https://threejs.org/) and [GSAP](https://greensock.com/gsap/)
- Simple API for adding effects to your images

---

## 🏗️ What is it based on?

- **Three.js**: For 3D rendering and WebGL abstraction
- **GLSL**: For custom GPU-accelerated shader effects
- **GSAP**: For smooth, performant animations and transitions

---

## 🚀 Installation

### Using CDN

1. Add Three.js and GSAP via CDN in your HTML:
   ```html
   <script src="https://unpkg.com/cheryglsljs/dist/cherry.js"></script>
   ```

2. The library will be available as a global variable: `Cherryglsl`.

---

### Using npm (Bundler: Webpack, Vite, etc.)

1. Install via npm:
   ```sh
   npm install cheryglsljs three gsap
   ```

2. Import in your JavaScript:
   ```js
   import Cherryglsl from 'cheryglsljs';
   // or import { CherryWave, ImageTransition1, ImageTransition2 } from 'cheryglsljs';
   ```

---

## 🛠️ Usage

### 1. Wave Effect on an Image (`CherryWave`)

**HTML:**
```html
<div class="container" style="width: 400px; height: 400px;">
  <img class="cherry" src="your-image.jpg" style="width: 100%; height: 100%;" />
</div>
```

**JavaScript:**
```js
import Cherryglsl from 'cheryglsljs';

const img = document.querySelector('.cherry');
const container = document.querySelector('.container');

Cherryglsl.CherryWave({
  image: img,                // HTMLImageElement (required)
  container: container,      // HTMLElement (required)
  speed: 0.04,               // (optional) wave animation speed
  strength: 8,               // (optional) wave strength
  hover: true,               // (optional) enable wave on hover
  light: false               // (optional) enable light effect
});
```

#### Parameters for `CherryWave`
- `image`: HTMLImageElement (required) — The image to apply the wave effect to.
- `container`: HTMLElement (required) — The container where the effect will be rendered.
- `speed`: Number (optional, default: 0.05) — Speed of the wave animation.
- `strength`: Number (optional, default: 8) — Strength/amplitude of the wave.
- `hover`: Boolean (optional, default: false) — If true, wave animates on hover.
- `light`: Boolean (optional, default: false) — If true, adds a light effect to the wave.

---

### 2. Image Transition Effect 1 (`ImageTransition1`)

**HTML:**
```html
<div class="container" style="width: 400px; height: 400px;">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
</div>
```

**JavaScript:**
```js
import Cherryglsl from 'cheryglsljs';

const container = document.querySelector('.container');
Cherryglsl.ImageTransition1(container, {
  speed: 0.02,      // (optional) transition speed
  strength: 0.02,   // (optional) wave strength during transition
  radius: 0.02,     // (optional) radius of the transition circle
  hover: false,     // (optional) enable hover effect
  noise: 0.4,       // (optional) noise amount for edge
  p: 0.0            // (optional) camera z offset
});
```

#### Parameters for `ImageTransition1`
- `container`: HTMLElement (required) — The container with at least two `<img>` elements.
- `speed`: Number (optional, default: 0.02) — Speed of the transition animation.
- `strength`: Number (optional, default: 0.02) — Strength of the wave during transition.
- `radius`: Number (optional, default: 0.02) — Radius of the transition circle.
- `hover`: Boolean (optional, default: false) — If true, enables hover-based transition.
- `noise`: Number (optional, default: 0.4) — Amount of noise for the transition edge.
- `p`: Number (optional, default: 0.0) — Camera z offset for perspective.

---

### 3. Image Transition Effect 2 (`ImageTransition2`)

**HTML:**
```html
<div class="container" style="width: 400px; height: 400px;">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image3.jpg" />
</div>
```

**JavaScript:**
```js
import Cherryglsl from 'cheryglsljs';

const container = document.querySelector('.container');
Cherryglsl.ImageTransition2(container, {
  time: true,       // (optional) auto transition timing
  speed: 1.2,       // (optional) transition speed
  p: 0.0,           // (optional) camera z offset
  hover: false,     // (optional) enable hover effect
  ttype: 0          // (optional) transition type (future use)
});
```

#### Parameters for `ImageTransition2`
- `container`: HTMLElement (required) — The container with at least two `<img>` elements.
- `time`: Boolean (optional, default: true) — If true, transitions automatically.
- `speed`: Number (optional, default: 1.2) — Speed of the transition.
- `p`: Number (optional, default: 0.0) — Camera z offset for perspective.
- `hover`: Boolean (optional, default: false) — If true, enables hover-based transition.
- `ttype`: Number (optional, default: 0) — Transition type (for future extension).

---

## 📚 API Summary

- `CherryWave(options)` — Adds a wave effect to a single image.
- `ImageTransition1(container, options)` — Adds a circular transition effect between two images.
- `ImageTransition2(container, options)` — Adds an animated transition effect between multiple images.

---

## 📝 License

MIT
