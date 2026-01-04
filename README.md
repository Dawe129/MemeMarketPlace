# 🎉 Meme Marketplace PRO

Plně funkční React aplikace pro prohlížení, filtrování a nákup memů! 🛒😂

## ✅ **Hotové funkce:**
- [x] **Login systém** s validací (username/password)
- [x] **Private Routes** - chráněné stránky
- [x] **Dashboard** se statistikami
- [x] **Memes Grid** (20+ memů)
  - Filtry podle kategorií (animals, gaming, celebrities...)
  - Vyhledávání názvu
  - Hover efekty
- [x] **Detail meme** stránka
- [x] **Košík** s přičítáním/ubíráním položek
  - Context API + vlastní `useCart()` hook
  - localStorage synchronizace
  - Celková cena (rating × 25Kč)

## 📱 **Stránky:**
| URL | Popis |
|-----|-------|
| `/login` | Přihlášení |
| `/dashboard` | Statistiky + přehled |
| `/memes` | Seznam memů |
| `/memes/:id` | Detail meme |
| `/cart` | Košík |

## 🚀 **Technologie:**
- React 18 - React Router - Context API
- useState - useEffect - useCallback
- Inline Styles - Responsive Design
- localStorage - Custom Hooks

## 🛠 **Spuštění:**
```bash
npm install
npm start

Otevře se: http://localhost:3000