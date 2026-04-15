import Link from 'next/link'
import ProductForm from '@/components/admin/product-form'

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add New Product</h1>
      </div>
      <ProductForm mode="create" />
    </div>
  )
}
