import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // السلايدر فيه صور المنتجات فقط - بدون أي إشهار
  const productSlides = [
    {
      image: "/images/producte1.jpg",
      name: "خاتم من الفولاذ",
      category: "خاتم "
    },
    {
      image: "/images/product2.jpg", 
      name: "",
      category: " "
    },
    {
      image: "/images/product3.jpg",
      name: "  ",
      category: ""
    },
    {
      image: "/images/product4.jpg",
      name: "  ",
      category: " "
    },
    {
      image: "/images/product5.jpg",
      name: "  ",
      category: " "
    },
    {
      image: "/images/product6.jpg",
      name: "  ",
      category: " "
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === productSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? productSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* المحتوى الرئيسي - في وسط الصفحة */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* مقدمة المشروع مع اللوقو */}
        <section className="mb-16">
          <div className="glass-card p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              
              {/* صورة اللوقو - جنب المقدمة */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="w-48 h-48 lg:w-64 lg:h-64 bg-white rounded-2xl shadow-2xl border border-gray-200 flex items-center justify-center p-4">
                  <img 
                    src="/images/logo.jpg" 
                    alt="Mystery by Ondalys" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
              
              {/* نص المقدمة */}
              <div className="lg:w-2/3 text-center lg:text-right">
                <h1 className="font-arabic text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  🎭 أهلاً بكم في MYSTERY BY ONDALYS
                </h1>
                <p className="font-tajawal text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
  <strong>مقدمة المشروع:</strong><br/>
  فضاء MYSTERY BY ONDALYS هو وجهتكم المميزة لتجربة التسوق الفريدة من نوعها! 
  نحن لا نبيع منتجات فقط، بل نصنع لحظات سعيدة من خلال صناديق الهدايا الغامضة (Scop). 
  اختر الموضوع الذي يناسب شخصيتك أو الشخص الذي تهديه، واترك لنا مهمة اختيار أفضل 
  الإكسسوارات والمنتجات التي ستجعله يبتسم. كل صندوق لغز جميل ينتظر من يكتشفه!
</p>
                <div className="flex flex-wrap justify-center lg:justify-end gap-4 mt-8">
                  <div className="bg-gray-800 text-white px-6 py-3 rounded-full font-tajawal">
                    🛍️ منتجات أصلية 100%
                  </div>
                  <div className="bg-gray-800 text-white px-6 py-3 rounded-full font-tajawal">
                    🚚 توصيل سريع
                  </div>
                  <div className="bg-gray-800 text-white px-6 py-3 rounded-full font-tajawal">
                    💎 جودة عالية
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* السلايدر الديناميكي - صور المنتجات فقط بدون إشهار */}
        <section className="mb-16">
          <div className="glass-card p-6">
            <h2 className="font-arabic text-3xl text-center text-gray-800 mb-8">
              🖼️ معرض منتجاتنا
            </h2>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative h-80 md:h-96">
                {productSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      {/* صورة المنتج */}
                      <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <span className="text-6xl">🌸</span>
                      </div>
                      
                      {/* معلومات المنتج */}
                      <div className="text-center">
                        <span className="font-tajawal text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-2 inline-block">
                          {slide.category}
                        </span>
                        <h3 className="font-arabic text-2xl md:text-3xl font-bold text-gray-800">
                          {slide.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* أزرار التنقل */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-gray-200"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-gray-200"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>

              {/* النقاط */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* مؤشر الصورة الحالية */}
            <div className="text-center mt-4">
              <span className="font-tajawal text-sm text-gray-600">
                {currentSlide + 1} / {productSlides.length}
              </span>
            </div>
          </div>
        </section>

        {/* معلومات بسيطة عن الخدمات */}
        <section>
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-arabic text-xl font-bold text-gray-800 mb-2">توصيل سريع</h3>
                <p className="font-tajawal text-gray-600">توصيل في جميع أنحاء المغرب</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-arabic text-xl font-bold text-gray-800 mb-2">جودة مضمونة</h3>
                <p className="font-tajawal text-gray-600">منتجات أصلية بجودة عالية</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-arabic text-xl font-bold text-gray-800 mb-2">دعم متواصل</h3>
                <p className="font-tajawal text-gray-600">فريق دعم لمساعدتكم</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;