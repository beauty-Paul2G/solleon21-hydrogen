function resolveToFromType(
    {customPrefixes, pathname, type, hash} = {
        customPrefixes: {},
    },
) {
    if (!pathname || !type) return '';

    /*
          MenuItemType enum
          @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
        */
    const defaultPrefixes = {
        BLOG: 'blogs',
        COLLECTION: 'collections',
        COLLECTIONS: 'collections',
        FRONTPAGE: 'frontpage',
        HTTP: '',
        PAGE: 'pages',
        CATALOG: 'collections/all',
        PRODUCT: 'products',
        SEARCH: 'search',
        SHOP_POLICY: 'policies',
    };

    const pathParts = pathname.split('/');
    const handle = pathParts.pop() || '';
    const routePrefix = {
        ...defaultPrefixes,
        ...customPrefixes,
    };

    switch (true) {
        // special cases
        case type === 'FRONTPAGE':
            return `/${hash}`;

        case type === 'ARTICLE': {
            const blogHandle = pathParts.pop();
            return routePrefix.BLOG
                ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
                : `/${blogHandle}/${handle}${hash}`;
        }

        case type === 'COLLECTIONS':
            return `/${routePrefix.COLLECTIONS}${hash}`;

        case type === 'SEARCH':
            return `/${routePrefix.SEARCH}${hash}`;

        case type === 'CATALOG':
            return `/${routePrefix.CATALOG}${hash}`;

        // common cases: BLOG, PAGE, COLLECTION, PRODUCT, SHOP_POLICY, HTTP
        default:
            return routePrefix[type]
                ? `/${routePrefix[type]}/${handle}${hash}`
                : `/${handle}${hash}`;
    }
}

/*
  Parse each menu link and adding, isExternal, to and target
*/
function parseItem(customPrefixes = {}) {
    return function (item) {
        if (!item?.url || !item?.type) {
            // eslint-disable-next-line no-console
            console.warn('Invalid menu item.  Must include a url and type.');
            // @ts-ignore
            return;
        }

        // extract path from url because we don't need the origin on internal to attributes
        const {pathname, hash} = new URL(item.url);

        /*
                  Currently the MenuAPI only returns online store urls e.g — xyz.myshopify.com/..
                  Note: update logic when API is updated to include the active qualified domain
                */
        const isInternalLink = /\.myshopify\.com/g.test(item.url);

        const parsedItem = isInternalLink
            ? // internal links
            {
                ...item,
                isExternal: false,
                target: '_self',
                to: resolveToFromType({type: item.type, customPrefixes, pathname, hash}),
            }
            : // external links
            {
                ...item,
                isExternal: true,
                target: '_blank',
                to: item.url,
            };

        return {
            ...parsedItem,
            items: item.items?.map(parseItem(customPrefixes)),
        };
    };
}

/*
  Recursively adds `to` and `target` attributes to links based on their url
  and resource type.
  It optionally overwrites url paths based on item.type
*/
export function parseMenu(menu, customPrefixes = {}) {
    if (!menu?.items) {
        // eslint-disable-next-line no-console
        console.warn('Invalid menu passed to parseMenu');
        // @ts-ignore
        return menu;
    }

    return {
        ...menu,
        items: menu.items.map(parseItem(customPrefixes)),
    };
}