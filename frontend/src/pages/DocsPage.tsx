function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm">
      <pre className="text-gray-100">
        <code data-language={language}>{code}</code>
      </pre>
    </div>
  )
}

function ParamRow({ name, type, required, description }: { name: string; type: string; required: boolean; description: string }) {
  return (
    <tr className="border-t border-gray-100">
      <td className="py-2.5 pr-4 align-top font-mono text-sm font-medium text-blue-700">{name}</td>
      <td className="py-2.5 pr-4 align-top text-sm text-gray-500">{type}</td>
      <td className="py-2.5 pr-4 align-top text-sm">
        {required
          ? <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">obligatoriu</span>
          : <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">opțional</span>
        }
      </td>
      <td className="py-2.5 align-top text-sm text-gray-600">{description}</td>
    </tr>
  )
}

const SEARCH_FETCH = `const res = await fetch('https://caen-api.ro/caen?q=cereale&limit=10');
const data = await res.json();
// { total: 3, results: [...] }`

const SEARCH_CURL = `curl "https://caen-api.ro/caen?q=cereale&limit=10"`

const LOOKUP_FETCH = `const res = await fetch('https://caen-api.ro/caen/0111');
const data = await res.json();
// { cod_caen: "0111", denumire: "...", ... }`

const LOOKUP_CURL = `curl "https://caen-api.ro/caen/0111"`

const SEARCH_RESPONSE = `{
  "total": 3,
  "results": [
    {
      "cod_caen": "0111",
      "denumire": "Cultivarea cerealelor (exclusiv orez), plantelor leguminoase și a plantelor producătoare de semințe oleaginoase",
      "sectiune_cod": "A",
      "sectiune": "Agricultură, silvicultură și pescuit",
      "diviziune_cod": "01",
      "diviziune": "Agricultură, vânătoare și activități de servicii anexe",
      "grupa_cod": "011",
      "grupa": "Cultivarea plantelor nepermanente"
    }
  ]
}`

const LOOKUP_RESPONSE = `{
  "cod_caen": "0111",
  "denumire": "Cultivarea cerealelor (exclusiv orez)...",
  "sectiune_cod": "A",
  "sectiune": "Agricultură, silvicultură și pescuit",
  "diviziune_cod": "01",
  "diviziune": "Agricultură, vânătoare și activități de servicii anexe",
  "grupa_cod": "011",
  "grupa": "Cultivarea plantelor nepermanente"
}`

export function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Documentație API
        </h1>
        <p className="text-gray-500">
          API REST gratuit pentru căutarea codurilor CAEN Rev. 3. Toate endpoint-urile returnează JSON.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <span className="text-sm font-semibold text-blue-700">Base URL</span>
          <code className="ml-2 font-mono text-sm text-blue-800">https://caen-api.ro</code>
          <a
            href="https://caen-api.ro/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
          >
            Swagger UI →
          </a>
        </div>
      </div>

      <div className="space-y-12">
        {/* Endpoint 1: Search */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-lg bg-green-100 px-2.5 py-1 font-mono text-xs font-bold text-green-700">GET</span>
            <code className="font-mono text-base text-gray-900">/caen</code>
          </div>
          <p className="mb-5 text-gray-600">
            Caută coduri CAEN după cod parțial sau text din denumire. Suportă paginare.
          </p>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Parametri</h3>
          <div className="mb-6 overflow-x-auto rounded-xl border border-gray-100 bg-white px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Nume</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Tip</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Cerut</th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Descriere</th>
                </tr>
              </thead>
              <tbody>
                <ParamRow name="q" type="string" required description="Text de căutare (cod sau parte din denumire)" />
                <ParamRow name="limit" type="integer" required={false} description="Număr maxim de rezultate. Implicit 50, maxim 200." />
                <ParamRow name="offset" type="integer" required={false} description="Poziția de start pentru paginare. Implicit 0." />
              </tbody>
            </table>
          </div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Exemple</h3>
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={SEARCH_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={SEARCH_CURL} />
            </div>
          </div>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Răspuns</h3>
          <CodeBlock code={SEARCH_RESPONSE} language="json" />
        </section>

        <hr className="border-gray-100" />

        {/* Endpoint 2: Exact lookup */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-lg bg-green-100 px-2.5 py-1 font-mono text-xs font-bold text-green-700">GET</span>
            <code className="font-mono text-base text-gray-900">/caen/{'{cod}'}</code>
          </div>
          <p className="mb-5 text-gray-600">
            Returnează detalii complete pentru un cod CAEN exact de 4 cifre.
          </p>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Parametri</h3>
          <div className="mb-6 overflow-x-auto rounded-xl border border-gray-100 bg-white px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Nume</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Tip</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Cerut</th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Descriere</th>
                </tr>
              </thead>
              <tbody>
                <ParamRow name="cod" type="string" required description="Codul CAEN de 4 cifre (ex: 0111)" />
              </tbody>
            </table>
          </div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Exemple</h3>
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={LOOKUP_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={LOOKUP_CURL} />
            </div>
          </div>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Răspuns</h3>
          <CodeBlock code={LOOKUP_RESPONSE} language="json" />
        </section>

        <hr className="border-gray-100" />

        {/* Schema */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">Schema CAENEntry</h2>
          <p className="mb-4 text-gray-600">Toate câmpurile sunt de tip <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">string</code> și sunt întotdeauna prezente.</p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Câmp</th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Descriere</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['cod_caen', 'Codul CAEN (4 cifre)'],
                  ['denumire', 'Denumirea activității economice'],
                  ['sectiune_cod', 'Codul secțiunii (ex: A)'],
                  ['sectiune', 'Denumirea secțiunii'],
                  ['diviziune_cod', 'Codul diviziunii (ex: 01)'],
                  ['diviziune', 'Denumirea diviziunii'],
                  ['grupa_cod', 'Codul grupei (ex: 011)'],
                  ['grupa', 'Denumirea grupei'],
                ].map(([field, desc]) => (
                  <tr key={field} className="border-t border-gray-100">
                    <td className="py-2.5 pr-4 font-mono text-sm font-medium text-blue-700">{field}</td>
                    <td className="py-2.5 text-sm text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}