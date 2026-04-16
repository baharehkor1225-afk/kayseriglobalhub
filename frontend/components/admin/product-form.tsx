'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

interface ProductFormData {
  name: string
  slug: string
  category: string
  roomType: string
  description: string
  price: string
  bulkPrice: string
  minBulkQuantity: string
  imageUrl: string
  images: string
  model3ds: string
  features: string
  width: string
  height: string
  depth: string
  materials: string
  colors: string
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const CATEGORIES = [
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'dining', label: 'Dining' },
  { value: 'office', label: 'Office' },
  { value: 'outdoor', label: 'Outdoor' },
]

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseLines(str: string): string[] {
  return str.split('\n').map(s => s.trim()).filter(Boolean)
}

function parseComma(str: string): string[] {
  return str.split(',').map(s => s.trim()).filter(Boolean)
}

interface Props {
  initialData?: Partial<ProductFormData & { id: string }>
  mode: 'create' | 'edit'
}

export default function ProductForm({ initialData, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingModel, setUploadingModel] = useState(false)
  const [error, setError] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.images ? parseLines(initialData.images) : []
  )
  const [uploadedModels, setUploadedModels] = useState<string[]>(
    initialData?.model3ds ? parseLines(initialData.model3ds) : []
  )

  const [form, setForm] = useState<ProductFormData>({
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    category: initialData?.category ?? 'living-room',
    roomType: initialData?.roomType ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? '',
    bulkPrice: initialData?.bulkPrice ?? '',
    minBulkQuantity: initialData?.minBulkQuantity ?? '',
    imageUrl: initialData?.imageUrl ?? '',
    images: initialData?.images ?? '',
    model3ds: initialData?.model3ds ?? '',
    features: initialData?.features ?? '',
    width: initialData?.width ?? '',
    height: initialData?.height ?? '',
    depth: initialData?.depth ?? '',
    materials: initialData?.materials ?? '',
    colors: initialData?.colors ?? '',
    inStock: initialData?.inStock ?? true,
    isNew: initialData?.isNew ?? false,
    isBestSeller: initialData?.isBestSeller ?? false,
  })

  function set(field: keyof ProductFormData, value: string | boolean) {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'name' && mode === 'create') {
        updated.slug = generateSlug(value as string)
      }
      return updated
    })
  }

  async function handleUploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    const supabase = getSupabase()
    const newUrls: string[] = []

    for (const file of files) {
      const timestamp = Date.now()
      const random = Math.random().toString(36).substr(2, 9)
      const path = `products/${timestamp}-${random}-${file.name}`

      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file)

      if (error) {
        setError(`Upload failed: ${error.message}`)
        setUploading(false)
        return
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(path)

      if (data?.publicUrl) {
        newUrls.push(data.publicUrl)
      }
    }

    setUploadedImages([...uploadedImages, ...newUrls])
    e.target.value = ''
    setUploading(false)
  }

  function removeImage(index: number) {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  async function handleUploadModel(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    setUploadingModel(true)
    const supabase = getSupabase()
    const newUrls: string[] = [...uploadedModels]

    for (const file of files) {
      const timestamp = Date.now()
      const random = Math.random().toString(36).substr(2, 9)
      const path = `models/${timestamp}-${random}-${file.name}`

      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file)

      if (error) {
        setError(`3D upload failed: ${error.message}`)
        setUploadingModel(false)
        return
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(path)

      if (data?.publicUrl) {
        newUrls.push(data.publicUrl)
      }
    }

    setUploadedModels(newUrls)
    set('model3ds', newUrls.join('\n'))
    e.target.value = ''
    setUploadingModel(false)
  }

  function removeModel(index: number) {
    const updated = uploadedModels.filter((_, i) => i !== index)
    setUploadedModels(updated)
    set('model3ds', updated.join('\n'))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      category: form.category,
      roomType: form.roomType || null,
      description: form.description || null,
      price: parseFloat(form.price),
      bulkPrice: form.bulkPrice ? parseFloat(form.bulkPrice) : null,
      minBulkQuantity: form.minBulkQuantity ? parseInt(form.minBulkQuantity) : null,
      imageUrl: uploadedImages.length > 0 ? uploadedImages[0] : (form.imageUrl || null),
      images: uploadedImages.length > 0 ? uploadedImages : parseLines(form.images),
      model3ds: uploadedModels.length > 0 ? uploadedModels : parseLines(form.model3ds),
      features: parseLines(form.features),
      dimensions: {
        width: parseFloat(form.width) || 0,
        height: parseFloat(form.height) || 0,
        depth: parseFloat(form.depth) || 0,
      },
      materials: parseComma(form.materials),
      colors: parseComma(form.colors),
      inStock: form.inStock,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
    }

    const url = mode === 'edit' ? `/api/admin/products/${initialData?.id}` : '/api/admin/products'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to save product')
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Basic Information</h2>

        <Field label="Product Name *">
          <input
            required
            value={form.name}
            onChange={e => set('name', e.target.value)}
            className={inputClass}
            placeholder="e.g. Ankara Modern Sofa"
          />
        </Field>

        <Field label="Slug">
          <input
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            className={inputClass}
            placeholder="auto-generated from name"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Room Type">
            <input
              value={form.roomType}
              onChange={e => set('roomType', e.target.value)}
              className={inputClass}
              placeholder="e.g. Living Room"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            rows={4}
            value={form.description}
            onChange={e => set('description', e.target.value)}
            className={inputClass}
            placeholder="Product description..."
          />
        </Field>
      </section>

      {/* Pricing */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Pricing</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Price (USD) *">
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              className={inputClass}
              placeholder="0.00"
            />
          </Field>
          <Field label="Bulk Price">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.bulkPrice}
              onChange={e => set('bulkPrice', e.target.value)}
              className={inputClass}
              placeholder="0.00"
            />
          </Field>
          <Field label="Min. Bulk Quantity">
            <input
              type="number"
              min="1"
              value={form.minBulkQuantity}
              onChange={e => set('minBulkQuantity', e.target.value)}
              className={inputClass}
              placeholder="e.g. 10"
            />
          </Field>
        </div>
      </section>

      {/* Media */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Media & 3D</h2>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadImages}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100 disabled:opacity-50"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
        </div>

        {/* Image Preview */}
        {uploadedImages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Images</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {uploadedImages.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Field label="Main Image URL (اگر فایل نآپلود کردی)">
          <input
            value={form.imageUrl}
            onChange={e => set('imageUrl', e.target.value)}
            className={inputClass}
            placeholder="/images/products/sofa.jpg"
          />
        </Field>

        <Field label="Additional Image URLs (one per line)">
          <textarea
            rows={3}
            value={form.images}
            onChange={e => set('images', e.target.value)}
            className={inputClass}
            placeholder="/images/products/sofa-1.jpg&#10;/images/products/sofa-2.jpg"
          />
        </Field>

        {/* 3D Models Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload 3D Models (.glb / .gltf) - چند فایل انتخاب کن
          </label>
          <input
            type="file"
            multiple
            accept=".glb,.gltf"
            onChange={handleUploadModel}
            disabled={uploadingModel}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 disabled:opacity-50"
          />
          {uploadingModel && <p className="text-sm text-gray-500 mt-2">Uploading 3D models...</p>}
        </div>

        {/* 3D Models Preview */}
        {uploadedModels.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Uploaded 3D Models</p>
            <div className="space-y-2">
              {uploadedModels.map((url, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-xl">📦</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-800">Model {idx + 1}</p>
                    <p className="text-xs text-blue-600 truncate">{url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModel(idx)}
                    className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Field label="3D Model URLs (اگر فایل آپلود نکردی)">
          <textarea
            rows={3}
            value={form.model3ds}
            onChange={e => set('model3ds', e.target.value)}
            className={inputClass}
            placeholder="/models/sofa-1.glb&#10;/models/sofa-2.glb"
          />
        </Field>

        {/* Old single model field - keep for backwards compatibility */}
        {false && (
          <Field label="3D Model URL (.glb)">
            <input
              value={form.model3ds}
              onChange={e => set('model3ds', e.target.value)}
              className={inputClass}
              placeholder="/models/sofa.glb"
            />
          </Field>
        )}
      </section>

      {/* Details */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Details</h2>
        <Field label="Features (one per line)">
          <textarea
            rows={5}
            value={form.features}
            onChange={e => set('features', e.target.value)}
            className={inputClass}
            placeholder="Premium velvet upholstery&#10;Hand-carved walnut legs"
          />
        </Field>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Dimensions (cm)</p>
          <div className="grid grid-cols-3 gap-4">
            {(['width', 'height', 'depth'] as const).map(dim => (
              <Field key={dim} label={dim.charAt(0).toUpperCase() + dim.slice(1)}>
                <input
                  type="number"
                  min="0"
                  value={form[dim]}
                  onChange={e => set(dim, e.target.value)}
                  className={inputClass}
                  placeholder="0"
                />
              </Field>
            ))}
          </div>
        </div>

        <Field label="Materials (comma-separated)">
          <input
            value={form.materials}
            onChange={e => set('materials', e.target.value)}
            className={inputClass}
            placeholder="Velvet, Walnut Wood, High-Density Foam"
          />
        </Field>

        <Field label="Colors (comma-separated)">
          <input
            value={form.colors}
            onChange={e => set('colors', e.target.value)}
            className={inputClass}
            placeholder="Cream, Charcoal, Forest Green"
          />
        </Field>
      </section>

      {/* Flags */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Status & Tags</h2>
        <div className="flex flex-wrap gap-6">
          {([
            { field: 'inStock', label: 'In Stock' },
            { field: 'isNew', label: 'New Arrival' },
            { field: 'isBestSeller', label: 'Best Seller' },
          ] as { field: keyof ProductFormData; label: string }[]).map(({ field, label }) => (
            <label key={field} className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form[field] as boolean}
                onChange={e => set(field, e.target.checked)}
                className="w-4 h-4 rounded accent-green-700"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-2.5 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
