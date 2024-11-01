import Image from 'next/image';

type BillionaireProfile = {
  id: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets?: FinancialAsset[];
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
};

type FinancialAsset = {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
};

const Person = async ({ params }: { params: { id: string } }) => {
  const person: BillionaireProfile = await (
    await fetch(
      `https://billions-api.nomadcoders.workers.dev/person/${params.id}`,
    )
  ).json();

  return (
    <div className="flex flex-col gap-4">
      <section className="bg-slate-800 p-3 flex text-slate-200">
        <div className="min-w-60 h-80 relative">
          <Image
            className="object-cover"
            src={person.squareImage}
            alt={person.name}
            fill
            priority
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl">{person.name.toUpperCase()}</h2>
          <p>
            {person.city} {person.country}
          </p>
          <br />
          <div>
            <span className="text-slate-500">net worth </span>
            <span className="italic">{person.netWorth}</span>
          </div>
          <div>
            <span className="text-slate-500">field </span>
            <span className="italic">{person.industries.join(', ')}</span>
          </div>
          <div>
            <span className="text-slate-500">bio </span>
            <span className="italic text-sm">{person.bio.join(', ')}</span>
          </div>
        </div>
      </section>

      <section
        className={`bg-slate-800 p-3 text-slate-200 ${person.financialAssets && 'grid grid-cols-3 gap-9'}`}
      >
        {person.financialAssets ? (
          person.financialAssets.map((asset, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${asset.ticker}-${index}`}
              className="flex flex-col justify-between text-xs bg-slate-700 p-3 gap-1"
            >
              <h4 className="text-sm">
                {asset.companyName}{' '}
                <span className="italic">{asset.exchange}</span>
              </h4>
              <span>
                {asset.numberOfShares}{' '}
                <span className="italic text-slate-400">stocks holding</span>
              </span>
              <span>
                {`${asset.exchangeRate}%`}{' '}
                <span className="italic text-slate-400">in total</span>
              </span>
              <span>
                {`(${asset.currencyCode} ${asset.sharePrice})`}{' '}
                <span className="italic text-slate-400">current value</span>
              </span>
            </div>
          ))
        ) : (
          <div className="text-slate-400">
            <h1 className="italic text-xl font-semibold text-center">
              No Content
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Person;
