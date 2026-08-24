import {createContext, useContext} from "react";
import type {CacheContextData, CacheDispatcher} from "../types.ts";

export const CacheContext = createContext<CacheContextData | null>(null)
export const CacheDispatcherContext = createContext<CacheDispatcher | null>(null)

export function useCache() {
  return useContext(CacheContext)
}

export function useCacheDispatcher() {
  return useContext(CacheDispatcherContext)
}