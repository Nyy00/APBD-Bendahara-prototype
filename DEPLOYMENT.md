# Panduan Deployment APBD Bendahara

## Persiapan Production

### 1. Environment Variables
Buat file `.env.local` untuk konfigurasi production:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/apbd_bendahara"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# File Upload
UPLOAD_DIR="/uploads"
MAX_FILE_SIZE=5242880

# Email (untuk notifikasi)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# API Keys
ENCRYPTION_KEY="your-encryption-key"
```

### 2. Build Production
```bash
npm run build
npm run start
```

### 3. Database Setup
```sql
-- Buat database PostgreSQL
CREATE DATABASE apbd_bendahara;

-- Buat user khusus
CREATE USER bendahara_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE apbd_bendahara TO bendahara_user;
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di Vercel
3. Set environment variables
4. Deploy otomatis

### Option 2: VPS/Server
1. Setup Node.js dan PM2
2. Clone repository
3. Install dependencies
4. Setup reverse proxy (Nginx)
5. Configure SSL certificate

### Option 3: Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] File upload validation
- [ ] Rate limiting implemented
- [ ] CORS configured properly
- [ ] Security headers added

## Performance Optimization

- [ ] Image optimization enabled
- [ ] Static files cached
- [ ] Database queries optimized
- [ ] CDN configured
- [ ] Compression enabled

## Monitoring & Backup

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database backup scheduled
- [ ] File backup configured
- [ ] Health checks implemented

## Mobile App (PWA)

Aplikasi sudah dikonfigurasi sebagai PWA:
- Manifest file tersedia
- Service worker (opsional)
- Responsive design
- Offline capability (future)

## Maintenance

### Regular Tasks
- Database backup harian
- Log rotation
- Security updates
- Performance monitoring
- User feedback review

### Update Process
1. Test di staging environment
2. Backup database dan files
3. Deploy ke production
4. Verify functionality
5. Monitor for issues