import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Apply from "./pages/Apply";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WebsiteLatenMaken from "./pages/WebsiteLatenMaken";
import CreationSiteWeb from "./pages/CreationSiteWeb";
import WebDevelopmentCompany from "./pages/WebDevelopmentCompany";
import Unsubscribe from "./pages/Unsubscribe";
import ThankYouBooking from "./pages/ThankYouBooking";
import HiddenPortfolio from "./pages/HiddenPortfolio";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Laden...</p></div>;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { settings } = useSiteSettings();
  // Product rule: when Home is hidden, About is hidden too.
  const aboutVisible = settings.home_enabled && settings.about_enabled;
  return (
    <Routes>
      <Route
        path="/"
        element={settings.home_enabled ? <Index /> : <Portfolio />}
      />
      <Route
        path="/about"
        element={aboutVisible ? <About /> : <Navigate to="/" replace />}
      />
      <Route
        path="/portfolio"
        element={settings.home_enabled ? <Portfolio /> : <Navigate to="/" replace />}
      />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/website-laten-maken" element={<WebsiteLatenMaken />} />
      <Route path="/creation-site-web" element={<CreationSiteWeb />} />
      <Route path="/web-development-company" element={<WebDevelopmentCompany />} />
      <Route path="/book" element={<Apply />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
      <Route path="/thank-you" element={<ThankYouBooking />} />
      <Route path="/bedankt" element={<ThankYouBooking />} />
      <Route path="/showcase" element={<HiddenPortfolio />} />
      <Route path="/realisaties" element={<HiddenPortfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
