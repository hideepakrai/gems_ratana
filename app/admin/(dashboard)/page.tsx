"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Tags,
  Layers,
  ShoppingCart,
  TrendingUp,
  Activity,
  ArrowUpRight,
  BarChart3,
  Loader2,
  Sparkles,
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

export default function AdminDashboard() {
  const { allCategories, categoryLoading } = useAppSelector(
    (state: RootState) => state.adminCategories,
  );
  const { allattributes, attributeLoading } = useAppSelector(
    (state: RootState) => state.adminAttributes,
  );

  const { allProducts, loading } = useAppSelector(
    (state: RootState) => state.adminProducts,
  );
  const { gemsratnaUser, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const stats = {
    products: allProducts?.length || 0,
    categories: allCategories?.length || 0,
    orders: 0,
    attributes: allattributes?.length || 0,
  };

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 5500 },
    { month: "Mar", revenue: 3200 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 8400 },
    { month: "Jul", revenue: 9500 },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
  };

  // Loading screen
  if (isLoading || !gemsratnaUser) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/20 rounded-full" />
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-foreground">
              Loading Dashboard
            </p>
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[32px] p-10 border border-border/40 bg-surface shadow-2xl shadow-primary/5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.03]">
          <Sparkles className="w-96 h-96 text-primary" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] bg-primary/5 w-max px-5 py-2 rounded-full mb-2 backdrop-blur-md border border-primary/10">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium System Active
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground">
            GemsRatna <span className="text-primary/40">Portal</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
            Manage your precious gemstone collections, track spiritual wellness
            orders, and monitor your store's performance from your exclusive
            administrative suite.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products Card */}
        <Card className="relative overflow-hidden rounded-[32px] border border-border/40 bg-surface shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Package className="w-40 h-40 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              Total Gems
            </CardTitle>
            <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/5">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : (
              <>
                <div className="text-5xl font-heading font-bold text-foreground mb-2">
                  {stats.products}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <ArrowUpRight className="h-3 w-3" /> 2.1%
                  </span>
                  <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                    Weekly Growth
                  </span>
                </div>
              </>
            )}
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </Card>

        {/* Total Categories Card */}
        <Card className="relative overflow-hidden rounded-[32px] border border-border/40 bg-surface shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Layers className="w-40 h-40 text-secondary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              Collections
            </CardTitle>
            <div className="p-4 bg-secondary/5 rounded-2xl group-hover:bg-secondary/10 transition-colors border border-secondary/5">
              <Layers className="h-6 w-6 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {categoryLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-8 w-8 text-secondary animate-spin" />
              </div>
            ) : (
              <>
                <div className="text-5xl font-heading font-bold text-foreground mb-2">
                  {stats.categories}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <Activity className="h-3 w-3" /> Active
                  </span>
                  <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                    Curated Sets
                  </span>
                </div>
              </>
            )}
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-secondary to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </Card>

        {/* Total Orders Card */}
        <Card className="relative overflow-hidden rounded-[32px] border border-border/40 bg-surface shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <ShoppingCart className="w-40 h-40 text-emerald-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              New Orders
            </CardTitle>
            <div className="p-4 bg-emerald-600/5 rounded-2xl group-hover:bg-emerald-600/10 transition-colors border border-emerald-600/5">
              <ShoppingCart className="h-6 w-6 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {/* Orders are hardcoded to 0, so no loading needed, but added for consistency */}
            <div className="text-5xl font-heading font-bold text-foreground mb-2">
              {stats.orders}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-600/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <TrendingUp className="h-3 w-3" /> 12%
              </span>
              <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                Sales Velocity
              </span>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </Card>

        {/* Attribute Sets Card */}
        <Card className="relative overflow-hidden rounded-[32px] border border-border/40 bg-surface shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Tags className="w-40 h-40 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              Gem Attributes
            </CardTitle>
            <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/5">
              <Tags className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {attributeLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : (
              <>
                <div className="text-5xl font-heading font-bold text-foreground mb-2">
                  {stats.attributes}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <BarChart3 className="h-3 w-3" /> Pure
                  </span>
                  <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                    Quality Grades
                  </span>
                </div>
              </>
            )}
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </Card>
      </div>

      {/* Revenue Chart Section */}
      <div className="grid gap-8 md:grid-cols-7 mt-10">
        <Card className="md:col-span-5 rounded-[32px] border border-border/40 bg-surface shadow-xl p-6">
          <CardHeader className="px-2">
            <CardTitle className="font-heading text-2xl">
              Sales Overview
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              Monthly revenue insights for the current gemstone market
            </p>
          </CardHeader>
          <CardContent className="pl-0 pt-6">
            <ChartContainer config={chartConfig} className="h-[380px] w-full">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  className="font-bold uppercase tracking-widest opacity-50"
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  className="font-bold opacity-50"
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-surface border-border shadow-2xl rounded-2xl" />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={4}
                  animationDuration={2000}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 rounded-[32px] border border-border/40 bg-surface shadow-xl p-6">
          <CardHeader className="px-2">
            <CardTitle className="font-heading text-2xl">Audit Log</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              Real-time activity tracking
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                {
                  dot: "bg-primary",
                  title: "Premium Ruby Pendant #RT-102",
                  time: "2m ago",
                  label: "New Order",
                },
                {
                  dot: "bg-secondary",
                  title: "Stock update: Ethiopian Opal",
                  time: "1h ago",
                  label: "Inventory",
                },
                {
                  dot: "bg-emerald-500",
                  title: "New Collection 'Soul Healers'",
                  time: "3h ago",
                  label: "Created",
                },
                {
                  dot: "bg-amber-500",
                  title: "Limited Edition: Quartz Roller",
                  time: "Yesterday",
                  label: "Restock",
                },
                {
                  dot: "bg-primary",
                  title: "Wholesale Inquiry: Amethyst",
                  time: "Yesterday",
                  label: "Inquiry",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-sm",
                      item.dot,
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground/40">
                        •
                      </span>
                      <span className="text-[10px] text-muted-foreground/40 font-medium">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
