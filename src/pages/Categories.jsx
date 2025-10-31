import React, { useState } from 'react';
import { Gift, Star, Truck, Shield, Check } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Categories = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const scopes = [
    {
      id: 1,
      name: "سكوب مبتدئ",
      price: 199,
      description: "مجموعة مكونة من 2-3 منتجات مفاجأة",
      items: "2-3 منتجات",
      value: "قيمة تصل إلى 300 درهم",
      features: ["منتجات متنوعة", "مفاجأة سارة", "مناسبة للبداية"],
      popular: false
    },
    {
      id: 2,
      name: "سكوب متميز",
      price: 399,
      description: "مجموعة مكونة من 4-5 منتجات فاخرة", 
      items: "4-5 منتجات",
      value: "قيمة تصل إلى 600 درهم",
      features: ["منتجات فاخرة", "مفاجأة خاصة", "تشكيلة حصرية"],
      popular: true
    },
    {
      id: 3,
      name: "سكوب فاخر",
      price: 599,
      description: "مجموعة مكونة من 6+ منتجات راقية",
      items: "6+ منتجات",
      value: "قيمة تصل إلى 900 درهم", 
      features: ["منتجات راقية", "مفاجأة استثنائية", "تشكيلة نادرة"],
      popular: false
    }
  ];

  const handleOrder = async () => {
    if (!user) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    if (!selectedScope) {
      alert('يرجى اختيار سكوب');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        type: 'سكوب',
        scope: selectedScope.name,
        price: selectedScope.price,
        status: 'جديد',
        createdAt: serverTimestamp(),
        orderNumber: `SCOPE-${Date.now()}`
      };

      // حفظ الطلب في Firestore
      await addDoc(collection(db, 'orders'), orderData);
      
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('حدث خطأ في تقديم الطلب');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift size={40} className="text-white" />
            </div>
            <h1 className="font-arabic text-3xl text-gray-800 mb-4">🎉 تم طلب السكوب بنجاح!</h1>
            <p className="font-tajawal text-lg text-gray-600 mb-6">
              تم استلام طلبك للسكوب {selectedScope.name}. سنقوم بتحضير مفاجأة خاصة لك!
            </p>
            <div className="bg-yellow-100 border border-yellow-400 rounded-2xl p-6 mb-6">
              <h3 className="font-arabic font-bold text-gray-800 mb-2">معلومات الطلب:</h3>
              <p className="font-tajawal text-gray-700">السكوب: {selectedScope.name}</p>
              <p className="font-tajawal text-gray-700">السعر: {selectedScope.price} درهم</p>
              <p className="font-tajawal text-gray-700">رقم الطلب: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <button
              onClick={() => setOrderPlaced(false)}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-tajawal hover:bg-gray-700 transition-all duration-300"
            >
              طلب سكوب آخر
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="font-arabic text-4xl text-center text-gray-800 mb-2">
            📦 سكوب - صندوق المفاجآت
          </h1>
          <p className="font-tajawal text-lg text-center text-gray-600 mb-8">
            اختر سكوب واترك لنا مهمة إعداد مفاجأة خاصة لك!
          </p>

          {/* مزايا السكوب */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <Gift className="mx-auto mb-4 text-gray-800" size={32} />
              <h3 className="font-arabic font-bold text-gray-800 mb-2">مفاجأة حصرية</h3>
              <p className="font-tajawal text-gray-600">منتجات مختارة خصيصاً لك</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <Star className="mx-auto mb-4 text-gray-800" size={32} />
              <h3 className="font-arabic font-bold text-gray-800 mb-2">جودة مضمونة</h3>
              <p className="font-tajawal text-gray-600">أفضل المنتجات والأعلى تقييماً</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <Truck className="mx-auto mb-4 text-gray-800" size={32} />
              <h3 className="font-arabic font-bold text-gray-800 mb-2">توصيل سريع</h3>
              <p className="font-tajawal text-gray-600">شحن مجاني لجميع الطلبات</p>
            </div>
          </div>

          {/* خيارات السكوب */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scopes.map(scope => (
              <div
                key={scope.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedScope?.id === scope.id
                    ? 'border-gray-800 bg-gray-50'
                    : 'border-gray-200'
                } ${scope.popular ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => setSelectedScope(scope)}
              >
                {scope.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full font-tajawal text-sm">
                    الأكثر طلباً
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-arabic text-2xl font-bold text-gray-800 mb-2">
                    {scope.name}
                  </h3>
                  <p className="font-tajawal text-gray-600 mb-4">{scope.description}</p>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 rounded-lg">
                    <span className="font-arabic text-2xl font-bold">{scope.price}</span>
                    <span className="font-tajawal"> درهم</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-tajawal text-gray-600">عدد المنتجات:</span>
                    <span className="font-tajawal font-bold text-gray-800">{scope.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-tajawal text-gray-600">القيمة الإجمالية:</span>
                    <span className="font-tajawal font-bold text-gray-800">{scope.value}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {scope.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      <span className="font-tajawal text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* زر الطلب */}
          {selectedScope && (
            <div className="text-center mt-12">
              <button
                onClick={handleOrder}
                className="bg-gradient-to-l from-gray-700 to-gray-900 text-white px-12 py-4 rounded-2xl font-tajawal font-bold text-lg hover:opacity-90 transition-all duration-300"
              >
                {user ? `اطلب ${selectedScope.name}` : 'تسجيل الدخول أولاً'} - {selectedScope.price} درهم
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;