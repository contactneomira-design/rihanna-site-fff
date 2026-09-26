'use client'

import { useCallback, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Admin panel — lets the owner add / edit / hide / delete cars (with photos)
// and read booking requests, without touching any code.
// UI languages: French and Arabic (toggle at the top).
// ---------------------------------------------------------------------------

const TEXT = {
  fr: {
    title: 'Espace administrateur',
    password: 'Mot de passe',
    login: 'Se connecter',
    wrongPassword: 'Mot de passe incorrect.',
    notConfigured: "Le mot de passe administrateur n'est pas encore configuré sur Netlify (ADMIN_PASSWORD).",
    logout: 'Déconnexion',
    tabCars: 'Voitures',
    tabRequests: 'Demandes',
    addCar: 'Ajouter une voiture',
    edit: 'Modifier',
    hide: 'Masquer',
    show: 'Afficher',
    del: 'Supprimer',
    hidden: 'Masquée',
    confirmDelete: 'Supprimer définitivement cette voiture ?',
    noDatabase: "La base de données n'est pas connectée (DATABASE_URL manquant sur Netlify).",
    dbError: 'Erreur de base de données. Vérifiez la configuration puis réessayez.',
    empty: 'Aucune voiture dans la base. Exécutez le script SQL de configuration, ou ajoutez votre première voiture.',
    formNew: 'Nouvelle voiture',
    formEdit: 'Modifier la voiture',
    name: 'Nom de la voiture',
    category: 'Catégorie',
    seats: 'Nombre de places',
    transmission: 'Boîte de vitesses',
    fuel: 'Carburant',
    blurb: 'Description courte',
    features: 'Équipements (un par ligne)',
    mainPhoto: 'Photo principale (carte)',
    gallery: 'Galerie de photos',
    addPhotos: 'Ajouter des photos',
    changePhoto: 'Choisir une photo',
    firstPhoto: 'Mettre en premier',
    remove: 'Retirer',
    uploading: 'Envoi des photos…',
    order: 'Position dans la liste (petit nombre = en premier)',
    visible: 'Visible sur le site',
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    cancel: 'Annuler',
    saved: 'Enregistré. Le site est mis à jour.',
    deleted: 'Voiture supprimée.',
    errName: 'Le nom est obligatoire.',
    errImage: 'Ajoutez au moins une photo.',
    errGeneric: 'Une erreur est survenue. Réessayez.',
    errPhoto: "Cette photo n'a pas pu être envoyée.",
    bookings: 'Demandes de réservation',
    messages: 'Messages',
    noItems: 'Rien pour le moment.',
    done: 'Traitée',
    markDone: 'Marquer comme traitée',
    markPending: 'Remettre en attente',
    from: 'Du',
    to: 'au',
    Manual: 'Manuelle',
    Automatic: 'Automatique',
    Petrol: 'Essence',
    Diesel: 'Diesel',
    Hybrid: 'Hybride',
    Electric: 'Électrique',
    hint: 'Les changements apparaissent sur le site en quelques secondes.',
  },
  ar: {
    title: 'لوحة التحكم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    wrongPassword: 'كلمة المرور غير صحيحة.',
    notConfigured: 'لم يتم بعد ضبط كلمة مرور الإدارة على Netlify (ADMIN_PASSWORD).',
    logout: 'تسجيل الخروج',
    tabCars: 'السيارات',
    tabRequests: 'الطلبات',
    addCar: 'إضافة سيارة',
    edit: 'تعديل',
    hide: 'إخفاء',
    show: 'إظهار',
    del: 'حذف',
    hidden: 'مخفية',
    confirmDelete: 'هل تريد حذف هذه السيارة نهائيًا؟',
    noDatabase: 'قاعدة البيانات غير متصلة (DATABASE_URL غير موجود على Netlify).',
    dbError: 'خطأ في قاعدة البيانات. تحقق من الإعدادات ثم أعد المحاولة.',
    empty: 'لا توجد سيارات في قاعدة البيانات. شغّل سكريبت SQL الخاص بالإعداد أو أضف أول سيارة.',
    formNew: 'سيارة جديدة',
    formEdit: 'تعديل السيارة',
    name: 'اسم السيارة',
    category: 'الفئة',
    seats: 'عدد المقاعد',
    transmission: 'ناقل الحركة',
    fuel: 'الوقود',
    blurb: 'وصف قصير',
    features: 'المميزات (واحدة في كل سطر)',
    mainPhoto: 'الصورة الرئيسية (البطاقة)',
    gallery: 'معرض الصور',
    addPhotos: 'إضافة صور',
    changePhoto: 'اختيار صورة',
    firstPhoto: 'جعلها الأولى',
    remove: 'إزالة',
    uploading: 'جارٍ رفع الصور…',
    order: 'الترتيب في القائمة (الرقم الأصغر يظهر أولًا)',
    visible: 'ظاهرة في الموقع',
    save: 'حفظ',
    saving: 'جارٍ الحفظ…',
    cancel: 'إلغاء',
    saved: 'تم الحفظ. تم تحديث الموقع.',
    deleted: 'تم حذف السيارة.',
    errName: 'الاسم مطلوب.',
    errImage: 'أضف صورة واحدة على الأقل.',
    errGeneric: 'حدث خطأ. أعد المحاولة.',
    errPhoto: 'تعذّر رفع هذه الصورة.',
    bookings: 'طلبات الحجز',
    messages: 'الرسائل',
    noItems: 'لا شيء حاليًا.',
    done: 'تمت المعالجة',
    markDone: 'تحديد كمعالَج',
    markPending: 'إعادته إلى الانتظار',
    from: 'من',
    to: 'إلى',
    Manual: 'يدوي',
    Automatic: 'أوتوماتيك',
    Petrol: 'بنزين',
    Diesel: 'ديزل',
    Hybrid: 'هجين',
    Electric: 'كهربائية',
    hint: 'تظهر التغييرات في الموقع خلال ثوانٍ.',
  },
}

const CATEGORIES = ['family', 'belbala', 'atlas']
const TRANSMISSIONS = ['Manual', 'Automatic']
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']

const EMPTY_FORM = {
  name: '',
  category: 'family',
  seats: 5,
  transmission: 'Manual',
  fuel: 'Petrol',
  blurb: '',
  featuresText: '',
  image: '',
  images: [],
  available: true,
  sortOrder: '',
}

const inputClass =
  'w-full bg-night-soft border border-offwhite/20 focus:border-terracotta outline-none px-3 py-3 text-offwhite text-sm'
const labelClass = 'block text-[11px] tracking-widest text-offwhite/55 uppercase mb-1.5'
const primaryBtn =
  'min-h-[44px] px-5 py-2.5 bg-terracotta hover:bg-offwhite text-night text-xs tracking-widest2 uppercase font-semibold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
const ghostBtn =
  'min-h-[44px] px-4 py-2.5 border border-offwhite/25 hover:border-terracotta text-offwhite text-xs tracking-widest uppercase font-semibold transition-colors duration-300 disabled:opacity-60'
const dangerBtn =
  'min-h-[44px] px-4 py-2.5 border border-red-400/40 hover:bg-red-500/15 text-red-300 text-xs tracking-widest uppercase font-semibold transition-colors duration-300'

async function api(url, options) {
  const res = await fetch(url, { credentials: 'same-origin', ...options })
  let data = null
  try {
    data = await res.json()
  } catch {}
  if (!res.ok) {
    const err = new Error(data?.error || 'error')
    err.status = res.status
    err.code = data?.error || 'error'
    throw err
  }
  return data
}

// Shrinks a photo in the browser (max 1600px, JPEG) before uploading it.
function compressImage(file, maxSide = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight))
      const w = Math.max(1, Math.round(img.naturalWidth * scale))
      const h = Math.max(1, Math.round(img.naturalHeight * scale))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          blob ? resolve(blob) : reject(new Error('compress'))
        },
        'image/jpeg',
        quality
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('load'))
    }
    img.src = url
  })
}

