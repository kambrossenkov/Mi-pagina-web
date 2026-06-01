(function () {
  'use strict';
  // ──────────────────────────────────────────────────────────────
  // vader_geo.js  —  Stub geometry for initVaderThree()
  //
  // Replace with STL-derived data when available.
  // Expected format:
  //   VADER_GEO.vertices     Float32Array  (x, y, z per vertex)
  //   VADER_GEO.bodyIndices  Uint32Array   (triangle indices for body)
  //   VADER_GEO.headIndices  Uint32Array   (triangle indices for head)
  // Both index arrays reference the same shared vertices array.
  // ──────────────────────────────────────────────────────────────

  const verts   = [];
  const bodyIdx = [];
  const headIdx = [];

  function addBox(cx, cy, cz, w, h, d) {
    const base = verts.length / 3;
    const hw = w / 2, hh = h / 2, hd = d / 2;
    verts.push(
      cx-hw, cy-hh, cz-hd,  cx+hw, cy-hh, cz-hd,
      cx+hw, cy+hh, cz-hd,  cx-hw, cy+hh, cz-hd,
      cx-hw, cy-hh, cz+hd,  cx+hw, cy-hh, cz+hd,
      cx+hw, cy+hh, cz+hd,  cx-hw, cy+hh, cz+hd
    );
    return base;
  }

  function pushBox(target, base) {
    const f = [
      0,1,2, 0,2,3,
      5,4,7, 5,7,6,
      4,0,3, 4,3,7,
      1,5,6, 1,6,2,
      4,5,1, 4,1,0,
      3,2,6, 3,6,7
    ];
    for (const i of f) target.push(base + i);
  }

  // ── BODY ────────────────────────────────────────────────────

  pushBox(bodyIdx, addBox( 0.00,  0.00, 0.00, 1.60, 2.50, 1.00)); // torso
  pushBox(bodyIdx, addBox(-1.18,  0.10, 0.00, 0.52, 1.85, 0.52)); // left arm
  pushBox(bodyIdx, addBox( 1.18,  0.10, 0.00, 0.52, 1.85, 0.52)); // right arm
  pushBox(bodyIdx, addBox(-0.44, -2.20, 0.00, 0.62, 2.10, 0.62)); // left leg
  pushBox(bodyIdx, addBox( 0.44, -2.20, 0.00, 0.62, 2.10, 0.62)); // right leg
  pushBox(bodyIdx, addBox(-0.44, -3.38, 0.12, 0.66, 0.28, 0.90)); // left foot
  pushBox(bodyIdx, addBox( 0.44, -3.38, 0.12, 0.66, 0.28, 0.90)); // right foot
  pushBox(bodyIdx, addBox(-1.65, -0.32, 0.10, 0.13, 0.68, 0.13)); // saber handle
  pushBox(bodyIdx, addBox(-1.65,  1.48, 0.10, 0.07, 2.70, 0.07)); // saber blade
  pushBox(bodyIdx, addBox( 0.00, -1.10, 0.00, 1.62, 0.24, 1.02)); // belt
  pushBox(bodyIdx, addBox( 0.00, -1.10, 0.52, 0.34, 0.20, 0.12)); // buckle
  pushBox(bodyIdx, addBox( 0.00,  0.30, 0.52, 0.95, 0.60, 0.16)); // chest panel

  // ── HEAD ────────────────────────────────────────────────────

  pushBox(headIdx, addBox( 0.00,  3.80, 0.00, 1.90, 1.95, 1.70)); // helmet base
  pushBox(headIdx, addBox( 0.00,  5.00, 0.00, 1.52, 0.65, 1.44)); // dome top
  pushBox(headIdx, addBox( 0.00,  4.70, 0.00, 0.14, 0.75, 0.88)); // crest
  pushBox(headIdx, addBox( 0.00,  3.90, 0.84, 1.12, 0.55, 0.12)); // visor
  pushBox(headIdx, addBox( 0.00,  3.15, 0.82, 0.80, 0.40, 0.18)); // respirator
  pushBox(headIdx, addBox( 0.00,  3.55, 0.84, 0.15, 0.34, 0.10)); // nose
  pushBox(headIdx, addBox( 0.00,  2.85, 0.74, 0.74, 0.38, 0.20)); // chin
  pushBox(headIdx, addBox(-1.00,  3.55, 0.12, 0.20, 0.56, 0.70)); // left fin
  pushBox(headIdx, addBox( 1.00,  3.55, 0.12, 0.20, 0.56, 0.70)); // right fin
  pushBox(headIdx, addBox( 0.00,  2.56, 0.00, 0.70, 0.44, 0.70)); // neck
  pushBox(headIdx, addBox( 0.00,  2.25, 0.00, 2.12, 0.24, 1.80)); // gorget

  window.VADER_GEO = {
    vertices:     new Float32Array(verts),
    bodyIndices:  new Uint32Array(bodyIdx),
    headIndices:  new Uint32Array(headIdx)
  };
})();
