import React from 'react'
import { Dialog } from '@headlessui/react'

type ViewModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  content: React.ReactNode
}

export default function ViewModal({ isOpen, onClose, title, content }: ViewModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
          {title && <Dialog.Title className="text-xl font-semibold mb-4">{title}</Dialog.Title>}
          <div>{content}</div>
          <div className="mt-6 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Užverti
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