async function uploadPhoto(file) {
  const blob = await compressImage(file)
  const body = new FormData()
  body.append('file', blob, 'photo.jpg')
  const data = await api('/api/admin/upload', { method: 'POST', body })
  return data.url
}

function Thumb({ src, className = '' }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" className={`object-cover bg-night-soft ${className}`} />
}

const carToForm = (car) => ({
  name: car.name,
  category: car.category,
  seats: car.seats,
  transmission: car.transmission,
  fuel: car.fuel,
  blurb: car.blurb || '',
  featuresText: (car.features || []).join('\n'),
  image: car.image || '',
  images: car.images || [],
  available: car.available !== false,
  sortOrder: car.sortOrder ?? '',
})

const formToPayload = (f) => ({
  name: f.name,
  category: f.category,
  seats: f.seats,
  transmission: f.transmission,
  fuel: f.fuel,
  blurb: f.blurb,
  features: f.featuresText.split('\n'),
  image: f.image,
  images: f.images,
  available: f.available,
  sortOrder: f.sortOrder,
})

// ---------------------------------------------------------------------------

function Login({ t, configured, onDone }) {
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      onDone()
    } catch (err) {
      setError(err.status === 401 ? t.wrongPassword : t.errGeneric)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-10 flex flex-col gap-4">
      {!configured && (
        <p className="text-sm text-red-300 border border-red-400/30 bg-red-500/10 p-3">{t.notConfigured}</p>
      )}
      <div>
        <label htmlFor="admin-password" className={labelClass}>
          {t.password}
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          dir="ltr"
        />
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={busy || !password} className={primaryBtn}>
        {t.login}
      </button>
    </form>
  )
}

