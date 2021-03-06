import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './components/layout/Aside/Aside';
import PageLayout from './components/layout/PageLayout';
import splitProjectTitle from './utils/splitProjectTitle';

export interface OutletContextProps {
  openDrawer: () => void;
  setProjectsChanged: () => void;
  isNewProjectModalOpen: boolean;
  setNewProjectModalOpen: (bool: boolean) => void;
}

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projects, setProjects] = useState<string[]>([]);
  const [projectsChanged, setProjectsChanged] = useState(true);
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);

  useEffect(() => {
    if (projectsChanged) {
      const projectKeys = Object.keys(localStorage);
      const projectArray = projectKeys.map((p) => {
        if (p.includes('kanbasic-')) {
          return splitProjectTitle(p);
        }
        return '';
      });
      setProjects(projectArray.filter((p) => p !== ''));
      setProjectsChanged(false);
    }
  }, [projectsChanged]);

  return (
    <PageLayout>
      <Aside
        isOpen={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        projects={projects}
        setProjectsChanged={() => setProjectsChanged(true)}
        openNewProjectModal={() => setNewProjectModalOpen(true)}
      />
      <Outlet
        context={{
          openDrawer: () => setIsDrawerOpen(true),
          setProjectsChanged: () => setProjectsChanged(true),
          isNewProjectModalOpen,
          setNewProjectModalOpen,
        }}
      />
    </PageLayout>
  );
}
