import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './components/layout/Drawer';
import PageLayout from './components/layout/PageLayout';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <PageLayout>
      <Aside isOpen={isDrawerOpen} setOpen={() => setIsDrawerOpen(false)} />
      <Outlet context={() => setIsDrawerOpen(true)} />
    </PageLayout>
  );
}
