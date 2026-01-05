'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Upload, 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Calendar,
  Folder
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function ArsipDigital() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('semua')

  // Mock data
  const documents = [
    {
      id: '1',
      nama: 'Kuitansi ATK Kantor - KWT-001-2024.pdf',
      kategori: 'kuitansi',
      ukuran: '245 KB',
      tanggalUpload: new Date('2024-01-05'),
      jenis: 'pdf',
      transaksiId: 'TRX-001',
      keterangan: 'Bukti pembelian ATK kantor'
    },
    {
      id: '2',
      nama: 'SP2D-001-2024.jpg',
      kategori: 'sp2d',
      ukuran: '1.2 MB',
      tanggalUpload: new Date('2024-01-04'),
      jenis: 'image',
      transaksiId: 'TRX-002',
      keterangan: 'Surat Perintah Pencairan Dana'
    },
    {
      id: '3',
      nama: 'Nota Dinas Perjalanan.pdf',
      kategori: 'nota_dinas',
      ukuran: '180 KB',
      tanggalUpload: new Date('2024-01-03'),
      jenis: 'pdf',
      transaksiId: 'TRX-003',
      keterangan: 'Nota dinas perjalanan dinas'
    },
    {
      id: '4',
      nama: 'Laporan SPJ Desember 2023.pdf',
      kategori: 'laporan',
      ukuran: '890 KB',
      tanggalUpload: new Date('2024-01-02'),
      jenis: 'pdf',
      transaksiId: null,
      keterangan: 'Laporan SPJ bulan Desember'
    }
  ]

  const categories = [
    { value: 'semua', label: 'Semua Dokumen' },
    { value: 'kuitansi', label: 'Kuitansi' },
    { value: 'sp2d', label: 'SP2D' },
    { value: 'nota_dinas', label: 'Nota Dinas' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  const getFileIcon = (jenis: string) => {
    switch (jenis) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'image':
        return <Image className="h-8 w-8 text-blue-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getCategoryColor = (kategori: string) => {
    switch (kategori) {
      case 'kuitansi':
        return 'bg-green-100 text-green-800'
      case 'sp2d':
        return 'bg-blue-100 text-blue-800'
      case 'nota_dinas':
        return 'bg-yellow-100 text-yellow-800'
      case 'laporan':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'semua' || doc.kategori === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Arsip Digital</h2>
        <p className="text-sm sm:text-base text-gray-600">Kelola dokumen dan bukti digital</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Dokumen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop file atau klik untuk upload
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Mendukung PDF, JPG, PNG (Max 5MB)
            </p>
            <Button className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Pilih File</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="relative z-10">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Cari Dokumen</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4 relative z-10">
            <Input
              label="Pencarian"
              placeholder="Cari berdasarkan nama file atau keterangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 relative z-20"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <Folder className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{documents.length}</p>
            <p className="text-xs sm:text-sm text-gray-600">Total Dokumen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mx-auto mb-2" />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              {documents.filter(d => d.jenis === 'pdf').length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">File PDF</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <Image className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              {documents.filter(d => d.jenis === 'image').length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Gambar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              {documents.filter(d => {
                const today = new Date()
                const docDate = d.tanggalUpload
                return docDate.getMonth() === today.getMonth() && 
                       docDate.getFullYear() === today.getFullYear()
              }).length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Bulan Ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Daftar Dokumen</CardTitle>
            <span className="text-sm text-gray-500 font-medium">
              {filteredDocuments.length} dari {documents.length} dokumen
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(doc.jenis)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {doc.nama}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.kategori)}`}>
                        {categories.find(c => c.value === doc.kategori)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {doc.keterangan}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>{doc.ukuran}</span>
                        <span>{formatDate(doc.tanggalUpload)}</span>
                        {doc.transaksiId && (
                          <span>ID: {doc.transaksiId}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop List Layout */}
          <div className="hidden sm:block space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {getFileIcon(doc.jenis)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {doc.nama}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.kategori)}`}>
                      {categories.find(c => c.value === doc.kategori)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    {doc.keterangan}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{doc.ukuran}</span>
                    <span>{formatDate(doc.tanggalUpload)}</span>
                    {doc.transaksiId && (
                      <span>ID: {doc.transaksiId}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" title="Lihat" className="p-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Download" className="p-2">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Hapus" className="p-2">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || selectedCategory !== 'semua' 
                ? 'Tidak ada dokumen yang sesuai dengan filter'
                : 'Belum ada dokumen yang diupload'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}