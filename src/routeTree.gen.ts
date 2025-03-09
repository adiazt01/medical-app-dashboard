/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardRouteImport } from './routes/dashboard/route'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as DashboardUsersIndexImport } from './routes/dashboard/users/index'
import { Route as DashboardSettingsIndexImport } from './routes/dashboard/settings/index'
import { Route as DashboardProductsIndexImport } from './routes/dashboard/products/index'
import { Route as DashboardBranchsIndexImport } from './routes/dashboard/branchs/index'
import { Route as DashboardProductsNewIndexImport } from './routes/dashboard/products/new/index'
import { Route as DashboardProductsBranchsIndexImport } from './routes/dashboard/products/branchs/index'

// Create/Update Routes

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardUsersIndexRoute = DashboardUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardSettingsIndexRoute = DashboardSettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardProductsIndexRoute = DashboardProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardBranchsIndexRoute = DashboardBranchsIndexImport.update({
  id: '/branchs/',
  path: '/branchs/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardProductsNewIndexRoute = DashboardProductsNewIndexImport.update({
  id: '/products/new/',
  path: '/products/new/',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardProductsBranchsIndexRoute =
  DashboardProductsBranchsIndexImport.update({
    id: '/products/branchs/',
    path: '/products/branchs/',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/branchs/': {
      id: '/dashboard/branchs/'
      path: '/branchs'
      fullPath: '/dashboard/branchs'
      preLoaderRoute: typeof DashboardBranchsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/products/': {
      id: '/dashboard/products/'
      path: '/products'
      fullPath: '/dashboard/products'
      preLoaderRoute: typeof DashboardProductsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/settings/': {
      id: '/dashboard/settings/'
      path: '/settings'
      fullPath: '/dashboard/settings'
      preLoaderRoute: typeof DashboardSettingsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/users/': {
      id: '/dashboard/users/'
      path: '/users'
      fullPath: '/dashboard/users'
      preLoaderRoute: typeof DashboardUsersIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/products/branchs/': {
      id: '/dashboard/products/branchs/'
      path: '/products/branchs'
      fullPath: '/dashboard/products/branchs'
      preLoaderRoute: typeof DashboardProductsBranchsIndexImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/products/new/': {
      id: '/dashboard/products/new/'
      path: '/products/new'
      fullPath: '/dashboard/products/new'
      preLoaderRoute: typeof DashboardProductsNewIndexImport
      parentRoute: typeof DashboardRouteImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteRouteChildren {
  DashboardIndexRoute: typeof DashboardIndexRoute
  DashboardBranchsIndexRoute: typeof DashboardBranchsIndexRoute
  DashboardProductsIndexRoute: typeof DashboardProductsIndexRoute
  DashboardSettingsIndexRoute: typeof DashboardSettingsIndexRoute
  DashboardUsersIndexRoute: typeof DashboardUsersIndexRoute
  DashboardProductsBranchsIndexRoute: typeof DashboardProductsBranchsIndexRoute
  DashboardProductsNewIndexRoute: typeof DashboardProductsNewIndexRoute
}

const DashboardRouteRouteChildren: DashboardRouteRouteChildren = {
  DashboardIndexRoute: DashboardIndexRoute,
  DashboardBranchsIndexRoute: DashboardBranchsIndexRoute,
  DashboardProductsIndexRoute: DashboardProductsIndexRoute,
  DashboardSettingsIndexRoute: DashboardSettingsIndexRoute,
  DashboardUsersIndexRoute: DashboardUsersIndexRoute,
  DashboardProductsBranchsIndexRoute: DashboardProductsBranchsIndexRoute,
  DashboardProductsNewIndexRoute: DashboardProductsNewIndexRoute,
}

const DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(
  DashboardRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/dashboard/branchs': typeof DashboardBranchsIndexRoute
  '/dashboard/products': typeof DashboardProductsIndexRoute
  '/dashboard/settings': typeof DashboardSettingsIndexRoute
  '/dashboard/users': typeof DashboardUsersIndexRoute
  '/dashboard/products/branchs': typeof DashboardProductsBranchsIndexRoute
  '/dashboard/products/new': typeof DashboardProductsNewIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/dashboard': typeof DashboardIndexRoute
  '/dashboard/branchs': typeof DashboardBranchsIndexRoute
  '/dashboard/products': typeof DashboardProductsIndexRoute
  '/dashboard/settings': typeof DashboardSettingsIndexRoute
  '/dashboard/users': typeof DashboardUsersIndexRoute
  '/dashboard/products/branchs': typeof DashboardProductsBranchsIndexRoute
  '/dashboard/products/new': typeof DashboardProductsNewIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/dashboard/branchs/': typeof DashboardBranchsIndexRoute
  '/dashboard/products/': typeof DashboardProductsIndexRoute
  '/dashboard/settings/': typeof DashboardSettingsIndexRoute
  '/dashboard/users/': typeof DashboardUsersIndexRoute
  '/dashboard/products/branchs/': typeof DashboardProductsBranchsIndexRoute
  '/dashboard/products/new/': typeof DashboardProductsNewIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/auth/login'
    | '/auth/register'
    | '/dashboard/'
    | '/dashboard/branchs'
    | '/dashboard/products'
    | '/dashboard/settings'
    | '/dashboard/users'
    | '/dashboard/products/branchs'
    | '/dashboard/products/new'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/login'
    | '/auth/register'
    | '/dashboard'
    | '/dashboard/branchs'
    | '/dashboard/products'
    | '/dashboard/settings'
    | '/dashboard/users'
    | '/dashboard/products/branchs'
    | '/dashboard/products/new'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/auth/login'
    | '/auth/register'
    | '/dashboard/'
    | '/dashboard/branchs/'
    | '/dashboard/products/'
    | '/dashboard/settings/'
    | '/dashboard/users/'
    | '/dashboard/products/branchs/'
    | '/dashboard/products/new/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRouteRoute: typeof DashboardRouteRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRouteRoute: DashboardRouteRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/auth/login",
        "/auth/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard/route.tsx",
      "children": [
        "/dashboard/",
        "/dashboard/branchs/",
        "/dashboard/products/",
        "/dashboard/settings/",
        "/dashboard/users/",
        "/dashboard/products/branchs/",
        "/dashboard/products/new/"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/branchs/": {
      "filePath": "dashboard/branchs/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/products/": {
      "filePath": "dashboard/products/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings/": {
      "filePath": "dashboard/settings/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/users/": {
      "filePath": "dashboard/users/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/products/branchs/": {
      "filePath": "dashboard/products/branchs/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/products/new/": {
      "filePath": "dashboard/products/new/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
