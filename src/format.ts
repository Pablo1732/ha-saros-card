const nf = new Map<number, Intl.NumberFormat>();

export function num(v: number | null | undefined, digits = 0): string {
  if (v == null || !isFinite(v)) return "–";
  let f = nf.get(digits);
  if (!f) {
    f = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: digits });
    nf.set(digits, f);
  }
  return f.format(v);
}

/** Stunden lesbar: unter 1 h in Minuten, unter 10 h mit einer Nachkommastelle */
export function hours(h: number): string {
  if (h <= 0) return "0 h";
  if (h < 1) return `${Math.round(h * 60)} min`;
  return `${num(h, h < 10 ? 1 : 0)} h`;
}

const time = (d: Date) => d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

/** „heute 12:30“, „gestern 09:10“, „vor 5 Tagen“, ab 2 Wochen Datum */
export function ago(iso: string | undefined, now = new Date()): string | undefined {
  const d = iso ? new Date(iso) : undefined;
  if (!d || isNaN(d.getTime())) return undefined;
  const day = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((day(now) - day(d)) / 86_400_000);
  if (days <= 0) return `heute ${time(d)}`;
  if (days === 1) return `gestern ${time(d)}`;
  if (days < 14) return `vor ${days} Tagen`;
  return d.toLocaleDateString("de-DE", { day: "numeric", month: "numeric", year: "2-digit" });
}
