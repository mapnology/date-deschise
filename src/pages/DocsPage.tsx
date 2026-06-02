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

function ParamsTable({ children }: { children: React.ReactNode }) {
  return (
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
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{label}</h3>
  )
}

function EndpointHeader({ method, path, accent = 'blue' }: { method: string; path: string; accent?: 'blue' | 'emerald' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
  }
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="rounded-lg bg-green-100 px-2.5 py-1 font-mono text-xs font-bold text-green-700">{method}</span>
      <code className={`rounded-lg px-3 py-1 font-mono text-sm font-semibold ${colors[accent]}`}>{path}</code>
    </div>
  )
}

// ─── CAEN ────────────────────────────────────────────────────────────────────

const CAEN_SEARCH_FETCH = `const res = await fetch('https://caen-api.ro/api/caen?q=cereale&limit=10');
const data = await res.json();
// { total: 3, results: [...] }`

const CAEN_SEARCH_CURL = `curl "https://caen-api.ro/api/caen?q=cereale&limit=10"`

const CAEN_LOOKUP_FETCH = `const res = await fetch('https://caen-api.ro/api/caen/0111');
const data = await res.json();`

const CAEN_LOOKUP_CURL = `curl "https://caen-api.ro/api/caen/0111"`

const CAEN_SEARCH_RESPONSE = `{
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

const CAEN_LOOKUP_RESPONSE = `{
  "cod_caen": "0111",
  "denumire": "Cultivarea cerealelor (exclusiv orez)...",
  "sectiune_cod": "A",
  "sectiune": "Agricultură, silvicultură și pescuit",
  "diviziune_cod": "01",
  "diviziune": "Agricultură, vânătoare și activități de servicii anexe",
  "grupa_cod": "011",
  "grupa": "Cultivarea plantelor nepermanente"
}`

function CAENDocsSection() {
  return (
    <section id="caen">
      <div className="mb-8 flex items-center gap-3">
        <span className="rounded-xl bg-blue-50 px-3 py-1.5 font-mono text-sm font-bold text-blue-700">CAEN Rev. 3</span>
        <h2 className="text-xl font-bold text-gray-900">Clasificarea activităților din economia națională</h2>
      </div>

      <div className="space-y-10">
        {/* GET /caen */}
        <div>
          <EndpointHeader method="GET" path="/caen" accent="blue" />
          <p className="mb-5 text-gray-600">
            Caută coduri CAEN după cod parțial sau text din denumire. Suportă paginare.
          </p>
          <SectionLabel label="Parametri" />
          <ParamsTable>
            <ParamRow name="q" type="string" required description="Text de căutare (cod sau parte din denumire)" />
            <ParamRow name="limit" type="integer" required={false} description="Număr maxim de rezultate. Implicit 50, maxim 200." />
            <ParamRow name="offset" type="integer" required={false} description="Poziția de start pentru paginare. Implicit 0." />
          </ParamsTable>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={CAEN_SEARCH_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={CAEN_SEARCH_CURL} />
            </div>
          </div>
          <SectionLabel label="Răspuns" />
          <CodeBlock code={CAEN_SEARCH_RESPONSE} language="json" />
        </div>

        <hr className="border-gray-100" />

        {/* GET /caen/{cod} */}
        <div>
          <EndpointHeader method="GET" path="/caen/{cod}" accent="blue" />
          <p className="mb-5 text-gray-600">
            Returnează detalii complete pentru un cod CAEN exact de 4 cifre.
          </p>
          <SectionLabel label="Parametri" />
          <ParamsTable>
            <ParamRow name="cod" type="string" required description="Codul CAEN de 4 cifre (ex: 0111)" />
          </ParamsTable>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={CAEN_LOOKUP_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={CAEN_LOOKUP_CURL} />
            </div>
          </div>
          <SectionLabel label="Răspuns" />
          <CodeBlock code={CAEN_LOOKUP_RESPONSE} language="json" />
        </div>

        <hr className="border-gray-100" />

        {/* Schema */}
        <div>
          <h3 className="mb-4 text-base font-bold text-gray-900">Schema <code className="rounded bg-blue-50 px-2 py-0.5 font-mono text-sm text-blue-700">CAENEntry</code></h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Câmp</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Tip</th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Descriere</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['cod_caen', 'string', 'Codul CAEN (4 cifre)'],
                  ['denumire', 'string', 'Denumirea activității economice'],
                  ['sectiune_cod', 'string', 'Codul secțiunii (ex: A)'],
                  ['sectiune', 'string', 'Denumirea secțiunii'],
                  ['diviziune_cod', 'string', 'Codul diviziunii (ex: 01)'],
                  ['diviziune', 'string', 'Denumirea diviziunii'],
                  ['grupa_cod', 'string', 'Codul grupei (ex: 011)'],
                  ['grupa', 'string', 'Denumirea grupei'],
                ].map(([field, type, desc]) => (
                  <tr key={field} className="border-t border-gray-100">
                    <td className="py-2.5 pr-4 font-mono text-sm font-medium text-blue-700">{field}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-gray-400">{type}</td>
                    <td className="py-2.5 text-sm text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SIRUTA ──────────────────────────────────────────────────────────────────

const SIRUTA_SEARCH_FETCH = `const res = await fetch('https://caen-api.ro/api/siruta/cautare?q=Focșani&limit=10');
const data = await res.json();
// { total: 1, results: [...] }`

