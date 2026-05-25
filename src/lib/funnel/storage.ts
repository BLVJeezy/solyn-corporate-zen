import { FunnelState, INITIAL_STATE } from "./types";

const KEY = "solyn_funnel_v1";

export function loadFunnelState(): FunnelState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return INITIAL_STATE;
    return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveFunnelState(state: FunnelState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

export function clearFunnelState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
