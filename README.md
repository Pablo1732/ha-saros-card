# Saros-Karte für Home Assistant

Dashboard-Karte für Roborock-Saugroboter (gebaut für den Saros 20 Flow Complete) im Stil der HA-Kachelkarten. Oben ist der Roboter animiert und zeigt, was er gerade tut — in der Station, wenn er dort steht. Darunter wählst du den Modus und die Stärke, startest oder pausierst die Reinigung und bereitest den Roboter für ein anderes Stockwerk vor. Ein Antippen auf das Zustands-Symbol öffnet Fehler, Tankstatus und Wartung inklusive Zurücksetzen.

## Features
- Animierter Saros 20 Flow (schwarz) samt Station je Zustand: saugt, wischt, fährt heim, lädt, leert, wäscht und trocknet den Mopp, kartiert, pausiert, Fehler, offline
- Akku-Anzeige und Zustands-Symbol: ✓ grün = alles ok, ⚠ orange = Wartung fällig, ❗ rot = Fehler oder Tank
- Status mit Raum, Fläche, Dauer und Fortschrittsbalken
- Modus: Saugen / Saugen & Wischen / Saugen, dann Wischen — Symbole: Gebläse = Saugen, Tropfen = Wischen, `+` = gleichzeitig, `→` = nacheinander
- Saugstärke (Leise … Max, Max+ nur bei reinem Saugen) und Wasserfluss als Stufen-Leiste, je nach Modus eingeblendet
- Starten · Pausieren · Fortsetzen · Abbrechen (mit Bestätigung)
- „Stockwerk vorbereiten“ über ein `input_select` + eigene Automation (siehe unten)
- Wartungs-Menü: Roboter-/Stationsfehler, Frisch-/Schmutzwasser, Mopp, Verschleißteile mit Restzeit und Zurücksetzen (mit Bestätigung), Statistik, „Roboter finden“
- Entitäten werden automatisch über das Gerät erkannt — nur `entity:` nötig
- Farben aus dem HA-Theme (Hauptfarbe, Status- und Saugroboter-Farben), hell und dunkel; läuft auch auf schwachen Geräten (Echo Show)

## Voraussetzungen
- Home Assistant 2025.1 oder neuer
- Roborock-Integration (offiziell)
- Optional: `input_select` + Automation für „Stockwerk vorbereiten“
- Optional: Reset-Tasten aktivieren (siehe Einrichtung)

## Installation (HACS)
1. HACS → ⋮ → **Benutzerdefinierte Repositories** → Repo-URL, Typ **Dashboard**
2. „Saros-Karte“ herunterladen, Browser bzw. App neu laden (bei altem Stand: Cache leeren)
3. Karte aufs Dashboard (am besten volle Breite)

## Einrichtung
- **Reset-Tasten:** Roborock legt sie deaktiviert an. Einstellungen → Geräte → Saros 20 → Entitäten → die fünf „… zurücksetzen“-Tasten aktivieren. Ohne sie ist der Reset-Knopf im Menü ausgegraut.

## Konfiguration
```yaml
type: custom:saros-card
entity: vacuum.saros_20_flow_complete_2
name: Saros
floor_prep: input_select.saros_20_flow_complete_auf_anderes_stockwerk_vorbereiten
floor_back: input_select.saros_20_flow_complete_anderes_stockwerk_status
```

| Option | Pflicht | Bedeutung |
|---|---|---|
| `entity` | ja | `vacuum.*` des Roboters |
| `name` | nein | Name oben links (Standard: Gerätename) |
| `floor_prep` | nein | `input_select` für „Stockwerk vorbereiten“; ohne → Knopf ausgeblendet |
| `modes` | nein | angezeigte Modi, Standard `[vacuum, vac_and_mop, vac_then_mop]`; Roboter mit „Nur Wischen“: `mop` ergänzen |
| `floor_back` | nein | `input_select` für den Rückweg aus dem anderen Stockwerk (nur Anzeige, siehe unten) |
| `mode_script` | nein | Skript, das den Modus setzt und prüft (siehe unten); macht „Saugen, dann Wischen“ antippbar |
| `mode_helper` | nein | Merker-Dropdown des Skripts; damit zeigt die Karte die Wisch-Modi richtig an |
| `maintenance_warn` | nein | Wartung ab so viel % Restlaufzeit melden (Standard `10`) |
| `animations` | nein | `false` = keine Animationen |
| `entities` | nein | Entitäten von Hand zuordnen, falls die Erkennung nicht passt, z. B. `entities: { status: sensor.xyz }` |

Schlüssel für `entities` = `translation_key` der Roborock-Entität (z. B. `status`, `vacuum_error`, `dock_error`, `cleaning_mode`, `mop_intensity`, `main_brush_time_left`, `reset_main_brush_consumable`), dazu `battery` und `charging`.

### Stockwerk vorbereiten
Die Karte stellt nur das `input_select`, den Ablauf macht deine Automation.

| Wert | Karte zeigt | Antippen |
|---|---|---|
| `Bereit` | „Stockwerk vorbereiten“ | stellt auf `Starten` |
| `Starten` / `Läuft` | Lade-Kreis | Bestätigung → `Abbrechen` |
| `Abbrechen` | „Wird abgebrochen…“ | – |
| `Fertig` | Hinweis: Roboter umstellen, ⏻-Taste drücken (ein Banner) | Bestätigung → `Abbrechen` |
| `Gesperrt` | ausgegraut mit Schloss | – |

