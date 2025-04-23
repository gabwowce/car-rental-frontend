export default function Prisijungimas() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Prisijungimas</h1>
          {/* Formos laukai */}
          <form>
            <input
              type="email"
              placeholder="El. paštas"
              className="w-full border p-2 mb-4 rounded"
            />
            <input
              type="password"
              placeholder="Slaptažodis"
              className="w-full border p-2 mb-4 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Prisijungti
            </button>
          </form>
        </div>
      </div>
    )
  }
  