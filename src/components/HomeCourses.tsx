import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coursesApi } from '../services/api';

interface Course {
  id: string;
  title: string;
  date?: string;
  startDate?: string;
  createdAt?: string;
}

const HomeCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    coursesApi.getAll()
      .then((items) => {
        const sorted = items
          .filter((c: any) => c.status !== '草稿')
          .sort((a: any, b: any) => {
            const dateA = a.startDate || a.date || a.createdAt || '';
            const dateB = b.startDate || b.date || b.createdAt || '';
            return dateB.localeCompare(dateA);
          })
          .slice(0, 5);
        setCourses(sorted);
      })
      .catch(() => {});
  }, []);

  const formatDate = (course: Course) => {
    const raw = course.startDate || course.date || course.createdAt || '';
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="py-24 bg-grid-pattern relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-5xl md:text-7xl font-bold text-magpie-primary text-center mb-2 tracking-wide">
          課程講座
        </h2>
        <div className="flex justify-center mb-16">
          <div className="w-3 h-3 bg-magpie-accent rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Description + Image */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-magpie-primary mb-4">
              稽核與教育訓練
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              我們提供農產品驗證、安全管理及ESG相關系統的稽核課程。亦提供主導查證員教育訓練。
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600"
                alt="教育訓練課程"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right: Activity List */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-magpie-primary mb-6 border-b-2 border-magpie-primary inline-block pb-2">
              最新活動
            </h3>
            <div className="divide-y divide-gray-200">
              {courses.length === 0 ? (
                <p className="text-gray-400 py-5">目前尚無課程資料</p>
              ) : (
                courses.map((item) => (
                  <Link
                    key={item.id}
                    to="/education"
                    className="flex items-center justify-between py-5 hover:bg-gray-50 transition-colors group px-2"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-magpie-primary font-bold text-sm whitespace-nowrap">{formatDate(item)}</span>
                      <span className="text-gray-800 group-hover:text-magpie-primary transition-colors">{item.title}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-magpie-primary shrink-0" />
                  </Link>
                ))
              )}
            </div>

            <div className="mt-8">
              <Link
                to="/education"
                className="inline-flex items-center gap-4 px-10 py-4 bg-magpie-primary hover:bg-magpie-hover text-white font-bold text-lg tracking-wider shadow-lg transition-transform hover:-translate-y-1"
              >
                DISCOVER MORE
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