// ---------------------------------------------------------------------------

function CarForm({ t, initial, saving, error, onSave, onCancel, onError }) {
  const [form, setForm] = useState(initial)
  const [uploading, setUploading] = useState(false)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const pickMain = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadPhoto(file)
      setForm((f) => ({ ...f, image: url, images: f.images.length === 0 ? [url] : f.images }))
    } catch {
      onError(t.errPhoto)
    } finally {
      setUploading(false)
    }
  }

  const pickGallery = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (files.length === 0) return
    setUploading(true)
    try {
      for (const file of files) {
        const url = await uploadPhoto(file)
        setForm((f) => ({
          ...f,
          images: [...f.images, url],
          image: f.image || url,
        }))
      }
    } catch {
      onError(t.errPhoto)
    } finally {
      setUploading(false)
    }
  }

  const removeGallery = (url) => setForm((f) => ({ ...f, images: f.images.filter((u) => u !== url) }))
  const firstGallery = (url) =>
    setForm((f) => ({ ...f, images: [url, ...f.images.filter((u) => u !== url)] }))

  const submit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <label htmlFor="car-name" className={labelClass}>
          {t.name}
        </label>
        <input
          id="car-name"
          className={inputClass}
          value={form.name}
          maxLength={80}
          onChange={(e) => set('name', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="car-category" className={labelClass}>
            {t.category}
          </label>
          <select
            id="car-category"
            className={inputClass}
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="car-seats" className={labelClass}>
            {t.seats}
          </label>
          <input
            id="car-seats"
            type="number"
            min="1"
            max="20"
            className={inputClass}
            value={form.seats}
            onChange={(e) => set('seats', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="car-transmission" className={labelClass}>
            {t.transmission}
          </label>
          <select
            id="car-transmission"
            className={inputClass}
            value={form.transmission}
            onChange={(e) => set('transmission', e.target.value)}
          >
            {TRANSMISSIONS.map((v) => (
              <option key={v} value={v}>
                {t[v]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="car-fuel" className={labelClass}>
            {t.fuel}
          </label>
          <select
            id="car-fuel"
            className={inputClass}
            value={form.fuel}
            onChange={(e) => set('fuel', e.target.value)}
          >
            {FUELS.map((v) => (
              <option key={v} value={v}>
                {t[v]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="car-blurb" className={labelClass}>
          {t.blurb}
        </label>
        <input
          id="car-blurb"
          className={inputClass}
          value={form.blurb}
          maxLength={200}
          onChange={(e) => set('blurb', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="car-features" className={labelClass}>
          {t.features}
        </label>
        <textarea
          id="car-features"
          rows={4}
          className={inputClass}
          value={form.featuresText}
          onChange={(e) => set('featuresText', e.target.value)}
        />
      </div>

      {/* Main photo */}
      <div>
        <span className={labelClass}>{t.mainPhoto}</span>
        <div className="flex items-center gap-4">
          {form.image ? (
            <Thumb src={form.image} className="w-32 h-24 border border-offwhite/15" />
          ) : (
            <div className="w-32 h-24 border border-dashed border-offwhite/25" />
          )}
          <label className={`${ghostBtn} inline-flex items-center cursor-pointer`}>
            {t.changePhoto}
            <input type="file" accept="image/*" className="sr-only" onChange={pickMain} />
          </label>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <span className={labelClass}>{t.gallery}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {form.images.map((url, i) => (
            <div key={url} className="border border-offwhite/15 bg-night-soft">
              <Thumb src={url} className="w-full h-28" />
              <div className="flex">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => firstGallery(url)}
                    className="flex-1 min-h-[40px] text-[11px] text-offwhite/70 hover:text-terracotta border-e border-offwhite/10 px-1"
                  >
                    {t.firstPhoto}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeGallery(url)}
                  className="flex-1 min-h-[40px] text-[11px] text-red-300 hover:bg-red-500/15 px-1"
                >
                  {t.remove}
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className={`${ghostBtn} inline-flex items-center cursor-pointer mt-3`}>
          {t.addPhotos}
          <input type="file" accept="image/*" multiple className="sr-only" onChange={pickGallery} />
        </label>
        {uploading && <p className="text-sm text-offwhite/60 mt-2">{t.uploading}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="car-order" className={labelClass}>
            {t.order}
          </label>
          <input
            id="car-order"
            type="number"
            className={inputClass}
            value={form.sortOrder}
            onChange={(e) => set('sortOrder', e.target.value)}
          />
        </div>
        <label className="flex items-center gap-3 min-h-[48px] text-sm text-offwhite/80 cursor-pointer">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => set('available', e.target.checked)}
            className="w-5 h-5 accent-orange-600"
          />
          {t.visible}
        </label>
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving || uploading} className={primaryBtn}>
          {saving ? t.saving : t.save}
        </button>
        <button type="button" onClick={onCancel} className={ghostBtn}>
          {t.cancel}
        </button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------

function Requests({ t, lang, onUnauthorized }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setData(await api('/api/admin/inbox'))
      setError('')
    } catch (err) {
      if (err.status === 401) return onUnauthorized()
      setError(err.code === 'no_database' ? t.noDatabase : t.dbError)
    }
  }, [onUnauthorized, t])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (id, status) => {
    try {
      await api('/api/admin/inbox', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      load()
    } catch {
      setError(t.errGeneric)
    }
  }

  const locale = lang === 'ar' ? 'ar-MA' : 'fr-FR'
  const day = (d) => new Date(d).toLocaleDateString(locale)
  const stamp = (d) => new Date(d).toLocaleString(locale)
  const digits = (p) => String(p).replace(/[^\d]/g, '')

  if (error) return <p className="text-sm text-red-300">{error}</p>
  if (!data) return null

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="font-display text-2xl uppercase text-offwhite mb-4">{t.bookings}</h2>
        {data.bookings.length === 0 && <p className="text-offwhite/50 text-sm">{t.noItems}</p>}
        <ul className="flex flex-col gap-3">
          {data.bookings.map((b) => (
            <li key={b.id} className="border border-offwhite/12 bg-night-soft p-4 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-offwhite">{b.carName}</span>
                <span className="text-xs text-offwhite/45">{stamp(b.createdAt)}</span>
              </div>
              <p className="text-sm text-offwhite/75">
                {b.fullName} · {t.from} {day(b.startDate)} {t.to} {day(b.endDate)}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a href={`tel:${b.phone}`} dir="ltr" className="text-terracotta underline">
                  {b.phone}
                </a>
                <a
                  href={`https://wa.me/${digits(b.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/70 underline"
                >
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setStatus(b.id, b.status === 'done' ? 'pending' : 'done')}
                  className={`${ghostBtn} ms-auto`}
                >
                  {b.status === 'done' ? `✓ ${t.done} — ${t.markPending}` : t.markDone}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase text-offwhite mb-4">{t.messages}</h2>
        {data.contacts.length === 0 && <p className="text-offwhite/50 text-sm">{t.noItems}</p>}
        <ul className="flex flex-col gap-3">
          {data.contacts.map((c) => (
            <li key={c.id} className="border border-offwhite/12 bg-night-soft p-4 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-offwhite">{c.name}</span>
                <span className="text-xs text-offwhite/45">{stamp(c.createdAt)}</span>
              </div>
              <p className="text-sm text-offwhite/75 whitespace-pre-wrap break-words">{c.message}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href={`tel:${c.phone}`} dir="ltr" className="text-terracotta underline">
                  {c.phone}
                </a>
                <a
                  href={`https://wa.me/${digits(c.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/70 underline"
                >
                  WhatsApp
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------

export default function AdminApp() {
  const [lang, setLang] = useState('fr')
  const t = TEXT[lang]

  const [auth, setAuth] = useState(null) // null = loading, else { ok, configured }
  const [tab, setTab] = useState('cars')
  const [cars, setCars] = useState(null)
  const [listError, setListError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | car
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')

  const checkSession = useCallback(async () => {
    try {
      setAuth(await api('/api/admin/session'))
    } catch {
      setAuth({ ok: false, configured: true })
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const expire = useCallback(() => setAuth((a) => ({ ...(a || {}), ok: false })), [])

  const loadCars = useCallback(async () => {
    try {
      const data = await api('/api/admin/cars')
      setCars(data.cars)
      setListError('')
    } catch (err) {
      if (err.status === 401) return expire()
      setCars([])
      setListError(err.code === 'no_database' ? 'noDatabase' : 'dbError')
    }
  }, [expire])

  useEffect(() => {
    if (auth?.ok) loadCars()
  }, [auth?.ok, loadCars])

  const flash = (text) => {
    setNotice(text)
    setTimeout(() => setNotice(''), 4000)
  }

  const logout = async () => {
    try {
      await api('/api/admin/session', { method: 'DELETE' })
    } catch {}
    setCars(null)
    setEditing(null)
    checkSession()
  }

  const save = async (form) => {
    setFormError('')
    if (!form.name.trim()) return setFormError(t.errName)
    if (!form.image && form.images.length === 0) return setFormError(t.errImage)

    setSaving(true)
    try {
      const isNew = editing === 'new'
      await api(isNew ? '/api/admin/cars' : `/api/admin/cars/${editing.id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToPayload(form)),
      })
      setEditing(null)
      await loadCars()
      flash(t.saved)
    } catch (err) {
      if (err.status === 401) return expire()
      setFormError(err.code === 'name' ? t.errName : err.code === 'image' ? t.errImage : t.errGeneric)
    } finally {
      setSaving(false)
    }
  }

  const toggleVisible = async (car) => {
    try {
      await api(`/api/admin/cars/${car.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formToPayload(carToForm(car)), available: !car.available }),
      })
      await loadCars()
      flash(t.saved)
    } catch (err) {
      if (err.status === 401) return expire()
      flash(t.errGeneric)
    }
  }

  const remove = async (car) => {
    if (!window.confirm(t.confirmDelete)) return
    try {
      await api(`/api/admin/cars/${car.id}`, { method: 'DELETE' })
      await loadCars()
      flash(t.deleted)
    } catch (err) {
      if (err.status === 401) return expire()
      flash(t.errGeneric)
    }
  }

  const langSwitch = (
    <div className="flex gap-2">
      {['fr', 'ar'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-h-[40px] min-w-[48px] px-3 text-xs tracking-widest uppercase font-semibold border transition-colors duration-300 ${
            lang === l
              ? 'bg-terracotta text-night border-terracotta'
              : 'border-offwhite/25 text-offwhite/70 hover:border-offwhite/60'
          }`}
        >
          {l === 'fr' ? 'FR' : 'العربية'}
        </button>
      ))}
    </div>
  )

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'ar' ? 'font-arabic' : ''}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-4xl sm:text-5xl uppercase leading-none text-offwhite">{t.title}</h1>
          <div className="flex items-center gap-3">
            {langSwitch}
            {auth?.ok && (
              <button type="button" onClick={logout} className={ghostBtn}>
                {t.logout}
              </button>
            )}
          </div>
        </div>

        {auth && !auth.ok && (
          <Login t={t} configured={auth.configured !== false} onDone={checkSession} />
        )}

        {auth?.ok && (
          <>
            {notice && (
              <p role="status" className="mb-6 border border-terracotta/40 bg-terracotta/10 text-offwhite text-sm p-3">
                {notice}
              </p>
            )}

            {editing ? (
              <>
                <h2 className="font-display text-2xl uppercase text-offwhite mb-6 max-w-3xl mx-auto">
                  {editing === 'new' ? t.formNew : t.formEdit}
                </h2>
                <CarForm
                  key={editing === 'new' ? 'new' : editing.id}
                  t={t}
                  initial={editing === 'new' ? EMPTY_FORM : carToForm(editing)}
                  saving={saving}
                  error={formError}
                  onSave={save}
                  onError={setFormError}
                  onCancel={() => {
                    setEditing(null)
                    setFormError('')
                  }}
                />
              </>
            ) : (
              <>
                <div className="flex gap-2 mb-8 border-b border-offwhite/10">
                  {[
                    ['cars', t.tabCars],
                    ['requests', t.tabRequests],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTab(id)}
                      aria-pressed={tab === id}
                      className={`min-h-[48px] px-5 text-xs tracking-widest2 uppercase font-semibold border-b-2 -mb-px transition-colors duration-300 ${
                        tab === id
                          ? 'border-terracotta text-terracotta'
                          : 'border-transparent text-offwhite/60 hover:text-offwhite'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {tab === 'requests' && <Requests t={t} lang={lang} onUnauthorized={expire} />}

                {tab === 'cars' && (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <p className="text-offwhite/50 text-sm">{t.hint}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormError('')
                          setEditing('new')
                        }}
                        className={primaryBtn}
                      >
                        + {t.addCar}
                      </button>
                    </div>

                    {listError && <p className="text-sm text-red-300 mb-4">{t[listError]}</p>}
                    {cars && cars.length === 0 && !listError && (
                      <p className="text-offwhite/60 text-sm">{t.empty}</p>
                    )}

                    <ul className="flex flex-col gap-3">
                      {(cars || []).map((car) => (
                        <li
                          key={car.id}
                          className={`border border-offwhite/12 bg-night-soft p-3 flex flex-col sm:flex-row sm:items-center gap-4 ${
                            car.available ? '' : 'opacity-60'
                          }`}
                        >
                          <Thumb src={car.image} className="w-full sm:w-32 h-40 sm:h-24 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-xl uppercase text-offwhite leading-tight">{car.name}</p>
                            <p className="text-xs text-offwhite/55 mt-1">
                              {car.category.toUpperCase()} · {car.seats} · {t[car.transmission] || car.transmission} ·{' '}
                              {t[car.fuel] || car.fuel}
                              {!car.available && (
                                <span className="ms-2 px-2 py-0.5 border border-offwhite/30 text-offwhite/70">
                                  {t.hidden}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setFormError('')
                                setEditing(car)
                              }}
                              className={ghostBtn}
                            >
                              {t.edit}
                            </button>
                            <button type="button" onClick={() => toggleVisible(car)} className={ghostBtn}>
                              {car.available ? t.hide : t.show}
                            </button>
                            <button type="button" onClick={() => remove(car)} className={dangerBtn}>
                              {t.del}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
