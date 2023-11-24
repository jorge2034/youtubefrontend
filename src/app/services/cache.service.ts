import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly ttl = 1000 * 60 * 60 * 2; // 2 horas
  private readonly prefix = 'cache-';
  private readonly storage = localStorage;

  constructor() {}

  set(key: string, value: any) {
    const cacheKey = this.prefix + key;
    const cacheValue = JSON.stringify({
      value,
      expiresAt: Date.now() + this.ttl,
    });
    this.storage.setItem(cacheKey, cacheValue);
  }

  get(key: string) {
    const cacheKey = this.prefix + key;
    const cacheValue = this.storage.getItem(cacheKey);
    if (!cacheValue) {
      return null;
    }
    const { value, expiresAt } = JSON.parse(cacheValue);
    if (expiresAt < Date.now()) {
      this.storage.removeItem(cacheKey);
      return null;
    }
    return value;
  }
}