const SIRUTA_SEARCH_CURL = `curl "https://caen-api.ro/api/siruta/cautare?q=Focsani&limit=10"`

const SIRUTA_LOOKUP_FETCH = `const res = await fetch('https://caen-api.ro/api/siruta/localitate/152756');
const data = await res.json();`

const SIRUTA_LOOKUP_CURL = `curl "https://caen-api.ro/api/siruta/localitate/152756"`

const SIRUTA_JUDETE_FETCH = `const res = await fetch('https://caen-api.ro/api/siruta/judete');
const judete = await res.json();
// [{ cod_judet: 1, denumire: "ALBA" }, ...]`

const SIRUTA_JUDETE_CURL = `curl "https://caen-api.ro/api/siruta/judete"`

const SIRUTA_JUDET_FETCH = `const res = await fetch('https://caen-api.ro/api/siruta/judet/41');
const localitati = await res.json();
// toate localitățile din Vrancea`

const SIRUTA_JUDET_CURL = `curl "https://caen-api.ro/api/siruta/judet/41"`

const SIRUTA_SEARCH_RESPONSE = `{
  "total": 1,
  "results": [
    {
      "cod_siruta": 152756,
      "denumire": "FOCȘANI",
      "tip_cod": 12,
      "tip_abrev": "M",
      "tip_denumire": "Municipiu",
      "cod_judet": 41,
      "judet_denumire": "VRANCEA"
    }
  ]
}`

const SIRUTA_JUDETE_RESPONSE = `[
  { "cod_judet": 1, "denumire": "ALBA" },
  { "cod_judet": 2, "denumire": "ARAD" },
  ...
]`

const SIRUTA_JUDET_RESPONSE = `[
  {
    "cod_siruta": 152756,
    "denumire": "FOCȘANI",
    "tip_cod": 12,
    "tip_abrev": "M",
    "tip_denumire": "Municipiu",
    "cod_judet": 41,
    "judet_denumire": "VRANCEA"
  },
  {
    "cod_siruta": 152809,
    "denumire": "ADJUD",
    "tip_cod": 13,
    "tip_abrev": "O",
    "tip_denumire": "Oraș",
    "cod_judet": 41,
    "judet_denumire": "VRANCEA"
  }
]`

