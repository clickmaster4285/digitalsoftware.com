import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WebDevelopmentServices from "./pages/WebDevelopmentServices.tsx";
import WebApplicationDevelopment from "./pages/WebApplicationDevelopment.tsx";
import WebsiteMaintenanceServices from "./pages/WebsiteMaintenanceServices.tsx";
import CustomSoftwareDevelopment from "./pages/CustomSoftwareDevelopment.tsx";
import WoocommerceDevelopmentServices from "./pages/WoocommerceDevelopmentServices.tsx";
import ShopifyDevelopmentServices from "./pages/ShopifyDevelopmentServices.tsx";
import EcommerceDevelopmentServices from "./pages/EcommerceDevelopmentServices.tsx";
import MobileAppDevelopment from "./pages/MobileAppDevelopment.tsx";
import IotDevelopmentServices from "./pages/IotDevelopmentServices.tsx";
import ApiDevelopmentIntegrationServices from "./pages/ApiDevelopmentIntegrationServices.tsx";
import CrmIntegrationServices from "./pages/CrmIntegrationServices.tsx";
import AdaComplianceWebAccessibility from "./pages/AdaComplianceWebAccessibility.tsx";
import ArVrDevelopmentServices from "./pages/ArVrDevelopmentServices.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/website-development-services" element={<WebDevelopmentServices />} />
          <Route path="/web-application-development" element={<WebApplicationDevelopment />} />
          <Route path="/website-maintenance-services" element={<WebsiteMaintenanceServices />} />
          <Route path="/custom-software-development" element={<CustomSoftwareDevelopment />} />
          <Route path="/woocommerce-development-services" element={<WoocommerceDevelopmentServices />} />
          <Route path="/shopify-development-services" element={<ShopifyDevelopmentServices />} />
          <Route path="/ecommerce-development-services" element={<EcommerceDevelopmentServices />} />
          <Route path="/mobile-app-development" element={<MobileAppDevelopment />} />
          <Route path="/iot-development-services" element={<IotDevelopmentServices />} />
          <Route path="/api-development-integration-services" element={<ApiDevelopmentIntegrationServices />} />
          <Route path="/crm-integration-services" element={<CrmIntegrationServices />} />
          <Route path="/ada-compliance-web-accessibility" element={<AdaComplianceWebAccessibility />} />
          <Route path="/ar-vr-development-services" element={<ArVrDevelopmentServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
