'use client';

import { ENV_CONFIG } from "@/config/environment";
import { ApiResponse, ErrorCode } from "@/types/api.types";

/**
 * StorageAdapter handles the low-level persistence logic.
 * In this phase, it uses LocalStorage to simulate a persistent backend.
 */
export class StorageAdapter {
  private key: string;

  constructor(domain: string) {
    this.key = `${ENV_CONFIG.storageKey}_${domain}`;
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private async simulateNetwork(): Promise<void> {
    if (ENV_CONFIG.enableMockLatency) {
      await new Promise(resolve => setTimeout(resolve, ENV_CONFIG.mockLatencyMs));
    }

    if (ENV_CONFIG.enableFailureSimulation) {
      if (Math.random() < ENV_CONFIG.failureRate) {
        throw new Error("Simulated Network Failure");
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
      const raw = localStorage.getItem(this.key);
      const data = raw ? JSON.parse(raw) : [];
      return this.wrapResponse(data);
    } catch (e: any) {
      return this.wrapResponse([], false, { code: 'NETWORK_ERROR', message: e.message });
    }
  }

  async saveAll<T>(data: T[]): Promise<ApiResponse<boolean>> {
    try {
      await this.simulateNetwork();
      localStorage.setItem(this.key, JSON.stringify(data));
      return this.wrapResponse(true);
    } catch (e: any) {
      return this.wrapResponse(false, false, { code: 'UNKNOWN_ERROR', message: e.message });
    }
  }

  /**
   * Helper to initialize storage with default data if empty
   */
  async initialize<T>(defaultData: T[]): Promise<void> {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(this.key);
    // Only initialize if the key doesn't exist OR if it's an empty array
    if (!raw || raw === '[]') {
      localStorage.setItem(this.key, JSON.stringify(defaultData));
    }
  }
}
