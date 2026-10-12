import React, { useState } from 'react';
import type { HeroRole } from '../types';

interface HeroAvatarProps {
  name: string;
  nameJa: string;
  role: HeroRole;
  avatarUrl: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const HeroAvatar: React.FC<HeroAvatarProps> = ({
  name,
  nameJa,
  role,
  avatarUrl,
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl'
  };

  const roleColor = {
    tank: 'var(--tank-color)',
    damage: 'var(--damage-color)',
    support: 'var(--support-color)'
  }[role];

  return (
    <div
      className={`hero-avatar-container ${sizeClasses[size]} ${className}`}
      style={{ '--role-color': roleColor } as React.CSSProperties}
    >
      {!hasError ? (
        <img
          src={avatarUrl}
          alt={`${name} (${nameJa})`}
          className="hero-avatar-img"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="hero-avatar-fallback">
          <span className="fallback-initial font-display">{name.substring(0, 2).toUpperCase()}</span>
        </div>
      )}
      <div className="role-indicator-badge" title={role.toUpperCase()}>
        {role === 'tank' && '🛡️'}
        {role === 'damage' && '⚔️'}
        {role === 'support' && '➕'}
      </div>
    </div>
  );
};
