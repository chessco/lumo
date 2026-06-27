# Lumo - Local Development Launcher
# Este script inicia el API y el Web en ventanas externas

Write-Host "Iniciando Lumo en modo local..." -ForegroundColor Cyan

# Determinar directorio base
$BaseDir = $PSScriptRoot
if (-not $BaseDir) {
    $BaseDir = Get-Location
}

# Asegurar que estamos en el directorio base correcto
Set-Location $BaseDir

# 1. Verificar/Iniciar Infraestructura (Docker) - Solo MySQL ya que está en pitayacore
Write-Host "Verificando base de datos (Docker)..." -ForegroundColor Yellow
Write-Host "Usando pitayacore-mysql existente" -ForegroundColor Gray

# 2. Iniciar API (NestJS) en ventana externa
Write-Host "Iniciando Backend API..." -ForegroundColor Green
$ApiPath = Join-Path $BaseDir "api"
$ApiCmd = "Set-Location '$ApiPath'; Write-Host 'LUMO API (NESTJS)' -ForegroundColor Cyan; npm run start:dev"
Start-Process powershell -WorkingDirectory $ApiPath -ArgumentList "-NoExit", "-Command", $ApiCmd

# 3. Iniciar Web (React + Vite) en ventana externa
Write-Host "Iniciando Frontend Web..." -ForegroundColor Green
$WebPath = Join-Path $BaseDir "web"
$WebCmd = "Set-Location '$WebPath'; Write-Host 'LUMO WEB (VITE)' -ForegroundColor Cyan; npm run dev"
Start-Process powershell -WorkingDirectory $WebPath -ArgumentList "-NoExit", "-Command", $WebCmd

Write-Host "Todo listo. Las ventanas externas se han abierto." -ForegroundColor Green
Write-Host "API: http://localhost:3017" -ForegroundColor Gray
Write-Host "Web: http://localhost:3000" -ForegroundColor Gray
Write-Host "Swagger: http://localhost:3017/api/docs" -ForegroundColor Gray
