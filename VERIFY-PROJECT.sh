#!/bin/bash

# JUN Agency - Project Verification Script
# Run this to verify that everything is ready for GitHub + Vercel

echo "🔍 JUN Agency - Project Verification"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASS=0
FAIL=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 (MISSING)"
        ((FAIL++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1/ (MISSING)"
        ((FAIL++))
    fi
}

# Check directories
echo "📂 Checking directories..."
check_dir "app"
check_dir "components"
check_dir "scripts"
check_dir ".github"
check_dir ".github/workflows"
check_dir "node_modules"
echo ""

# Check root config files
echo "⚙️  Checking configuration files..."
check_file "next.config.js"
check_file "tsconfig.json"
check_file "tailwind.config.ts"
check_file "postcss.config.js"
check_file "package.json"
check_file ".env.example"
check_file ".gitignore"
check_file ".editorconfig"
check_file ".prettierrc.json"
check_file "vercel.json"
echo ""

# Check app files
echo "📄 Checking app files..."
check_file "app/layout.tsx"
check_file "app/page.tsx"
check_file "app/globals.css"
echo ""

# Check components
echo "🧩 Checking components..."
check_file "components/Hero.tsx"
check_file "components/TrustBand.tsx"
check_file "components/InteractiveShowcase.tsx"
check_file "components/ProblemSection.tsx"
check_file "components/ValueProposition.tsx"
check_file "components/ServicesShowcase.tsx"
check_file "components/TargetAudience.tsx"
check_file "components/HowWeWork.tsx"
check_file "components/BrandConnection.tsx"
check_file "components/ClosingCTA.tsx"
check_file "components/FAQ.tsx"
check_file "components/ContactForm.tsx"
check_file "components/Footer.tsx"
echo ""

# Check scripts
echo "🛠️  Checking scripts..."
check_file "scripts/setup.sh"
check_file "scripts/build.sh"
echo ""

# Check GitHub Actions
echo "🤖 Checking GitHub Actions..."
check_file ".github/workflows/deploy.yml"
echo ""

# Check documentation
echo "📚 Checking documentation..."
check_file "START-HERE.md"
check_file "GETTING-STARTED.md"
check_file "QUICK-DEPLOYMENT.md"
check_file "GITHUB-SETUP.md"
check_file "GITHUB-ACTIONS-SECRETS.md"
check_file "QUICK_START.md"
check_file "README.md"
check_file "FOLDER-STRUCTURE.md"
check_file "PROJECT-CHECKLIST.md"
check_file "PROJECT_SUMMARY.md"
check_file "DESIGN_AND_SEO_STRATEGY.md"
check_file "MAINTENANCE.md"
check_file "DEPLOYMENT.md"
check_file "HOSTINGER-DEPLOYMENT.md"
check_file "CAMBIOS_REALIZADOS.md"
echo ""

# Check if .env.local exists (optional warning)
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found (optional, create with: cp .env.example .env.local)${NC}"
else
    echo -e "${GREEN}✓${NC} .env.local exists"
fi
echo ""

# Check Node.js
echo "📦 Checking Node.js & npm..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓${NC} Node.js $(node --version)"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Node.js not found"
    ((FAIL++))
fi

if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} npm $(npm --version)"
    ((PASS++))
else
    echo -e "${RED}✗${NC} npm not found"
    ((FAIL++))
fi

if command -v git &> /dev/null; then
    echo -e "${GREEN}✓${NC} Git $(git --version | cut -d' ' -f3)"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Git not found"
    ((FAIL++))
fi
echo ""

# Summary
echo "================================"
echo "📊 Verification Summary"
echo "================================"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ Project is ready for GitHub!${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Read: START-HERE.md"
    echo "2. Then: QUICK-DEPLOYMENT.md"
    echo "3. Execute the GitHub commands"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some files are missing. Check above.${NC}"
    echo ""
    exit 1
fi
