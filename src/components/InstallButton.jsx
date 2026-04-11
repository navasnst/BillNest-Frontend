import { useEffect, useState } from "react"

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShow(false)
    }
  }

  if (!show) return null

  return (
    <button
      onClick={handleInstall}
      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
    >
      Install App
    </button>
  )
}