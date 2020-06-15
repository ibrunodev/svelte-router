# @ibrunodev/svelte-router

Svelte router using a store and components. The router responds to browser pushState events and update views.

## Usage

First setup a view with `<Router>`:

```html
<script>
    import { Router } from '@ibrunodev/svelte-router'
    import * as pages from './pages.js'

    const routes = {
        '/': pages.Home,
        '/contact': pages.Contact,
        404: pages.Lost,
        // ...
    }
</script>

<Router {routes} />
```

Then you can use `<Link>` to change the view:

```html
<script>
    import { Link } from '@ibrunodev/svelte-router'
</script>

<nav>
    <Link href='/'>Home</Link>
    <Link href='/contact'>Contact</Link>
</nav>
```

And you can use the `router` store to have your own routing:

```html
<script>
    import { router } from '@ibrunodev/svelte-router'
</script>

{#if $router.query.name}
    <h1>Hello {$router.query.name}!</h1>
{/if}

<p>You visited {$router.path}.</p>
```

If you want to use your own store, then both `Router` and `Link` accept a `router` to change the store:

```html
<script>
    import { Router, Link } from '@ibrunodev/svelte-router'
    import { custom } from '../stores.js'
    // ...
</script>

<Router router={custom} {routes} />
<Link router={custom} href='/'>Home</Link>
```

With this you may want your own link component:

```html
<script>
    import { Link } from '@ibrunodev/svelte-router'
    import { custom } from '../stores.js'
</script>

<Link router={custom} {..$$props}><slot></slot></Link>
```

To redirect route use the `redirect` function.

```
// Home.svelte
if ( false == user.isAuthenticated() ) {
    redirect('/login');
}
```

*Current lib is a fork from @jamen/svelte-router*
