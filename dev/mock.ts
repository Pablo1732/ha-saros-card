// Fake-hass für die lokale Testseite: echte Entity-IDs (Saros 20), Dienste ändern den Zustand wie das Gerät.
import type { HassEntity, HomeAssistant } from "../src/types";

const R = "8a6470", D = "acc219";
const B = "saros_20_flow_complete_";
type Def = [id: string, state: string | number, tk: string | undefined, dev: string, attrs?: Record<string, any>];

const defs: Def[] = [
  [`vacuum.${B}2`, "docked", "roborock", R, { friendly_name: "Saros 20 Flow Complete", fan_speed: "max",
    fan_speed_list: ["quiet", "balanced", "turbo", "max", "max_plus", "off", "smart_mode", "custom"] }],
  [`sensor.${B}status_2`, "charging", "status", R],
  [`sensor.${B}batterie_2`, 100, undefined, R, { device_class: "battery", unit_of_measurement: "%" }],
  [`binary_sensor.${B}ladestatus_2`, "on", undefined, R, { device_class: "battery_charging" }],
  [`sensor.${B}staubsauger_fehler_2`, "none", "vacuum_error", R],
  [`sensor.${B}dock_ladestation_fehler_2`, "ok", "dock_error", D],
  [`select.${B}reinigungsmodus_2`, "vac_and_mop", "cleaning_mode", R, { options: ["vacuum", "vac_and_mop", "mop"] }],
  [`select.${B}wisch_intensitat_2`, "medium", "mop_intensity", R, { options: ["off", "slight", "low", "medium", "moderate", "high", "extreme"] }],
  [`sensor.${B}reinigungsfortschritt_2`, 0, "clean_percent", R],
  [`sensor.${B}reinigungsbereich_2`, 50.1, "cleaning_area", R],
  [`sensor.${B}reinigungszeit_2`, 65.17, "cleaning_time", R],
  [`sensor.${B}aktueller_raum_2`, "unknown", "current_room", R],
  [`binary_sensor.${B}wasserknappheit_2`, "off", "water_shortage", R],
  [`binary_sensor.${B}dock_frischwassertank_2`, "off", "clean_box_empty", D],
  [`binary_sensor.${B}dock_schmutzwassertank_2`, "off", "dirty_box_full", D],
  [`binary_sensor.${B}wasserkasten_angebracht_2`, "on", "water_box_attached", R],
  [`binary_sensor.${B}mopp_angebracht_2`, "on", "mop_attached", R],
  [`sensor.${B}verbleibende_zeit_der_hauptburste_2`, 294.17, "main_brush_time_left", R],
  [`sensor.${B}verbleibende_zeit_der_seitenburste_2`, 188.68, "side_brush_time_left", R],
  [`sensor.${B}verbleibende_filterzeit_2`, 144.17, "filter_time_left", R],
  [`sensor.${B}verbleibende_sensorzeit_2`, 18.72, "sensor_time_left", R],
  [`sensor.${B}dock_schmutzfanger_verbleibend_2`, 133, "strainer_time_left", D],
  [`button.${B}hauptbursten_verbrauchsmaterial_zurucksetzen_2`, "unknown", "reset_main_brush_consumable", R],
  [`button.${B}seitenbursten_verbrauchsmaterial_zurucksetzen_2`, "unknown", "reset_side_brush_consumable", R],
  [`sensor.${B}gesamtzahl_reinigungen_2`, 9, "total_cleaning_count", R],
  [`sensor.${B}gesamter_reinigungsbereich_2`, 513.1, "total_cleaning_area", R],
  [`sensor.${B}gesamtreinigungszeit_2`, 11.28, "total_cleaning_time", R],
  [`sensor.${B}letztes_reinigungsende_2`, "2026-10-24T11:38:44+00:00", "last_clean_end", R],
  [`sensor.${B}dock_verbleibende_zeit_zum_trocknen_des_mopps_2`, 0, "mop_drying_remaining_time", D],
  ["script.saros_reinigungsmodus", "off", undefined, ""],
  ["input_select.saros_reinigungsmodus", "vac_and_mop", undefined, "", { options: ["vacuum", "vac_and_mop", "vac_then_mop"] }],
  ["input_select.saros_20_flow_complete_anderes_stockwerk_status", "OK", undefined, "", { options: ["OK", "Muss zur Station", "Kann zurück", "Station Läuft"] }],
  [`input_select.${B}auf_anderes_stockwerk_vorbereiten`, "Bereit", undefined, "", { options: ["Gesperrt", "Läuft", "Fertig", "Bereit", "Abbrechen", "Starten"] }],
];

