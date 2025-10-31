import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // تسجيل الدخول
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      } else {
        // إنشاء حساب جديد
        if (formData.password !== formData.confirmPassword) {
          throw new Error('كلمات المرور غير متطابقة');
        }

        if (formData.password.length < 6) {
          throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        }

        // إنشاء المستخدم في Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );

        // حفظ بيانات المستخدم في Firestore (إذا كانت متاحة)
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: formData.name,
            email: formData.email,
            createdAt: serverTimestamp(),
            orders: [],
            cart: [],
            phone: '',
            address: ''
          });
        } catch (dbError) {
          console.log('تم إنشاء المستخدم ولكن لم يتم حفظ البيانات في Firestore');
        }

        navigate('/');
      }
    } catch (error) {
      setError(getErrorMessage(error.code || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    const errors = {
      'auth/invalid-email': 'البريد الإلكتروني غير صالح',
      'auth/user-disabled': 'هذا الحساب معطل',
      'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني',
      'auth/wrong-password': 'كلمة المرور غير صحيحة',
      'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل',
      'auth/weak-password': 'كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل',
      'auth/network-request-failed': 'خطأ في الشبكة، تحقق من اتصال الإنترنت',
      'auth/too-many-requests': 'محاولات تسجيل دخول كثيرة، حاول لاحقاً',
      'كلمات المرور غير متطابقة': 'كلمات المرور غير متطابقة',
      'كلمة المرور يجب أن تكون 6 أحرف على الأقل': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    };
    return errors[errorCode] || 'حدث خطأ غير متوقع، حاول مرة أخرى';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="glass-card p-8 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-l from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-white" />
          </div>
          <h1 className="font-arabic text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
          <p className="font-tajawal text-gray-600">
            {isLogin ? 'مرحباً بعودتك!' : 'انضم إلى عائلة Mystery by Ondalys'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 font-tajawal text-sm text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الاسم (للتسجيل فقط) */}
          {!isLogin && (
            <div>
              <label className="block font-tajawal text-gray-700 mb-2 text-right">
                الاسم الكامل
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-tajawal text-right placeholder-gray-400"
                placeholder="أدخل اسمك الكامل"
                disabled={loading}
              />
            </div>
          )}

          {/* البريد الإلكتروني */}
          <div>
            <label className="block font-tajawal text-gray-700 mb-2 text-right">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-tajawal text-right placeholder-gray-400"
                placeholder="example@email.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block font-tajawal text-gray-700 mb-2 text-right">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-tajawal text-right placeholder-gray-400"
                placeholder="••••••••"
                disabled={loading}
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* تأكيد كلمة المرور (للتسجيل فقط) */}
          {!isLogin && (
            <div>
              <label className="block font-tajawal text-gray-700 mb-2 text-right">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-tajawal text-right placeholder-gray-400"
                  placeholder="••••••••"
                  disabled={loading}
                  minLength="6"
                />
              </div>
            </div>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-l from-gray-700 to-gray-900 text-white py-3 rounded-lg font-tajawal font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </button>
        </form>

        {/* التبديل بين التسجيل والدخول */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="font-tajawal text-gray-600">
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="text-gray-800 font-medium hover:underline transition-all duration-300"
              disabled={loading}
            >
              {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>

        {/* رابط العودة للرئيسية */}
        <div className="text-center mt-4">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-800 font-tajawal text-sm transition-all duration-300"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;