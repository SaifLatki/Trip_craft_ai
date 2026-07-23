import { Link } from 'react-router-dom';
import { Plane, Sparkles, Wallet, BookMarked, ArrowRight, MapPin, Star, CheckCircle2 } from 'lucide-react';

const features = [
  {
    Icon: Sparkles,
    title: 'AI Itinerary Generator',
    description: 'Get a fully personalized day-by-day itinerary crafted by AI based on your destination, interests, and travel style.',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-900/30',
  },
  {
    Icon: Wallet,
    title: 'Smart Budget Breakdown',
    description: 'Every plan includes a detailed budget split across accommodation, transport, food, and activities in PKR.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/30',
  },
  {
    Icon: BookMarked,
    title: 'Save & Export',
    description: 'Save your favorite itineraries to revisit anytime, and download a clean PDF to carry offline.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
  },
];

const destinations = [
  { name: 'Lahore', img: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=400', tag: 'Cultural' },
  { name: 'Swat Valley', img: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400', tag: 'Adventure' },
  { name: 'Hunza', img: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=400', tag: 'Nature' },
  { name: 'Karachi', img: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400', tag: 'Coastal' },
];

const steps = [
  { step: '01', title: 'Enter Your Details', desc: 'Tell us your destination, days, budget, and what you love to do.' },
  { step: '02', title: 'AI Crafts Your Plan', desc: 'Our AI generates a personalized itinerary in seconds.' },
  { step: '03', title: 'Explore & Save', desc: 'Review your plan, tweak individual days, and save or export it.' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-hero text-teal-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Floating plane decoration */}
        <div className="absolute top-16 right-16 opacity-10 hidden lg:block">
          <Plane className="w-64 h-64 text-orange-800 rotate-12" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Plan Your Dream
              <span className="block text-orange-600">Trip with AI</span>
            </h1>
            <p className="text-lg text-teal-800 leading-relaxed mb-8 max-w-xl">
              Enter your destination, budget, and interests — and let TripCraft AI build you a complete, personalized itinerary in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/generate" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0">
                <Plane className="w-5 h-5" />
                Plan My Trip
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              {['Free to use', 'Budget in PKR', 'Instant results'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-teal-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Everything You Need to Travel Smarter</h2>
          <p className="section-subtitle max-w-xl mx-auto">From AI-crafted itineraries to detailed budget planning — TripCraft AI does the heavy lifting so you can focus on the adventure.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description, color, bg }) => (
            <div key={title} className="card p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50 mb-3">{title}</h3>
              <p className="text-warm-500 dark:text-warm-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-teal-50 dark:bg-teal-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to your perfect itinerary</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-teal-200 dark:bg-teal-800" />
            {steps.map(({ step, title, desc }, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-black text-xl">{step}</span>
                </div>
                <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-2">{title}</h3>
                <p className="text-sm text-warm-500 dark:text-warm-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/generate" className="btn-primary text-base px-8 py-3.5">
            
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Explore some of Pakistan's most loved travel spots</p>
          </div>
          <Link to="/generate" className="text-sm font-medium text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((d) => (
            <Link
              key={d.name}
              to="/generate"
              state={{ destination: d.name }}
              className="group relative rounded-2xl overflow-hidden h-52 block"
            >
              <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{d.name}</h3>
                    <span className="text-white/70 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Pakistan
                    </span>
                  </div>
                  <span className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">{d.tag}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          <div className="relative">
            <Star className="w-8 h-8 text-orange-400 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Ready for your next adventure?
            </h2>
            <p className="text-teal-100 mb-8 max-w-md mx-auto">
              Generate a complete AI travel itinerary in seconds — completely free.
            </p>
            <Link to="/generate" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              <Plane className="w-5 h-5" />
              Plan My Trip Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
