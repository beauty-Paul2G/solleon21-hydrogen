import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Slider} from '~/components/Slider';
import {TextSection} from '../components/TextSection.jsx';
import textContents from '../static/textContents.json';

const forCarrousel = [
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/products/MildredNegro1_1600x1600.png?v=1678405118',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/products/supportbrabeige1_1600x1600.jpg?v=1679079632',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/products/rose_chalecoextremo1.jpg?v=1680708387',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/products/Mildredterracota1_1600x1600.png?v=1678404455',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/products/NyStyle_Mesadetrabajo1_1600x1600.png?v=1677869117',
];

const forBanner = [
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/files/venus1_espanol_x1024.jpg?v=1677703012',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/files/new_control_swimsuit_espanol_x1920.jpg?v=1677703153',
  'https://cdn.shopify.com/s/files/1/0300/5926/6141/files/deluxe_nueva_linea_x1920.jpg?v=1672165500',
];

export const meta = () => {
  return {
    title: 'Hydrogen',
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
      <Slider imageList={forBanner} type="banner" />
      <div className={`flex flex-col gap-12 py-12 max-w-7xl`}>
        <TextSection section={textContents['biography']} />
        <Slider imageList={forCarrousel} type="carrousel"></Slider>
        <TextSection section={textContents['trajectory']} />
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
