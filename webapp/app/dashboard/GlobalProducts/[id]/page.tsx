"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Tag,
  Package,
  User,
  Calendar,
  DollarSign,
  Ruler,
  AlertCircle,
  Edit3,
  Save,
  X,
} from "lucide-react";

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
  dimension?: string;
  createdBy: { name: string; id?: string };
  images?: string[];
}

export default function ProductViewPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/products/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data.data);
        setFormData(res.data.data); // preload edit form
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleSave = async () => {
  try {
    const updateData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      unit: formData.unit,
      price: formData.price,
      stock: formData.stock,
      dimension: formData.dimension,
      status: formData.status,
    };

    const res = await axios.put(
      `http://localhost:3002/api/products/${id}`,
      updateData,
      { withCredentials: true }
    );

    setProduct(res.data.data);
    setIsEditing(false);
    alert("✅ Product updated successfully!");
  } catch (err) {
    console.error("Error updating product:", err);
    alert("❌ Failed to update product.");
  }
};


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading product details...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen p-6">
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg"
          >
            Back to Products
          </button>
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
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden sticky top-6">
              {product.images && product.images.length > 0 ? (
                <div className="space-y-3 p-4">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} - Image ${i + 1}`}
                      className="rounded-lg border border-gray-200 shadow-sm w-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <Package className="text-gray-300" size={80} />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Product Name"
                  />
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={formData.stock || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Stock"
                  />
                  <input
                    type="text"
                    value={formData.unit || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Unit"
                  />
                  <input
                    type="text"
                    value={formData.dimension || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, dimension: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Dimensions"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 rounded flex items-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-orange-600 text-white rounded flex items-center gap-2 hover:bg-orange-700"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                  </div>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Price:</strong> ₹{product.price}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Unit:</strong> {product.unit}</p>
                  <p><strong>Dimensions:</strong> {product.dimension}</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-bold mb-4">Additional Info</h2>
              <p><strong>Created By:</strong> {product.createdBy?.name || "Unknown"}</p>
              <p>
                <strong>Date Added:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
