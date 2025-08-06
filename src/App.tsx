
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BaselineForecast from "./pages/BaselineForecast";
import BottomUpForecast from "./pages/BottomUpForecast";
import ForecastFinalization from "./pages/ForecastFinalization";
import InventoryPlanning from "./pages/InventoryPlanning";
import CropGIS from "./pages/CropGIS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/forecast/baseline" element={<Layout><BaselineForecast /></Layout>} />
          <Route path="/forecast/bottom-up" element={<Layout><BottomUpForecast /></Layout>} />
          <Route path="/forecast/finalization" element={<Layout><ForecastFinalization /></Layout>} />
          <Route path="/inventory/planning" element={<Layout><InventoryPlanning /></Layout>} />
          <Route path="/inventory/alerts" element={<Layout><InventoryPlanning /></Layout>} />
          <Route path="/crop-gis" element={<Layout><CropGIS /></Layout>} />
          <Route path="/reports" element={<Layout><Dashboard /></Layout>} />
          <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
