Object.defineProperty(global, 'import', {
  value: () => ({
    meta: {
      env: {
        VITE_APP_BASE_API_URL: 'https://retoolapi.dev',
      },
    },
  }),
});
