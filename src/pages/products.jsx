import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const products = [
    {
      id: 1,
      name: "عطر MYSTERY الذهبي",
      price: 299,
      category: "عطور رجالية",
      image: "/images/product1.jpg",
      colors: ["ذهبي", "أسود", "فضي"],
      rating: 4.8
    },
    {
      id: 2,
      name: "عطر ONDALYS الفضي", 
      price: 349,
      category: "عطور نسائية",
      image: "/images/product2.jpg",
      colors: ["فضي", "وردي", "أبيض"],
      rating: 4.9
    },
    {
      id: 3,
      name: "مجموعة العطور الفاخرة",
      price: 599,
      category: "مجموعات",
      image: "/images/product3.jpg",
      colors: ["متنوع"],
      rating: 4.7
    },
    {
      id: 4,
      name: "عطر الغموض الأسود",
      price: 279,
      category: "عطور رجالية", 
      image: "/images/product4.jpg",
      colors: ["أسود", "رمادي"],
      rating: 4.6
    },
    {
      id: 5,
      name: "عطر الورد الملكي",
      price: 329,
      category: "عطور نسائية",
      image: "/images/product5.jpg", 
      colors: ["وردي", "أبيض", "ذهبي"],
      rating: 4.7
    },
    {
      id: 6,
      name: "عطر الأخشاب النادرة",
      price: 379,
      category: "عطور رجالية",
      image: "/images/product6.jpg",
      colors: ["بني", "أسود", "ذهبي"],
      rating: 4.5
    }
  ];

  const categories = ['all', 'عطور رجالية', 'عطور نسائية', 'مجموعات'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setSelectedProducts(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: product.colors[0] }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setSelectedProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setSelectedProducts(prev => prev.filter(item => item.id !== id));
  };

  const updateColor = (id, color) => {
    setSelectedProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(selectedProducts));
    alert('تم حفظ المنتجات في السلة!');
  };

  const total = selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="font-arabic text-4xl text-center text-gray-800 mb-2">
            🛍️ طلب اختياري
          </h1>
          <p className="font-tajawal text-lg text-center text-gray-600 mb-8">
            اختر المنتجات التي تريدها وكمياتها
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* قائمة المنتجات */}
            <div className="lg:col-span-2">
              {/* تصفية حسب الفئة */}
              <div className="flex space-x-3 space-x-reverse mb-6 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-tajawal whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category === 'all' ? 'جميع المنتجات' : category}
                  </button>
                ))}
              </div>

              {/* شبكة المنتجات */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🌸</span>
                      </div>
                      <div className="flex-1">
                        <span className="font-tajawal text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <h3 className="font-arabic text-lg font-bold text-gray-800 mt-2 mb-1">
                          {product.name}
                        </h3>
                        
                        {/* التقييم */}
                        <div className="flex items-center space-x-1 space-x-reverse mb-2">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="font-tajawal text-sm text-gray-600">{product.rating}</span>
                        </div>
                        
                        <p className="font-tajawal font-bold text-gray-700 text-lg mb-3">
                          {product.price} درهم
                        </p>
                        
                        {/* ألوان متاحة */}
                        <div className="flex space-x-2 space-x-reverse mb-3">
                          {product.colors.map(color => (
                            <span
                              key={color}
                              className="font-tajawal text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                            >
                              {color}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-gray-800 text-white py-2 rounded-lg font-tajawal text-sm hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                        >
                          <Plus size={16} />
                          <span>إضافة للطلب</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الطلب الحالي */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                <h2 className="font-arabic text-2xl text-gray-800 mb-4 flex items-center">
                  <ShoppingCart className="ml-2" />
                  طلبك الحالي
                </h2>

                {selectedProducts.length === 0 ? (
                  <p className="font-tajawal text-gray-500 text-center py-8">
                    لم تقم بإضافة أي منتجات بعد
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedProducts.map(item => (
                      <div key={item.id} className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-arabic font-bold text-gray-800 text-sm">{item.name}</h4>
                            <p className="font-tajawal text-xs text-gray-600">{item.selectedColor}</p>
                          </div>
                          <p className="font-tajawal font-bold text-gray-700">{item.price} درهم</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          {/* اختيار اللون */}
                          <select
                            value={item.selectedColor}
                            onChange={(e) => updateColor(item.id, e.target.value)}
                            className="font-tajawal text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            {item.colors.map(color => (
                              <option key={color} value={color}>{color}</option>
                            ))}
                          </select>

                          {/* تعديل الكمية */}
                          <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-tajawal font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* المجموع */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-tajawal text-lg text-gray-700">المجموع:</span>
                        <span className="font-arabic text-xl font-bold text-gray-800">{total} درهم</span>
                      </div>

                      <div className="space-y-3">
                        <button 
                          onClick={saveCartToStorage}
                          className="w-full bg-gray-600 text-white py-3 rounded-lg font-tajawal font-medium hover:bg-gray-700 transition-all duration-300"
                        >
                          حفظ الطلب
                        </button>
                        <button className="w-full bg-gradient-to-l from-gray-700 to-gray-900 text-white py-3 rounded-lg font-tajawal font-medium hover:opacity-90 transition-all duration-300">
                          {user ? 'تأكيد الطلب' : 'تسجيل الدخول أولاً'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;