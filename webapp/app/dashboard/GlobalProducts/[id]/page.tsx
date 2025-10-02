"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Tag, Package, User, Calendar, DollarSign, Box, AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  unit?: string;
  price: number;
  stock: number;
  status: string;
  createdAt: string;
  createdBy: { name: string };
  images?: string[];
}

export default function ProductViewPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/products/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              {product.images && product.images.length > 0 ? (
                <div className="space-y-3 p-4">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} - Image ${i + 1}`}
                      className="rounded-lg border border-gray-200 shadow-sm w-full hover:shadow-md transition-shadow"
                    />
                  ))}
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <Package className="text-gray-300" size={80} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                      {product.category || "Uncategorized"}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : product.status === "INACTIVE"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {product.description && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Price & Stock Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-200 p-2 rounded-lg">
                      <DollarSign className="text-orange-700" size={20} />
                    </div>
                    <span className="text-sm text-orange-700 font-medium">Price</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-900">
                    ₹{product.price}
                  </p>
                  {product.unit && (
                    <p className="text-sm text-orange-700 mt-1">per {product.unit}</p>
                  )}
                </div>

                <div className={`rounded-xl p-6 border ${
                  product.stock === 0
                    ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
                    : product.stock < 50
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
                    : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      product.stock === 0
                        ? "bg-red-200"
                        : product.stock < 50
                        ? "bg-amber-200"
                        : "bg-green-200"
                    }`}>
                      <Box className={
                        product.stock === 0
                          ? "text-red-700"
                          : product.stock < 50
                          ? "text-amber-700"
                          : "text-green-700"
                      } size={20} />
                    </div>
                    <span className={`text-sm font-medium ${
                      product.stock === 0
                        ? "text-red-700"
                        : product.stock < 50
                        ? "text-amber-700"
                        : "text-green-700"
                    }`}>Stock Available</span>
                  </div>
                  <p className={`text-3xl font-bold ${
                    product.stock === 0
                      ? "text-red-900"
                      : product.stock < 50
                      ? "text-amber-900"
                      : "text-green-900"
                  }`}>
                    {product.stock}
                  </p>
                  {product.unit && (
                    <p className={`text-sm mt-1 ${
                      product.stock === 0
                        ? "text-red-700"
                        : product.stock < 50
                        ? "text-amber-700"
                        : "text-green-700"
                    }`}>{product.unit}s</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created By</p>
                    <p className="font-semibold text-gray-900">{product.createdBy?.name || "Unknown"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date Added</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.back()}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-medium text-lg"
            >
              Back to Product List
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}