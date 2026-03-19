type AnalyticsEventPayload = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, payload: AnalyticsEventPayload = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", eventName, payload);
  }
}

