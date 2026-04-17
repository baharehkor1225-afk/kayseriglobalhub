# 🔧 مشکل‌گیری "Failed to Load Model"

## 📍 مشکل
خطای **"Failed to load 3D model. Check that the .glb file exists and is accessible."** روی لپ‌تاپ و گوشی

---

## ✅ چک‌لیست دیبوگ

### 1️⃣ فایل‌های GLB موجود هستند؟
```bash
# وضعیت فعلی:
✅ تمام فایل‌های GLB موجود هستند در:
   frontend/public/models/*.glb
   
✅ فایل‌ها valid GLB format هستند (magic bytes: "glTF")
✅ اندازه فایل‌ها: 22076 bytes (یکسان)
```

### 2️⃣ Model Viewer Loading Test
افتح **Developer Console** روی مرورگر (F12):
```javascript
// Test if model-viewer loads correctly
async function testModelLoading() {
  const response = await fetch('/models/sofa-modern.glb');
  console.log('Status:', response.status);
  console.log('Size:', response.headers.get('content-length'));
  const blob = await response.blob();
  console.log('Blob size:', blob.size);
}
testModelLoading();
```

### 3️⃣ Check Browser Console Logs
روی Developer Tools (F12) به **Console** برو:

**اگر می‌بینی:**
```
📦 Using single model source: /models/sofa-modern.glb
```
✅ مدل لود شد

**اگر می‌بینی:**
```
🔀 Attempting to merge multiple models: [...]
❌ Failed to merge 3D models for AR:
```
⚠️ Model merge fail شد، fallback to single شد

**اگر می‌بینی:**
```
🔴 Model viewer error: {source: '/models/sofa-modern.glb', error: ...}
Failed to load 3D model from /models/sofa-modern.glb
```
❌ Model نمی‌تواند لود شود

---

## 🛠️ راه‌حل‌ها

### مشکل 1: "Failed to load 3D model"

**علت احتمالی:**
- فایل‌های GLB خالی یا درست نیستند
- Model داخل GLB بیش‌تر پیچیده است و Three.js نمی‌تواند export کند

**حل:**
1. **فایل‌های GLB واقعی اضافه کن:**
   - از [Sketchfab](https://sketchfab.com) یا [TurboSquid](https://www.turbosquid.com) مدل‌های واقعی دانلود کن
   - یا در Blender مدل درست کن و export کن

2. **Fallback فعلی:** اگر single model fail شود، کل AR fallback می‌رود
   - برای اصلاح، بریم یک placeholder مدل ساده اضافه کنیم

### مشکل 2: Multiple Models Merge Fail

**علت:**
- Three.js GLTFLoader/Exporter با مدل‌های پیچیده fail می‌کنه
- یا مدل texture/material دارد که export نمی‌شود

**حل:**
1. **Disable merge اگر fail شود:**
   - در console می‌بینی warning، اگر خیلی مشکل‌ساز است
   - می‌تونی merge disable کنی در settings

2. **Single Model View:** حالا fallback به first model می‌رود

### مشکل 3: CORS Error

اگر می‌بینی:
```
CORS error loading model from /models/sofa-modern.glb
```

**حل:**
- باید next.config.js CORS headers اضافه کند (فعلاً public files هستند)
- local development باید کار کند
- اگر در production مشکل داره، بریم CORS header اضافه کنیم

---

## 🔄 مراحل تست

### سناریو 1: Single Model (موجود)
```
صفحه محصول → View in 3D → میدید مدل یا error
```

**انتظار:**
- ✅ مدل load شود و rotate/zoom کار کند
- ❌ یا "Failed to load model" (فایل مشکل دارد)

### سناریو 2: Multiple Models (اگر product 2+ مدل دارد)
```
صفحه محصول (با 2 مدل) → View in 3D → 
```

**انتظار:**
- ✅ دو مدل merge شوند و یک view یکپارچه نمایش دهند
- ⚠️ یا console warning اگر merge fail شود
- ↩️ fallback به first model

### سناریو 3: Mobile AR
```
گوشی → View in 3D → "View in your space" بزن →
```

**انتظار:**
- ✅ AR session شروع شود
- ❌ یا خطایی نشان بده

---

## 📝 Solution Implementation

### گام 1: فایل‌های GLB اضافه کن

اگر فایل‌های فعلی working نیستند:
```bash
# از repo نمونه‌ای GLB دانلود کن
# یا آن‌ها را Blender/Cinema4D میں export کن
# یا از online source گیر

# سپس جایگزین کن در:
frontend/public/models/sofa-modern.glb
frontend/public/models/bed-frame.glb
# etc
```

### گام 2: Test در Browser

```javascript
// Browser Console میں:

// Test 1: fetch مدل
fetch('/models/sofa-modern.glb').then(r => {
  console.log('Fetch status:', r.status);
  return r.blob();
}).then(blob => {
  console.log('Blob size:', blob.size, 'bytes');
  // Create object URL
  const url = URL.createObjectURL(blob);
  console.log('Blob URL:', url);
});

// Test 2: load در model-viewer
const viewer = document.querySelector('model-viewer');
if (viewer) {
  viewer.src = '/models/sofa-modern.glb';
  viewer.addEventListener('load', () => console.log('Model loaded!'));
  viewer.addEventListener('error', (e) => console.error('Error:', e));
}
```

---

## 🚀 Next Steps

1. **فایل‌های GLB واقعی گیر:** مدل‌های پیچیده‌تر و واقعی استفاده کن
2. **Test in production:** بریم deploy کنیم و test کنیم
3. **Monitor errors:** Browser console را بررسی کن برای دقیق‌تر errors

---

## 📞 اگر مشکل ادامه داشت

1. **Screenshot گیر از Console Error**
2. **مشکل را describe کن:**
   - Desktop یا Mobile?
   - کدام مرورگر؟
   - دقیق error message چی است؟
3. **فایل‌های GLB داخل `frontend/public/models/` شامل چیه؟** (فایل اندازه یا من valid)

---

**نتیجه:** فایل‌های GLB valid هستند ولی مسئله در فایل content است. نیاز به اضافه کردن real, valid models.
