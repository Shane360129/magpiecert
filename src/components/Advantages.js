import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const advantages = [
    {
        title: '客製化服務',
        description: '深入了解客戶的管理系統，根據不同需求與行業特性，提供個性化的驗證服務，提升稽核的附加價值。',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: '專業顧問',
        description: '擁有各領域專業且經驗豐富的顧問，同時能處理多項驗證服務，協助不同產業客戶獲得適合且有用的驗證，節省營運成本、提升企業競爭力。',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: '量身規劃時程',
        description: '輔導時程配合客戶的人力資源配置與作業需求，制定最適合的驗證進度計劃，為公司儘速獲得驗證，進行市場佈局。',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: '優質服務',
        description: '提供即時的諮詢與服務，縮短驗證時間，驗證完成後，提供持續的改進建議及支援，協助企業穩定運行。',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    },
];
const Advantages = () => {
    return (_jsx("section", { className: "py-24 bg-grid-pattern relative", children: _jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-12 h-1 bg-magpie-primary" }), _jsx("h2", { className: "text-4xl md:text-5xl font-bold text-magpie-primary tracking-wide", children: "\u6211\u5011\u7684\u512A\u52E2" })] }), _jsx("div", { className: "w-3 h-3 bg-magpie-accent rounded-full ml-16 mt-1 mb-4" }), _jsx("h3", { className: "text-2xl md:text-3xl font-bold text-magpie-primary mb-16 pl-16", children: "\u85CD\u9D72\u3000\u8B93\u5353\u8D8A\u6210\u70BA\u60A8\u7684\u6A19\u6E96" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10", children: advantages.map((item) => (_jsxs("div", { className: "flex flex-col items-center text-center group", children: [_jsx("div", { className: "w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow", children: _jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }) }), _jsx("h4", { className: "text-xl font-bold text-magpie-dark mb-3", children: item.title }), _jsx("p", { className: "text-gray-600 leading-relaxed text-sm", children: item.description })] }, item.title))) })] }) }));
};
export default Advantages;
