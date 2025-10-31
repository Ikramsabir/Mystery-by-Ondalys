import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search, Phone, Instagram } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: 'الرئيسية', emoji: '🏠', path: '/' },
    { name: 'طلب اختياري',emoji: '🛍️', path: '/products' },
    { name: 'سكوب ', emoji: '📦', path: '/categories' },
    { name:' اختيار اللون', emoji: '🎯', path: '/offers' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-2xl' 
        : 'bg-gradient-to-b from-white/95 to-gray-100/50'
    }`}>
      
      {/* الشريط العلوي - تم تحسين الهوامش */}
      <div className="bg-gray-800 text-white text-sm py-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Phone size={14} />
                <span className="text-xs">+212 6XX-XXX-XXX</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1 space-x-reverse">
                <Instagram size={14} />
                <span className="text-xs">@mystery_ondalys</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* النافبار الرئيسي - تم تقليل الارتفاع */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* اللوقو مع الصورة الجديدة */}
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className={`transition-all duration-500 ${
              scrolled ? 'scale-85' : 'scale-100'
            }`}>
              <Link to="/" className="flex items-center space-x-3 space-x-reverse">
                {/* الصورة الجديدة - تم تصغيرها قليلاً */}
                <img 
                  src="/images/logo.jpg" 
                  alt="Mystery by Ondalys" 
                  className="w-12 h-12 object-contain rounded-lg shadow-md border border-gray-200"
                />
                {/* الاسم الإنجليزي فقط - بدون الجملة العربية */}
                <span className="font-sans text-base font-bold text-gray-800 tracking-tight">
                  MYSTERY BY ONDALYS
                </span>
              </Link>
            </div>

            {/* القائمة لوسط - كبيرة الشاشات */}
            <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActiveLink(item.path) 
                      ? 'bg-gray-800/20 scale-105 border border-gray-800/30 shadow-lg' 
                      : 'hover:bg-gray-800/10'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className={`font-tajawal font-medium text-base ${
                    isActiveLink(item.path) 
                      ? 'text-gray-800 font-bold' 
                      : 'text-gray-700 group-hover:text-gray-800'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* الأيقونات - يمين */}
          <div className="flex items-center space-x-3 space-x-reverse">
            
            {/* البحث */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-2xl bg-white/80 shadow-lg hover:bg-gray-800/10 hover:scale-110 transition-all duration-300 group"
              >
                <Search size={18} className="text-gray-800 group-hover:scale-110 transition-transform" />
              </button>
              
              {searchOpen && (
                <div className="absolute left-0 top-12 bg-white rounded-2xl shadow-2xl p-3 min-w-72 animate-float">
                  <input
                    type="text"
                    placeholder="🔍 ابحث عن المنتجات..."
                    className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 font-tajawal text-right text-sm"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* الحساب */}
            <Link to="/login">
              <button className="hidden md:flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-2xl bg-gradient-to-l from-gray-700 to-gray-900 text-white shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 group">
                <User size={16} className="group-hover:scale-110 transition-transform" />
                <span className="font-tajawal font-medium text-sm">حسابي</span>
              </button>
            </Link>

            {/* السلة */}
            <Link to="/cart">
              <button className="relative p-2 rounded-2xl bg-white/80 shadow-lg hover:bg-gray-800/10 hover:scale-110 transition-all duration-300 group">
                <ShoppingBag size={20} className="text-gray-800 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-lg animate-pulse">
                  3
                </span>
              </button>
            </Link>

            {/* زر المنيو للموبايل */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-2xl bg-white/80 shadow-lg hover:bg-gray-800/10 hover:scale-110 transition-all duration-300"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* المنيو للموبايل */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-200/50 animate-float">
          <div className="p-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 space-x-reverse p-3 rounded-2xl transition-all duration-300 border ${
                  isActiveLink(item.path)
                    ? 'bg-gray-800/20 border-gray-800/30 shadow-lg'
                    : 'bg-white/50 border-gray-200/30 hover:bg-gray-800/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className={`font-tajawal font-medium text-base flex-1 ${
                  isActiveLink(item.path) ? 'text-gray-800 font-bold' : 'text-gray-700'
                }`}>
                  {item.name}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  isActiveLink(item.path) ? 'bg-gray-800' : 'bg-gray-400'
                }`}></div>
              </Link>
            ))}
            
            {/* زر الحساب للموبايل */}
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full flex items-center justify-center space-x-2 space-x-reverse p-3 rounded-2xl bg-gradient-to-l from-gray-700 to-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all duration-300 mt-3">
                <User size={18} />
                <span className="font-tajawal font-medium text-sm">تسجيل الدخول</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;