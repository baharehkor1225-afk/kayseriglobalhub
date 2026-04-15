'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  category: string | null
  price: number
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [importLoading, setImportLoading] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadProducts() {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    if (res.ok) {
      const data = await res.json()
      setProducts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return
    setDeleteId(id)
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
    setDeleteId(null)
  }

  async function handleImport() {
    if (!confirm('This will import/update all 8 default products. Continue?')) return
    setImportLoading(true)
    setImportMsg('')
    const res = await fetch('/api/admin/import', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setImportMsg(`✅ Done: ${data.inserted} products imported. ${data.errors.length > 0 ? `Errors: ${data.errors.join(', ')}` : ''}`)
      await loadProducts()
    } else {
      setImportMsg(`❌ Import failed`)
    }
    setImportLoading(false)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} product{products.length !== 1 ? 's' : ''} in database</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImport}
            disabled={importLoading}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition-colors"
          >
            {importLoading ? 'Importing...' : '⬇️ Import Default Products'}
          </button>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 text-sm font-semibold bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {importMsg && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${importMsg.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {importMsg}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400 text-sm">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm">No products found.</p>
            <button onClick={handleImport} className="mt-3 text-sm text-green-700 underline">
              Import default products
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Name</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600">Category</th>
                <th className="text-right px-4 py-3.5 font-semibold text-gray-600">Price</th>
                <th className="text-center px-4 py-3.5 font-semibold text-gray-600">Status</th>
                <th className="text-center px-4 py-3.5 font-semibold text-gray-600">Tags</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{product.slug}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-600 capitalize">
                    {product.category?.replace('-', ' ') || '—'}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-gray-900">
                    ${Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-1">
                      {product.isNew && (
                        <span className="px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-700">New</span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">BSeller</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleteId === product.id}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                      >
                        {deleteId === product.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
