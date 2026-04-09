# 3D Models Directory

This directory contains GLB (GL Transmission Format Binary) files for AR product visualization.

## Required Models

Add the following GLB files to this directory:

- `sofa-modern.glb` - Modern sofa model
- `dining-set.glb` - Dining table and chairs set
- `armchair.glb` - Accent chair model
- `placeholder.glb` - Fallback model for products without specific models

## How to Obtain GLB Models

1. **Free Resources:**
   - [Sketchfab](https://sketchfab.com/) - Search for furniture models and download as GLB
   - [Google Poly](https://poly.google.com/) - Free 3D models (legacy but still available)
   - [Khronos Group Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)

2. **Create Your Own:**
   - Use [Blender](https://www.blender.org/) to create models and export as GLB
   - Hire a 3D artist on platforms like Fiverr or Upwork
   - Use AI tools like Spline or Three.js editors

3. **Optimize Models:**
   - Keep file sizes under 5MB for web performance
   - Use tools like [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) to optimize
   - Test loading times on mobile devices

## Model Requirements

- Format: GLB (binary glTF)
- Max size: 5MB recommended
- Include materials and textures
- Proper scale (real-world dimensions)
- Optimized polygon count for web

## Testing

After adding models, test in:
- Chrome/Edge (WebXR)
- Safari (Quick Look)
- Mobile browsers (Scene Viewer on Android)