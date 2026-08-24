import {CacheContext, CacheDispatcherContext} from "./cache-context.ts";
import {type ReactNode, useReducer} from "react";
import {cacheContextDataFactory, cacheReducer} from "../domain.ts";

interface Props {
  children: ReactNode;
}

export function CacheContextProvider({ children }: Props) {
  const [cache, dispatch] = useReducer(cacheReducer, cacheContextDataFactory());

  return (
    <CacheContext value={cache}>
      <CacheDispatcherContext value={dispatch}>
        {children}
      </CacheDispatcherContext>
    </CacheContext>
  )
}