const states: Record<string, HassEntity> = {};
const entities: NonNullable<HomeAssistant["entities"]> = {};
for (const [id, state, tk, dev, attrs] of defs) {
  states[id] = { entity_id: id, state: String(state), attributes: attrs ?? {}, last_changed: "", last_updated: "" };
  if (dev) entities[id] = { entity_id: id, device_id: dev, platform: "roborock", translation_key: tk };
}

const listeners: (() => void)[] = [];
export const mock = {
  hass: undefined as unknown as HomeAssistant,
  onChange: (fn: () => void) => listeners.push(fn),
  /** Zustand ändern (neues hass-Objekt wie in HA) */
  set(id: string, state?: string | number, attrs?: Record<string, any>) {
    const old = states[id];
    states[id] = { ...old, state: state == null ? old.state : String(state), attributes: { ...old.attributes, ...attrs } };
    build();
  },
  B,
};

const later = (ms: number, fn: () => void) => setTimeout(fn, ms);

function build() {
  mock.hass = {
    states: { ...states },
    entities,
    devices: { [R]: { id: R, name: "Saros 20 Flow Complete" }, [D]: { id: D, name: "Saros 20 Flow Complete Dock", via_device_id: R } },
    themes: { darkMode: !document.documentElement.classList.contains("light") },
    // Verlauf nachgestellt: vor dem unknown stand der Wasserfluss auf „Hoch“
    async callWS(msg: any): Promise<any> {
      if (msg.type === "history/history_during_period") return { [msg.entity_ids[0]]: [{ s: "medium" }, { s: "high" }, { s: "unknown" }] };
      return {};
    },
    async callService(domain, service, data: any = {}) {
      console.log("callService", domain, service, data);
      const vac = `vacuum.${B}2`, st = `sensor.${B}status_2`;
      if (domain === "vacuum" && service === "set_fan_speed") later(400, () => mock.set(vac, undefined, { fan_speed: data.fan_speed }));
      if (domain === "select" || domain === "input_select") later(300, () => mock.set(data.entity_id, data.option));
      if (domain === "vacuum" && service === "start") later(500, () => { mock.set(vac, "cleaning"); mock.set(st, "cleaning"); });
      if (domain === "vacuum" && service === "stop") later(500, () => { mock.set(vac, "idle"); mock.set(st, "idle"); });
      if (domain === "vacuum" && service === "pause") later(500, () => { mock.set(vac, "paused"); mock.set(st, "paused"); });
      if (domain === "vacuum" && service === "return_to_base") later(500, () => { mock.set(vac, "returning"); mock.set(st, "returning_home"); });
      // Modus-Skript nachgestellt: „Saugen, dann Wischen“ meldet HA als unknown
      // wie beim echten Saros: beide Wisch-Modi meldet HA als unknown, der Merker unterscheidet sie
      // wie beim echten Gerät: Stärken springen während des Wechsels kurz auf Standardwerte und zurück
      if (domain === "script") {
        const fan = states[vac].attributes.fan_speed, mop = states[`select.${B}wisch_intensitat_2`].state;
        later(300, () => { mock.set(vac, undefined, { fan_speed: "balanced" }); mock.set(`select.${B}wisch_intensitat_2`, "unknown"); });
        later(700, () => mock.set(`select.${B}wisch_intensitat_2`, "off"));
        later(1100, () => { mock.set(vac, undefined, { fan_speed: fan }); mock.set(`select.${B}wisch_intensitat_2`, mop); });
      }
      // wie beim echten Saros: Select zeigt unterwegs vac_and_mop, dann unknown; Merker erst am Skript-Ende
      if (domain === "script") {
        const wet = data.variables.modus !== "vacuum";
        mock.set(data.entity_id, "on");
        later(400, () => mock.set(`select.${B}reinigungsmodus_2`, wet ? "vac_and_mop" : "vacuum"));
        later(1000, () => wet && mock.set(`select.${B}reinigungsmodus_2`, "unknown"));
        later(2500, () => { mock.set("input_select.saros_reinigungsmodus", data.variables.modus); mock.set(data.entity_id, "off"); });
      }
      // Automation nachgestellt: Starten → Läuft → Fertig, Abbrechen → Bereit
      const prep = `input_select.${B}auf_anderes_stockwerk_vorbereiten`;
      if (data.entity_id === prep && data.option === "Starten") later(1200, () => mock.set(prep, "Läuft"));
      if (data.entity_id === prep && data.option === "Abbrechen") later(2000, () => mock.set(prep, "Bereit"));
    },
  };
  for (const l of listeners) l();
}
build();
(window as any).mock = mock;
