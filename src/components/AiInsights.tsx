import { BrainCircuit, Zap, Flame } from 'lucide-react';

interface AiInsightsProps {
  activeProvince: string | null;
}

const getTrendingIssue = (provinceName: string) => {
  const issues: Record<string, string> = {
    'Nasional': 'Pengawasan distribusi pupuk subsidi dan penanganan kekeringan pertanian akibat El Nino mendominasi atensi publik nasional minggu ini.',
    'ACEH': 'Penyelesaian proyek infrastruktur PON XXI dan mitigasi inflasi komoditas pangan lokal.',
    'SUMATERA UTARA': 'Penertiban parkir liar di Medan dan perbaikan jalan lintas provinsi di pantai barat.',
    'SUMATERA BARAT': 'Penanganan pasca-bencana banjir bandang lahar dingin Gunung Marapi dan restorasi lahan pertanian.',
    'RIAU': 'Kesiapsiagaan karhutla menghadapi musim kemarau kering dan optimalisasi PSR (Peremajaan Sawit Rakyat).',
    'JAMBI': 'Penyelesaian konflik operasional angkutan batu bara dan percepatan pembangunan jalan khusus logistik.',
    'SUMATERA SELATAN': 'Restorasi lahan gambut untuk mencegah kebakaran hutan dan optimalisasi LRT Palembang.',
    'BENGKULU': 'Antisipasi abrasi pantai barat Sumatera dan perbaikan konektivitas antarkabupaten.',
    'LAMPUNG': 'Perbaikan infrastruktur jalan penghubung sentra produksi pertanian dan pengamanan jalur penyeberangan Bakauheni.',
    'KEPULAUAN BANGKA BELITUNG': 'Tata kelola hilirisasi industri timah pasca-penertiban tambang ilegal dan pemulihan ekonomi lokal.',
    'KEPULAUAN RIAU': 'Optimalisasi kawasan FTZ (Free Trade Zone) Batam-Bintan-Karimun dan pengawasan batas laut terluar.',
    'DAERAH KHUSUS IBUKOTA JAKARTA': 'Persiapan peralihan status ibu kota (DKJ) dan penanganan banjir rob di wilayah pesisir Jakarta Utara.',
    'JAWA BARAT': 'Rehabilitasi TPA Sarimukti dan penataan transportasi publik terintegrasi di Bandung Raya.',
    'JAWA TENGAH': 'Mitigasi banjir tahunan pesisir Demak-Semarang dan percepatan pembangunan kawasan industri Batang.',
    'DAERAH ISTIMEWA YOGYAKARTA': 'Manajemen sampah perkotaan pasca-penutupan TPST Piyungan dan penataan kawasan sumbu filosofi.',
    'JAWA TIMUR': 'Antisipasi kekeringan lahan pertanian di wilayah Tapal Kuda dan akselerasi digitalisasi UMKM Jawa Timur.',
    'BANTEN': 'Penanganan stunting di wilayah pedesaan Lebak-Pandeglang dan pengawasan kualitas udara zona industri Tangerang.',
    'BALI': 'Penataan ulang pariwisata massal (overtourism), penegakan hukum izin turis asing, dan manajemen kemacetan Ubud-Canggu.',
    'NUSA TENGGARA BARAT': 'Persiapan ajang internasional MotoGP Mandalika dan penanganan krisis air bersih di Lombok Utara.',
    'NUSA TENGGARA TIMUR': 'Akselerasi pembangunan pos lintas batas negara (PLBN) dan penanganan rawan pangan akibat kekeringan.',
    'KALIMANTAN BARAT': 'Pencegahan kebakaran hutan gambut di Kubu Raya dan pengawasan perdagangan lintas batas Malaysia.',
    'KALIMANTAN TENGAH': 'Optimalisasi food estate Kapuas dan mitigasi kabut asap akibat pembakaran lahan gambut.',
    'KALIMANTAN SELATAN': 'Hilirisasi industri batubara dan pemulihan pasca-tambang ilegal di kawasan Pegunungan Meratus.',
    'KALIMANTAN TIMUR': 'Akselerasi pembangunan infrastruktur pendukung Ibu Kota Nusantara (IKN) dan penyerapan tenaga kerja lokal.',
    'KALIMANTAN UTARA': 'Pembangunan Pembangkit Listrik Tenaga Air (PLTA) Kayan dan pengembangan KIPI Tanah Kuning.',
    'SULAWESI UTARA': 'Pengembangan pariwisata KEK Likupang dan peningkatan volume ekspor komoditas kelapa.',
    'SULAWESI TENGAH': 'Hilirisasi industri nikel di Morowali dan pemulihan infrastruktur pasca-gempa Palu.',
    'SULAWESI SELATAN': 'Modernisasi irigasi sawah untuk mempertahankan lumbung pangan dan penanganan kemacetan Kota Makassar.',
    'SULAWESI TENGGARA': 'Pengawasan tambang nikel di Konawe dan pengembangan sektor pariwisata bahari Wakatobi.',
    'GORONTALO': 'Pemberantasan penyelundupan kosmetik ilegal and program ketahanan pangan jagung lokal.',
    'SULAWESI BARAT': 'Akselerasi rehabilitasi infrastruktur pasca-gempa Mamuju dan pengembangan komoditas kakao unggulan.',
    'MALUKU': 'Percepatan penetapan Maluku sebagai Lumbung Ikan Nasional dan penataan transportasi laut antarpulau.',
    'MALUKU UTARA': 'Aktivitas pertambangan nikel di Weda Bay dan dampak ekonomi terhadap kesejahteraan masyarakat lingkar tambang.',
    'PAPUA': 'Percepatan pembangunan infrastruktur trans-Papua dan optimalisasi dana otonomi khusus (Otsus) Papua.',
    'PAPUA BARAT': 'Konservasi keanekaragaman hayati pariwisata Raja Ampat dan pengembangan sektor agroindustri.',
  };

  const nameUpper = provinceName.toUpperCase();
  const matchedKey = Object.keys(issues).find(k => nameUpper.includes(k) || k.includes(nameUpper));
  
  return matchedKey ? issues[matchedKey] : `Peningkatan sinergi program pembangunan daerah dan mitigasi risiko dampak perubahan cuaca lokal di ${provinceName}.`;
};

