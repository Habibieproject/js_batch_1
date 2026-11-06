// Dipakai semua file di folder api/: panggil fetch, baca JSON, lempar Error bila gagal
export async function kirim<T>(url: string, opsi?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opsi,
  });
  const isi = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(isi.error ?? `Server error (${res.status})`);
  return isi as T;
}
