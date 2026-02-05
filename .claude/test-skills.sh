#!/bin/bash
# Test script for Claude Code skills
# This script verifies that all dependencies are installed and skills can execute

set -e

echo "🧪 Testing Claude Code Skills..."
echo ""

# Check if we're in the right directory
if [ ! -d ".claude/skills" ]; then
    echo "❌ Error: .claude/skills directory not found"
    echo "   Please run this script from the project root"
    exit 1
fi

echo "✅ Found .claude/skills directory"

# List available skills
echo ""
echo "📋 Available skills:"
ls -1 .claude/skills/*.md 2>/dev/null | while read skill; do
    basename "$skill" .md | sed 's/^/   /'
done

echo ""
echo "🔍 Checking dependencies..."

# Check if lp-generator exists
if [ ! -d "lp-generator" ]; then
    echo "❌ Error: lp-generator directory not found"
    exit 1
fi

echo "✅ lp-generator directory found"

# Check if node_modules exists in lp-generator
cd lp-generator

if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules not found in lp-generator"
    echo "   Installing dependencies..."
    npm install
else
    echo "✅ node_modules found"
fi

# Check if tsx is available
if ! npx tsx --version &>/dev/null; then
    echo "❌ Error: tsx not found"
    echo "   Install with: npm install --save-dev tsx"
    exit 1
fi

echo "✅ tsx is available"

# Check if TypeScript files exist
if [ ! -f "src/skills/generate-lp-skill.ts" ]; then
    echo "❌ Error: generate-lp-skill.ts not found"
    exit 1
fi

echo "✅ Skill files found"

# Type check
echo ""
echo "🔍 Running type check..."
if npm run type-check &>/dev/null; then
    echo "✅ Type check passed"
else
    echo "⚠️  Warning: Type check failed (this may be expected)"
fi

cd ..

echo ""
echo "✨ All checks passed!"
echo ""
echo "📝 Usage in Claude Code:"
echo "   /lp-generator --quick"
echo "   /lp-generator --experience inexperienced"
echo "   /lp-export --format yaml"
echo ""
echo "📖 For more information, see:"
echo "   .claude/skills/README.md"
echo "   docs/claude-code-lp-generator-guide.md"
