export interface BendaharaProfile {
  id: string
  nama: string
  nip: string
  skpd: string
  nomorRekening: string
  periodeTugas: {
    mulai: Date
    selesai: Date
  }
}

export interface DataAnggaran {
  id: string
  kodeKegiatan: string
  namaKegiatan: string
  paguAnggaran: number
  kodeRekening: string
  sumberDana: 'APBD_MURNI' | 'APBD_PERUBAHAN'
  realisasi: number
  sisa: number
}

export interface Penerimaan {
  id: string
  tanggal: Date
  nomorSP2D: string
  jumlah: number
  keterangan: string
  saldoSebelum: number
  saldoSesudah: number
}

export interface Pengeluaran {
  id: string
  tanggal: Date
  penerima: string
  keperluan: string
  jumlah: number
  kodeRekening: string
  nomorBukti: string
  buktiPath?: string
  saldoSebelum: number
  saldoSesudah: number
}

export interface BukuKas {
  id: string
  tanggal: Date
  keterangan: string
  penerimaan: number
  pengeluaran: number
  saldo: number
  jenis: 'PENERIMAAN' | 'PENGELUARAN'
}

export interface SPJReport {
  id: string
  periode: {
    mulai: Date
    selesai: Date
  }
  totalPenerimaan: number
  totalPengeluaran: number
  saldoAkhir: number
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED'
  createdAt: Date
  tanggalSubmit?: Date
}