export function AiInsights({ activeProvince }: AiInsightsProps) {
  const isProv = activeProvince !== null;
  const name = isProv ? activeProvince : 'Nasional';

  return (
    <div className="bg-brand-card/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-5 flex flex-col gap-4 shadow-lg shadow-blue-500/10 transition-colors h-full">
      <div className="flex items-center gap-3 mb-1">
        <BrainCircuit className="w-6 h-6 text-blue-500" />
        <div className="flex flex-col">
          <h3 className="font-bold text-brand-text tracking-wide uppercase text-sm">
            AI Insight & Rekomendasi
          </h3>
          <p className="text-[10px] text-brand-textMuted uppercase mt-0.5 font-semibold text-cyan-500">
            Analisis: {name}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {/* Trending Issue Banner */}
        <div className="mb-4 border border-rose-500/30 bg-rose-500/5 rounded-xl p-3.5 flex gap-3 shadow-md shadow-rose-500/5">
          <div className="w-8 h-8 shrink-0 bg-rose-500/20 text-rose-500 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <Flame className="w-5 h-5 animate-pulse text-rose-500" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">Isu Hangat Daerah</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            </div>
            <p className="text-xs font-semibold text-brand-text leading-relaxed">
              {getTrendingIssue(name)}
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {[
            isProv ? `Data ${name} menunjukkan korelasi kuat antara kemiskinan dan kapasitas fiskal.` : 'Provinsi prioritas menunjukkan korelasi antara kemiskinan, stunting, dan kapasitas fiskal.',
            isProv ? `Indeks SPBE di ${name} menunjukkan tren positif dibanding tahun lalu.` : 'Daerah dengan skor SPBE tinggi cenderung memiliki kualitas layanan publik lebih baik.',
            isProv ? `Perlu atensi khusus pada daerah padat penduduk di ${name}.` : 'Perlu intervensi terarah pada wilayah dengan TPT tinggi dan pertumbuhan ekonomi melambat.',
            'Replikasi inovasi daerah potensial pada sektor pelayanan publik dan digital governance.'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <p className="text-sm text-brand-textMuted leading-relaxed font-medium">
                {item}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 border border-amber-500/50 bg-amber-500/10 rounded-xl p-4 flex gap-4">
          <div className="w-10 h-10 shrink-0 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            <Zap className="w-6 h-6 text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-amber-500 font-bold text-sm tracking-wide mb-2 uppercase">
              Rekomendasi Cepat
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                isProv ? `Fokuskan dukungan pada kab/kota berisiko di ${name}` : 'Fokuskan dukungan pada daerah berisiko tinggi',
                'Dorong replikasi inovasi yang terbukti berhasil',
                'Lakukan monitoring berkala berbasis data real-time'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 shrink-0 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-xs text-brand-text font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
