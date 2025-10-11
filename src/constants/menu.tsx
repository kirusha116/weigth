import {
  ChartNoAxesCombined,
  ClipboardList,
  FileBadge,
  LayoutDashboard,
  Settings,
} from 'lucide-react'

import type { JSX } from 'react'

export const menu = {
  dashboard: 'dashboard',
  tasks: 'tasks',
  awards: 'awards',
  statistics: 'statistics',
  settings: 'settings',
}

export const menuLabels = {
  [menu.dashboard]: 'Доска',
  [menu.tasks]: 'Задания',
  [menu.awards]: 'Награды',
  [menu.statistics]: 'Статистика',
  [menu.settings]: 'Настройки',
}

export const menuIcons: Record<(typeof menu)[keyof typeof menu], JSX.Element> =
  {
    [menu.dashboard]: <LayoutDashboard />,
    [menu.tasks]: <ClipboardList />,
    [menu.awards]: <FileBadge />,
    [menu.statistics]: <ChartNoAxesCombined />,
    [menu.settings]: <Settings />,
  }
