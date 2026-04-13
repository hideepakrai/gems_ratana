"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  TrendingUp,
  Activity,
  ArrowUpRight,
  BarChart3,
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap,
  Gem,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/store/hooks";

const chartConfig = {
  ruby: { label: "Ruby", color: "#9B111E" },
  emerald: { label: "Emerald", color: "#0B3D2E" },
  sapphire: { label: "Sapphire", color: "#D4AF37" },
};

export default function AdminDashboard() {
  const { allCategories, categoryLoading } = useAppSelector(
    (state: RootState) => state.adminCategories,
  );
  const { allattributes, attributeLoading } = useAppSelector(
    (state: RootState) => state.adminAttributes,
  );

  const { allProducts, loading: productsLoading } = useAppSelector(
    (state: RootState) => state.adminProducts,
  );
  const { gemsratnaUser, isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const stats = {
    totalGems: allProducts?.length || 0,
    activeOrders: 12, // Mocked for design
    certifiedGems: Math.floor((allProducts?.length || 0) * 0.85),
    pendingConsultations: 4,
    revenue: "₹12,45,000",
    topSeller: "Natural Blue Sapphire",
  };

  const salesTrendData = [
    { month: "Jan", ruby: 4000, emerald: 2400, sapphire: 3200 },
    { month: "Feb", ruby: 3000, emerald: 1398, sapphire: 5100 },
    { month: "Mar", ruby: 2000, emerald: 9800, sapphire: 2290 },
    { month: "Apr", ruby: 2780, emerald: 3908, sapphire: 2000 },
    { month: "May", ruby: 1890, emerald: 4800, sapphire: 2181 },
    { month: "Jun", ruby: 2390, emerald: 3800, sapphire: 2500 },
    { month: "Jul", ruby: 3490, emerald: 4300, sapphire: 2100 },
  ];

  if (authLoading || !gemsratnaUser) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-luxury-ivory">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-luxury-gold/20 rounded-full" />
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-lg font-playfair font-bold text-luxury-black">Awakening Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 font-poppins pb-20 bg-luxury-ivory min-h-screen">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[40px] p-12 border border-luxury-gold/20 bg-luxury-black shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <Sparkles className="w-[500px] h-[500px] text-luxury-gold" />
        </div>
        <div className="relative z-10 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-luxury-gold font-black text-[10px] uppercase tracking-[0.4em] bg-luxury-gold/10 w-max px-6 py-2 rounded-full backdrop-blur-md border border-luxury-gold/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
            </span>
            Imperial Presence Active
          </div>
          <h1 className="text-6xl md:text-8xl font-playfair font-medium text-white italic leading-none">
            GemsRatna <span className="text-luxury-gold opacity-50">Vault</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl font-light italic leading-relaxed">
            Overseeing the luxury spiritual gemstone empire. Track cosmic orders, certified rarities, and sacred consultations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Total Gems", value: stats.totalGems, icon: Gem, color: "text-luxury-gold", bg: "bg-luxury-gold/5" },
          { label: "Active Orders", value: stats.activeOrders, icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Certified Gems", value: stats.certifiedGems, icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/5" },
          { label: "Consultations", value: stats.pendingConsultations, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/5" },
          { label: "Revenue", value: stats.revenue, icon: TrendingUp, color: "text-luxury-gold", bg: "bg-luxury-gold/5" },
          { label: "Top Seller", value: "Sapphire", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/5" },
        ].map((item, i) => (
          <Card key={i} className="relative overflow-hidden rounded-3xl border border-luxury-gold/10 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-luxury-gold/20 hover:-translate-y-2 transition-all duration-700 group">
             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[9px] font-black uppercase tracking-[0.3em] text-luxury-black/40">
                  {item.label}
                </CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex items-center justify-between">
                   <div className="text-2xl font-playfair font-bold text-luxury-black">
                      {item.value}
                   </div>
                   <div className={cn("p-3 rounded-2xl border border-black/5 transition-transform group-hover:scale-110", item.bg)}>
                      <item.icon className={cn("h-5 w-5", item.color)} />
                   </div>
                </div>
             </CardContent>
             <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </Card>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Analytics Section */}
        <Card className="lg:col-span-8 rounded-[40px] border border-luxury-gold/10 bg-white shadow-2xl p-10">
          <CardHeader className="px-0 pt-0 mb-10">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-luxury-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">Market Presence</p>
                  <CardTitle className="font-playfair text-4xl italic">Spiritual Sales Insights</CardTitle>
               </div>
               <div className="flex gap-4">
                  {['Ruby', 'Emerald', 'Sapphire'].map((gem) => (
                    <div key={gem} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartConfig[gem.toLowerCase() as keyof typeof chartConfig].color }} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{gem}</span>
                    </div>
                  ))}
               </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-6">
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRuby" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartConfig.ruby.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartConfig.ruby.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartConfig.emerald.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartConfig.emerald.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSapphire" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartConfig.sapphire.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartConfig.sapphire.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 10, fontWeight: 900 }} 
                    dy={12}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 10, fontWeight: 900 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent className="bg-white border-luxury-gold/20 shadow-xl rounded-xl" />} />
                  <Area type="monotone" dataKey="ruby" stroke={chartConfig.ruby.color} fillOpacity={1} fill="url(#colorRuby)" strokeWidth={4} />
                  <Area type="monotone" dataKey="emerald" stroke={chartConfig.emerald.color} fillOpacity={1} fill="url(#colorEmerald)" strokeWidth={4} />
                  <Area type="monotone" dataKey="sapphire" stroke={chartConfig.sapphire.color} fillOpacity={1} fill="url(#colorSapphire)" strokeWidth={4} />
                </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-4 rounded-[40px] border border-luxury-gold/10 bg-luxury-black shadow-2xl p-10">
          <CardHeader className="px-0 pt-0 mb-10">
            <p className="text-luxury-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">Ritual Logs</p>
            <CardTitle className="font-playfair text-3xl text-white italic">Divine Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
             <div className="space-y-10 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-luxury-gold/10">
                {[
                  { title: "Ruby Pendant Ordered", meta: "By Patrón Ananya", time: "2m ago", type: "order" },
                  { title: "New Astrology Booking", meta: "Pundit Consultation", time: "1h ago", type: "booking" },
                  { title: "Emerald Restocked", meta: "Zambian Origins", time: "3h ago", type: "inventory" },
                  { title: "New Kundli Generated", meta: "Saturn Alignment", time: "5h ago", type: "system" }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 group cursor-default">
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-luxury-black border border-luxury-gold/50 flex items-center justify-center group-hover:scale-125 transition-transform">
                       <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    </div>
                    <div className="flex flex-col">
                       <p className="text-white text-lg font-playfair font-medium transition-colors group-hover:text-luxury-gold">{item.title}</p>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{item.meta}</span>
                          <span className="text-[10px] text-white/10">•</span>
                          <span className="text-[10px] font-medium text-luxury-gold/50">{item.time}</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
             
             <button className="w-full mt-16 py-5 border border-white/5 rounded-2xl text-white/30 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 hover:text-luxury-gold transition-all">
                Access All Chronicles
             </button>
          </CardContent>
        </Card>
      </div>

      {/* Gemstone List Section Placeholder */}
      <section className="mt-10">
         <div className="flex items-center justify-between mb-12">
            <div>
               <p className="text-luxury-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">Management</p>
               <h2 className="text-4xl font-playfair font-medium text-luxury-black italic">Imperial Inventory</h2>
            </div>
            <button className="bg-luxury-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-luxury-gold hover:text-black transition-all shadow-xl">
               Add New Gemstone
            </button>
         </div>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {allProducts?.slice(0, 4).map((p, i) => (
               <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-luxury-gold/5 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
                  <div className="aspect-square relative overflow-hidden bg-muted flex items-center justify-center">
                     {p.primaryImageId ? (
                        <img src={`/api/media/${p.primaryImageId}`} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                     ) : (
                        <Gem className="w-12 h-12 text-luxury-gold/20" />
                     )}
                     <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <span className="px-4 py-1.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full">Gemstone</span>
                        <span className="px-4 py-1.5 bg-luxury-gold text-black text-[9px] font-black uppercase tracking-widest rounded-full">Certified</span>
                     </div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-playfair font-medium text-luxury-black mb-2 truncate">{p.name}</h3>
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-luxury-gold mb-6">Origin: Vedic Vault</p>
                     <div className="flex items-center justify-between border-t border-black/5 pt-6">
                        <span className="text-xl font-bold font-poppins">{p.pricing?.price || p.price || "N/A"}</span>
                        <button className="p-3 bg-luxury-black text-white hover:bg-luxury-gold hover:text-black transition-all rounded-xl">
                           <ArrowUpRight size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
