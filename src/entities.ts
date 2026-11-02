import type { HomeAssistant, SarosConfig } from "./types";

// Zuordnung über Gerät + translation_key statt über Entity-IDs: übersteht Umbenennen,
// „_2“-Suffixe und andere Sprachen. Roboter und Station sind in HA zwei Geräte.

export type EntityMap = Record<string, string | undefined>;

/** translation_keys der Roborock-Integration, die die Karte nutzt */
const KEYS = [
  "status", "vacuum_error", "dock_error", "cleaning_mode", "mop_intensity", "clean_percent", "cleaning_area",
  "cleaning_time", "current_room", "in_cleaning", "water_shortage", "clean_box_empty", "dirty_box_full",
  "water_box_attached", "mop_attached", "main_brush_time_left", "side_brush_time_left", "filter_time_left",
  "sensor_time_left", "strainer_time_left", "reset_main_brush_consumable", "reset_side_brush_consumable",
  "reset_air_filter_consumable", "reset_sensor_consumable", "reset_dock_strainer_consumable",
  "total_cleaning_count", "total_cleaning_area", "total_cleaning_time", "last_clean_end", "mop_drying_remaining_time",
];

export function resolveEntities(hass: HomeAssistant, config: SarosConfig): EntityMap {
  const out: EntityMap = {};
  const reg = hass.entities ?? {};
  const robot = reg[config.entity]?.device_id;
  if (robot) {
    const robotName = hass.devices?.[robot]?.name;
    // Station = Gerät „über“ dem Roboter bzw. gleicher Name + Zusatz („… Dock“)
    const devices = new Set([robot]);
    for (const d of Object.values(hass.devices ?? {})) {
      if (d.via_device_id === robot || (robotName && d.name && d.name !== robotName && d.name.startsWith(robotName))) devices.add(d.id);
    }
    for (const e of Object.values(reg)) {
      if (!e.device_id || !devices.has(e.device_id)) continue;
      const st = hass.states[e.entity_id];
      if (e.translation_key && KEYS.includes(e.translation_key) && !out[e.translation_key]) out[e.translation_key] = e.entity_id;
      // Akku und Laden haben keinen translation_key, nur die Geräteklasse
      const dc = st?.attributes.device_class;
      if (e.entity_id.startsWith("sensor.") && dc === "battery") out.battery ??= e.entity_id;
      if (e.entity_id.startsWith("binary_sensor.") && dc === "battery_charging") out.charging ??= e.entity_id;
    }
  }
  return { ...out, ...config.entities };
}
