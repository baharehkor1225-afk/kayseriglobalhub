'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductForm from '@/components/admin/product-form'

interface RawProduct {
  id: string
  name: string
  slug: string
  category: string | null
  roomType: string | null
  description: string | null
  price: number
  bulkPrice: number | null
  minBulkQuantity: number | null
  imageUrl: string | null
  images: string[]
  model3d: string | null
  features: string[]
  dimensions: { width: number; height: number; depth: number } | null
  materials: string[]
  colors: string[]
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
}

export default function EditProductPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<RawProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(setProduct)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="p-8 text-sm text-gray-400">Loading product...</div>
    )
  }

  if (error || !product) {
    return (
      <div className="p-8">
        <p className="text-red-600 text-sm">{error || 'Product not found'}</p>
        <Link href="/admin" className="mt-4 inline-block text-sm text-green-700 underline">
          ← Back
        </Link>
      </div>
    )
  }

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category ?? '',
    roomType: product.roomType ?? '',
    description: product.description ?? '',
    price: String(product.price),
    bulkPrice: product.bulkPrice != null ? String(product.bulkPrice) : '',
    minBulkQuantity: product.minBulkQuantity != null ? String(product.minBulkQuantity) : '',
    imageUrl: product.imageUrl ?? '',
    images: (product.images ?? []).join('\n'),
    model3d: product.model3d ?? '',
    features: (product.features ?? []).join('\n'),
    width: product.dimensions?.width != null ? String(product.dimensions.width) : '',
    height: product.dimensions?.height != null ? String(product.dimensions.height) : '',
    depth: product.dimensions?.depth != null ? String(product.dimensions.depth) : '',
    materials: (product.materials ?? []).join(', '),
    colors: (product.colors ?? []).join(', '),
    inStock: product.inStock,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit: {product.name}</h1>
      </div>
      <ProductForm mode="edit" initialData={initialData} />
    </div>
  )
}
