
export * from './theme';
export * from './language';

export interface NavigationItem {
  key: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
