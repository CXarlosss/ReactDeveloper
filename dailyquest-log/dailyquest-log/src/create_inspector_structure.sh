#!/bin/bash

echo "📦 Creando estructura del Inspector..."

BASE="src/components/inspector"

# Crear carpetas
mkdir -p $BASE/sections
mkdir -p $BASE/ui

echo "📁 Carpetas creadas:"
echo " - $BASE/sections"
echo " - $BASE/ui"
echo ""

# Crear archivos de secciones
touch $BASE/sections/TextSection.tsx
touch $BASE/sections/BackgroundSection.tsx
touch $BASE/sections/BorderSection.tsx
touch $BASE/sections/LayoutSection.tsx
touch $BASE/sections/LayerSection.tsx
touch $BASE/sections/ShapeSection.tsx
touch $BASE/sections/ImageSection.tsx

echo "📄 Archivos de sections creados:"
echo " - TextSection.tsx"
echo " - BackgroundSection.tsx"
echo " - BorderSection.tsx"
echo " - LayoutSection.tsx"
echo " - LayerSection.tsx"
echo " - ShapeSection.tsx"
echo " - ImageSection.tsx"
echo ""

# Crear archivos UI
touch $BASE/ui/Section.tsx
touch $BASE/ui/Row.tsx
touch $BASE/ui/ColorInput.tsx
touch $BASE/ui/NumberInput.tsx
touch $BASE/ui/Slider.tsx
touch $BASE/ui/Toggle.tsx

echo "📄 Archivos de UI creados:"
echo " - Section.tsx"
echo " - Row.tsx"
echo " - ColorInput.tsx"
echo " - NumberInput.tsx"
echo " - Slider.tsx"
echo " - Toggle.tsx"
echo ""

echo "✅ Estructura del Inspector creada correctamente."
echo "🔥 Listo para empezar a programar el Inspector Pro."
