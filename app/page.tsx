import Image from 'next/image';
import Link from 'next/link';

interface Billionaire {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default async function Home() {
  const list: Billionaire[] = await (
    await fetch('https://billions-api.nomadcoders.workers.dev/')
  ).json();

  return (
    <main className="text-gray-300 p-40">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-w-[150px]">
        {list.map((el) => (
          <Link key={el.id} href={`/person/${el.id}`}>
            <div className="p-3 group min-w-[50px]">
              <div className="w-full h-44 relative flex items-center justify-center">
                {el.squareImage === 'https:undefined' ? (
                  <div className="text-slate-400">No Image</div>
                ) : (
                  <Image
                    className="object-cover"
                    src={el.squareImage}
                    alt={el.name}
                    fill
                  />
                )}
                <div className="absolute bg-slate-900 w-full h-full opacity-60 group-hover:opacity-0 transition-opacity" />
              </div>
              <h4 className="text-center h-9 flex justify-center items-center text-slate-500 group-hover:-translate-y-6 group-hover:text-slate-50 group-hover:bg-slate-900 transition-transform duration-200">
                {el.name.split('&')[0].trim()}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
