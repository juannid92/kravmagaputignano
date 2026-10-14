#!/bin/bash
# ===========================================
# Krav Maga Putignano - Script di Avvio
# ===========================================

set -e

# Colori
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════╗"
echo "║   Krav Maga Putignano - Dev Server       ║"
echo "╚═══════════════════════════════════════════╝"
echo -e "${NC}"

# Verifica node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installazione dipendenze...${NC}"
    npm install
fi

# Parse argomenti
OPEN_BROWSER=false
BUILD_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --open|-o) OPEN_BROWSER=true; shift ;;
        --build|-b) BUILD_ONLY=true; shift ;;
        --help|-h)
            echo "Usage: ./start.sh [options]"
            echo "  --open, -o      Apre il browser"
            echo "  --build, -b     Solo build"
            exit 0
            ;;
        *) shift ;;
    esac
done

if [ "$BUILD_ONLY" = true ]; then
    echo -e "${YELLOW}🔨 Building...${NC}"
    npm run build
    echo -e "${GREEN}✅ Build completato!${NC}"
    exit 0
fi

echo -e "${GREEN}🚀 Avvio dev server...${NC}"
echo -e "${YELLOW}📍 http://localhost:3000${NC}"

if [ "$OPEN_BROWSER" = true ]; then
    xdg-open http://localhost:3000 2>/dev/null || open http://localhost:3000 2>/dev/null || true
fi

npm run dev
