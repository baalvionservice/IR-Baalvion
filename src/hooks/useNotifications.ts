'use client';

import { useState, useEffect, useCallback } from 'react';
import { INITIAL_ALERTS } from '@/lib/alerts-mock';
import { InvestorAlert } from '@/types/alerts';
import { authService } from '@/core/services/auth.service';

/**
 * Event & Alert Hub Hook
 * Prepared for WebSocket/Push API integration.
 */
export function useNotifications() {
  const [alerts, setAlerts] = useState<InvestorAlert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    setIsLoading(true);
    const { role } = await authService.getCurrentUser();
    
    // In future: fetch(`/api/v1/alerts?role=${role}`)
    const filtered = INITIAL_ALERTS.filter(a => 
      a.targetRoles.includes(role) || role === 'admin'
    );
    
    setAlerts(filtered);
    setUnreadCount(filtered.filter(a => !a.read).length);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAlerts();
    window.addEventListener('auth-updated', fetchAlerts);
    return () => window.removeEventListener('auth-updated', fetchAlerts);
  }, [fetchAlerts]);

  const markAsRead = async (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, read: true } : a));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return {
    alerts,
    unreadCount,
    isLoading,
    markAsRead,
    refresh: fetchAlerts
  };
}
