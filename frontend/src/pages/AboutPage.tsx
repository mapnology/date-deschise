export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        Despre proiect
      </h1>
      <p className="mb-10 text-gray-500">
        Informații despre această platformă, sursa datelor și echipa din spate.
      </p>

      <div className="space-y-10">
        {/* Mapnology */}
        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Mapnology SRL</h2>
          <p className="leading-relaxed text-gray-600">
            Această platformă este un proiect dezvoltat de{' '}
            <a
              href="https://mapnology.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              Mapnology SRL
            </a>
            , companie specializată în inginerie software și managementul datelor. Ne concentrăm
            pe construirea de soluții digitale clare, accesibile și scalabile pentru mediul de
            afaceri românesc.
          </p>
        </section>

        {/* CAEN Rev. 3 */}
        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Tranziția la CAEN Rev. 3</h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Clasificarea Activităților din Economia Națională (CAEN) a trecut prin o actualizare
            majoră odată cu introducerea <strong className="text-gray-800">CAEN Rev. 3</strong>,
            aliniată cu standardul european NACE Rev. 2.1. Noua clasificare aduce o structură mai
            granulară și mai bine adaptată economiei digitale și serviciilor moderne.
          </p>
          <p className="leading-relaxed text-gray-600">
            Firmele înregistrate la ONRC trebuie să își actualizeze codurile conform noii
            nomenclaturi. Această platformă facilitează tranziția, oferind căutare rapidă
            și acces ușor la toate cele peste 600 de activități economice clasificate.
          </p>
        </section>

        {/* Sursa datelor */}
        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Sursa datelor</h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Datele utilizate în această platformă provin din surse oficiale românești:
          </p>
          <ul className="mb-4 space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>
                <strong className="text-gray-800">INS</strong> – Institutul Național de
                Statistică, autoritatea care publică clasificarea CAEN oficială.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>
                <strong className="text-gray-800">ONRC</strong> – Oficiul Național al
                Registrului Comerțului, unde codurile CAEN sunt utilizate în înregistrarea
                firmelor.
              </span>
            </li>
          </ul>
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Datele au caracter pur informativ. Pentru uz juridic sau oficial, vă rugăm să
            consultați sursele oficiale INS și ONRC.
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Contact</h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Pentru întrebări, sugestii sau colaborări, ne puteți contacta:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              Email:{' '}
              <a
                href="mailto:administrator@mapnology.eu"
                className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
              >
                administrator@mapnology.eu
              </a>
            </li>
            <li>
              Web:{' '}
              <a
                href="https://mapnology.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
              >
                mapnology.eu
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
