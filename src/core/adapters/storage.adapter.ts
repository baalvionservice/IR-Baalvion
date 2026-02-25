'use client';

import { ENV_CONFIG } from "@/config/environment";
import { ApiResponse, ErrorCode } from "@/types/api.types";

/**
 * PRODUCTION AUDIT NOTE:
 * Enhanced StorageAdapter with better hydration safety and error normalization.
 */
export class StorageAdapter {
  private key: string;

  constructor(domain: string) {
    this.key = `${ENV_CONFIG.storageKey}_${domain}`;
  }

  private generateRequestId(): string {
    return `req_${Math.random().toString(36).substring(2, 11)}`;
  }

  private async simulateNetwork(): Promise<void> {
    if (ENV_CONFIG.enableMockLatency) {
      await new Promise(resolve => setTimeout(resolve, ENV_CONFIG.mockLatencyMs));
    }

    if (ENV_CONFIG.enableFailureSimulation) {
      // 5% controlled failure rate for resilience testing
      if (Math.random() < 0.05) {
        throw new Error("MOCK_NETWORK_TIMEOUT");
      }
    }
  }

  private wrapResponse<T>(data: T | undefined, success: boolean = true, error?: { code: ErrorCode; message: string }): ApiResponse<T> {
    return {
      success,
      data,
      error,
      meta: {
        timestamp: Date.now(),
        requestId: this.generateRequestId(),
        environment: ENV_CONFIG.mode
      }
    };
  }

  async getAll<T>(): Promise<ApiResponse<T[]>> {
    try {
      await this.simulateNetwork();
      
      // SSR Safeguard
      if (typeof window === 'undefined') {
        return this.wrapResponse([]);
      }

      const raw = localStorage.getItem(this.key);
      const data = raw ? JSON.parse(raw) : [];
      
      if (ENV_CONFIG.enableConsoleAudit) {
        console.info(`[StorageAdapter] GET ALL from ${this.key}`, { count: data.length });
      }

      return this.wrapResponse(data);
    } catch (e: any) {
      console.error(`[StorageAdapter] GET ALL Failure: ${this.key}`, e);
      return this.wrapResponse([], false, { 
        code: 'NETWORK_ERROR', 
        message: e.message === "MOCK_NETWORK_TIMEOUT" ? "Connection timed out. Please retry." : "A transient storage error occurred." 
      });
    }
  }

  async saveAll<T>(data: T[]): Promise<ApiResponse<boolean>> {
    try {
      await this.simulateNetwork();
      
      if (typeof window === 'undefined') return this.wrapResponse(false);
      
      localStorage.setItem(this.key, JSON.stringify(data));
      
      if (ENV_CONFIG.enableConsoleAudit) {
        console.info(`[StorageAdapter] PERSISTED to ${this.key}`);
      }

      return this.wrapResponse(true);
    } catch (e: any) {
      return this.wrapResponse(false, false, { code: 'UNKNOWN_ERROR', message: "Failed to persist data to local storage." });
    }
  }

  /**
   * Defensive initialization to prevent 'empty site' state on first run.
   */
  async initialize<T>(defaultData: T[]): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const existing = localStorage.getItem(this.key);
    if (!existing || existing === '[]') {
      localStorage.setItem(this.key, JSON.stringify(defaultData));
      if (ENV_CONFIG.enableConsoleAudit) {
        console.info(`[StorageAdapter] SEEDED ${this.key} with mock dataset.`);
      }
    }
  }
}