- Solange `Starten`/`Läuft`/`Abbrechen` aktiv ist, sind Start/Pause ausgeblendet (würden der Automation dazwischenfunken). Hängt `Abbrechen` über 1 min, gibt die Karte die Knöpfe wieder frei.
- Pausiert die Vorbereitung den Roboter, fragt „Fortsetzen“ nach (er könnte schon im anderen Stockwerk stehen).

### Rückweg zur Station
Steht der Roboter im anderen Stockwerk, kann er nicht selbst zur Station. Die Karte zeigt nur an, den Ablauf macht deine Automation.

| Wert | Karte zeigt |
|---|---|
| `OK` | normale Knöpfe |
| `Muss zur Station` | „Zur Station tragen“ (orange), Animation: Hand setzt Roboter in die Station; steht er schon drin: „Station arbeitet“ |
| `Station Läuft` | „Station arbeitet“; oben je nach Status Leeren / Mopp waschen (sonst allgemein) |
| `Kann zurück` | „Roboter an die vorherige Stelle bringen, ⏻-Taste drücken“, Animation: Hand nimmt Roboter heraus |

- In diesen Zuständen (und bei Vorbereitung `Fertig`) sind Start & Co. ausgeblendet, stattdessen **Reinigung abbrechen**
- Reinigung abbrechen → Bestätigung → `vacuum.stop`, Rückweg-Dropdown auf `OK`, Vorbereitung auf `Abbrechen`; Roboter bleibt, wo er ist

### Modus-Skript („Saugen, dann Wischen“)
Die Roborock-Integration kann diesen Modus nicht setzen. [`ha/saros-reinigungsmodus.yaml`](ha/saros-reinigungsmodus.yaml) schickt dafür den Befehl der Roborock-App (`app_set_clean_sequence_type`) und prüft das Ergebnis.
- Ablauf: Befehl senden → Saug-/Wischstärke wiederherstellen → bis 15 s auf Bestätigung warten → 1× wiederholen → sonst HA-Benachrichtigung
- Einrichten: HA → Skripte → Neu → ⋮ → In YAML bearbeiten → Datei einfügen, speichern; Entitäten unter `variables` anpassen; in der Karte `mode_script: script.<ID>`
- Merker: Helfer → Dropdown `input_select.saros_reinigungsmodus` mit Optionen `vacuum`, `vac_and_mop`, `vac_then_mop`; in der Karte `mode_helper:`
- Grenze: Der Roboter meldet die Reihenfolge (gleichzeitig / erst saugen) gar nicht mit, HA sieht nur „Wischen an“ (je nach HA-Version `vac_and_mop` oder `unknown`). Sicher prüfbar ist nur Wischen an/aus; welcher der beiden Wisch-Modi aktiv ist, weiß nur der Merker (falsch, wenn danach in der App umgestellt wurde)
- Tippen auf den schon aktiven Modus setzt ihn erneut — für den Fall, dass in der App umgestellt wurde und die Anzeige veraltet ist
- Auch in Automationen nutzbar: `action: script.saros_reinigungsmodus`, `data: { modus: vac_then_mop }`

### Wartung
| Teil | Lebensdauer | Sensor |
|---|---|---|
| Hauptbürste | 300 h | `main_brush_time_left` |
| Seitenbürste | 200 h | `side_brush_time_left` |
| Luftfilter | 150 h | `filter_time_left` |
| Sensoren reinigen | 30 h | `sensor_time_left` |
| Schmutzfänger (Station) | 150 h | `strainer_time_left` |

Rot: Roboter-/Stationsfehler, Frischwasser leer/Wassermangel, Schmutzwasser voll, offline. Orange: Restlaufzeit ≤ `maintenance_warn` %.

## FAQ
- **„Saugen, dann Wischen“ lässt sich nicht antippen, nur ein Hinweis kommt:** Die Integration kann den Modus nicht setzen (HA meldet ihn als `unknown`, die Karte zeigt ihn dann als aktiv). Lösung: Modus-Skript einrichten (siehe oben) oder in der Roborock-App wählen. Offizielle Unterstützung: [python-roborock#914](https://github.com/Python-roborock/python-roborock/issues/914).
- **Kein „Nur Wischen“:** gibt's beim Saros 20 Flow nicht; die HA-Option `mop` bewirkt dort nichts und ist deshalb ausgeblendet.
- **Reset ausgegraut:** Reset-Tasten nicht aktiviert (siehe Einrichtung). Der Hinweis im Menü verschwindet, sobald alle aktiv sind.
- **Änderungen nach Update nicht sichtbar?** Browser-Cache leeren; Version steht in der Browser-Konsole (`SAROS-CARD <Version> (<Build-Zeit>)`).

## Entwicklung
- `npm install`, dann `npm run dev` → Testseite mit Beispieldaten und Szenario-Knöpfen auf http://localhost:5174 (`?light` = helles Theme)
- `npm run build` → `dist/saros-card.js` (wird mit eingecheckt, HACS lädt diese Datei)
- Build-Ziel ES2019/Chrome 70 wegen älterer Android-WebViews

## Bekannte Grenzen
- Nur Deutsch
- Kein visueller Editor (nur YAML)
- Keine Karte/Raumauswahl — dafür eignet sich eine Kartenkarte (z. B. `image.*` des Roboters)
