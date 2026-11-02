// Deutsche Texte zu den Roborock-Zuständen. Unbekannte Werte → lesbar gemachter Rohwert.

export const label = (map: Record<string, string>, v?: string) =>
  v == null ? "–" : map[v] ?? v.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

export const STATUS: Record<string, string> = {
  starting: "Startet",
  charger_disconnected: "Ladestation getrennt",
  idle: "Bereit",
  remote_control_active: "Fernsteuerung",
  cleaning: "Reinigt",
  returning_home: "Fährt zur Station",
  manual_mode: "Manueller Modus",
  charging: "Lädt",
  charging_problem: "Ladeproblem",
  paused: "Pausiert",
  spot_cleaning: "Spot-Reinigung",
  error: "Fehler",
  shutting_down: "Fährt herunter",
  updating: "Update läuft",
  docking: "Dockt an",
  going_to_target: "Fährt zum Ziel",
  zoned_cleaning: "Reinigt Zone",
  segment_cleaning: "Reinigt Räume",
  emptying_the_bin: "Leert Staubbehälter",
  washing_the_mop: "Wäscht Mopp",
  going_to_wash_the_mop: "Fährt zur Moppwäsche",
  back_to_dock_washing_duster: "Fährt zur Moppwäsche",
  in_call: "Videoanruf",
  mapping: "Kartiert",
  patrol: "Patrouille",
  attaching_the_mop: "Bringt Mopp an",
  detaching_the_mop: "Legt Mopp ab",
  charging_complete: "Voll geladen",
  device_offline: "Offline",
  locked: "Gesperrt",
  air_drying_stopping: "Beendet Trocknung",
  robot_status_mopping: "Wischt",
  clean_mop_cleaning: "Saugt & wischt",
  clean_mop_mopping: "Wischt",
  segment_mopping: "Wischt Räume",
  segment_clean_mop_cleaning: "Saugt & wischt Räume",
  segment_clean_mop_mopping: "Wischt Räume",
  zoned_mopping: "Wischt Zone",
  zoned_clean_mop_cleaning: "Saugt & wischt Zone",
  zoned_clean_mop_mopping: "Wischt Zone",
};

/** Reinigungsmodus-Auswahl; „Saugen dann Wischen“ erscheint, sobald die Integration die Option anbietet */
export const MODES: Record<string, string> = {
  vacuum: "Saugen",
  vac_and_mop: "Saugen & Wischen",
  vac_then_mop: "Saugen, dann Wischen",
  vac_followed_by_mop: "Saugen, dann Wischen",
  vacuum_then_mop: "Saugen, dann Wischen",
  mop: "Wischen",
};

/** Symbole je Modus: Gebläse = Saugen, Tropfen = Wischen, Pfeil = nacheinander */
export const MODE_ICONS: Record<string, string[]> = {
  vacuum: ["mdi:fan"],
  vac_and_mop: ["mdi:fan", "mdi:plus", "mdi:water"],
  vac_then_mop: ["mdi:fan", "mdi:arrow-right", "mdi:water"],
  vac_followed_by_mop: ["mdi:fan", "mdi:arrow-right", "mdi:water"],
  vacuum_then_mop: ["mdi:fan", "mdi:arrow-right", "mdi:water"],
  mop: ["mdi:water"],
};

/** Saugstufen in Reihenfolge (Rest der fan_speed_list wird ignoriert bzw. als Sonderstufe gezeigt) */
export const FAN_LEVELS = ["quiet", "balanced", "turbo", "max", "max_plus"];
export const FAN: Record<string, string> = {
  quiet: "Leise", balanced: "Ausgewogen", turbo: "Turbo", max: "Max", max_plus: "Max+", off: "Aus",
  smart_mode: "Smart", custom: "Benutzerdefiniert",
};

export const MOP_LEVELS = ["slight", "low", "medium", "moderate", "high", "extreme"];
export const MOP: Record<string, string> = {
  off: "Aus", slight: "Minimal", low: "Niedrig", medium: "Mittel", moderate: "Erhöht", high: "Hoch", extreme: "Extrem",
  smart_mode: "Smart", custom: "Benutzerdefiniert",
};

