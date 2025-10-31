import React, { useState } from 'react';
import { Palette, Check, Star, ShoppingCart } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Offers = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const colors = [
    {
      name: "ذهبي",
      value: "gold",
      hex: "#FFD700",
      products: [
        { id: 1, name: "عطر MYSTERY الذهبي", price: 299, rating: 4.8, description: "عطر رجالي فاخر برائحة مميزة" },
        { id: 2, name: "علبة هدايا ذهبية", price: 199, rating: 4.6, description: "علبة هدايا فاخرة باللون الذهبي" }
      ]
    },
    {
      name: "فضي", 
      value: "silver",
      hex: "#C0C0C0",
      products: [
        { id: 3, name: "عطر ONDALYS الفضي", price: 349, rating: 4.9, description: "عطر نسائي أنيق برائحة زهرية" },
        { id: 4, name: "إكسسوارات فضية", price: 159, rating: 4.7, description: "مجموعة إكسسوارات باللون الفضي" }
      ]
    },
    {
      name: "أسود",
      value: "black", 
      hex: "#000000",
      products: [
        { id: 5, name: "عطر الغموض الأسود", price: 279, rating: 4.5, description: "عطر غامض وجذاب للرجال" },
        { id: 6, name: "مجموعة سوداء أنيقة", price: 399, rating: 4.8, description: "مجموعة متكاملة باللون الأسود" }
      ]
    },
    {
      name: "وردي",
      value: "pink",
      hex: "#FF69B4", 
      products: [
        { id: 7, name: "عطر الورد الملكي", price: 329, rating: 4.7, description: "عطر نسائي برائحة الورد الناعمة" },
        { id: 8, name: "مجموعة وردية", price: 229, rating: 4.4, description: "تشكيلة وردية أنيقة" }
      ]
    }
  ];

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
      return [...prev, { ...product, quantity: 1, color: selectedColor.name }];
    });
  };

  const removeFromCart = (id) => {
    setSelectedProducts(prev => prev.filter(item => item.id !== id));
  };

  const placeOrder = async () => {
    if (!user) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('لم تقم بإضافة أي منتجات');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        type: 'اختيار اللون',
        color: selectedColor.name,
        items: selectedProducts,
        total: total,
        status: 'جديد',
        createdAt: serverTimestamp(),
        orderNumber: `COLOR-${Date.now()}`
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      alert('تم تقديم الطلب بنجاح!');
      setSelectedProducts([]);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('حدث خطأ في تقديم الطلب');
    }
  };

  const total = selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="font-arabic text-4xl text-center text-gray-800 mb-2 flex items-center justify-center">
            <Palette className="ml-2" />
            اختيار اللون
          </h1>
          <p className="font-tajawal text-lg text-center text-gray-600 mb-8">
            اختر لونك المفضل واكتشف المنتجات المناسبة له
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* اختيار الألوان */}
            <div className="lg:col-span-2">
              <h2 className="font-arabic text-2xl text-gray-800 mb-6">اختر لونك المفضل</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
                {colors.map(color => (
                  <div
                    key={color.value}
                    className={`relative cursor-pointer rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 ${
                      selectedColor?.value === color.value
                        ? 'ring-4 ring-gray-800 shadow-2xl'
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className={`font-arabic font-bold text-xl ${
                      ['white', 'silver'].includes(color.value) ? 'text-gray-800' : 'text-white'
                    }`}>
                      {color.name}
                    </div>
                    {selectedColor?.value === color.value && (
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                        <Check size={20} className="text-green-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* منتجات اللون المختار */}
              {selectedColor && (
                <div>
                  <h3 className="font-arabic text-xl text-gray-800 mb-6">
                    منتجات {selectedColor.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedColor.products.map(product => (
                      <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-arabic font-bold text-gray-800 text-lg mb-2">{product.name}</h4>
                            <p className="font-tajawal text-gray-600 text-sm mb-2">{product.description}</p>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Star size={16} className="text-yellow-500 fill-current" />
                              <span className="font-tajawal text-sm text-gray-600">{product.rating}</span>
                            </div>
                          </div>
                          <span className="font-tajawal font-bold text-gray-700 text-lg">{product.price} درهم</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
                            style={{ backgroundColor: selectedColor.hex }}
                          ></div>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-tajawal text-sm hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2 space-x-reverse"
                          >
                            <ShoppingCart size={16} />
                            <span>إضافة</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* السلة */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                <h2 className="font-arabic text-xl text-gray-800 mb-4 flex items-center">
                  <ShoppingCart className="ml-2" />
                  المنتجات المختارة
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
                            <p className="font-tajawal text-xs text-gray-600">{item.color}</p>
                          </div>
                          <p className="font-tajawal font-bold text-gray-700">{item.price} درهم</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                            style={{ backgroundColor: colors.find(c => c.name === item.color)?.hex }}
                          ></div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="font-tajawal text-sm">الكمية: {item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              إزالة
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

                      <button 
                        onClick={placeOrder}
                        className="w-full bg-gradient-to-l from-gray-700 to-gray-900 text-white py-3 rounded-lg font-tajawal font-medium hover:opacity-90 transition-all duration-300"
                      >
                        {user ? 'تأكيد الطلب' : 'تسجيل الدخول أولاً'}
                      </button>
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

export default Offers;