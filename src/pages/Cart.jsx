import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  arrayUnion 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // مراقبة حالة المستخدم وجلب عربة التسوق
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // جلب عربة التسوق من قاعدة البيانات عند تسجيل الدخول
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().cart) {
            setCartItems(userDoc.data().cart);
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        // إذا لم يكن مسجلاً، استخدم localStorage
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // حفظ عربة التسوق في قاعدة البيانات أو localStorage
  const saveCart = async (items) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          cart: items
        }, { merge: true });
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      await removeItem(id);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    await saveCart(updatedItems);
  };

  const removeItem = async (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    await saveCart(updatedItems);
  };

  const placeOrder = async () => {
    if (!user) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    if (cartItems.length === 0) {
      alert('السلة فارغة');
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: cartItems,
        total: total,
        status: 'جديد',
        createdAt: serverTimestamp(),
        orderNumber: `ORD-${Date.now()}`,
        type: 'عادي',
        shippingAddress: '',
        phone: ''
      };

      // حفظ الطلب في Firestore
      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      
      // تحديث بيانات المستخدم لإضافة الطلب
      await updateDoc(doc(db, 'users', user.uid), {
        orders: arrayUnion(orderRef.id),
        cart: [] // تفريغ عربة التسوق بعد الطلب
      });
      
      setOrderPlaced(true);
      setCartItems([]);
      localStorage.removeItem('cart'); // تنظيف localStorage
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('حدث خطأ في تقديم الطلب: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-white" />
            </div>
            <h1 className="font-arabic text-3xl text-gray-800 mb-4">🎉 تم تقديم الطلب بنجاح!</h1>
            <p className="font-tajawal text-lg text-gray-600 mb-6">
              تم استلام طلبك وسنتواصل معك قريباً لتأكيد التفاصيل
            </p>
            <div className="space-y-4">
              <Link
                to="/"
                className="block bg-gray-800 text-white px-8 py-3 rounded-lg font-tajawal hover:bg-gray-700 transition-all duration-300"
              >
                العودة للرئيسية
              </Link>
              <button
                onClick={() => setOrderPlaced(false)}
                className="text-gray-600 hover:text-gray-800 font-tajawal"
              >
                تقديم طلب جديد
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="font-arabic text-3xl text-center text-gray-800 mb-8 flex items-center justify-center">
            <ShoppingBag className="ml-2" />
            سلة التسوق
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="font-tajawal text-gray-600 text-lg mb-4">سلة التسوق فارغة</p>
              <Link
                to="/custom-order"
                className="bg-gradient-to-l from-gray-700 to-gray-900 text-white px-6 py-3 rounded-lg font-tajawal hover:opacity-90 transition-all duration-300"
              >
                ابدأ التسوق
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* عناصر السلة */}
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🌸</span>
                    </div>
                    <div>
                      <h3 className="font-arabic text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="font-tajawal font-bold text-gray-700">{item.price} درهم</p>
                      {item.selectedColor && (
                        <p className="font-tajawal text-sm text-gray-600">اللون: {item.selectedColor}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse">
                    {/* تعديل الكمية */}
                    <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                        disabled={loading}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-tajawal font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                        disabled={loading}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* السعر الإجمالي للعنصر */}
                    <p className="font-tajawal font-bold text-gray-800 w-20 text-left">
                      {item.price * item.quantity} درهم
                    </p>

                    {/* حذف العنصر */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={loading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* المجموع والدفع */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-tajawal text-lg text-gray-700">المجموع:</span>
                  <span className="font-arabic text-2xl font-bold text-gray-800">{total} درهم</span>
                </div>

                <div className="flex space-x-4 space-x-reverse">
                  <Link
                    to="/custom-order"
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-tajawal font-medium text-center hover:bg-gray-300 transition-all duration-300"
                  >
                    مواصلة التسوق
                  </Link>
                  <button 
                    onClick={placeOrder}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-l from-gray-700 to-gray-900 text-white py-3 rounded-lg font-tajawal font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'جاري معالجة الطلب...' : (user ? 'تأكيد الطلب' : 'تسجيل الدخول أولاً')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;