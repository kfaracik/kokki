export type Product = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  specs: { label: string; value: string; highlight?: boolean }[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "kokki-standard",
    slug: "standard",
    name: "Kokki Standard",
    tag: "Układ klasyczny",
    description:
      "Dwa moduły, cztery palniki w układzie znanym z tradycyjnej płyty — tyle że niewidoczne. Pełna strefa gotowania, która znika pod blatem, gdy jej nie używasz.",
    image: "/brand/pot-on.png",
    specs: [
      { label: "Moc palnika", value: "1600–2000 W", highlight: true },
      { label: "Palniki", value: "4 (2 moduły)" },
      { label: "Zasilanie", value: "1×32 A lub 2×16 A" },
    ],
  },
  {
    id: "kokki-linear",
    slug: "linear",
    name: "Kokki Linear",
    tag: "Wyspa / wąski blat",
    description:
      "Moduły ułożone równolegle, w jednej linii — idealne na wyspę kuchenną lub wąski blat. Ta sama moc, inna geometria.",
    image: "/brand/kitchen.png",
    specs: [
      { label: "Moc palnika", value: "1600–2000 W", highlight: true },
      { label: "Układ", value: "2+2 w linii" },
      { label: "Szafka", value: "od 60 cm" },
    ],
  },
  {
    id: "kokki-custom",
    slug: "custom",
    name: "Kokki Custom",
    tag: "Na wymiar",
    description:
      "Konfiguracja pod nietypowe wymiary i układy. Dobierasz rozmieszczenie palników i panelu sterowania — projektujemy z Tobą strefę gotowania.",
    image: "/brand/chef-coil-bw.png",
    specs: [
      { label: "Moc palnika", value: "do 2000 W", highlight: true },
      { label: "Układ", value: "indywidualny" },
      { label: "Panel", value: "szuflada / blat / ściana" },
    ],
  },
];

export const FAQ: FaqItem[] = [
  {
    id: "montaz",
    question: "Czy kuchenki indukcyjne Kokki są trudne w instalacji?",
    answer:
      "Nasze kuchenki są zaprojektowane z myślą o łatwości instalacji. W komplecie dostarczamy wszystko, co jest niezbędne do montażu wraz ze szczegółową instrukcją, a nasz zespół wsparcia technicznego jest zawsze gotowy, by pomóc. Kuchenka Kokki powinna być montowana przez osobę z odpowiednimi uprawnieniami elektrycznymi.",
  },
  {
    id: "blaty",
    question: "Czy mogę zamontować kuchenkę Kokki na każdym rodzaju blatu?",
    answer:
      "Kuchenki Kokki przeznaczone są do montażu pod spiekami kwarcowymi o grubości 12 mm oraz granitowymi i kwarcytowymi blatami kamiennymi. W przypadku grubszych blatów miejsce montażu powinno być sfrezowane do grubości 12 mm w punktach umieszczenia pól indukcyjnych.",
  },
  {
    id: "zasilanie",
    question: "Czy potrzebuję specjalnego podłączenia elektrycznego?",
    answer:
      "Kuchenka Kokki składa się z dwóch modułów, każdy zasilany z jednej fazy. Oba moduły można podłączyć do tej samej fazy (1×32 A) lub do dwóch faz (2×16 A).",
  },
  {
    id: "panel",
    question: "Gdzie umieścić panel sterowania?",
    answer:
      "Położenie panelu sterującego jest elastyczne — może być umieszczony w szufladzie, na blacie lub na ścianie. Zastanawiasz się, jakie miejsce będzie najlepsze? Skontaktuj się z nami.",
  },
  {
    id: "modularnosc",
    question: "Co to znaczy, że kuchenka jest modułowa?",
    answer:
      "Modułowa konstrukcja pozwala na elastyczne podejście do organizacji przestrzeni. Dwa moduły, każdy z dwoma palnikami, można zamontować w spersonalizowany sposób — jak w standardowej kuchence 4-palnikowej albo równolegle, np. na wąskim blacie lub wyspie kuchennej.",
  },
  {
    id: "naczynia",
    question: "Czy muszę posiadać specjalne naczynia kuchenne?",
    answer:
      "Naczynie musi mieć dno ferromagnetyczne — większość naczyń używanych na klasycznych kuchenkach indukcyjnych będzie kompatybilna. Naczynia podczas gotowania umieszcza się na macie silikonowej dostarczanej z kuchenką. Nie zalecamy naczyń żeliwnych.",
  },
  {
    id: "nagrzewanie",
    question: "Czy powierzchnia blatu nagrzewa się podczas gotowania?",
    answer:
      "Przy krótkim, standardowym gotowaniu powierzchnia nie osiągnie wysokiej temperatury. Po około 10 minutach gotowania blat będzie gorący — należy zachować ostrożność w jego pobliżu.",
  },
  {
    id: "zewnatrz",
    question: "Czy kuchenka nadaje się do korzystania na zewnątrz?",
    answer:
      "Tak — kuchenkę Kokki można stosować w kuchniach zewnętrznych, na tarasach i w ogrodach. Przy takim zastosowaniu panel sterowania powinien być montowany w szufladzie.",
  },
];

export const IGNITE_STEPS = [
  {
    index: "01 — Redefinicja",
    title: "Redefinicja tradycyjnej kuchni",
    body: "Podblatowe kuchenki indukcyjne Kokki rewolucjonizują codzienne gotowanie i na nowo definiują przestrzeń kuchenną. Czysty blat, bez płyty — indukcja pozostaje niewidoczna.",
  },
  {
    index: "02 — Technologia",
    title: "Doświadcz kuchni przyszłości",
    body: "Pola grzewcze pracują przez kamienny blat o grubości 12 mm. Blat wykorzystasz na wiele sposobów — od strefy roboczej po zaawansowaną strefę gotowania.",
  },
  {
    index: "03 — Doświadczenie",
    title: "Każdy element na swoim miejscu",
    body: "Kokki to nie tylko kuchenka indukcyjna — to nowy sposób myślenia o gotowaniu i przestrzeni w Twoim domu. Minimalizm, elegancja i niezrównana funkcjonalność.",
  },
];

export const TICKER_ITEMS = [
  "Podblatowa indukcja",
  "Design",
  "Modułowość",
  "Minimalizm",
  "Spiek · Granit · Kwarcyt",
  "Premium",
];