export const VACUUM_ERROR: Record<string, string> = {
  lidar_blocked: "LiDAR-Sensor blockiert",
  bumper_stuck: "Stoßfänger klemmt",
  wheels_suspended: "Räder hängen in der Luft",
  cliff_sensor_error: "Absturzsensor-Fehler",
  main_brush_jammed: "Hauptbürste blockiert",
  side_brush_jammed: "Seitenbürste blockiert",
  wheels_jammed: "Räder blockiert",
  robot_trapped: "Roboter steckt fest",
  no_dustbin: "Staubbehälter fehlt",
  strainer_error: "Filter-Fehler",
  compass_error: "Kompass-Fehler",
  low_battery: "Akku zu schwach",
  charging_error: "Ladefehler",
  battery_error: "Akku-Fehler",
  wall_sensor_dirty: "Wandsensor verschmutzt",
  robot_tilted: "Roboter steht schräg",
  side_brush_error: "Seitenbürsten-Fehler",
  fan_error: "Gebläse-Fehler",
  dock: "Problem an der Station",
  optical_flow_sensor_dirt: "Bodensensor verschmutzt",
  vertical_bumper_pressed: "Oberer Stoßfänger gedrückt",
  dock_locator_error: "Station nicht gefunden",
  return_to_dock_fail: "Rückkehr zur Station fehlgeschlagen",
  nogo_zone_detected: "In Sperrzone",
  visual_sensor: "Kamera verschmutzt",
  light_touch: "Lichtsensor-Fehler",
  vibrarise_jammed: "Wischmodul blockiert",
  robot_on_carpet: "Roboter auf Teppich",
  filter_blocked: "Filter verstopft",
  invisible_wall_detected: "Virtuelle Wand erkannt",
  cannot_cross_carpet: "Kann Teppich nicht überqueren",
  internal_error: "Interner Fehler",
  clear_water_box_hoare: "Frischwassertank prüfen",
  dirty_water_box_hoare: "Schmutzwassertank prüfen",
  clear_water_box_exception: "Frischwassertank-Fehler",
  temperature_protection: "Überhitzungsschutz",
  water_carriage_drop: "Wischmodul abgefallen",
  audio_error: "Lautsprecher-Fehler",
};

export const DOCK_ERROR: Record<string, string> = {
  no_dustbin_or_filter: "Staubbeutel oder Filter fehlt",
  auto_empty_dock_fan_error: "Absauggebläse defekt",
  duct_blockage: "Absaugkanal verstopft",
  auto_empty_dock_voltage_error: "Spannungsfehler",
  water_empty: "Frischwasser leer",
  waste_water_tank_full: "Schmutzwassertank voll",
  maintenance_brush_jammed: "Reinigungsbürste blockiert",
  dirty_tank_latch_open: "Schmutzwassertank-Verriegelung offen",
  no_dustbin: "Staubbehälter fehlt",
  cleaning_tank_full_or_blocked: "Reinigungswanne voll oder verstopft",
};

/** Verschleißteile: Restzeit-Sensor, Reset-Taste, Standard-Lebensdauer in h (Roborock-Vorgabe) */
export const CONSUMABLES = [
  { key: "main_brush_time_left", reset: "reset_main_brush_consumable", name: "Hauptbürste", icon: "mdi:brush", life: 300 },
  { key: "side_brush_time_left", reset: "reset_side_brush_consumable", name: "Seitenbürste", icon: "mdi:fan", life: 200 },
  { key: "filter_time_left", reset: "reset_air_filter_consumable", name: "Luftfilter", icon: "mdi:air-filter", life: 150 },
  { key: "sensor_time_left", reset: "reset_sensor_consumable", name: "Sensoren reinigen", icon: "mdi:eye-outline", life: 30 },
  { key: "strainer_time_left", reset: "reset_dock_strainer_consumable", name: "Schmutzfänger (Station)", icon: "mdi:filter-outline", life: 150 },
];

/** Floor-Prep-Dropdown (input_select) — Werte müssen mit der Automation übereinstimmen */
export const PREP = { locked: "Gesperrt", ready: "Bereit", start: "Starten", running: "Läuft", done: "Fertig", cancel: "Abbrechen" };
/** Werte des input_select „Anderes Stockwerk Status“ (Rückweg zur Station, steuert die Automation) */
export const BACK = { ok: "OK", carry: "Muss zur Station", running: "Station Läuft", done: "Kann zurück" };
