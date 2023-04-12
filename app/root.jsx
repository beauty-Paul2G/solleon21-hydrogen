import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import tailwind from './styles/tailwind-build.css';
import styles from './styles/styles.css';
import appStyles from './styles/app.css'
import favicon from '../public/favicon.svg';
import {Layout} from './components/Layout';
import { ScrollUpButton } from './components/ScrollUpButton';
import {defer} from '@shopify/remix-oxygen';
import {CART_QUERY} from '~/queries/cart';
import {parseMenu} from './lib/utils';

export const links = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css" },
    { rel: 'preconnect', href: 'https://cdn.shopify.com' },
    { rel: 'preconnect', href: 'https://shop.app' },
    { rel: 'icon', type: 'image/svg+xml', href: favicon }
  ];
};

export const meta = () => ({ 
  charset: 'utf-8', 
  viewport: 'width=device-width,initial-scale=1',
  "og:site_name": "Sol Leon",
  "og:type": "website",
  "og:url":  'https://www.solleon21.com/',
  "og:image": 'https://www.solleon21.com/wp-content/uploads/2021/08/logo_header_x1920.png'
}
);

export async function loader({context}) {
  const [cartId, layout] = await Promise.all([
    context.session.get('cartId'),
    getLayoutData(context),
  ]);

  return defer({
    layout,
    selectedLocale: context.storefront.i18n,
    cart: cartId ? getCart(context, cartId) : undefined,
  });
}

async function getCart({storefront}, cartId) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }

  const {cart} = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}

async function getLayoutData({storefront}) {
  const HEADER_MENU_HANDLE = 'main-menu';

  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: HEADER_MENU_HANDLE,
      language: storefront.i18n.language,
    },
  });

  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const headerMenu = data?.headerMenu
      ? parseMenu(data.headerMenu, customPrefixes)
      : undefined;

  return {shop: data.shop, headerMenu};
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout layout={data.layout}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <ScrollUpButton/>
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
query layoutMenus(
    $language: LanguageCode
    $headerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      id
      name
      description
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
  }
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
`;
