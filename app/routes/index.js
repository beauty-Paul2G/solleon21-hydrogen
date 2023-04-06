import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Slider} from '~/components/Slider';
import {TextSection} from '../components/TextSection.jsx';
import {GoldenLine} from '~/components/Decorative/GoldenLine.jsx';
import textContents from '../static/textContents.json';
import {banner, modelsClothes} from "../static/images.json"

export const meta = () => {
  return {
    title: 'Sol León',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections} = useLoaderData();
  return (
    <section className="flex items-center flex-col gap-4">
      <Slider imageList={banner} type="banner"/>
      <div className={`flex flex-col gap-12 p-12 max-w-7xl`}>
        <TextSection section={textContents['biography']} id={"biografia"}/>
        <GoldenLine />
        <TextSection section={textContents['trajectory']} id={`trayectoria`}/>
        <GoldenLine />
        <TextSection section={textContents['modelsclothes']}  id={`prendasdemodelo`} />
        <Slider imageList={modelsClothes} type="carrousel" showDescriptions/>
        <div className={`hidden p-12 w-full max-w-7xl`}>
          <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
            Collections
          </h2>
          <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
            {collections.nodes.map((collection) => {
              return (
                <Link
                  to={`/collections/${collection.handle}`}
                  key={collection.id}
                >
                  <div className="grid gap-4">
                    {collection?.image && (
                      <Image
                        alt={`Image of ${collection.title}`}
                        data={collection.image}
                        key={collection.id}
                        sizes="(max-width: 32em) 100vw, 33vw"
                        widths={[400, 500, 600, 700, 800, 900]}
                        loaderOptions={{
                          scale: 2,
                          crop: 'center',
                        }}
                      />
                    )}
                    <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                      {collection.title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
