import { useState, useEffect, useRef } from "react";
import {
  MapPin, Search, X, Send, Star, Heart, Navigation,
  ChevronRight, Menu, Calendar, DollarSign, ArrowRight,
  Download, Share2, Globe, Compass, Users, Clock, Hotel,
  Utensils, Info, LogIn, LogOut, Mountain, Bot, Phone,
  Mail, Sparkles, Filter, Map as MapIcon
} from "lucide-react";

type Page = "home" | "explore" | "provinces" | "planner" | "map" | "about" | "login";

// ─── Images ──────────────────────────────────────────────────────────────────

const IMG = {
  hero: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=1920&h=1080&fit=crop&auto=format",
  valley: "https://images.unsplash.com/photo-1636513988093-126e51dee32d?w=900&h=600&fit=crop&auto=format",
  village: "https://images.unsplash.com/photo-1718179634911-8551f8b0cccf?w=900&h=600&fit=crop&auto=format",
  temple: "https://images.unsplash.com/photo-1507743617593-0a422c9bb7f5?w=900&h=600&fit=crop&auto=format",
  temple2: "https://images.unsplash.com/photo-1648298470994-7065f521375c?w=900&h=600&fit=crop&auto=format",
  pokhara: "https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?w=900&h=600&fit=crop&auto=format",
  festival: "https://images.unsplash.com/photo-1622598661631-3a46559a4817?w=900&h=600&fit=crop&auto=format",
  culture: "https://images.unsplash.com/photo-1726326477267-f36f1740ad8e?w=900&h=600&fit=crop&auto=format",
  mountains: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=1200&h=800&fit=crop&auto=format",
  women: "https://images.unsplash.com/photo-1763733593683-1b296c5fc039?w=900&h=600&fit=crop&auto=format",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROVINCES = [
  {
    id: 1, name: "Koshi", nepali: "कोशी", capital: "Biratnagar",
    color: "#1B5E3B", light: "#E8F5EE", img: IMG.valley,
    highlights: ["Mt. Kanchenjunga", "Ilam Tea Gardens", "Makalu Base Camp"],
    description: "Eastern gateway to the Himalayas — home to lush tea estates, thundering rivers, and the mighty Kanchenjunga massif, third-highest peak in the world.",
    categories: ["🥾 Trekking", "🌿 Nature", "🦁 Wildlife", "🍵 Tea Culture"],
    topDest: ["Kanchenjunga Conservation Area", "Ilam Tea Estate", "Pathivara Temple", "Taplejung Valley"],
    bestSeason: "Oct–Nov, Mar–May", budget: "$25–60/day",
  },
  {
    id: 2, name: "Madhesh", nepali: "मधेश", capital: "Janakpur",
    color: "#8B1A1A", light: "#FDF0F0", img: IMG.temple2,
    highlights: ["Janaki Mandir", "Parsa Wildlife Reserve", "Simraungarh Ruins"],
    description: "The Terai heartland — birthplace of Goddess Sita and cradle of Maithili culture, with magnificent temples and rare wildlife sanctuaries in the flatlands.",
    categories: ["🛕 Religious", "🏛️ Historical", "🦁 Wildlife", "🎭 Culture"],
    topDest: ["Janaki Mandir", "Parsa National Park", "Simraungarh Ruins", "Bihari Mandir"],
    bestSeason: "Oct–Feb", budget: "$15–40/day",
  },
  {
    id: 3, name: "Bagmati", nepali: "बागमती", capital: "Hetauda",
    color: "#4A1573", light: "#F3E8FF", img: IMG.temple,
    highlights: ["Kathmandu Valley", "Pashupatinath", "Chitwan National Park"],
    description: "Nepal's cultural capital — encompassing seven UNESCO World Heritage Sites, ancient palace squares, and the famous Chitwan National Park.",
    categories: ["🛕 Religious", "🏛️ Historical", "🌿 Nature", "🦁 Wildlife"],
    topDest: ["Pashupatinath Temple", "Boudhanath Stupa", "Chitwan National Park", "Bhaktapur Durbar Square"],
    bestSeason: "Oct–May", budget: "$30–80/day",
  },
  {
    id: 4, name: "Gandaki", nepali: "गण्डकी", capital: "Pokhara",
    color: "#0D47A1", light: "#E3F2FD", img: IMG.pokhara,
    highlights: ["Annapurna Circuit", "Phewa Lake", "Upper Mustang"],
    description: "Nepal's adventure capital — home to the iconic Annapurna range, the serenely beautiful Phewa Lake, and the mystical ancient Kingdom of Mustang.",
    categories: ["🥾 Trekking", "🏔️ Adventure", "🛕 Religious", "🌊 Lakes"],
    topDest: ["Annapurna Base Camp", "Phewa Lake Pokhara", "Muktinath Temple", "Upper Mustang Trek"],
    bestSeason: "Oct–Nov, Mar–May", budget: "$35–120/day",
  },
  {
    id: 5, name: "Lumbini", nepali: "लुम्बिनी", capital: "Deukhuri",
    color: "#D4861A", light: "#FFF8E1", img: IMG.culture,
    highlights: ["Lumbini Sacred Garden", "Tansen Hill Town", "Palpa Rani Mahal"],
    description: "Sacred birthplace of Siddhartha Gautama — the UNESCO World Heritage Site of Lumbini draws pilgrims from across the world to the land where the Buddha was born.",
    categories: ["🛕 Religious", "🏛️ Historical", "☮️ Spiritual", "🎨 Culture"],
    topDest: ["Lumbini Maya Devi Temple", "Tansen Durbar Square", "Palpa Rani Mahal", "Tilaurakot"],
    bestSeason: "Oct–Mar", budget: "$20–50/day",
  },
  {
    id: 6, name: "Karnali", nepali: "कर्णाली", capital: "Birendranagar",
    color: "#1B5E20", light: "#E8F5E9", img: IMG.village,
    highlights: ["Rara Lake", "Dolpo Region", "Shey-Phoksundo Lake"],
    description: "Nepal's wildest province — harboring the pristine alpine Rara Lake, the ancient Dolpo region immortalized in literature, and vast untouched Himalayan wilderness.",
    categories: ["🥾 Trekking", "🌿 Nature", "🏔️ Adventure", "🦁 Wildlife"],
    topDest: ["Rara National Park", "Shey Phoksundo Lake", "Dolpo Restricted Area", "Jumla"],
    bestSeason: "Apr–Jun, Sep–Nov", budget: "$40–100/day",
  },
  {
    id: 7, name: "Sudurpashchim", nepali: "सुदूरपश्चिम", capital: "Dhangadhi",
    color: "#4E342E", light: "#EFEBE9", img: IMG.mountains,
    highlights: ["Api Himal Trek", "Shuklaphanta Wildlife Reserve", "Khaptad National Park"],
    description: "Nepal's undiscovered frontier — featuring the towering Api Himal, the rhino-rich Shuklaphanta reserve, and unique Tharu and Rana Tharu cultural traditions.",
    categories: ["🥾 Trekking", "🌿 Nature", "🦁 Wildlife", "🏔️ Adventure"],
    topDest: ["Api Himal Base Camp", "Shuklaphanta National Park", "Khaptad National Park", "Chhangru Village"],
    bestSeason: "Oct–Nov, Apr–May", budget: "$25–55/day",
  },
];

const DESTINATIONS = [
  { id: 1, name: "Everest Base Camp", province: "Koshi", category: "Hiking", rating: 5.0, budget: "$800–1,500", season: "Mar–May, Sep–Nov", img: IMG.valley, desc: "The ultimate trekking dream — journey through Sherpa villages, glacial moraines, and Buddhist monasteries to the foot of the world's highest peak at 5,364m." },
  { id: 2, name: "Pashupatinath Temple", province: "Bagmati", category: "Religious", rating: 4.9, budget: "$5–20", season: "Year-round", img: IMG.temple, desc: "One of the most sacred Hindu shrines on earth — this UNESCO-listed golden pagoda on the Bagmati river draws pilgrims from across South Asia at dawn and dusk." },
  { id: 3, name: "Phewa Lake, Pokhara", province: "Gandaki", category: "Nature", rating: 4.8, budget: "$30–80", season: "Oct–May", img: IMG.pokhara, desc: "Nepal's most beloved lake reflects the entire Annapurna range in its tranquil surface. Rent a wooden boat, visit Barahi Temple island, or sip coffee at lakeside." },
  { id: 4, name: "Boudhanath Stupa", province: "Bagmati", category: "Religious", rating: 4.8, budget: "$5–15", season: "Year-round", img: IMG.temple2, desc: "One of the largest spherical stupas in the world — a UNESCO Heritage Site and living center of Tibetan Buddhism where monks chant at dawn and butter lamps glow at dusk." },
  { id: 5, name: "Lumbini Sacred Garden", province: "Lumbini", category: "Religious", rating: 4.7, budget: "$10–30", season: "Oct–Mar", img: IMG.culture, desc: "Birthplace of Siddhartha Gautama — a serene UNESCO World Heritage Site with the Maya Devi Temple, Ashoka pillar, and monasteries from over 30 countries." },
  { id: 6, name: "Rara Lake", province: "Karnali", category: "Nature", rating: 4.9, budget: "$200–600", season: "Apr–Nov", img: IMG.village, desc: "Nepal's largest and most pristine alpine lake — a shimmering turquoise gem in a remote Himalayan basin, one of Asia's last truly wild and untouched places." },
  { id: 7, name: "Annapurna Base Camp", province: "Gandaki", category: "Hiking", rating: 4.8, budget: "$400–900", season: "Mar–May, Oct–Nov", img: IMG.mountains, desc: "A circular trek through breathtaking diversity — from subtropical forests and terraced farms to the dramatic high alpine sanctuary ringed by towering 7,000m+ peaks." },
  { id: 8, name: "Janaki Mandir", province: "Madhesh", category: "Religious", rating: 4.6, budget: "$5–20", season: "Oct–Mar", img: IMG.festival, desc: "A magnificent white marble temple dedicated to Goddess Sita, the legendary queen of Janakpur — one of Hinduism's most revered pilgrimage sites in the Terai." },
];

const FESTIVALS = [
  { name: "Dashain", date: "Oct 2–12, 2025", province: "All Nepal", desc: "Nepal's biggest festival celebrating Durga's victory over evil. Families reunite, kites soar, elders give tika blessings, and the whole country celebrates.", img: IMG.culture },
  { name: "Tihar / Diwali", date: "Oct 20–24, 2025", province: "All Nepal", desc: "Festival of lights where oil lamps illuminate every home, crows and dogs are worshipped, and sisters perform the Bhai Tika ceremony to bless their brothers.", img: IMG.festival },
  { name: "Indra Jatra", date: "Sep 4–12, 2025", province: "Kathmandu", desc: "Ancient chariot festival celebrating the rain god Indra. The living goddess Kumari is carried in a golden chariot through Kathmandu's old city streets.", img: IMG.temple2 },
  { name: "Buddha Jayanti", date: "May 12, 2026", province: "Lumbini & Kathmandu", desc: "The Buddha's birthday — marked by candlelit processions, meditation retreats, and sacred prayers at Lumbini, Boudhanath, and monasteries across Nepal.", img: IMG.women },
];

const BOT_STEPS = [
  {
    q: "Namaste! 🙏 I am your Nepal travel guide. What kind of journey are you dreaming of?",
    opts: [
      { label: "🥾 Hiking & Trekking", v: "hiking" },
      { label: "🛕 Religious & Spiritual", v: "religious" },
      { label: "🏛️ Cultural & Historical", v: "cultural" },
      { label: "🌿 Nature & Wildlife", v: "nature" },
      { label: "💑 Romantic Getaway", v: "romantic" },
      { label: "👨‍👩‍👧 Family Adventure", v: "family" },
    ],
  },
  {
    q: "How many days do you have for Nepal?",
    opts: [
      { label: "🗓️ 1–3 Days (Quick trip)", v: "1-3" },
      { label: "📅 4–7 Days (Short getaway)", v: "4-7" },
      { label: "🏕️ 8–14 Days (Full experience)", v: "8-14" },
      { label: "🌟 15+ Days (Deep immersion)", v: "15+" },
    ],
  },
  {
    q: "What is your approximate budget per person per day?",
    opts: [
      { label: "💚 Budget (Under $30)", v: "budget" },
      { label: "💛 Moderate ($30–80)", v: "moderate" },
      { label: "🧡 Comfort ($80–150)", v: "comfort" },
      { label: "❤️ Luxury ($150+)", v: "luxury" },
    ],
  },
  {
    q: "Who are you travelling with?",
    opts: [
      { label: "🧍 Solo Explorer", v: "solo" },
      { label: "💑 With Partner", v: "couple" },
      { label: "👥 Group of Friends", v: "group" },
      { label: "👨‍👩‍👧‍👦 Family with Kids", v: "family" },
    ],
  },
];

const getRecs = (style: string) => {
  const map: Record<string, typeof DESTINATIONS> = {
    hiking: DESTINATIONS.filter(d => d.category === "Hiking"),
    religious: DESTINATIONS.filter(d => d.category === "Religious"),
    cultural: [DESTINATIONS[1], DESTINATIONS[3], DESTINATIONS[7]],
    nature: DESTINATIONS.filter(d => d.category === "Nature"),
    romantic: [DESTINATIONS[2], DESTINATIONS[5], DESTINATIONS[4]],
    family: [DESTINATIONS[1], DESTINATIONS[2], DESTINATIONS[4]],
  };
  return (map[style] || DESTINATIONS.slice(0, 3)).slice(0, 3);
};

// ─── Topo Background ──────────────────────────────────────────────────────────

function TopoBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(74,142,196,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(45,106,79,0.05) 0%, transparent 50%)" }} />
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.04]" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path d="M0,300 L0,160 L80,110 L160,145 L240,75 L320,120 L400,55 L480,100 L560,35 L640,85 L720,18 L800,70 L880,42 L960,95 L1040,50 L1120,80 L1200,32 L1280,62 L1360,40 L1440,68 L1440,300 Z" fill="#1A2B3C" />
        <path d="M0,300 L0,210 L120,178 L200,195 L300,158 L380,178 L460,148 L540,165 L620,138 L700,158 L780,128 L860,148 L940,132 L1020,152 L1100,138 L1180,155 L1260,142 L1360,158 L1440,148 L1440,300 Z" fill="#2D5A8E" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-96 h-96 opacity-[0.035]" viewBox="0 0 200 200">
        {[30, 50, 70, 90, 110, 130].map((r, i) => (
          <ellipse key={i} cx="100" cy="100" rx={r} ry={r * 0.58} fill="none" stroke="#1A2B3C" strokeWidth="1" />
        ))}
      </svg>
      <svg className="absolute bottom-40 left-10 w-64 h-64 opacity-[0.025]" viewBox="0 0 200 200">
        {[20, 40, 60, 80, 100].map((r, i) => (
          <ellipse key={i} cx="100" cy="100" rx={r} ry={r * 0.65} fill="none" stroke="#2D6A4F" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

// ─── Search Bot ───────────────────────────────────────────────────────────────

function SearchBot({ onClose, onNavigate }: { onClose: () => void; onNavigate: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ type: "bot" | "user"; text: string }[]>([
    { type: "bot", text: BOT_STEPS[0].q },
  ]);
  const [done, setDone] = useState(false);
  const [recs, setRecs] = useState<typeof DESTINATIONS>([]);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages]);

  const handleOpt = (label: string, value: string) => {
    const newAnswers = [...answers, value];
    const newMsgs: typeof messages = [...messages, { type: "user", text: label }];
    if (step < BOT_STEPS.length - 1) {
      setStep(step + 1);
      setAnswers(newAnswers);
      setMessages([...newMsgs, { type: "bot", text: "..." }]);
      setTimeout(() => setMessages([...newMsgs, { type: "bot", text: BOT_STEPS[step + 1].q }]), 500);
    } else {
      setAnswers(newAnswers);
      const suggestions = getRecs(newAnswers[0]);
      setRecs(suggestions);
      setMessages([...newMsgs, { type: "bot", text: "Perfect! Based on your preferences, here are my top picks for you in Nepal! 🏔️ Tap a card to explore." }]);
      setTimeout(() => setDone(true), 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,18,28,0.75)", backdropFilter: "blur(8px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: "88vh" }}>
        <div className="flex items-center gap-3 p-5 flex-shrink-0" style={{ background: "linear-gradient(135deg, #1B3A2D 0%, #0D2B4A 100%)", borderRadius: "1.5rem 1.5rem 0 0" }}>
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Nepal Travel Guide</div>
            <div className="text-white/60 text-xs">AI-Powered Trip Assistant · Always available</div>
          </div>
          <button onClick={onClose} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div ref={msgRef} className="flex flex-col gap-4 p-5 overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              {msg.type === "bot" && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-800 leading-relaxed border border-gray-100">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.type === "user" && (
                <div className="rounded-2xl rounded-tr-none px-4 py-3 text-sm text-white max-w-[85%]" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {!done ? (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0" style={{ borderRadius: "0 0 1.5rem 1.5rem" }}>
            <div className="text-xs text-gray-400 mb-2 font-medium">Choose an option:</div>
            <div className="grid grid-cols-2 gap-2">
              {BOT_STEPS[step]?.opts.map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => handleOpt(opt.label, opt.v)}
                  className="text-left text-sm px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[#1B3A2D] hover:bg-[#EBF5EE] transition-all font-medium text-gray-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 border-t border-gray-100 flex-shrink-0" style={{ borderRadius: "0 0 1.5rem 1.5rem" }}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">🎯 Recommended for You</div>
            <div className="flex flex-col gap-2 mb-4">
              {recs.map((dest) => (
                <div key={dest.id} onClick={() => { onNavigate("explore"); onClose(); }} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                  <img src={dest.img} alt={dest.name} className="w-14 h-14 rounded-xl object-cover bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                    <div className="text-xs text-gray-400">{dest.province} · {dest.category}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-600">{dest.rating} · {dest.budget}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { onNavigate("explore"); onClose(); }} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
                Explore All
              </button>
              <button onClick={() => { onNavigate("planner"); onClose(); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 border-gray-200 hover:bg-gray-50 text-gray-700">
                Plan My Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ currentPage, onNavigate, onSearchOpen }: { currentPage: Page; onNavigate: (p: Page) => void; onSearchOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Explore", page: "explore" },
    { label: "Provinces", page: "provinces" },
    { label: "AI Planner", page: "planner" },
    { label: "Map", page: "map" },
    { label: "About", page: "about" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(22,48,36,0.97)" : "rgba(22,48,36,0.90)",
        backdropFilter: "blur(18px)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-4">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
            <Mountain size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>पाइला</div>
            <div className="text-white/50 text-[9px] tracking-[0.2em] uppercase">Paila · Nepal</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className="px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200"
              style={{
                fontFamily: "'Caveat', cursive",
                color: currentPage === link.page ? "#ffffff" : "rgba(255,255,255,0.65)",
                background: currentPage === link.page ? "rgba(255,255,255,0.14)" : "transparent",
              }}
              onMouseEnter={e => { if (currentPage !== link.page) (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if (currentPage !== link.page) { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; } }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button onClick={onSearchOpen} className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
            <Search size={17} />
            <span style={{ fontFamily: "'Caveat', cursive" }} className="font-bold text-base">Search</span>
          </button>
          <button onClick={() => onNavigate("login")} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)", color: "white" }}>
            <LogIn size={15} />
            <span className="hidden sm:block">Login</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <button key={link.page} onClick={() => { onNavigate(link.page); setMenuOpen(false); }} className="text-left px-4 py-3 rounded-xl font-bold text-2xl transition-all" style={{ fontFamily: "'Caveat', cursive", color: currentPage === link.page ? "white" : "rgba(255,255,255,0.65)", background: currentPage === link.page ? "rgba(255,255,255,0.12)" : "transparent" }}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onNavigate, onSearchOpen }: { onNavigate: (p: Page) => void; onSearchOpen: () => void }) {
  const [saved, setSaved] = useState<number[]>([]);
  const toggleSave = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100vh", backgroundImage: `url(${IMG.hero})`, backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,18,30,0.60) 0%, rgba(8,18,30,0.30) 50%, #F7F4ED 100%)" }} />

        {/* Floating foreground images — smaller than viewport, bg visible around edges */}
        <div className="absolute inset-x-0 bottom-36 flex justify-between items-end px-10 pointer-events-none">
          <div className="w-40 h-52 rounded-2xl overflow-hidden shadow-2xl opacity-90 bg-gray-400" style={{ transform: "rotate(-4deg) translateY(-20px)" }}>
            <img src={IMG.temple} alt="Pashupatinath Temple" className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block w-48 h-60 rounded-2xl overflow-hidden shadow-2xl opacity-85 bg-gray-400" style={{ transform: "rotate(3deg) translateY(-10px)" }}>
            <img src={IMG.pokhara} alt="Phewa Lake" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ background: "rgba(168,32,13,0.85)", color: "white" }}>
            <MapPin size={12} /> Discover Nepal — 7 Provinces · 200+ Destinations
          </div>
          <h1 className="font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 6vw, 5.2rem)", lineHeight: 1.12, textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
            Every Step is a<br />
            <span style={{ color: "#FFD08A" }}>Sacred Journey</span>
          </h1>
          <p className="text-white/85 text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
            From the roof of the world to ancient temple valleys — Nepal awaits your footsteps.
          </p>

          <button onClick={onSearchOpen} className="flex items-center gap-4 w-full max-w-xl mx-auto px-5 py-4 rounded-2xl shadow-2xl text-left transition-all hover:scale-[1.02] active:scale-100 bg-white" style={{ backdropFilter: "blur(20px)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-gray-400 text-xs">Click to start your journey...</div>
              <div className="text-gray-800 font-bold text-sm">Tell me what you are looking for in Nepal</div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
              <Search size={15} className="text-white" />
            </div>
          </button>

          <div className="flex items-center justify-center gap-10 mt-10">
            {[{ val: "7", label: "Provinces" }, { val: "200+", label: "Destinations" }, { val: "8", label: "World Records" }, { val: "125+", label: "Ethnic Groups" }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                <div className="text-white/55 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Categories ── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="font-bold text-center text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Explore by Experience</h2>
        <p className="text-center text-gray-500 mb-10">Find exactly the adventure that speaks to your soul</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { icon: "🥾", label: "Hiking", color: "#1B5E3B" },
            { icon: "🛕", label: "Religious", color: "#8B1A1A" },
            { icon: "🏛️", label: "Historical", color: "#4A1573" },
            { icon: "🌿", label: "Nature", color: "#1B5E20" },
            { icon: "🦁", label: "Wildlife", color: "#E65100" },
            { icon: "🏔️", label: "Adventure", color: "#0D47A1" },
            { icon: "🍜", label: "Food", color: "#827717" },
            { icon: "🏨", label: "Stays", color: "#4E342E" },
          ].map((cat) => (
            <button key={cat.label} onClick={() => onNavigate("explore")} className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all group hover:scale-105" style={{ color: cat.color }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all group-hover:scale-110" style={{ background: cat.color + "18" }}>
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-gray-600">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(180deg, #F7F4ED 0%, #EEF5F0 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-bold text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Popular Destinations</h2>
              <p className="text-gray-500 mt-1">Nepal's most beloved places, waiting for you</p>
            </div>
            <button onClick={() => onNavigate("explore")} className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all" style={{ color: "#2D5A8E" }}>
              View All <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.slice(0, 4).map((dest) => (
              <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-50">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button onClick={() => toggleSave(dest.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Heart size={15} className={saved.includes(dest.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(168,32,13,0.9)" }}>{dest.category}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-gray-700">{dest.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">· {dest.province}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{dest.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{dest.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400">From</div>
                      <div className="text-sm font-bold" style={{ color: "#1B3A2D" }}>{dest.budget}</div>
                    </div>
                    <button onClick={() => onNavigate("explore")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
                      View Details <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore by Province ── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Explore by Province</h2>
          <p className="text-gray-500">Seven unique provinces — seven worlds to discover</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {PROVINCES.map((prov) => (
            <button key={prov.id} onClick={() => onNavigate("provinces")} className="group relative h-52 rounded-3xl overflow-hidden text-left shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-gray-300">
              <img src={prov.img} alt={prov.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${prov.color}F0 0%, ${prov.color}50 55%, transparent 100%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white/60 text-[10px] mb-0.5">Province {prov.id}</div>
                <div className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{prov.name}</div>
                <div className="text-white/75 text-sm font-bold" style={{ fontFamily: "'Caveat', cursive" }}>{prov.nepali}</div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {prov.categories.slice(0, 2).map((cat, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">{cat}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          <button onClick={() => onNavigate("provinces")} className="h-52 rounded-3xl border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-gray-600 transition-all group">
            <div className="w-14 h-14 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform"><MapIcon size={24} /></div>
            <span className="font-bold text-sm">See All Provinces</span>
          </button>
        </div>
      </section>

      {/* ── Weather + Featured ── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1B3A2D 0%, #0D2B4A 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h3 className="font-bold text-white text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Best Time to Visit</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { season: "Spring", months: "Mar–May", icon: "🌸", rating: "Excellent", ratingColor: "#60a5fa", desc: "Rhododendrons in bloom, clear mountain views, ideal for trekking all regions." },
                { season: "Autumn", months: "Oct–Nov", icon: "🍂", rating: "Best Season", ratingColor: "#4ade80", desc: "Crystal-clear skies, vibrant festivals, peak trekking season across Nepal." },
                { season: "Winter", months: "Dec–Feb", icon: "❄️", rating: "Good", ratingColor: "#fbbf24", desc: "Peaceful valleys, budget-friendly travel, Terai wildlife experiences shine." },
                { season: "Monsoon", months: "Jun–Sep", icon: "🌧️", rating: "Challenging", ratingColor: "#f87171", desc: "Lush greenery and low crowds — good for low altitude destinations only." },
              ].map((s) => (
                <div key={s.season} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-white font-bold text-sm">{s.season}</div>
                  <div className="text-white/50 text-xs mb-2">{s.months}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2" style={{ color: s.ratingColor, background: s.ratingColor + "20" }}>{s.rating}</div>
                  <p className="text-white/60 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-80 bg-gray-800">
            <img src={IMG.valley} alt="Annapurna Sanctuary" className="absolute inset-0 w-full h-full object-cover opacity-55" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ background: "linear-gradient(to top, rgba(8,18,30,0.92) 0%, transparent 55%)" }}>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 self-start" style={{ color: "#FFD08A", background: "rgba(255,208,138,0.15)", border: "1px solid rgba(255,208,138,0.3)" }}>✨ Featured This Week</div>
              <h3 className="font-bold text-white text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Annapurna Sanctuary</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-5">A natural amphitheater of snow giants — the sacred Base Camp surrounded by seven peaks over 7,000m. A pilgrimage for trekkers worldwide.</p>
              <div className="flex items-center gap-5 mb-5">
                <div className="flex items-center gap-1.5 text-white/65 text-sm"><Calendar size={13} /><span>Oct–Nov is Peak</span></div>
                <div className="flex items-center gap-1.5 text-white/65 text-sm"><DollarSign size={13} /><span>$400–900/person</span></div>
              </div>
              <button onClick={() => onNavigate("explore")} className="self-start flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:gap-3 transition-all" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
                Explore Trek <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Festivals ── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-bold text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Upcoming Festivals</h2>
            <p className="text-gray-500 mt-1">Plan your visit around Nepal's vibrant celebrations</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold" style={{ color: "#2D5A8E" }}>View Calendar <ArrowRight size={15} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FESTIVALS.map((fest, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-50">
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img src={fest.img} alt={fest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
                <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium">{fest.province}</div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold mb-2" style={{ color: "#A8200D" }}>
                  <Calendar size={11} />{fest.date}
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>{fest.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{fest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Travel Tips ── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(180deg, #F7F4ED 0%, #EBF5EE 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl text-center mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Travel Smart</h2>
          <p className="text-center text-gray-500 mb-10">Essential knowledge for an unforgettable Nepal journey</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🛂", title: "Visa on Arrival", desc: "Most nationalities get a visa on arrival at Tribhuvan Airport. 15-day ($30), 30-day ($50), and 90-day ($125) options available.", color: "#0D47A1" },
              { icon: "💰", title: "Currency & ATMs", desc: "Nepalese Rupee (NPR). ATMs are plentiful in cities — always carry cash when heading into trekking areas and remote provinces.", color: "#1B5E20" },
              { icon: "🌡️", title: "Altitude Sickness", desc: "Acclimatize above 3,000m — ascend slowly, stay well-hydrated, and know the symptoms of Acute Mountain Sickness (AMS).", color: "#8B1A1A" },
              { icon: "📱", title: "SIM & Connectivity", desc: "Buy Ncell or NTC SIM at the airport. Data is very affordable. Signal may be sparse in remote mountain areas.", color: "#4E342E" },
              { icon: "🎒", title: "What to Pack", desc: "Layering is essential due to dramatic altitude changes. Bring sun protection, rain gear, and trekking poles for mountain trails.", color: "#4A1573" },
              { icon: "🙏", title: "Cultural Respect", desc: "Remove shoes at temples, walk clockwise around stupas, dress modestly at religious sites, always use your right hand for giving.", color: "#E65100" },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                <div>
                  <h4 className="font-bold mb-1 text-sm" style={{ color: tip.color }}>{tip.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16 px-6" style={{ background: "#1B3A2D" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
                  <Mountain size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>पाइला</div>
                  <div className="text-white/40 text-[10px] tracking-widest uppercase">Paila Nepal Tourism</div>
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-5">Your gateway to Nepal's sacred mountains, ancient temples, and vibrant cultures across all 7 provinces.</p>
              <div className="flex gap-3">
                {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm cursor-pointer hover:bg-white/20 transition-colors">{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Explore", links: ["All Destinations", "By Province", "By Experience", "Hidden Gems", "Trending Now"] },
              { title: "Plan", links: ["AI Trip Planner", "Best Seasons", "Visa Guide", "Budget Tips", "Emergency Info"] },
              { title: "Support", links: ["Contact Us", "FAQ", "Safety Tips", "Emergency Numbers", "Feedback"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/35 text-sm">© 2026 Paila Nepal Tourism. All rights reserved.</div>
            <div className="flex items-center gap-2 text-white/35 text-sm"><Phone size={13} />Emergency: +977-1-4211020</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Explore Page ─────────────────────────────────────────────────────────────

function ExplorePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [saved, setSaved] = useState<number[]>([]);

  const FILTERS = ["Historical", "Religious", "Hiking", "Nature", "Lakes", "Adventure", "Wildlife", "Budget Friendly"];
  const SORTS = [{ val: "rating", label: "⭐ Highest Rated" }, { val: "budget", label: "💰 Cheapest" }, { val: "trending", label: "🔥 Trending" }, { val: "hidden", label: "🌿 Hidden Gems" }];

  const toggleFilter = (f: string) => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const filtered = DESTINATIONS.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.province.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilters.length === 0 || activeFilters.some(f => d.category.toLowerCase().includes(f.toLowerCase()) || d.desc.toLowerCase().includes(f.toLowerCase()));
    return matchSearch && matchFilter;
  });

  return (
    <div className="pt-24 min-h-screen" style={{ background: "#F7F4ED" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-bold text-4xl mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Explore Nepal</h1>
          <p className="text-gray-500">Discover {DESTINATIONS.length} incredible destinations across 7 provinces</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Pokhara, Lumbini, Bhaktapur, Mustang..." className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 transition-colors text-sm" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {SORTS.map(s => (
                <button key={s.val} onClick={() => setSortBy(s.val)} className="px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap" style={{ background: sortBy === s.val ? "linear-gradient(135deg, #1B3A2D, #2D5A8E)" : "#f3f4f6", color: sortBy === s.val ? "white" : "#4b5563" }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400 flex-shrink-0" />
            {FILTERS.map(f => (
              <button key={f} onClick={() => toggleFilter(f)} className="px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2" style={{ borderColor: activeFilters.includes(f) ? "#1B3A2D" : "#e5e7eb", color: activeFilters.includes(f) ? "#1B3A2D" : "#6b7280", background: activeFilters.includes(f) ? "#EBF5EE" : "transparent" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((dest) => (
              <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-50">
                <div className="relative h-52 bg-gray-200 overflow-hidden">
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button onClick={() => setSaved(prev => prev.includes(dest.id) ? prev.filter(x => x !== dest.id) : [...prev, dest.id])} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <Heart size={14} className={saved.includes(dest.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(168,32,13,0.9)" }}>{dest.category}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-gray-700">{dest.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">· {dest.province}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{dest.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{dest.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4"><Calendar size={11} />{dest.season}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>View Details</button>
                    <button className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Navigation size={13} className="text-gray-500" /></button>
                    <button className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Share2 size={13} className="text-gray-500" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-25" />
            <p className="text-lg font-medium">No destinations match your search.</p>
            <p className="text-sm mt-1">Try different keywords or clear the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Provinces Page ───────────────────────────────────────────────────────────

function ProvincesPage() {
  const [selected, setSelected] = useState<typeof PROVINCES[0] | null>(null);

  return (
    <div className="pt-24 min-h-screen" style={{ background: "#F7F4ED" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selected ? (
          <>
            <div className="text-center mb-12">
              <h1 className="font-bold text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Nepal's 7 Provinces</h1>
              <p className="text-gray-500 max-w-lg mx-auto">Each province is a distinct world of culture, landscape, and adventure. Click to explore in depth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROVINCES.map((prov) => (
                <button key={prov.id} onClick={() => setSelected(prov)} className="group text-left bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-52 bg-gray-300 overflow-hidden">
                    <img src={prov.img} alt={prov.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${prov.color}D0, transparent 50%)` }} />
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white/65 text-xs mb-0.5">Province {prov.id} · {prov.capital}</div>
                      <div className="font-bold text-2xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{prov.name}</div>
                      <div className="font-bold text-lg text-white/75" style={{ fontFamily: "'Caveat', cursive" }}>{prov.nepali}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{prov.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prov.categories.map((cat, i) => <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{cat}</span>)}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div><div className="text-gray-400">Best Season</div><div className="font-bold text-gray-700 mt-0.5">{prov.bestSeason}</div></div>
                      <div><div className="text-gray-400">Daily Budget</div><div className="font-bold text-gray-700 mt-0.5">{prov.budget}</div></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors text-sm font-medium">
              <ChevronRight size={15} className="rotate-180" /> Back to All Provinces
            </button>

            <div className="relative h-72 rounded-3xl overflow-hidden mb-8 bg-gray-300">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${selected.color}E0 0%, ${selected.color}80 50%, transparent 100%)` }} />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
                <div className="text-white/65 text-sm mb-1">Province {selected.id} · Capital: {selected.capital}</div>
                <h2 className="font-bold text-5xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{selected.name}</h2>
                <div className="font-bold text-3xl text-white/75 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>{selected.nepali}</div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-1.5 text-white/75 text-sm"><Calendar size={13} />{selected.bestSeason}</div>
                  <div className="flex items-center gap-1.5 text-white/75 text-sm"><DollarSign size={13} />{selected.budget}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>About {selected.name} Province</h3>
                  <p className="text-gray-600 leading-relaxed">{selected.description}</p>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Top Destinations</h3>
                  <div className="space-y-3">
                    {selected.topDest.map((dest, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: selected.color }}>
                          {i + 1}
                        </div>
                        <div className="font-semibold text-gray-800 text-sm flex-1">{dest}</div>
                        <ChevronRight size={14} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Must-See Highlights</h3>
                  <div className="flex flex-wrap gap-3">
                    {selected.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2" style={{ borderColor: selected.color + "50", color: selected.color, background: selected.light }}>
                        <MapPin size={12} />{h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>What To Do</h3>
                  <div className="space-y-2">
                    {selected.categories.map((cat, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl text-sm" style={{ background: selected.light }}>
                        <span className="text-xl">{cat.split(" ")[0]}</span>
                        <span className="font-medium text-gray-700">{cat.split(" ").slice(1).join(" ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${selected.color} 0%, ${selected.color}BB 100%)` }}>
                  <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Suggested 2-Day Trip</h3>
                  {[1, 2].map((day) => (
                    <div key={day} className="mb-4">
                      <div className="font-bold text-xs uppercase tracking-wider text-white/70 mb-2">Day {day}</div>
                      {["🌅 Morning", "☀️ Afternoon", "🌙 Evening"].map((slot, si) => (
                        <div key={slot} className="flex items-start gap-2 text-white/80 text-xs mb-1.5">
                          <span className="flex-shrink-0">{slot.split(" ")[0]}</span>
                          <span>{slot.split(" ")[1]}: {selected.topDest[(day - 1) * 2 + si < selected.topDest.length ? (day - 1) * 2 + si : si] || selected.highlights[si] || selected.topDest[0]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI Planner ───────────────────────────────────────────────────────────────

type PlanDay = { day: number; morning: string; afternoon: string; evening: string; hotel: string; restaurant: string; cost: string; weather: string };

const PLAN_TEMPLATES: Record<string, Omit<PlanDay, "day">[]> = {
  adventure: [
    { morning: "Trek to Annapurna Base Camp (5,895m)", afternoon: "Glacial moraine photography & exploration", evening: "Bonfire at Mountain Lodge with fellow trekkers", hotel: "Annapurna Lodge, Base Camp", restaurant: "Sherpa Kitchen (Dal Bhat special)", cost: "$85–130", weather: "☀️ Clear, -5°C to 10°C" },
    { morning: "Sunrise over Machapuchare (Fishtail Mountain)", afternoon: "Descent via rhododendron forest to Deurali", evening: "Natural hot springs at Jhinu Danda", hotel: "Orchid Guest House, Chhomrong", restaurant: "Local Dal Bhat Bhanchha", cost: "$55–90", weather: "🌤️ Partly cloudy, 5°C to 18°C" },
    { morning: "Trek through scenic Modi Khola valley", afternoon: "Arrive Pokhara — rest and recover lakeside", evening: "Sunset boat ride on Phewa Lake", hotel: "Hotel Barahi, Pokhara Lakeside", restaurant: "Moondance Restaurant (lakeside)", cost: "$65–100", weather: "☀️ Sunny, 16°C to 26°C" },
    { morning: "Sarangkot viewpoint sunrise (Annapurna panorama)", afternoon: "Tandem paragliding over Pokhara valley", evening: "Old Bazaar cultural evening walk", hotel: "Hotel Barahi, Pokhara", restaurant: "Café Concerto (Italian-Nepali fusion)", cost: "$110–180", weather: "🌤️ Clear, 17°C to 27°C" },
    { morning: "World Peace Pagoda hike (Japanese Stupa)", afternoon: "Begnas Lake kayaking", evening: "Farewell lakeside dinner", hotel: "Temple Tree Resort & Spa", restaurant: "Boomerang Restaurant", cost: "$80–130", weather: "☀️ Sunny, 18°C to 28°C" },
  ],
  religious: [
    { morning: "Pashupatinath Temple at dawn — witness sacred Aarti ceremony", afternoon: "Boudhanath Stupa circumambulation & monk chat", evening: "Evening butter lamp ceremony at Swayambhunath", hotel: "Dwarika's Heritage Hotel, Kathmandu", restaurant: "Krishnarpan (traditional Newari feast)", cost: "$85–150", weather: "☀️ Clear, 15°C to 25°C" },
    { morning: "Changu Narayan Temple (oldest Vishnu temple in Nepal)", afternoon: "Bhaktapur Durbar Square — 55-Window Palace", evening: "Taumadhi Square night lights", hotel: "Bhadgaon Guest House, Bhaktapur", restaurant: "Café Nyatapola (traditional)", cost: "$55–100", weather: "🌤️ Partly cloudy, 14°C to 24°C" },
    { morning: "Lumbini Maya Devi Temple at sunrise", afternoon: "International monastery zone walking tour", evening: "Meditation session at Tibetan monastery", hotel: "Lumbini Buddha Garden Hotel", restaurant: "Garden of Dreams Restaurant", cost: "$40–80", weather: "☀️ Sunny, 20°C to 30°C" },
  ],
  family: [
    { morning: "Chitwan National Park jeep safari (tigers & rhinos!)", afternoon: "Canoe ride on Rapti River — bird watching", evening: "Traditional Tharu cultural dance show", hotel: "Tiger Tops Tharu Lodge, Chitwan", restaurant: "Wild Elephant Lodge Restaurant", cost: "$130–220", weather: "☀️ Sunny, 22°C to 32°C" },
    { morning: "Elephant Breeding Center visit & feeding", afternoon: "Crocodile spot boat tour", evening: "Sunset at the riverside & local market", hotel: "Jungle Base Camp Resort", restaurant: "Riverside Dining, Chitwan", cost: "$100–180", weather: "🌤️ Partly sunny, 20°C to 30°C" },
  ],
  couple: [
    { morning: "Private sunrise boat ride on Phewa Lake to Barahi Temple", afternoon: "Lakeside spa & couples massage", evening: "Candlelit dinner at rooftop restaurant with Annapurna view", hotel: "Temple Tree Resort & Spa, Pokhara", restaurant: "Hillside Restaurant (fine dining)", cost: "$120–220", weather: "☀️ Romantic clear sky, 18°C to 28°C" },
    { morning: "Sunrise over Sarangkot — golden Annapurna range", afternoon: "Tandem paragliding — fly together over the valley", evening: "Sunset cruise on the lake with wine & cheese", hotel: "Temple Tree Resort & Spa", restaurant: "Boomerang Fine Dining", cost: "$150–280", weather: "☀️ Perfect visibility, 17°C to 27°C" },
  ],
  solo: [
    { morning: "Freak Street & Asan Bazaar early morning photography", afternoon: "Garden of Dreams (UNESCO) reading & relaxing", evening: "Thamel hostel social evening & travel stories", hotel: "Alobar1000 Hostel, Thamel ($12/night)", restaurant: "Fire & Ice Pizzeria (popular with solo travelers)", cost: "$22–42", weather: "☀️ Clear, 17°C to 27°C" },
    { morning: "Swayambhunath Stupa (Monkey Temple) morning visit", afternoon: "Kathmandu Durbar Square self-guided tour", evening: "Local momo restaurant and street food exploration", hotel: "Potala Guesthouse, Thamel", restaurant: "OR2K Restaurant (vegetarian, popular)", cost: "$18–38", weather: "🌤️ Partly cloudy, 15°C to 25°C" },
  ],
  luxury: [
    { morning: "Exclusive helicopter tour over Everest Base Camp", afternoon: "Champagne lunch at altitude (helicopter picnic)", evening: "Private Newari feast — personal chef, Dwarika's Hotel", hotel: "Dwarika's Heritage Hotel (Heritage Suite, $450/night)", restaurant: "Krishnarpan — private dining ($120/person)", cost: "$900–1,600", weather: "☀️ Perfect visibility for heli-tour" },
    { morning: "Spa morning at Dwarika's (Ayurvedic treatment)", afternoon: "Exclusive cultural tour with private guide — Durbar Squares", evening: "Sunset from private rooftop with cocktails & Himalayan views", hotel: "Dwarika's Heritage Hotel", restaurant: "Toran Restaurant (Dwarika's signature)", cost: "$400–700", weather: "☀️ Sunny, 18°C to 26°C" },
  ],
  budget: [
    { morning: "Swayambhunath Stupa free area (arrive early!)", afternoon: "Kathmandu Durbar Square budget walk (₨50 entry)", evening: "Dal Bhat dinner at local Bhanchha — most filling meal", hotel: "Kathmandu Peace Guesthouse, Thamel ($10/night)", restaurant: "New Orleans Café (budget-friendly)", cost: "$15–28", weather: "☀️ Sunny, 16°C to 26°C" },
    { morning: "Pashupatinath Temple (free for Hindus, ₨1,000 others)", afternoon: "Boudhanath Stupa circumambulation (low cost)", evening: "Thamel street momo (₨80-100/plate) & chai", hotel: "Marco Polo Hostel ($8/dorm bed)", restaurant: "Bhojan Griha — budget Newari set meal", cost: "$12–22", weather: "🌤️ Partly cloudy, 14°C to 24°C" },
  ],
};

function AIPlanner() {
  const [form, setForm] = useState({ from: "", to: "", days: "5", budget: "moderate", style: "" });
  const [plan, setPlan] = useState<PlanDay[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const STYLES = [
    { val: "adventure", label: "🏔️ Adventure" },
    { val: "religious", label: "🛕 Religious" },
    { val: "family", label: "👨‍👩‍👧 Family" },
    { val: "couple", label: "💑 Couple" },
    { val: "solo", label: "🧍 Solo" },
    { val: "luxury", label: "✨ Luxury" },
    { val: "budget", label: "💚 Budget" },
  ];

  const generatePlan = () => {
    if (!form.style) return;
    setGenerating(true);
    setTimeout(() => {
      const numDays = Math.min(parseInt(form.days) || 3, 7);
      const template = PLAN_TEMPLATES[form.style] || PLAN_TEMPLATES.adventure;
      const days: PlanDay[] = Array.from({ length: numDays }, (_, i) => ({ day: i + 1, ...template[i % template.length] }));
      setPlan(days);
      setGenerating(false);
    }, 2200);
  };

  return (
    <div className="pt-24 min-h-screen" style={{ background: "#F7F4ED" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 text-white" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
            <Bot size={16} /> AI-Powered Trip Planner
          </div>
          <h1 className="font-bold text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Plan Your Nepal Journey</h1>
          <p className="text-gray-500">Share your preferences — we will craft a personalized day-by-day itinerary</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              { key: "from", label: "Starting From", placeholder: "Your current city or country" },
              { key: "to", label: "Destination in Nepal", placeholder: "e.g. Pokhara, Kathmandu, Mustang" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-bold text-gray-700 mb-2">{f.label}</label>
                <input value={form[f.key as "from" | "to"]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm transition-colors" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Number of Days</label>
              <select value={form.days} onChange={e => setForm({ ...form, days: e.target.value })} className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm" style={{ outline: "none" }}>
                {["1", "2", "3", "5", "7", "10", "14"].map(d => <option key={d} value={d}>{d} {parseInt(d) === 1 ? "Day" : "Days"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Budget Level</label>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm" style={{ outline: "none" }}>
                <option value="budget">💚 Budget (Under $30/day)</option>
                <option value="moderate">💛 Moderate ($30–80/day)</option>
                <option value="comfort">🧡 Comfort ($80–150/day)</option>
                <option value="luxury">❤️ Luxury ($150+/day)</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">Travel Style <span className="text-red-400">*</span></label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(s => (
                <button key={s.val} onClick={() => setForm({ ...form, style: s.val })} className="px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2" style={{ borderColor: form.style === s.val ? "transparent" : "#e5e7eb", color: form.style === s.val ? "white" : "#6b7280", background: form.style === s.val ? "linear-gradient(135deg, #1B3A2D, #2D5A8E)" : "transparent" }}>
                  {s.label}
                </button>
              ))}
            </div>
            {!form.style && <p className="text-xs text-red-400 mt-2">Please select a travel style to generate your plan</p>}
          </div>

          <button onClick={generatePlan} disabled={generating || !form.style} className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-3" style={{ background: "linear-gradient(135deg, #A8200D 0%, #1B3A2D 100%)" }}>
            {generating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Your Perfect Itinerary...
              </>
            ) : (
              <><Sparkles size={19} /> Generate My Nepal Plan</>
            )}
          </button>
        </div>

        {plan && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>
                Your {form.days}-Day {STYLES.find(s => s.val === form.style)?.label.split(" ").slice(1).join(" ")} Itinerary
              </h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border-2 border-gray-200 hover:bg-gray-50 text-gray-600 transition-all"><Download size={14} /> PDF</button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border-2 border-gray-200 hover:bg-gray-50 text-gray-600 transition-all"><Share2 size={14} /> Share</button>
              </div>
            </div>
            <div className="space-y-5">
              {plan.map((day) => (
                <div key={day.day} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center gap-4 p-5 border-b border-gray-100" style={{ background: "linear-gradient(135deg, rgba(27,58,45,0.05), rgba(45,90,142,0.05))" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
                      {day.day}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Day {day.day}</div>
                      <div className="text-sm text-gray-400">{day.weather}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Estimated Cost</div>
                      <div className="font-bold text-sm" style={{ color: "#1B3A2D" }}>{day.cost}</div>
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{ time: "Morning", icon: "🌅", activity: day.morning }, { time: "Afternoon", icon: "☀️", activity: day.afternoon }, { time: "Evening", icon: "🌙", activity: day.evening }].map(slot => (
                      <div key={slot.time} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-2 font-bold text-gray-700 mb-2 text-sm"><span>{slot.icon}</span>{slot.time}</div>
                        <p className="text-gray-600 text-xs leading-relaxed">{slot.activity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50">
                      <Hotel size={15} className="text-blue-500 flex-shrink-0" />
                      <div><div className="text-[10px] text-blue-400 font-bold uppercase">Stay</div><div className="text-xs font-bold text-blue-800">{day.hotel}</div></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50">
                      <Utensils size={15} className="text-amber-500 flex-shrink-0" />
                      <div><div className="text-[10px] text-amber-400 font-bold uppercase">Dine</div><div className="text-xs font-bold text-amber-800">{day.restaurant}</div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>🎒 Packing Essentials</h3>
                <ul className="space-y-2">
                  {["Layered clothing for altitude changes", "UV-protection sunscreen (SPF 50+) & sunglasses", "Water purification tablets or LifeStraw filter", "First aid kit with altitude sickness medicine (Diamox)", "Power bank & universal travel adapter (Type C/D)", "Nepali phrasebook or offline Google Translate"].map(tip => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>📞 Emergency Contacts</h3>
                <div className="space-y-2">
                  {[
                    { name: "Nepal Police", num: "100" },
                    { name: "Tourist Police Hotline", num: "+977-1-4247041" },
                    { name: "Himalayan Rescue Association", num: "+977-1-4440292" },
                    { name: "Helicopter Emergency Rescue", num: "+977-1-4488148" },
                    { name: "Nepal Tourism Board", num: "+977-1-4256909" },
                  ].map(c => (
                    <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-red-50">
                      <span className="text-xs font-medium text-gray-700">{c.name}</span>
                      <span className="text-xs font-bold" style={{ color: "#A8200D" }}>{c.num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Map Page ─────────────────────────────────────────────────────────────────

const PROVINCE_SHAPES = [
  { id: 7, path: "M 15 60 L 195 55 L 195 218 L 155 228 L 15 228 Z", cx: 105, cy: 145 },
  { id: 6, path: "M 195 52 L 348 48 L 348 218 L 195 218 Z", cx: 272, cy: 135 },
  { id: 4, path: "M 348 45 L 502 42 L 502 185 L 348 185 Z", cx: 425, cy: 113 },
  { id: 5, path: "M 195 218 L 502 185 L 502 268 L 195 268 Z", cx: 350, cy: 232 },
  { id: 3, path: "M 500 42 L 662 45 L 662 268 L 500 268 Z", cx: 581, cy: 158 },
  { id: 2, path: "M 195 268 L 662 268 L 662 305 L 195 305 Z", cx: 428, cy: 286 },
  { id: 1, path: "M 660 45 L 945 50 L 945 305 L 660 305 Z", cx: 800, cy: 180 },
];

function MapPage() {
  const [selected, setSelected] = useState<typeof PROVINCES[0] | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQ, setSearchQ] = useState("");

  const MAP_FILTERS = ["Historical", "Religious", "Hotels", "Restaurants", "Hospitals", "ATM", "Bus Park", "Airport"];

  return (
    <div className="pt-20 min-h-screen flex" style={{ background: "#F0F6FF" }}>
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col" style={{ height: "calc(100vh - 80px)", position: "sticky", top: "80px" }}>
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Interactive Map</h2>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search places..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm bg-gray-50 text-gray-700" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
          </div>
        </div>
        <div className="p-4 border-b border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Show on Map</div>
          <div className="flex flex-wrap gap-1.5">
            {MAP_FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])} className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border" style={{ borderColor: activeFilters.includes(f) ? "#1B3A2D" : "#e5e7eb", color: activeFilters.includes(f) ? "white" : "#6b7280", background: activeFilters.includes(f) ? "#1B3A2D" : "transparent" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
          {selected ? (
            <div>
              <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-4"><ChevronRight size={13} className="rotate-180" />Back</button>
              <img src={selected.img} alt={selected.name} className="w-full h-36 object-cover rounded-2xl mb-4 bg-gray-200" />
              <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>{selected.name} Province</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{selected.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] text-gray-400">Best Season</div><div className="font-bold text-xs text-gray-700 mt-0.5">{selected.bestSeason}</div></div>
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] text-gray-400">Budget</div><div className="font-bold text-xs text-gray-700 mt-0.5">{selected.budget}</div></div>
              </div>
              <div className="space-y-1.5">
                {selected.topDest.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600 py-2 border-b border-gray-100">
                    <MapPin size={11} style={{ color: selected.color }} className="flex-shrink-0" />{d}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">All Provinces</div>
              <div className="space-y-1">
                {PROVINCES.map(prov => (
                  <button key={prov.id} onClick={() => setSelected(prov)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: prov.color }} />
                    <div className="flex-1"><div className="font-bold text-gray-800 text-sm">{prov.name}</div><div className="text-[10px] text-gray-400">{prov.topDest.length} destinations</div></div>
                    <ChevronRight size={13} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: "linear-gradient(135deg, #E3EFF8 0%, #EBF5EE 100%)" }}>
        <div className="w-full max-w-3xl">
          <div className="text-center mb-5">
            <h3 className="font-bold text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Nepal — Land of the Himalayas</h3>
            <p className="text-gray-500 text-sm">Click on any province to explore its destinations</p>
          </div>
          <div className="bg-white/85 rounded-3xl p-6 shadow-xl" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)" }}>
            <svg viewBox="0 50 960 290" className="w-full h-auto" style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.08))" }}>
              <rect x="0" y="50" width="960" height="290" rx="16" fill="#F0F7FF" />
              {PROVINCE_SHAPES.map(shape => {
                const prov = PROVINCES.find(p => p.id === shape.id)!;
                const isSel = selected?.id === prov.id;
                return (
                  <g key={prov.id} onClick={() => setSelected(isSel ? null : prov)} style={{ cursor: "pointer" }}>
                    <path d={shape.path} fill={prov.color} fillOpacity={isSel ? 0.92 : 0.68} stroke="white" strokeWidth="2.5" style={{ transition: "all 0.2s", filter: isSel ? `drop-shadow(0 0 10px ${prov.color})` : "none" }} />
                    <text x={shape.cx} y={shape.cy - 7} textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Playfair Display, serif" style={{ pointerEvents: "none" }}>{prov.name}</text>
                    <text x={shape.cx} y={shape.cy + 9} textAnchor="middle" fill="white" fontSize="8" opacity="0.75" fontFamily="Caveat, cursive" style={{ pointerEvents: "none" }}>{prov.nepali}</text>
                  </g>
                );
              })}
              <g transform="translate(928, 80)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="#CBD5E0" strokeWidth="1.5" />
                <text x="0" y="-6" textAnchor="middle" fontSize="7" fill="#555" fontWeight="bold">N</text>
                <text x="0" y="11" textAnchor="middle" fontSize="7" fill="#999">S</text>
                <text x="-11" y="3" textAnchor="middle" fontSize="7" fill="#999">W</text>
                <text x="11" y="3" textAnchor="middle" fontSize="7" fill="#999">E</text>
                <polygon points="0,-12 2.5,0 0,4 -2.5,0" fill="#A8200D" />
              </g>
              <text x="22" y="328" fontSize="9" fill="#94a3b8" fontFamily="Nunito, sans-serif">Simplified province map for navigation — click to explore</text>
            </svg>
            <div className="flex flex-wrap gap-2 mt-5 justify-center">
              {PROVINCES.map(prov => (
                <button key={prov.id} onClick={() => setSelected(selected?.id === prov.id ? null : prov)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2" style={{ borderColor: selected?.id === prov.id ? prov.color : "#e5e7eb", color: selected?.id === prov.id ? "white" : "#6b7280", background: selected?.id === prov.id ? prov.color : "transparent" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: prov.color }} />
                  {prov.name}
                </button>
              ))}
            </div>
          </div>
          {selected && (
            <div className="mt-4 p-4 bg-white/90 rounded-2xl shadow-md border border-white/80" style={{ backdropFilter: "blur(8px)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{selected.name} Province</div>
                  <div className="text-xs text-gray-500">{selected.capital} · {selected.bestSeason} · {selected.budget}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-4 py-2 rounded-xl text-white font-bold" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>Explore</button>
                  <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:bg-gray-50"><X size={14} /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");
  const TABS = [{ val: "about", label: "About Paila" }, { val: "nepal", label: "About Nepal" }, { val: "team", label: "Our Team" }, { val: "future", label: "Future Plans" }];

  return (
    <div className="pt-24 min-h-screen" style={{ background: "#F7F4ED" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 bg-gray-400">
          <img src={IMG.culture} alt="Nepal culture" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(27,58,45,0.92), rgba(13,43,74,0.75))" }} />
          <div className="absolute inset-0 flex items-center px-10">
            <div className="text-white">
              <div className="text-white/65 text-sm mb-2 uppercase tracking-widest">Nepal Tourism Platform</div>
              <h1 className="font-bold text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>About Paila</h1>
              <p className="text-white/75 text-lg">"पाइला" — every great journey begins with a single step</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          {TABS.map(tab => (
            <button key={tab.val} onClick={() => setActiveTab(tab.val)} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all" style={{ background: activeTab === tab.val ? "linear-gradient(135deg, #1B3A2D, #2D5A8E)" : "transparent", color: activeTab === tab.val ? "white" : "#6b7280" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "about" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Our Mission", icon: "🎯", content: "To make Nepal's extraordinary diversity accessible to every traveler through technology, accurate information, and community-driven insights that uplift local communities." },
              { title: "Our Vision", icon: "🔭", content: "A Nepal where every corner of its 7 provinces is known, celebrated, and sustainably visited — where digital tourism preserves ancient traditions rather than eroding them." },
              { title: "Our Objectives", icon: "📋", content: "Digitize Nepal's full tourism ecosystem. Provide AI-powered trip planning. Connect travelers with authentic homestays. Support local guides and small businesses across all provinces." },
              { title: "Why We Built Paila", icon: "💡", content: "\"Paila\" means 'footstep' in Nepali. Every journey begins with one step, and we wanted to make that first step as easy and informed as possible for anyone discovering Nepal." },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>{card.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{card.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "nepal" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-2xl mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>The Kingdom of the Himalayas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[{ label: "Capital", val: "Kathmandu" }, { label: "Population", val: "30 Million" }, { label: "Area", val: "147,181 km²" }, { label: "Currency", val: "NPR (₨)" }, { label: "Language", val: "Nepali + 124 more" }, { label: "Religion", val: "Hindu & Buddhist" }, { label: "Time Zone", val: "UTC+5:45" }, { label: "UNESCO Sites", val: "8 (4+4)" }].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-2xl p-3"><div className="text-[10px] text-gray-400 mb-1">{item.label}</div><div className="font-bold text-gray-800 text-sm">{item.val}</div></div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">Nepal is a landlocked country between China (Tibet) and India, home to 8 of the world's 14 highest peaks including the legendary Mt. Everest. Despite its compact size, Nepal holds extraordinary diversity — tropical jungles to arctic summits, ancient Hindu kingdoms to Tibetan Buddhist monasteries, 125 ethnic groups speaking 123 languages.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "🛂 Visa Information", content: "Most nationalities receive visa on arrival at Tribhuvan International Airport. 15-day ($30), 30-day ($50), 90-day ($125). Valid passport with minimum 6 months validity required." },
                { title: "🔒 Safety & Security", content: "Nepal is among Asia's safest destinations. Standard travel precautions apply — secure valuables, register with your embassy, use licensed guides for remote trekking, and always carry travel insurance." },
                { title: "🙏 Travel Etiquette", content: "Remove shoes at temples and homes. Walk clockwise around stupas. Don't point feet at shrines or elders. Dress modestly near religious sites. Accept food and gifts with the right hand." },
                { title: "🚨 Emergency Numbers", content: "Police: 100 | Ambulance: 102 | Tourist Police: +977-1-4247041 | Nepal Telecom: 198 | Fire Brigade: 101 | Himalayan Rescue: +977-1-4440292" },
              ].map(card => (
                <div key={card.title} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3">{card.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div>
            <p className="text-gray-500 text-center mb-8">Built with passion by a team dedicated to showcasing Nepal's authentic beauty</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "Aarav Sharma", role: "Founder & CEO", emoji: "👨‍💼", bio: "Tech entrepreneur and avid trekker passionate about sustainable tourism and Nepal's digital future." },
                { name: "Priya Tamang", role: "Lead Designer", emoji: "👩‍🎨", bio: "UX/UI designer with deep love for Nepal's culture, committed to accessible and beautiful experiences." },
                { name: "Bikash Gurung", role: "AI Engineer", emoji: "👨‍💻", bio: "Machine learning specialist building Nepal's most intelligent travel recommendation engine." },
                { name: "Sunita Rai", role: "Content & Research", emoji: "👩‍🔬", bio: "Travel writer documenting Nepal's hidden gems, cultural treasures, and authentic local experiences." },
                { name: "Dipak Thapa", role: "Province Coordinator", emoji: "🗺️", bio: "Former trekking guide with 15+ years of experience across all 7 provinces and high altitude routes." },
                { name: "Rima Shrestha", role: "Community Manager", emoji: "🤝", bio: "Building partnerships with local homestays, licensed guides, and small businesses in all provinces." },
              ].map(member => (
                <div key={member.name} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="text-5xl mb-4">{member.emoji}</div>
                  <h4 className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h4>
                  <div className="text-sm font-bold mb-3" style={{ color: "#2D5A8E" }}>{member.role}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "future" && (
          <div className="space-y-4">
            <p className="text-gray-500 text-center mb-6">Our roadmap for transforming Nepal's digital tourism landscape</p>
            {[
              { icon: "🏨", title: "Integrated Booking System", eta: "Q2 2026", desc: "Book hotels, homestays, guided treks, and cultural experiences with real-time availability and secure payments." },
              { icon: "🗺️", title: "Offline Province Maps", eta: "Q3 2026", desc: "Download detailed maps for offline use — essential for remote trekking areas in Karnali and Sudurpashchim." },
              { icon: "🥽", title: "AR Cultural Guide", eta: "Q4 2026", desc: "Point your camera at temples and monuments to see historical information, translations, and 3D reconstructions." },
              { icon: "🤖", title: "Full AI Chatbot (24/7)", eta: "Q1 2027", desc: "Always-on AI travel companion with real-time weather, trail conditions, and personalized suggestions from your history." },
              { icon: "⭐", title: "Community Reviews", eta: "Q2 2027", desc: "Verified traveler reviews, local tips, and a community of Nepal enthusiasts sharing authentic first-hand experiences." },
              { icon: "📡", title: "Live Trail Status", eta: "Q3 2027", desc: "Real-time trail conditions, weather alerts, and crowd levels for all major trekking routes across all 7 provinces." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">{item.eta}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <h3 className="font-bold text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Get in Touch</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[{ icon: Mail, label: "hello@pailanepal.com", href: "mailto:hello@pailanepal.com" }, { icon: Phone, label: "+977-1-4256909", href: "tel:+97714256909" }, { icon: Globe, label: "pailanepal.com", href: "#" }].map(c => (
              <a key={c.label} href={c.href} className="flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity" style={{ color: "#2D5A8E" }}>
                <c.icon size={15} />{c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  if (loggedIn) {
    return (
      <div className="pt-24 min-h-screen" style={{ background: "#F7F4ED" }}>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>👤</div>
            <div>
              <h1 className="font-bold text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Welcome, {form.name || "Nepal Traveler"}!</h1>
              <p className="text-gray-500 text-sm">{form.email || "traveler@pailanepal.com"} · Member since 2026</p>
            </div>
            <button onClick={() => setLoggedIn(false)} className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all font-medium">
              <LogOut size={15} />Sign Out
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[{ icon: "❤️", label: "Saved Places", val: "12" }, { icon: "🗺️", label: "Trip Plans", val: "3" }, { icon: "👁️", label: "Recently Viewed", val: "24" }, { icon: "📥", label: "Downloaded Guides", val: "7" }].map(w => (
              <div key={w.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl mb-2">{w.icon}</div>
                <div className="font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>{w.val}</div>
                <div className="text-xs text-gray-400 mt-0.5">{w.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>❤️ Saved Places</h3>
              <div className="space-y-3">
                {DESTINATIONS.slice(0, 4).map(dest => (
                  <div key={dest.id} className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors cursor-pointer">
                    <img src={dest.img} alt={dest.name} className="w-12 h-12 rounded-xl object-cover bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 min-w-0"><div className="font-bold text-sm text-gray-900 truncate">{dest.name}</div><div className="text-[11px] text-gray-400">{dest.province} · {dest.category}</div></div>
                    <Heart size={13} className="text-red-400 fill-red-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>⚙️ Account Settings</h3>
              <div className="space-y-3 mb-5">
                {[{ label: "Language", val: "English", icon: Globe }, { label: "Currency", val: "USD ($)", icon: DollarSign }, { label: "Notifications", val: "Enabled", icon: Info }].map(setting => (
                  <div key={setting.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2.5"><setting.icon size={15} className="text-gray-400" /><span className="text-sm font-medium text-gray-700">{setting.label}</span></div>
                    <span className="text-xs font-medium text-gray-400">{setting.val}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate("planner")} className="w-full py-3 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #1B3A2D, #2D5A8E)" }}>
                Plan a New Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6" style={{ background: "#F7F4ED" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #A8200D, #C0392B)" }}>
            <Mountain size={28} className="text-white" />
          </div>
          <h1 className="font-bold text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A2B3C" }}>Welcome to पाइला</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to plan your Nepal adventure</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100">
          <div className="flex gap-2 mb-6 bg-gray-100 rounded-2xl p-1.5">
            {(["login", "register"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all" style={{ background: tab === t ? "white" : "transparent", color: tab === t ? "#1A2B3C" : "#9ca3af", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Aarav Sharma" className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="traveler@example.com" className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 bg-gray-50 text-sm" style={{ outline: "none" }} onFocus={e => (e.target.style.borderColor = "#2D5A8E")} onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <button onClick={() => setLoggedIn(true)} className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #A8200D 0%, #1B3A2D 100%)" }}>
              <LogIn size={17} />
              {tab === "login" ? "Sign In to Paila" : "Create My Account"}
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              {tab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="font-bold" style={{ color: "#2D5A8E" }}>
                {tab === "login" ? "Register free" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [botOpen, setBotOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}</style>
      <TopoBackground />
      <Navbar currentPage={page} onNavigate={navigate} onSearchOpen={() => setBotOpen(true)} />
      {botOpen && <SearchBot onClose={() => setBotOpen(false)} onNavigate={navigate} />}
      <main className="relative z-10">
        {page === "home" && <HomePage onNavigate={navigate} onSearchOpen={() => setBotOpen(true)} />}
        {page === "explore" && <ExplorePage onNavigate={navigate} />}
        {page === "provinces" && <ProvincesPage />}
        {page === "planner" && <AIPlanner />}
        {page === "map" && <MapPage />}
        {page === "about" && <AboutPage />}
        {page === "login" && <LoginPage onNavigate={navigate} />}
      </main>
    </div>
  );
}