function SirutaDocsSection() {
  return (
    <section id="siruta">
      <div className="mb-8 flex items-center gap-3">
        <span className="rounded-xl bg-emerald-50 px-3 py-1.5 font-mono text-sm font-bold text-emerald-700">SIRUTA</span>
        <h2 className="text-xl font-bold text-gray-900">Sistemul de identificare a unităților teritoriale</h2>
      </div>

      <div className="space-y-10">
        {/* GET /siruta/cautare */}
        <div>
          <EndpointHeader method="GET" path="/siruta/cautare" accent="emerald" />
          <p className="mb-5 text-gray-600">
            Caută localități după nume (minim 2 caractere). Returnează localități din toată țara. Suportă paginare.
          </p>
          <SectionLabel label="Parametri" />
          <ParamsTable>
            <ParamRow name="q" type="string" required description="Numele localității (minim 2 caractere, ex: Focșani)" />
            <ParamRow name="limit" type="integer" required={false} description="Număr maxim de rezultate. Implicit 50, maxim 200." />
            <ParamRow name="offset" type="integer" required={false} description="Poziția de start pentru paginare. Implicit 0." />
          </ParamsTable>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={SIRUTA_SEARCH_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={SIRUTA_SEARCH_CURL} />
            </div>
          </div>
          <SectionLabel label="Răspuns" />
          <CodeBlock code={SIRUTA_SEARCH_RESPONSE} language="json" />
        </div>

        <hr className="border-gray-100" />

        {/* GET /siruta/localitate/{cod} */}
        <div>
          <EndpointHeader method="GET" path="/siruta/localitate/{cod}" accent="emerald" />
          <p className="mb-5 text-gray-600">
            Returnează detalii complete pentru o localitate identificată prin codul SIRUTA numeric.
          </p>
          <SectionLabel label="Parametri" />
          <ParamsTable>
            <ParamRow name="cod" type="integer" required description="Codul SIRUTA numeric unic al localității (ex: 152756)" />
          </ParamsTable>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={SIRUTA_LOOKUP_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={SIRUTA_LOOKUP_CURL} />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* GET /siruta/judete */}
        <div>
          <EndpointHeader method="GET" path="/siruta/judete" accent="emerald" />
          <p className="mb-5 text-gray-600">
            Returnează lista tuturor județelor din România cu codurile lor numerice. Nu necesită parametri.
          </p>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={SIRUTA_JUDETE_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={SIRUTA_JUDETE_CURL} />
            </div>
          </div>
          <SectionLabel label="Răspuns" />
          <CodeBlock code={SIRUTA_JUDETE_RESPONSE} language="json" />
        </div>

        <hr className="border-gray-100" />

        {/* GET /siruta/judet/{cod_judet} */}
        <div>
          <EndpointHeader method="GET" path="/siruta/judet/{cod_judet}" accent="emerald" />
          <p className="mb-5 text-gray-600">
            Returnează toate localitățile dintr-un județ. Opțional se poate filtra după tipul unității administrative.
          </p>
          <SectionLabel label="Parametri" />
          <ParamsTable>
            <ParamRow name="cod_judet" type="integer" required description="Codul numeric al județului (ex: 41 pentru Vrancea)" />
            <ParamRow name="tip_cod" type="integer" required={false} description="Filtrare după tip: 10 județ, 11 sector, 12 municipiu, 13 oraș, 17 comună, 18 sat" />
          </ParamsTable>
          <SectionLabel label="Exemple" />
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">JavaScript (fetch)</p>
              <CodeBlock code={SIRUTA_JUDET_FETCH} language="javascript" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-gray-500">cURL</p>
              <CodeBlock code={SIRUTA_JUDET_CURL} />
            </div>
          </div>
          <SectionLabel label="Răspuns" />
          <CodeBlock code={SIRUTA_JUDET_RESPONSE} language="json" />
        </div>

        <hr className="border-gray-100" />

        {/* Schema */}
        <div>
          <h3 className="mb-4 text-base font-bold text-gray-900">Schema <code className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-sm text-emerald-700">LocalitateEntry</code></h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white px-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Câmp</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Tip</th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Descriere</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['cod_siruta', 'integer', 'Codul SIRUTA unic al localității'],
                  ['denumire', 'string', 'Denumirea localității'],
                  ['tip_cod', 'integer', 'Codul tipului de unitate administrativă'],
                  ['tip_abrev', 'string', 'Abrevierea tipului (ex: M, O, C, S)'],
                  ['tip_denumire', 'string', 'Denumirea tipului (ex: Municipiu, Oraș, Comună, Sat)'],
                  ['cod_judet', 'integer', 'Codul numeric al județului'],
                  ['judet_denumire', 'string', 'Denumirea județului'],
                ].map(([field, type, desc]) => (
                  <tr key={field} className="border-t border-gray-100">
                    <td className="py-2.5 pr-4 font-mono text-sm font-medium text-emerald-700">{field}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-gray-400">{type}</td>
                    <td className="py-2.5 text-sm text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Documentație API
        </h1>
        <p className="text-gray-500">
          API-uri REST gratuite pentru date publice din România. Toate endpoint-urile returnează JSON.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <span className="text-sm font-semibold text-gray-600">Base URL</span>
          <code className="ml-2 font-mono text-sm text-gray-800">https://caen-api.ro/api</code>
          <a
            href="https://caen-api.ro/api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
          >
            Swagger UI →
          </a>
        </div>

        {/* Section nav */}
        <div className="mt-5 flex gap-2">
          <a
            href="#caen"
            className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <span className="font-mono">CAEN</span>
            <span className="text-blue-400">Rev. 3</span>
          </a>
          <a
            href="#siruta"
            className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            <span className="font-mono">SIRUTA</span>
          </a>
        </div>
      </div>

      <div className="space-y-16">
        <CAENDocsSection />
        <hr className="border-gray-200" />
        <SirutaDocsSection />
      </div>
    </main>
  )
}
