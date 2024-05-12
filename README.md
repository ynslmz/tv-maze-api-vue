# tv-maze-api-vue

### Starting the Project

I used `npm create vue@latest` command to create project with minumum help. I will add features that I need later

![alt text](image.png)

## Instructions to run

- I used node v18.20.2 and npm v10.5.0. Please, make sure using minimum these versions or above.
- Create an environment file from the sample.

### Dont forget to install dependencies first

```sh
npm install
```

You can follow the commands below according to your needs

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

#### Run tests

```sh
npm run test
```

## Steps

### Git Setup

I initialized the git, targeted my git repository and force pushed to skip main branch protection

```sh
git init
git remote add origin https://github.com/ynslmz/tv-maze-api-vue.git
git add -A
git commit -m 'init'
git checkout -b main
git push --set-upstream origin main  --force

```

### Adding Router

I followed the instructions on the [documentation](https://router.vuejs.org/installation.html)

```sh
 npm add vue-router@4
```

I added a router file, views to navigate with lazy loading and configured App component and the entry point

### Adding Sass and setting up styles

I set up sass for style sheets and added some configuration to make style sheets available in components

```sh
 npm add sass --save-dev
```

### Adding axios for Rest Calls

I added axios for api calls. It's easy to use and it has interceptor functionality to modify or process the requests and responses.
I read the API_URL from the environment file. Please make sure you have a valid environment file like the sample

```sh
 npm install axios --save-dev
```

### Adding Pinia for state management

I have used Pinia for state management and handled all data process in it

```sh
 npm install pinia
```

### Route Resolvers

I will use route resolvers to fetch data before rendering...

```ts
import { useShowStore } from '@/store/show'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function showsResolver(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  /// first load data
  await useShowStore().fetchShows()
  next()
}
```

### Coding the app

For this step you can check the commit history. I created the application according to requirements. From now on I'll add tests, correct the application logic if there is something missed and I'll add more functionalities If I have time. (12.05.24 15.00)

### Adding Unit Tests

I used the new vitest library, vue-test-utils for unit tests and I added/updated configurations (hit the commit history for details)

```sh
 npm install vitest
 npm install @vue/test-utils
```
