export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 px-6 py-10 text-sm text-gray-500">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">Despre</h3>
          <p className="leading-relaxed">
            Proiect dezvoltat de{' '}
            <a
              href="https://mapnology.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-700"
            >
              Mapnology SRL
            </a>{' '}
            pentru căutarea codurilor CAEN Rev. 3.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">Contact</h3>
          <ul className="space-y-1 leading-relaxed">
            <li>
              <a
                href="mailto:administrator@mapnology.eu"
                className="underline underline-offset-2 hover:text-gray-700"
              >
                administrator@mapnology.eu
              </a>
            </li>
            <li>
              <a
                href="https://mapnology.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gray-700"
              >
                mapnology.eu
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">Sursă</h3>
          <p className="leading-relaxed">
            Datele provin de la INS și ONRC și au caracter pur informativ. Pentru uz
            oficial, consultați sursele oficiale.
          </p>
        </div>
      </div>
    </footer>
  )
}
