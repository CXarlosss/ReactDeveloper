#!/bin/bash

echo "🚀 Refinando estructura final..."

cd ./components || exit

# ============================
# RENAME FOLDERS TO LOWERCASE
# ============================

echo "📁 Renombrando carpetas a lowercase..."

[ -d "Inspector" ] && mv Inspector inspector
[ -d "ToolBar" ] && mv ToolBar toolbar
[ -d "UI" ] && mv UI ui

# ============================
# CREATE block-rendering FOLDER
# ============================

echo "📁 Creando carpeta block-rendering..."
mkdir -p block-rendering

# Move block renderer
[ -f "BlockRenderer.tsx" ] && mv BlockRenderer.tsx block-rendering/BlockRenderer.tsx

# ============================
# MOVE block-related files
# ============================

echo "📦 Moviendo archivos de bloques al sitio correcto..."

# Si tienes más renders o transforms, puedes añadirlos aquí.
# Ejemplo:
# [ -f "BlockSelection.tsx" ] && mv BlockSelection.tsx block-rendering/BlockSelection.tsx

# ============================
# CLEANUP (elimina duplicados si existen)
# ============================

echo "🧹 Limpiando archivos duplicados..."

rm -f ./BlockEditor.tsx 2>/dev/null || true
rm -f ./BlockList.tsx 2>/dev/null || true
rm -f ./BlockToolBar.tsx 2>/dev/null || true

echo ""
echo "✅ ESTRUCTURA FINAL COMPLETADA"
echo "Revisa src/components/"
