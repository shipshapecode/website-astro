---
authorId: nromero
categories:
  - react
  - rollup
date: '2023-01-23'
slug: react-viewer-context-pattern
title:
  Using React context to manage our currently authenticated user's (viewer)
  state.
---

# Why

Using [React Context](https://reactjs.org/docs/context.html) allows us to make
one call to check the currently the authenticated user is aka the "Viewer" at
the top of our React tree, and we then want to be able to use the viewer object
throughout our application without passing it around as a prop
([Prop Drilling Vs Context](https://medium.com/geekculture/props-drilling-v-s-context-api-which-one-is-the-best-75c503d21a65))

# What

```typescript
import React from 'react';

export type Viewer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

/**
 * Viewer context will always return either undefined or the viewer type.
 */
export const ViewerContext = React.createContext<Viewer | undefined>(undefined);

/**
 * Return the currently authenticated viewer (or undefined if no viewer is defined)
 */
export default function useViewer() {
  return React.useContext(ViewerContext);
}
```

We would initialize our Viewer context at the top of our React tree like so.

```tsx
export default function App() {
  const data = useRealAuthenticationCheck();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ViewerContext.Provider value={data.viewer}>
          <Outlet />
        </ViewerContext.Provider>
      </body>
    </html>
  );
}
```

Any where else in our application we can call `useViewer`

```tsx
export default function HelloName() {
  const viewer = useViewer();
  return (
    <div>
      <h1>Hello {viewer.firstName}</h1>
      <Stepper>{Steps}</Stepper>
    </div>
  );
}
```

## Authenticated Only Routes/Pages

The next few snippets will demonstrate how we can handle components that should
only ever be rendered with an authenticated viewer. This encapsulates this logic
into reusable hooks, helping us avoid rewriting this logic per route.

### SSR

Using a framework like [Remix.js](https://remix.run/) which is always
server-side rendered we would check on the server if the user is authenticated
before rendering any of the content.

```typescript
/**
 * Ensure the user is authenticated, an error is thrown to make the viewer always be defined
 * in any code after this hook from the type checkers perspective.
 * Redirect non-authenticated viewers in the routes Remix Loader.
 */
export function useAuthenticatedViewer() {
  const viewer = useViewer();
  if (!viewer) throw new Error('Authenticated viewer is required.');
  return viewer;
}
```

Thus the `useAuthenticatedViewer` hook throws an error to let the type checker
know that this hook will _always return a viewer object_ as the server will have
redirected any non-authenticated users before rendering this component.

A [Remix Loader](https://remix.run/docs/en/v1/route/loader) might look like this

```typescript
export async function loader({ request }: LoaderArgs) {
  const viewer = await checkBackendForUser();

  if (!viewer) {
    // Redirect to the home page if they are already signed in.
    return redirect('/login');
  }
  return null;
}
```

### Client Side checks

In this scenario, our viewer context also has a loading field and the viewer has
moved to a field on the returned object.

```typescript
const ViewerContext = React.createContext<{
  viewer: ViewerQuery['viewer'];
  loading: boolean;
}>({
  viewer: undefined,
  loading: false
});

const isClient = typeof window === 'undefined';

/**
 * Used in pages and components where the route has asserted viewer query is not loading
 * and the authenticated viewer was returned.
 */
export const useAuthenticated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viewer, loading } = useViewer();
  /**
   * Only redirect
   * 1. We are on client
   * 2. if useViewer request is not loading
   * 3. viewer is not authenticated.
   */
  React.useEffect(() => {
    if (isClient && !loading && !viewer) {
      navigate(`/login`);
    }
  }, [loading, navigate, viewer]);

  return { viewer, loading };
};
```

### Final Thoughts

To some extent, the SSR version of `useAuthenticatedViewer` should also redirect
in the case that the session cookie expires etc.
