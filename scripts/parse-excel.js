import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.join(__dirname, '../source/Perhitungan daerah.xlsx');
const outputPath = path.join(__dirname, '../src/data/regionsData.ts');

if (!fs.existsSync(excelPath)) {
  console.error('File Excel tidak ditemukan di:', excelPath);
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);

// Helper to normalize keys and convert string values to numbers if needed
const cleanRow = (row, mapping) => {
  const cleaned = {};
  for (const [newKey, oldKey] of Object.entries(mapping)) {
    const val = row[oldKey];
    if (val === undefined || val === null) {
      cleaned[newKey] = 0;
    } else if (typeof val === 'number') {
      cleaned[newKey] = val;
    } else {
      const parsed = parseFloat(val);
      cleaned[newKey] = isNaN(parsed) ? val : parsed;
    }
  }
  return cleaned;
};

// Mapping for Provinsi sheet
const provMapping = {
  no: 'No',
  regional: 'Regional',
  name: 'Daerah',
  ipm: 'IPM',
  ikf: 'IKF',
  tik: 'TIK',
  idi: 'IDI',
  skorIpm: 'Skor IPM',
  skorIkf: 'Skor IKF',
  skorTik: 'Skor TIK',
  skorIdi: 'Skor IDI',
  avgSkor: 'Rata-rata Skor',
  rankNasional: 'Ranking Nasional',
  rankRegional: 'Ranking Regional'
};

// Mapping for KabKota sheet
const kabMapping = {
  no: 'No',
  regional: 'Regional',
  provinsiName: 'Provinsi',
  name: 'Kab/Kota',
  ipm: 'IPM',
  ikf: 'IKF',
  tik: 'TIK',
  idi: 'IDI',
  skorIpm: 'Skor IPM',
  skorIkf: 'Skor IKF',
  skorTik: 'Skor TIK',
  skorIdi: 'Skor IDI',
  avgSkor: 'Rata-rata Skor',
  rankNasional: 'Ranking Nasional',
  rankRegional: 'Ranking Regional'
};

// Read Provinsi sheet
const provSheet = workbook.Sheets['Provinsi'];
const rawProvData = XLSX.utils.sheet_to_json(provSheet);
const provinces = rawProvData.map(row => cleanRow(row, provMapping));

// Read KabKota sheet
const kabSheet = workbook.Sheets['KabKota'];
const rawKabData = XLSX.utils.sheet_to_json(kabSheet);
const kabKotas = rawKabData.map(row => cleanRow(row, kabMapping));

// Nest KabKota under their respective Provinces
// Clean up regional strings to be consistent (e.g. BALI - NUSA TENGGARA vs Bali - Nusa Tenggara)
const normalizeRegional = (reg) => {
  if (!reg) return '';
  return reg.trim().toUpperCase();
};

provinces.forEach(p => {
  p.regional = normalizeRegional(p.regional);
  p.kabKotas = kabKotas.filter(k => {
    // Check if the province names match (ignoring case)
    const pName = p.name.trim().toLowerCase();
    const kProvName = k.provinsiName ? k.provinsiName.trim().toLowerCase() : '';
    return pName === kProvName;
  }).map(k => {
    k.regional = normalizeRegional(k.regional);
    return k;
  });
});

// Group data by Regional
const regionalsMap = {};
provinces.forEach(p => {
  const reg = p.regional;
  if (!regionalsMap[reg]) {
    regionalsMap[reg] = {
      name: reg,
      provinces: []
    };
  }
  regionalsMap[reg].provinces.push(p);
});

const regionals = Object.values(regionalsMap);

// Calculate national averages
const count = provinces.length;
const nationalAverages = {
  ipm: provinces.reduce((sum, p) => sum + p.ipm, 0) / count,
  ikf: provinces.reduce((sum, p) => sum + p.ikf, 0) / count,
  tik: provinces.reduce((sum, p) => sum + p.tik, 0) / count,
  idi: provinces.reduce((sum, p) => sum + p.idi, 0) / count,
  avgSkor: provinces.reduce((sum, p) => sum + p.avgSkor, 0) / count,
  totalProvinces: count,
  totalKabKota: kabKotas.length
};

// Generate file content
const fileContent = `// Tipe Data untuk Dashboard (Dibuat otomatis oleh parse-excel.js)

export interface KabKota {
  no: number;
  regional: string;
  provinsiName: string;
  name: string;
  ipm: number;
  ikf: number;
  tik: number;
  idi: number;
  skorIpm: number;
  skorIkf: number;
  skorTik: number;
  skorIdi: number;
  avgSkor: number;
  rankNasional: number;
  rankRegional: number;
}

export interface Province {
  no: number;
  regional: string;
  name: string;
  ipm: number;
  ikf: number;
  tik: number;
  idi: number;
  skorIpm: number;
  skorIkf: number;
  skorTik: number;
  skorIdi: number;
  avgSkor: number;
  rankNasional: number;
  rankRegional: number;
  kabKotas: KabKota[];
}

export interface Regional {
  name: string;
  provinces: Province[];
}

export interface NationalAverages {
  ipm: number;
  ikf: number;
  tik: number;
  idi: number;
  avgSkor: number;
  totalProvinces: number;
  totalKabKota: number;
}

export const provincesData: Province[] = ${JSON.stringify(provinces, null, 2)};

export const regionalsData: Regional[] = ${JSON.stringify(regionals, null, 2)};

export const nationalAverages: NationalAverages = ${JSON.stringify(nationalAverages, null, 2)};
`;

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Sukses menulis data wilayah ke:', outputPath);
console.log(`Berhasil mengekspor ${provinces.length} provinsi dan ${kabKotas.length} kabupaten/kota.`);
