// Minimale HA-Typen — nur was wir wirklich nutzen, damit HA-Updates uns nicht berühren.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

/** Eintrag aus hass.entities (Anzeige-Registry, nur aktivierte Entitäten) */
export interface HassEntityReg {
  entity_id: string;
  device_id?: string;
  platform?: string;
  translation_key?: string;
}

export interface HassDevice {
  id: string;
  name?: string;
  via_device_id?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityReg>;
  devices?: Record<string, HassDevice>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  themes?: { darkMode?: boolean };
}

export interface SarosConfig {
  type: string;
  /** vacuum.*-Entität des Roboters */
  entity: string;
  name?: string;
  /** input_select für „Auf anderes Stockwerk vorbereiten“ (ohne: Knopf ausgeblendet) */
  floor_prep?: string;
  /** input_select „Anderes Stockwerk Status“ (OK / Muss zur Station / Kann zurück); nur Anzeige, steuert die Automation */
  floor_back?: string;
  /** Wartung ab so viel % Restlaufzeit als fällig melden (Standard 10) */
  maintenance_warn?: number;
  /** angezeigte Modi (Standard vacuum, vac_and_mop, vac_then_mop); z. B. mop ergänzen für Roboter mit „Nur Wischen“ */
  modes?: string[];
  /** false = keine Animationen */
  animations?: boolean;
  /** Skript, das den Reinigungsmodus setzt und prüft (ha/saros-reinigungsmodus.yaml); macht „Saugen, dann Wischen“ antippbar */
  mode_script?: string;
  /** input_select, in den das Modus-Skript den gesetzten Modus schreibt; unterscheidet die Wisch-Modi, die HA beide als unknown meldet */
  mode_helper?: string;
  /** Entitäten von Hand zuordnen, falls die automatische Erkennung nicht passt (Schlüssel siehe README) */
  entities?: Record<string, string>;
}
