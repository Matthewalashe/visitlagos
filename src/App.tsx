import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/routes/HomePage';
import DestinationsPage from '@/routes/DestinationsPage';
import DestinationDetail from '@/routes/DestinationDetail';
import AttractionsPage from '@/routes/AttractionsPage';
import AttractionDetail from '@/routes/AttractionDetail';
import EventsPage from '@/routes/EventsPage';
import EventDetail from '@/routes/EventDetail';
import ItinerariesPage from '@/routes/ItinerariesPage';
import ItineraryDetail from '@/routes/ItineraryDetail';
import DettyDecemberPage from '@/routes/DettyDecemberPage';
import AdminPage from '@/routes/AdminPage';
import QuickEnquiryModal from '@/components/shared/QuickEnquiryModal';
import BackToTop from '@/components/shared/BackToTop';

function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/attractions/:slug" element={<AttractionDetail />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/itineraries" element={<ItinerariesPage />} />
            <Route path="/itineraries/:slug" element={<ItineraryDetail />} />
            <Route path="/detty-december" element={<DettyDecemberPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
        <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
        <BackToTop />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
