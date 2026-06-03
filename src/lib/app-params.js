const isServer = typeof window === "undefined";
const storage = isServer ? { localStorage: new Map() } : window;
const uo = storage.localStorage;

const nA = (t) => t.replace(/([A-Z])/g, "_$1").toLowerCase();

const Ls = (t, { defaultValue = undefined, removeFromUrl = false } = {}) => {
  if (isServer) return defaultValue;
  const i = `base44_${nA(t)}`;
  const a = new URLSearchParams(window.location.search);
  const l = a.get(t);
  if (removeFromUrl) {
    a.delete(t);
    const d = `${window.location.pathname}${a.toString() ? `?${a.toString()}` : ""}${window.location.hash}`;
    window.history.replaceState({}, document.title, d);
  }
  if (l) {
    try {
      uo.setItem(i, l);
    } catch (e) {}
    return l;
  }
  if (defaultValue) {
    try {
      uo.setItem(i, defaultValue);
    } catch (e) {}
    return defaultValue;
  }
  let c = null;
  try {
    c = uo.getItem(i);
  } catch (e) {}
  return c || null;
};

const rA = () => {
  try {
    if (Ls("clear_access_token") === "true") {
      uo.removeItem("base44_access_token");
      uo.removeItem("token");
    }
  } catch (e) {}
  return {
    appId: Ls("app_id", { defaultValue: "6a1bd299adb5e0a39b0696d4" }),
    token: Ls("access_token", { removeFromUrl: true }),
    fromUrl: Ls("from_url", { defaultValue: !isServer ? window.location.href : "" }),
    functionsVersion: Ls("functions_version", { defaultValue: "prod" }),
    appBaseUrl: Ls("app_base_url", { defaultValue: undefined })
  };
};

export const appParams = rA();
export default appParams;
